# from sqlalchemy.orm import Session
# from schemas import RoleResponse, UserCreate
# from crud import UserCrud

# class UserService:

#     @staticmethod
#     def createRole(database:Session, newRole: RoleResponse):
#         role = UserCrud.getUser(database,newRole)
#         if not user:
#             raise ValueError("user not found.")
#         return role