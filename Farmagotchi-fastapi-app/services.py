"""
    This file contains the business logic and the error/exception handling 
    """


from sqlalchemy.ext.asyncio import AsyncSession
from schemas1 import UUID, UserCreate, PlotCreate, PlantCreate, TaskCreate
from models1 import User, Plot, Plant, Task, TaskCategory
from crud import UserCrud, PlotCrud, PlantCrud, TaskCrud

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