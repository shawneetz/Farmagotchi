"""
    This is file contains all of the CRUD operations to be used by the service layer
    to access and process the data in the database.     
"""

from sqlalchemy.ext.asyncio import AsyncConnection
from sqlalchemy import select
from database import getDatabase
from models import User


class UserCrud:
    def __init__(self, database : AsyncConnection):
        self.database = database

    async def searchbyEmail(self, userEmail:str):
        user = await self.database.execute(select(User).where(User.email == userEmail))
        return user.scalar_one_or_none()