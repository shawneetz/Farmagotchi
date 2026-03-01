from fastapi import Depends, FastAPI
from pydantic import EmailStr
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from sqlalchemy import select

from database import getDatabase
from schemas import UserResponse
from models import User
from services import UserService

app = FastAPI()

@app.get("/users/", response_model=UserResponse)
async def searchUser(userEmail: EmailStr, database: AsyncSession = Depends(getDatabase)):
    service = UserService(database)
    user = await service.searchUser(userEmail)
    return user