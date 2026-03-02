"""
    This file contains the business logic to manipulate the data, by calling the appropriate CRUD functions,
    and applying any necessary transformations, before sending the data back to the route handlers.
    """

from sqlalchemy.ext.asyncio import AsyncSession
from schemas1 import UUID, UserCreate, PlotCreate, PlantCreate, TaskCreate, ScanCreate, TransactionCreate, ChatMessageCreate, WeatherResponse
from models1 import User, Plot, Plant, Task, TaskCategory, Scan, Transaction, TransactionType, ChatMessage
from crud import UserCrud, PlotCrud, PlantCrud, TaskCrud, ScanCrud, TransactionCrud, ChatCrud
from functools import wraps
from datetime import datetime

class UserService:
    def __init__(self, database: AsyncSession):
        self.crud = UserCrud(database)
    
    async def getAllUsers(self):
        users = await self.crud.getAllUsers()
        if not users:
            return None
        return users

    async def searchUserbyEmail(self, userEmail: str):
        user = await self.crud.getUserByEmail(userEmail)
        if not user:
            return None
        return user 
    
    async def searchUserById(self, userId: UUID):
        user = await self.crud.getUserById(userId)
        if not user:
            return None
        return user
        
    async def createUser(self, newUser: UserCreate):
        userData = newUser.model_dump()
        isExisting = await self.crud.getUserByEmail(newUser.email)
        if isExisting: 
            return None
        user = User(**userData)        
        return await self.crud.addUser(user)

    async def updateUser(self,userEmail, updatedUser: dict):
        if not updatedUser:
            return None
        
        user = await self.crud.getUserByEmail(userEmail)
        if not user:
            return None
        
        await self.crud.updateUserData(
        userEmail,
        updatedUser.get("name"),    
        updatedUser.get("location") 
    )
        return await self.crud.getUserByEmail(userEmail)

    async def deleteUser(self, userEmail: str):
        user =  await self.crud.softDeleteUser(userEmail)
        if not user:
            return None
        return user

class PlotService:
    def __init__(self, database: AsyncSession):
        self.crud = PlotCrud(database)
    
    async def getUserPlots(self, userId: UUID):
        plots = await self.crud.getAllUserPlots(userId)
        if not plots:
            return None
        return plots
    
    async def getPlot(self, plotId: UUID):
        plot = await self.crud.getPlotById(plotId) 
        if not plot:
            return None
        return plot

    async def createPlot(self, userId: UUID, newPlot: PlotCreate) -> Plot:
        plotData = newPlot.model_dump()
        plotData["userId"] = userId          # inject userId before creating
        plot = Plot(**plotData)
        return await self.crud.addPlot(plot)

    async def updatePlot(self, plotId: UUID, updatedPlot: dict):
        plot = await self.crud.updatePlotData(plotId, updatedPlot["name"], updatedPlot["cropType"], updatedPlot["sizeArea"], updatedPlot["isActive"])
        if not plot:
            return None
        return await self.crud.getPlotById(plotId)  

    async def deletePlot(self, plotId: UUID):              
        plot = await self.crud.softDeletePlot(plotId)
        if not plot:
            return None
        return await self.crud.getPlotById(plotId)

class PlantService:
    def __init__(self, database: AsyncSession):
        self.crud = PlantCrud(database)
    
    async def getPlantByPlot(self, plotId: UUID) -> Plant | None:
        plant = await self.crud.getPlantByPlotId(plotId)
        if not plant:
            return None 

    async def getPlantById(self, plantId: UUID) -> Plant | None:
        plant = await self.crud.getPlantById(plantId)
        if not plant:
            return None

    async def createPlant(self, plotId: UUID, newPlant: PlantCreate) -> Plant | None :
        newPlant.plotId = plotId
        plantData = newPlant.model_dump()
        plotTaken = self.getPlantByPlot(plantData["plotId"])
        if plotTaken:
            return None
        plant = Plant(**plantData)
        return await self.crud.addPlant(plant)
        
    async def updatePlant(self, plotId: UUID, updatedPlant: dict) -> Plant | None:
        plant = await self.crud.getPlantByPlotId(plotId)
        if not plant:
            return None
        plant.name = updatedPlant["name"] if updatedPlant.get("name") else plant.name
        plant.plantImage = updatedPlant["plantImage"] if updatedPlant.get("plantImage") else plant.plantImage
        await self.crud.database.commit()
        return await self.crud.getPlantByPlotId(plotId)
    
    async def applyHappinessReward(self, plotId: UUID, rewardBonus: int) -> Plant | None:  # called by tasks, scans, transactions, chat
        plant = await self.crud.getPlantByPlotId(plotId)
        if not plant:
            return None
        plant.happiness += rewardBonus
        await self.crud.database.commit()
        return await self.crud.getPlantByPlotId(plotId) 
    

class TaskService:
    def __init__(self, database: AsyncSession):
        self.crud = TaskCrud(database)

    async def createTask(self, plotId: UUID, newTask: TaskCreate) -> Task:
        taskData = newTask.model_dump()
        taskData["plotId"] = plotId          # inject plotId before creating
        task = Task(**taskData)
        return await self.crud.addTask(task)
    
    async def getTask(self, taskId: UUID) -> Task | None:
        task = await self.crud.getTaskById(taskId)
        if not task:
            return None
        return task
    
    async def getPlotTasks(self, plotId: UUID) -> list[Task]:
        return await self.crud.getTasksByPlotId(plotId)
    
    async def getPlotTasksByCategory(self, plotId: UUID, category: TaskCategory) -> list[Task]:
        return await self.crud.getTasksByCategory(plotId, category)
    
    async def updateTask(self, taskId: UUID, updatedTask: dict) -> Task | None:
        task = await self.crud.updateTaskData(taskId, updatedTask["title"], updatedTask["category"], updatedTask["happinessReward"])
        if not task:
            return None
        return task
    
    async def completeTask(self, taskId: UUID, plotId: UUID) -> Task | None:  # completes task + calls PlantService.applyHappinessDelta
        task = await self.crud.completeTask(taskId)
        if not task:
            return None
        
        plantService = PlantService(self.crud.database)
        await plantService.applyHappinessReward(plotId, task.happinessReward)
        return task
    
    async def deleteTask(self, taskId: UUID) -> bool:
        deleted = await self.crud.deleteTask(taskId)
        if not deleted:
            return False
        return True
    
    async def resetDailyTasks(self, plotId: UUID) -> bool: # called by scheduler at 00:00 local time
        reset = await self.crud.resetDailyTasks(plotId)
        if not reset:
            return False
        return True
    
class ScanService:
    def __init__(self, database: AsyncSession):
        self.crud = ScanCrud(database)

    async def addScan(self, newScan: ScanCreate, plotId: UUID) -> Scan:
        scanData = newScan.model_dump()
        scanData["plotId"] = plotId
        scan = Scan(**scanData)
        return await self.crud.addScan(scan)

    async def getScanById(self, scanId: UUID) -> Scan | None:
        scan = await self.crud.getScanById(scanId)
        if not scan:
            return None
        return scan

    async def getScansByPlotId(self, plotId: UUID) -> list[Scan] | None:
        scans = await self.crud.getScansByPlotId(plotId)
        if not scans:
            return None
        return scans

    async def getLatestScan(self, plotId: UUID) -> Scan | None:
        scans = await self.crud.getScansByPlotId(plotId)
        if not scans:
            return None
        latestScan = max(scans, key=lambda time: time.createdAt)
        return latestScan # used for AI context injection
    
    async def deleteScan(self, scanId: UUID) -> bool:
        deleted = await self.crud.deleteScan(scanId)
        if not deleted:
            return False
        return True

class TransactionService:
    def __init__(self, database: AsyncSession):
        self.crud = TransactionCrud(database)

    async def createTransaction(self, plotId: UUID, newTransaction: TransactionCreate) -> Transaction:
        plantService = PlantService(self.crud.database)  # need to apply happiness delta after creating transaction
        transaction = await self.crud.addTransaction(Transaction(plotId=plotId, **newTransaction.model_dump()))
        rewardBonus = 2 if transaction.type == TransactionType.INCOME else -2 # WILLEDIT
        await plantService.applyHappinessReward(plotId, rewardBonus)
        return transaction

    async def getTransactionById(self, transactionId: UUID) -> Transaction | None:
        transaction = await self.crud.getTransactionById(transactionId)
        if not transaction:
            return None
        return transaction

    async def getAllTransactionsPerPlot(self, plotId: UUID) -> list[Transaction]:
        return await self.crud.getTransactionsByPlotId(plotId)

    async def getAllTransactionsByType(self, plotId: UUID, type: TransactionType) -> list[Transaction]:
        return await self.crud.getTransactionsByType(plotId, type)

    async def getRecentTransactions(self, plotId: UUID, limit: int = 10) -> list[Transaction]:          # used for AI context injection
        return await self.crud.getRecentTransactions(plotId, limit)

    async def getNetBalance(self, plotId: UUID) -> float | None:
        transactions = await self.getAllTransactionsPerPlot(plotId)
        if not transactions:
            return None
        balance = 0
        for transaction in transactions:
            if transaction.type == TransactionType.INCOME:   
                balance += transaction.cost
            elif transaction.type == TransactionType.EXPENSE:
                balance -= transaction.cost
        return balance
    
    async def deleteTransaction(self, transactionId: UUID) -> bool:
        deleted = await self.crud.deleteTransaction(transactionId)
        if not deleted:
            return False
        return True
    
class ChatService:
    def __init__(self, database: AsyncSession):
        self.crud = ChatCrud(database)

    async def addMessage(self, newMessage: ChatMessageCreate) -> ChatMessage | None:
        messageData = newMessage.model_dump()
        message = ChatMessage(**messageData)
        if not message:
            return None
        return await self.crud.addMessage(message)

    async def getMessagesByPlotId(self, plotId: UUID) -> list[ChatMessage] | None:
        messages = await self.crud.getMessagesByPlotId(plotId)
        if not messages:
            return None
        return messages

    async def getRecentMessages(self, plotId: UUID, limit: int = 20) -> list[ChatMessage]:
        return await self.crud.getRecentMessages(plotId, limit)
    
    async def deleteMessage(self, messageId: UUID) -> bool:
        deleted = await self.crud.deleteAMessageById(messageId)
        if not deleted:
            return False
        return True
    
    async def deleteAllMessages(self, plotId: UUID) -> bool:
        deleted = await self.crud.deleteMessages(plotId)
        if not deleted:
            return False
        return True
    
    async def buildContextSnapshot(self, plotId: UUID) -> dict | None:  
        plantService = PlantService(self.crud.database)
        taskService = TaskService(self.crud.database)
        scanService = ScanService(self.crud.database)
        transactionService = TransactionService(self.crud.database)

        plant = await plantService.getPlantByPlot(plotId)
        if not plant:
            return None
        tasks = await taskService.getPlotTasks(plotId)
        if tasks is None:
            return None
        latestScan = await scanService.getLatestScan(plotId)
        if tasks is None:
            return None
        netBalance = await transactionService.getNetBalance(plotId)
        if netBalance is None:
            return None

        return {
            "plant": {"name": plant.name, "happiness": plant.happiness},
            "tasks": {
                "completed": sum(1 for t in tasks if t.isCompleted),
                "pending": sum(1 for t in tasks if not t.isCompleted)
            },
            "latestScan": {"healthScore": latestScan.healthScore, "anomalies": latestScan.anomalies} if latestScan else None,
            "netBalance": netBalance
        }
    
    # async def sendMessage(self, plotId: UUID, newMessage: ChatMessageCreate) -> ChatMessage:
    #     # 1. Save user message
    #     # 2. Build context snapshot from all other services
    #     # 3. Fetch recent conversation history for multi-turn memory
    #     # 4. Call Claude/AI with context + history
    #     # 5. Save AI response
    #     # 6. Apply happiness reward for chat engagement (~60% chance, +2 to +8) per spec


class WeatherService:
    def __init__(self, database: AsyncSession):
        self.crud = ChatCrud(database)

    async def getCurrentWeather(self, location: str) -> dict | None:
        # Placeholder implementation - in real life, would call external API
        dummyWeather = {
            "location": location,
            "temperature": 22,
            "condition": "Partly Cloudy"
        }
        return dummyWeather
    
    async def mapCondition(self, rawCondition: str) -> str:
        mapping = {
            "Clear": "sun",
            "Clouds": "cloud",
            "Rain": "cloud-rain",
            "Drizzle": "cloud-drizzle",
            "Thunderstorm": "cloud-lightning",
            "Snow": "cloud-snow",
            "Wind": "wind"
        }
        return mapping.get(rawCondition, "cloud")   # default to "cloud" if unknown
    
    def cache_weather(self, ttl_seconds=900):
        self.cache = {}
        
        @wraps
        def decorator(func):
            async def wrapper(self, location: str):
                cache = self.cache
                if location in cache:
                    cached, cached_at = cache[location]
                    if (datetime.now() - cached_at).total_seconds() < ttl_seconds:
                        return cached
                
                result = await func(self, location)
                cache[location] = (result, datetime.now())
                return result
            return wrapper
        return decorator

    async def getWeather(self, location: str) -> WeatherResponse | None:
        if location in self.cache:
            cached, cachedAt = self.cache[location]
            if (datetime.now() - cachedAt).total_seconds() < 900:   # 15 min TTL
                return cached
    
    
