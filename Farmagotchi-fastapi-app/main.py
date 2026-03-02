from fastapi import Depends, FastAPI, HTTPException
from pydantic import EmailStr
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from database import getDatabase
from schemas1 import UUID, UserResponse, UserCreate, UserUpdate, PlotResponse, PlotCreate, PlotUpdate, PlantResponse, PlantCreate, PlantUpdate, TaskUpdate, TaskCreate, TaskResponse, ScanResponse, ScanCreate, TransactionCreate, TransactionResponse, ChatMessageResponse, ChatMessageCreate, ChatMessageCreate
from models1 import TaskCategory, TransactionType
from services import UserService, PlotService, PlantService, TaskService, ScanService, TransactionService, ChatService

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# List of origins allowed to make requests
origins = [
    "http://localhost:3000",  # For local web development (if applicable)
    "http://localhost:8081",  # React Native development server default (Android)
    "http://127.0.0.1:8081",  # React Native development server default (iOS/other)
    "https://your-react-native-app-url.onrender.com", # Replace with your deployed frontend URL on Render
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all standard methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
async def root():
    """Root endpoint to check if the API is running."""
    return {"message": "Welcome to the Farmagotchi API!"}

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

@app.post("/users/{userId}/plots/{plotId}/scans/", response_model=ScanResponse)
async def createScan(userId: UUID, plotId: UUID, newScan: ScanCreate, database: AsyncSession = Depends(getDatabase)):
    """Create a new scan for a plot."""
    userservice = UserService(database)
    plotservice = PlotService(database)
    scanservice = ScanService(database)
    user = await userservice.searchUserById(userId)
    if not user:
        raise HTTPException(404, "User does not exist.")
    plot = await plotservice.getPlot(plotId)
    if not plot: 
        raise HTTPException(404, "Plot does not exist.")
    scan = await scanservice.addScan(newScan, plotId)
    if not scan: 
        raise HTTPException(409, "Failed to create scan.")

@app.get("/users/{userId}/plots/{plotId}/scans/", response_model=list[ScanResponse])
async def get_all_scans(userId: UUID, plotId: UUID, database: AsyncSession = Depends(getDatabase)):
    """Retrieve all scans for a specific plot."""
    userservice = UserService(database)
    plotservice = PlotService(database)
    scanservice = ScanService(database)
    user = await userservice.searchUserById(userId)
    if not user:
        raise HTTPException(404, "User does not exist.")
    plot = await plotservice.getPlot(plotId)
    if not plot: 
        raise HTTPException(404, "Plot does not exist.")
    scans = await scanservice.getScansByPlotId(plotId)
    if not scans:
        raise HTTPException(404, "Scans do not exist.")
    return scans


@app.get("/users/{userId}/plots/{plotId}/scans/latest", response_model=ScanResponse)
async def get_latest_scans(userId: UUID, plotId: UUID, database: AsyncSession = Depends(getDatabase)):
    """Retrieve the latest scan for a specific plot."""
    userservice = UserService(database)
    plotservice = PlotService(database)
    scanservice = ScanService(database)
    user = await userservice.searchUserById(userId)
    if not user:
        raise HTTPException(404, "User does not exist.")
    plot = await plotservice.getPlot(plotId)
    if not plot: 
        raise HTTPException(404, "Plot does not exist.")
    latestScan = await scanservice.getLatestScan(plotId)
    if not latestScan:
        raise HTTPException(404, "Latest scan does not exist.")
    return latestScan

@app.get("/users/{userId}/plots/{plotId}/scans/{scanId}", response_model=ScanResponse)
async def get_scans(userId: UUID, plotId: UUID, scanId: UUID, database: AsyncSession = Depends(getDatabase)):
    """Retrieve a specific scan by ID."""
    userservice = UserService(database)
    plotservice = PlotService(database)
    scanservice = ScanService(database)
    user = await userservice.searchUserById(userId)
    if not user:
        raise HTTPException(404, "User does not exist.")
    plot = await plotservice.getPlot(plotId)
    if not plot: 
        raise HTTPException(404, "Plot does not exist.")
    scan = await scanservice.getScanById(scanId)
    if not scan:
        raise HTTPException(404, "Scan does not exist.")
    return scan

@app.delete("/users/{userId}/plots/{plotId}/scans/{scanId}")
async def delete_scan(userId: UUID, plotId: UUID, scanId: UUID, database: AsyncSession = Depends(getDatabase)):
    """Delete a specific scan by ID."""
    userservice = UserService(database)
    plotservice = PlotService(database)
    scanservice = ScanService(database)
    user = await userservice.searchUserById(userId)
    if not user:
        raise HTTPException(404, "User does not exist.")
    plot = await plotservice.getPlot(plotId)
    if not plot: 
        raise HTTPException(404, "Plot does not exist.")
    deleted = await scanservice.deleteScan(scanId)
    if not deleted:
        raise HTTPException(404, "Scan does not exist.")
    
@app.post("/users/{userId}/plots/{plotId}/transactions/", response_model=TransactionResponse)
async def createTransaction(userId: UUID, plotId: UUID, newTransaction: TransactionCreate, database: AsyncSession = Depends(getDatabase)):
    """Create a new transaction for a plot."""
    userservice = UserService(database)
    plotservice = PlotService(database)
    transactionservice = TransactionService(database)
    user = await userservice.searchUserById(userId)
    if not user:
        raise HTTPException(404, "User does not exist.")
    plot = await plotservice.getPlot(plotId)
    if not plot: 
        raise HTTPException(404, "Plot does not exist.")
    transaction = await transactionservice.createTransaction(plotId, newTransaction)
    if not transaction:
        raise HTTPException(409, "Failed to create transaction.")
    return transaction

@app.get("/users/{userId}/plots/{plotId}/transactions/", response_model=list[TransactionResponse])
async def getAllTransactions(userId: UUID, plotId: UUID, database: AsyncSession = Depends(getDatabase)):
    """Retrieve all transactions for a specific plot."""
    userservice = UserService(database)
    plotservice = PlotService(database)
    transactionservice = TransactionService(database)
    user = await userservice.searchUserById(userId)
    if not user:
        raise HTTPException(404, "User does not exist.")
    plot = await plotservice.getPlot(plotId)
    if not plot: 
        raise HTTPException(404, "Plot does not exist.")
    return await transactionservice.getAllTransactionsPerPlot(plotId)


@app.get("/users/{userId}/plots/{plotId}/transactions/balance", response_model=float)
async def get_net_balance(userId: UUID, plotId: UUID, database: AsyncSession = Depends(getDatabase)):
    """Retrieve the net balance for a specific plot."""
    userservice = UserService(database)
    plotservice = PlotService(database)
    transactionservice = TransactionService(database)
    user = await userservice.searchUserById(userId)
    if not user:
        raise HTTPException(404, "User does not exist.")
    plot = await plotservice.getPlot(plotId)
    if not plot: 
        raise HTTPException(404, "Plot does not exist.")
    netBalance = await transactionservice.getNetBalance(plotId)
    if netBalance is None:
        raise HTTPException(404, "Failed to calculate net balance.")
    return netBalance

@app.get("/users/{userId}/plots/{plotId}/transactions/{transactionId}", response_model=TransactionResponse)
async def get_transaction(userId: UUID, plotId: UUID, transactionId: UUID, database: AsyncSession = Depends(getDatabase)):
    """Retrieve a specific transaction by ID."""
    userservice = UserService(database)
    plotservice = PlotService(database)
    transactionservice = TransactionService(database)
    user = await userservice.searchUserById(userId)
    if not user:
        raise HTTPException(404, "User does not exist.")
    plot = await plotservice.getPlot(plotId)
    if not plot: 
        raise HTTPException(404, "Plot does not exist.")
    transaction = await transactionservice.getTransactionById(transactionId)
    if not transaction:
        raise HTTPException(404, "Transaction does not exist.")
    return transaction

@app.get("/users/{userId}/plots/{plotId}/transactions/type/{type}", response_model=list[TransactionResponse])
async def get_transactions_by_type(userId: UUID, plotId: UUID, type: TransactionType, database: AsyncSession = Depends(getDatabase)):
    """Retrieve all transactions of a specific type for a plot."""
    userservice = UserService(database)
    plotservice = PlotService(database)
    transactionservice = TransactionService(database)
    user = await userservice.searchUserById(userId)
    if not user:
        raise HTTPException(404, "User does not exist.")
    plot = await plotservice.getPlot(plotId)
    if not plot: 
        raise HTTPException(404, "Plot does not exist.")
    return await transactionservice.getAllTransactionsByType(plotId, type)

@app.delete("/users/{userId}/plots/{plotId}/transactions/{transactionId}")
async def delete_trasactions(userId: UUID, plotId: UUID, transactionId: UUID, database: AsyncSession = Depends(getDatabase)):
    """Delete a specific transaction by ID."""
    userservice = UserService(database)
    plotservice = PlotService(database)
    transactionservice = TransactionService(database)
    user = await userservice.searchUserById(userId)
    if not user:
        raise HTTPException(404, "User does not exist.")
    plot = await plotservice.getPlot(plotId)
    if not plot: 
        raise HTTPException(404, "Plot does not exist.")
    deleted = await transactionservice.deleteTransaction(transactionId)
    if not deleted:
        raise HTTPException(404, "Transaction does not exist or is already deleted.")
    return {"message": "Transaction deleted successfully"}

@app.post("/users/{userId}/plots/{plotId}/chat/", response_model=ChatMessageResponse)
async def sendMessage(userId: UUID, plotId: UUID, newMessage: ChatMessageCreate, database: AsyncSession = Depends(getDatabase)):
    """Send a new chat message for a plot."""
    userservice = UserService(database)
    plotservice = PlotService(database)
    chatservice = ChatService(database)
    user = await userservice.searchUserById(userId)
    if not user:
        raise HTTPException(404, "User does not exist.")
    plot = await plotservice.getPlot(plotId)
    if not plot: 
        raise HTTPException(404, "Plot does not exist.")
    message = await chatservice.addMessage(newMessage)
    if not message:
        raise HTTPException(409, "Failed to send message.")
    return message

@app.get("/users/{userId}/plots/{plotId}/chat/", response_model=list[ChatMessageResponse])
async def getConversationHistory(userId: UUID, plotId: UUID, database: AsyncSession = Depends(getDatabase)):
    """Retrieve the full conversation history for a plot."""
    userservice = UserService(database)
    plotservice = PlotService(database)
    chatservice = ChatService(database)
    user = await userservice.searchUserById(userId)
    if not user:
        raise HTTPException(404, "User does not exist.")
    plot = await plotservice.getPlot(plotId)
    if not plot: 
        raise HTTPException(404, "Plot does not exist.")
    messages = await chatservice.getMessagesByPlotId(plotId)
    if messages is None:
        raise HTTPException(404, "No messages found for this plot.")
    return messages

@app.delete("/users/{userId}/plots/{plotId}/chat/{messageId}")
async def delete_message(userId: UUID, plotId: UUID, messageId: UUID, database: AsyncSession = Depends(getDatabase)):
    """Delete a specific chat message by ID."""
    userservice = UserService(database)
    plotservice = PlotService(database)
    chatservice = ChatService(database)
    user = await userservice.searchUserById(userId)
    if not user:
        raise HTTPException(404, "User does not exist.")
    plot = await plotservice.getPlot(plotId)
    if not plot: 
        raise HTTPException(404, "Plot does not exist.")
    deleted = await chatservice.deleteMessage(messageId)
    if not deleted:
        raise HTTPException(404, "Message does not exist or is already deleted.")
    return {"message": "Message deleted successfully"}

@app.delete("/users/{userId}/plots/{plotId}/chat/")
async def delete_all_messages(userId: UUID, plotId: UUID, database: AsyncSession = Depends(getDatabase)):
    """Delete all chat messages for a plot."""
    userservice = UserService(database)
    plotservice = PlotService(database)
    chatservice = ChatService(database)

    user = await userservice.searchUserById(userId)
    if not user:
        raise HTTPException(404, "User does not exist.")
    plot = await plotservice.getPlot(plotId)
    if not plot: 
        raise HTTPException(404, "Plot does not exist.")
    deleted = await chatservice.deleteAllMessages(plotId)
    if not deleted:
        raise HTTPException(404, "Failed to delete messages.")
    return {"message": "All messages deleted successfully"}