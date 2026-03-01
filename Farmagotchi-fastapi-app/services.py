"""
    This file contains the business logic and the error/exception handling 
    """


from sqlalchemy.ext.asyncio import AsyncSession
from schemas import UserResponse
from crud import UserCrud

class UserService:
    
    def __init__(self, database: AsyncSession):
        self.crud = UserCrud(database)

    async def searchUser(self, userEmail: str):
        user = await self.crud.searchbyEmail(userEmail)
        if not user:
            raise ValueError("Sorry, user not found.")
        return user 