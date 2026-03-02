from fastapi import Depends, FastAPI, HTTPException
from pydantic import EmailStr
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from database import getDatabase
from schemas1 import UUID, UserResponse, UserCreate, UserUpdate, PlotResponse, PlotCreate, PlotUpdate, PlantResponse, PlantCreate, PlantUpdate, TaskUpdate, TaskCreate, TaskResponse
from models1 import TaskCategory
from services import UserService, PlotService, PlantService, TaskService

app = FastAPI()

# GET USER
@app.get("/users/{userEmail}", response_model=UserResponse)
async def get_user(userEmail: EmailStr, database: AsyncSession = Depends(getDatabase)):
    """Retrieve a single user by email."""
    service = UserService(database)
    user = await service.searchUserbyEmail(userEmail)
    if user == False:
        raise HTTPException(404,"user not found")
    return user

# GET ALL USERS
@app.get("/users/", response_model=list[UserResponse])
async def get_all_users(database: AsyncSession = Depends(getDatabase)):
    """Retrieve all users."""
    service = UserService(database)
    users = await service.getAllUsers()
    if not users:
        raise HTTPException(404,"users not found")
    return users

# CREATE USER
@app.post("/users/")
async def create_user(newUser: UserCreate, database: AsyncSession = Depends(getDatabase)):
    """Create a new user."""
    service = UserService(database)
    user = await service.searchUserbyEmail(newUser.email)
    if user:
        raise HTTPException(409, "Email already registered!")
    return await service.createUser(newUser)

# UPDATE USER
@app.patch("/users/{userEmail}")
async def update_user(userEmail: str, updatedUser: UserUpdate, database: AsyncSession = Depends(getDatabase)):
    """Update an existing user's information."""
    service = UserService(database)
    user = await service.updateUser(userEmail, updatedUser.model_dump(exclude_unset=True))
    if not user:
        raise HTTPException(404,"User does not exist.")
    return user

# DELETE USER
@app.delete("/users/{userEmail}")
async def delete_user(userEmail: EmailStr, database: AsyncSession = Depends(getDatabase)):
    """Delete a user by email."""
    service = UserService(database)
    user = await service.deleteUser(userEmail)
    if not user:
        raise HTTPException(404,"User does not exist.")
    return 

# GET PLOT
@app.get("/users/{userId}/plots/{plotId}", response_model=PlotResponse)
async def get_plot(userId: UUID, plotId: UUID, database: AsyncSession = Depends(getDatabase)):
    """Retrieve a specific plot belonging to a user."""
    userservice = UserService(database)
    plotservice = PlotService(database)
    user = await userservice.searchUserById(userId)
    if not user:
        raise HTTPException(404, "User does not exist.")
    plot = await plotservice.getPlot(plotId)
    if not plot: 
        raise HTTPException(404, "Plot does not exist.")
    return plot

# GET ALL USER PLOTS
@app.get("/users/{userId}/plots/", response_model=list[PlotResponse])
async def get_all_user_plots(userId: UUID, database: AsyncSession = Depends(getDatabase)):
    """Retrieve all plots for a specific user."""
    userservice = UserService(database)
    plotservice = PlotService(database)
    user = await userservice.searchUserById(userId)
    if not user:
        raise HTTPException(404, "User does not exist.")
    plots = await plotservice.getUserPlots(userId)
    if not plots:
        raise HTTPException(404, "Plots do not exist.")
    return plots

# CREATE PLOT
@app.post("/users/{userId}/plots/", response_model=PlotResponse)
async def create_plot(userId: UUID, newPlot: PlotCreate, database: AsyncSession = Depends(getDatabase)):
    """Create a new plot for a user."""
    service = PlotService(database)
    return await service.createPlot(userId, newPlot)

# UPDATE PLOT
@app.patch("/users/{userId}/plots/{plotId}", response_model=PlotResponse)
async def update_plot(userId: UUID, plotId: UUID, updatedPlot: PlotUpdate, database: AsyncSession = Depends(getDatabase)):
    """Update details of an existing plot."""
    userservice = UserService(database)
    plotservice = PlotService(database)
    user = await userservice.searchUserById(userId)
    if not user:
        raise HTTPException(404, "User does not exist.")
    plot = await plotservice.updatePlot(plotId, updatedPlot.model_dump(exclude_unset=True))
    if not plot:
        raise HTTPException(404, "Plot does not exist.")
    return plot

# DELETE PLOT
@app.delete("/users/{userId}/plots/{plotId}", response_model=PlotResponse)
async def delete_plot(userId: UUID, plotId: UUID, database: AsyncSession = Depends(getDatabase)):
    """Remove a plot belonging to a user."""
    userservice = UserService(database)
    plotservice = PlotService(database)
    user = await userservice.searchUserById(userId)
    if not user:
        raise HTTPException(404, "User does not exist.")
    plot = await plotservice.deletePlot(plotId)
    if not plot:
        raise HTTPException(404, "Plot does not exist.")
    return plot

# GET PLANT
@app.get("/users/{userId}/plots/{plotId}/plants/{plantId}")
async def get_plant(userId: UUID, plotId: UUID, plantId: UUID, database: AsyncSession = Depends(getDatabase)):
    """Retrieve a specific plant belonging to a plot."""
    userservice = UserService(database)
    plotservice = PlotService(database)
    plantservice = PlantService(database)
    user = await userservice.searchUserById(userId)
    if not user:
        raise HTTPException(404, "User does not exist.")
    plot = await plotservice.getPlot(plotId)
    if not plot: 
        raise HTTPException(404, "Plot does not exist.")
    plant = await plantservice.getPlantById(plantId)
    if not plant:
        raise HTTPException(404, "Plant does not exist.")
    return plant

@app.post("/users/{userId}/plots/{plotId}/plant/", response_model=PlantResponse)
async def create_plant(userId: UUID, plotId: UUID, newPlant: PlantCreate, database: AsyncSession = Depends(getDatabase)):
    """Create a new plant for a plot."""
    userservice = UserService(database)
    plotservice = PlotService(database)
    plantservice = PlantService(database)
    user = await userservice.searchUserById(userId)
    if not user:
        raise HTTPException(404, "User does not exist.")
    plot = await plotservice.getPlot(plotId)
    if not plot: 
        raise HTTPException(404, "Plot does not exist.")
    plant = await plantservice.createPlant(plotId, newPlant)
    if not plant:
        raise HTTPException(409, "Plot already has a plant!")
    return plant

@app.patch("/users/{userId}/plots/{plotId}/plant/", response_model=PlantResponse)
async def update_plant(userId: UUID, plotId: UUID, updatedPlant: PlantUpdate, database: AsyncSession = Depends(getDatabase)):
    """Update details of an existing plant."""
    userservice = UserService(database)
    plotservice = PlotService(database)
    plantservice = PlantService(database)
    user = await userservice.searchUserById(userId)
    if not user:
        raise HTTPException(404, "User does not exist.")
    plot = await plotservice.getPlot(plotId)
    if not plot: 
        raise HTTPException(404, "Plot does not exist.")
    plant = await plantservice.updatePlant(plotId, updatedPlant.model_dump(exclude_unset=True))
    if not plant:
        raise HTTPException(404, "Plant does not exist.")
    return plant

@app.post("/users/{userId}/plots/{plotId}/tasks/", response_model=TaskResponse)
async def create_task(userId: UUID, plotId: UUID, newTask: TaskCreate, database: AsyncSession = Depends(getDatabase)):
    """Create a new task for a plot."""
    userservice = UserService(database)
    plotservice = PlotService(database)
    taskservice = TaskService(database)
    user = await userservice.searchUserById(userId)
    if not user:
        raise HTTPException(404, "User does not exist.")
    plot = await plotservice.getPlot(plotId)
    if not plot: 
        raise HTTPException(404, "Plot does not exist.")
    task = await taskservice.createTask(plotId, newTask)
    if not task:
        raise HTTPException(409, "Failed to create task.")
    return task

@app.get("/users/{userId}/plots/{plotId}/tasks/", response_model=list[TaskResponse])
async def get_all_tasks(userId: UUID, plotId: UUID, database: AsyncSession = Depends(getDatabase)):
    """Retrieve all tasks for a specific plot."""
    userservice = UserService(database)
    plotservice = PlotService(database)
    taskservice = TaskService(database)
    user = await userservice.searchUserById(userId)
    if not user:
        raise HTTPException(404, "User does not exist.")
    plot = await plotservice.getPlot(plotId)
    if not plot: 
        raise HTTPException(404, "Plot does not exist.")
    tasks = await taskservice.getPlotTasks(plotId)
    if not tasks:
        raise HTTPException(404, "Tasks do not exist.")
    return tasks


@app.get("/users/{userId}/plots/{plotId}/tasks/{taskId}", response_model=TaskResponse)
async def get_task(userId: UUID, plotId: UUID, taskId: UUID, database: AsyncSession = Depends(getDatabase)):
    """Get a specific task by ID."""
    userservice = UserService(database)
    plotservice = PlotService(database)
    taskservice = TaskService(database)
    user = await userservice.searchUserById(userId)
    if not user:
        raise HTTPException(404, "User does not exist.")
    plot = await plotservice.getPlot(plotId)
    if not plot: 
        raise HTTPException(404, "Plot does not exist.")
    task = await taskservice.getTask(taskId)
    if not task:
        raise HTTPException(404, "Task does not exist.")
    return task

@app.get("/users/{userId}/plots/{plotId}/tasks/category/{category}", response_model=list[TaskResponse])
async def get_tasks_by_Category(userId: UUID, plotId: UUID, category: TaskCategory, database: AsyncSession = Depends(getDatabase)):
    """Get tasks by category."""
    userservice = UserService(database)
    plotservice = PlotService(database)
    taskservice = TaskService(database)
    user = await userservice.searchUserById(userId)
    if not user:
        raise HTTPException(404, "User does not exist.")
    plot = await plotservice.getPlot(plotId)
    if not plot: 
        raise HTTPException(404, "Plot does not exist.")
    tasks = await taskservice.getPlotTasksByCategory(plotId, category)
    if not tasks:
        raise HTTPException(404, "Tasks do not exist.")
    return tasks

@app.patch("/users/{userId}/plots/{plotId}/tasks/{taskId}", response_model=TaskResponse)
async def update_task(userId: UUID, plotId: UUID, taskId: UUID, updatedTask: TaskUpdate, database: AsyncSession = Depends(getDatabase)):
    """Update a specific task by ID."""
    userservice = UserService(database)
    plotservice = PlotService(database)
    taskservice = TaskService(database)
    user = await userservice.searchUserById(userId)
    if not user:
        raise HTTPException(404, "User does not exist.")
    plot = await plotservice.getPlot(plotId)
    if not plot: 
        raise HTTPException(404, "Plot does not exist.")
    task = await taskservice.updateTask(taskId, updatedTask.model_dump(exclude_unset=True))
    if not task:
        raise HTTPException(404, "Task does not exist.")
    return task

@app.patch("/users/{userId}/plots/{plotId}/tasks/{taskId}/complete", response_model=TaskResponse)
async def complete_task(userId: UUID, plotId: UUID, taskId: UUID, database: AsyncSession = Depends(getDatabase)):
    """Complete a specific task by ID."""
    userservice = UserService(database)
    plotservice = PlotService(database)
    taskservice = TaskService(database)
    user = await userservice.searchUserById(userId)
    if not user:
        raise HTTPException(404, "User does not exist.")
    plot = await plotservice.getPlot(plotId)
    if not plot: 
        raise HTTPException(404, "Plot does not exist.")
    task = await taskservice.completeTask(taskId, plotId)
    if not task:
        raise HTTPException(404, "Task does not exist.")
    return task

@app.delete("/users/{userId}/plots/{plotId}/tasks/{taskId}")
async def delete_task(userId: UUID, plotId: UUID, taskId: UUID, database: AsyncSession = Depends(getDatabase)):
    """Delete a specific task by ID."""
    userservice = UserService(database)
    plotservice = PlotService(database)
    taskservice = TaskService(database)
    user = await userservice.searchUserById(userId)
    if not user:
        raise HTTPException(404, "User does not exist.")
    plot = await plotservice.getPlot(plotId)
    if not plot: 
        raise HTTPException(404, "Plot does not exist.")
    deleted = await taskservice.deleteTask(taskId)
    if not deleted:
        raise HTTPException(404, "Task does not exist.")
