"""
    This is file contains all of the CRUD operations to be used by the service layer
    to access and process the data in the database.     
"""

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_, func
from schemas1 import UUID
from models1 import ChatMessage, Task, TaskCategory, User, Plot, Plant, Scan, Transaction, TransactionType, ChatMessage, MessageRole

class UserCrud:
    def __init__(self, database : AsyncSession):
        self.database = database

    async def getUserByEmail(self, userEmail:str) -> User | None:
        user = await self.database.execute(select(User).where((User.email == userEmail)&(or_(User.isDeleted.is_(False), User.isDeleted.is_(None)))))
        return user.scalar_one_or_none()
    
    async def getUserById(self, userId):
        user = await self.database.execute(select(User).where((User.id == userId)&(or_(User.isDeleted.is_(False), User.isDeleted.is_(None)))))
        return user.scalar_one_or_none()

    async def getAllUsers(self):
        users = await self.database.execute(select(User).where(or_(User.isDeleted.is_(False), User.isDeleted.is_(None))))
        return users.scalars().all()

    async def addUser(self, newUser: User) -> User:
        self.database.add(newUser)
        await self.database.commit()
        await self.database.refresh(newUser)
        return newUser
    
    async def updateUserData(self, userEmail: str, newName: str|None, newLocation: str|None):
        user = await self.getUserByEmail(userEmail)
        if not user:
            return False
        if newLocation:
            user.location = newLocation
        if newName:
            user.name = newName
        user.updatedAt = func.now()
        await self.database.commit()
        return user

    async def softDeleteUser(self, userEmail: str):
        user = await self.getUserByEmail(userEmail)
        if not user:
            return False
        user.isDeleted=True
        await self.database.commit()
        return user

class PlotCrud:
    def __init__(self, database : AsyncSession):
        self.database = database

    async def getAllUserPlots(self, userId: UUID):
        users = await self.database.execute(select(Plot).where((Plot.userId==userId)&or_(Plot.isDeleted.is_(False), Plot.isDeleted.is_(None))))
        return users.scalars().all()

    async def getPlotById(self, plotId: UUID) -> Plot | None:
        plot = await self.database.execute(select(Plot).where(Plot.id==plotId))
        return plot.scalar_one_or_none()

    async def addPlot(self, newPlot: Plot) -> Plot:
        self.database.add(newPlot)
        await self.database.commit()
        await self.database.refresh(newPlot)
        return newPlot

    async def updatePlotData(self, plotId: UUID, name: str | None, newCropType: str | None, newSizeArea: float | None, newStatus: bool | None):
        plot = await self.getPlotById(plotId)
        if not plot:
            return False
        if newCropType:
            plot.cropType = newCropType
        if newSizeArea:
            plot.sizeArea = newSizeArea
        if newStatus:
            plot.isActive = newStatus
        plot.updatedAt=func.now()
        await self.database.commit()
        return plot
        
    async def softDeletePlot(self, plotId: UUID):          # sets isActive=False
        plot = await self.getPlotById(plotId)
        if not plot:
            return False
        plot.isDeleted = True
        await self.database.commit()
        return plot        
    
class PlantCrud:
    def __init__(self, database : AsyncSession):
        self.database = database

    async def getPlantByPlotId(self, plotId: UUID) -> Plant | None: 
        plant = await self.database.execute(select(Plant).where((Plant.plotId==plotId)&(or_(Plant.isDeleted.is_(False), Plant.isDeleted.is_(None)))))
        return plant.scalar_one_or_none()
    
    async def getPlantById(self, plantId: UUID) -> Plant | None: 
        plant = await self.database.execute(select(Plant).where(Plant.id==plantId))
        return plant.scalar_one_or_none()
    
    async def addPlant(self, newPlant: Plant) -> Plant: 
        self.database.add(newPlant)
        await self.database.commit()
        await self.database.refresh(newPlant)
        return newPlant
    
    async def updatePlantData(self, plotId: UUID, name: str | None, plantImage: str | None) -> Plant | None: 
        plant = await self.getPlantByPlotId(plotId)
        if not plant:
            return None
        if name:
            plant.name = name
        if plantImage:
            plant.plantImage = plantImage
        plant.updatedAt = func.now()
        await self.database.commit()
        return plant
    
    async def updateHappiness(self, plotId: UUID, rewardBonus: int) -> Plant | None:    
        plant = await self.getPlantByPlotId(plotId)
        if not plant:
            return None
        plant.happiness = max(0, min(100, plant.happiness + rewardBonus))
        await self.database.commit()
        return plant
    
    async def setHappiness(self, plotId: UUID, value: int) -> Plant | None:      
        plant = await self.getPlantByPlotId(plotId)
        if not plant:
            return None
        plant.happiness = max(0, min(100, value))
        await self.database.commit()
        return plant

class TaskCrud:
    def __init__(self, database : AsyncSession):
        self.database = database

    async def addTask(self, newTask: Task) -> Task:
        self.database.add(newTask)
        await self.database.commit()
        await self.database.refresh(newTask)
        return newTask
    
    async def getTaskById(self, taskId: UUID) -> Task | None:
        task = await self.database.execute(select(Task).where(Task.id==taskId))
        return task.scalar_one_or_none()
    
    async def getTasksByPlotId(self, plotId: UUID) -> list[Task]:
        tasks = await self.database.execute(select(Task).where(Task.plotId==plotId))
        return list(tasks.scalars().all())
    
    async def getTasksByCategory(self, plotId: UUID, category: TaskCategory) -> list[Task]:
        tasks = await self.database.execute(select(Task).where((Task.plotId==plotId)&(Task.category==category)))
        return list(tasks.scalars().all())
    
    async def updateTaskData(self, taskId: UUID, title: str | None, category: TaskCategory | None, happinessReward: int | None) -> Task | None:
        task = await self.getTaskById(taskId)
        if not task:
            return None
        if title:
            task.title = title
        if category:
            task.category = category
        if happinessReward is not None:
            task.happinessReward = happinessReward
        task.updatedAt = func.now()
        await self.database.commit()
        return task
    
    async def completeTask(self, taskId: UUID) -> Task | None:       # sets isCompleted=True, lastCompletedAt=now()
        task = await self.getTaskById(taskId)
        if not task:
            return None
        task.isCompleted = True
        task.lastCompletedAt = func.now()
        await self.database.commit()
        return task
    
    async def resetTask(self, taskId: UUID) -> Task | None:          # sets isCompleted=False
        task = await self.getTaskById(taskId)
        if not task:
            return None
        task.isCompleted = False
        await self.database.commit()
        return task
    
    async def resetDailyTasks(self, plotId: UUID) -> bool: 
        tasks = await self.getTasksByPlotId(plotId)
        if not tasks:
            return False
        for task in tasks:
            if task.category == TaskCategory.DAILY:
                await self.resetTask(UUID(str(task.id)))
        return True

    async def resetWeeklyTasks(self, plotId: UUID) -> bool: 
        tasks = await self.getTasksByPlotId(plotId)
        if not tasks:
            return False
        for task in tasks:
            if task.category == TaskCategory.WEEKLY:
                await self.resetTask(UUID(str(task.id)))
        return True
        
    async def deleteTask(self, taskId: UUID) -> bool:
        task = await self.getTaskById(taskId)
        if not task:
            return False
        await self.database.delete(task)
        await self.database.commit()
        return True
    
class ScanCrud:
    def __init__(self, database : AsyncSession):
        self.database = database

    async def addScan(self, newScan: Scan) -> Scan:
        self.database.add(newScan)
        await self.database.commit()
        await self.database.refresh(newScan)
        return newScan

    async def getScanById(self, scanId: UUID) -> Scan | None:
        scan = await self.database.execute(select(Scan).where(Scan.id==scanId))
        return scan.scalar_one_or_none()

    async def getScansByPlotId(self, plotId: UUID) -> list[Scan]:
        scans = await self.database.execute(select(Scan).where(Scan.plotId==plotId))
        return list(scans.scalars().all())

    async def getLatestScan(self, plotId: UUID) -> Scan | None:       # used for AI context injection
        scans = await self.getScansByPlotId(plotId)
        if not scans:
            return None
        return sorted(scans, key=lambda s: s.createdAt)[-1]

    async def deleteScan(self, scanId: UUID) -> bool:
        scan = await self.getScanById(scanId)
        if not scan:
            return False
        await self.database.delete(scan)
        await self.database.commit()
        return True
    
class TransactionCrud:
    def __init__(self, database : AsyncSession):
        self.database = database

    async def addTransaction(self, newTransaction: Transaction) -> Transaction:
        self.database.add(newTransaction)
        await self.database.commit()
        await self.database.refresh(newTransaction)
        return newTransaction

    async def getTransactionById(self, transactionId: UUID) -> Transaction | None:
        transaction = await self.database.execute(select(Transaction).where(Transaction.id==transactionId))
        return transaction.scalar_one_or_none()
    
    async def getTransactionsByPlotId(self, plotId: UUID) -> list[Transaction]:
        transactions = await self.database.execute(select(Transaction).where(Transaction.plotId==plotId))
        return list(transactions.scalars().all())
    
    async def getTransactionsByType(self, plotId: UUID, type: TransactionType) -> list[Transaction]:
        transactions = await self.database.execute(select(Transaction).where((Transaction.plotId==plotId)&(Transaction.type==type)))
        return list(transactions.scalars().all())   
    
    async def getRecentTransactions(self, plotId: UUID, limit: int = 10) -> list[Transaction]:  # used for AI context injection
        transactions = await self.database.execute(select(Transaction).where(Transaction.plotId==plotId).order_by(Transaction.createdAt.desc()).limit(limit))
        return list(transactions.scalars().all())
    
    async def deleteTransaction(self, transactionId: UUID) -> bool:
        transaction = await self.getTransactionById(transactionId)
        if not transaction:
            return False
        await self.database.delete(transaction)
        await self.database.commit()
        return True
    
class ChatCrud:
    def __init__(self, database : AsyncSession):
        self.database = database
    
    async def addMessage(self, newMessage: ChatMessage) -> ChatMessage:
        self.database.add(newMessage)
        await self.database.commit()
        await self.database.refresh(newMessage)
        return newMessage

    async def getMessagesByPlotId(self, plotId: UUID) -> list[ChatMessage]:
        messages = await self.database.execute(select(ChatMessage).where(ChatMessage.plotId==plotId))
        return list(messages.scalars().all())

    async def getRecentMessages(self, plotId: UUID, limit: int = 20) -> list[ChatMessage]:  # used for conversation history
        messages = await self.database.execute(select(ChatMessage).where(ChatMessage.plotId==plotId).order_by(ChatMessage.createdAt.desc()).limit(limit))
        return list(messages.scalars().all())
    
    async def getMessageById(self, messageId: UUID) -> ChatMessage | None:
        message = await self.database.execute(select(ChatMessage).where(ChatMessage.id==messageId))
        return message.scalar_one_or_none()

    async def deleteAMessageById(self, messageId: UUID) -> bool:     # sets content to empty string, role to "system"
        message = await self.getMessageById(messageId)
        if not message:
            return False
        await self.database.delete(message)
        await self.database.commit()
        return True

    async def deleteMessages(self, plotId: UUID) -> bool:
        messages = await self.getMessagesByPlotId(plotId)
        for message in messages:
            await self.database.delete(message)
        await self.database.commit()
        return True

