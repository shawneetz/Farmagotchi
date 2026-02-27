from pydantic import BaseModel, Field, EmailStr
from uuid import UUID
from datetime import datetime
from decimal import Decimal

class RoleResponse(BaseModel):
    id: UUID
    name: str
    description: str | None

    class Config:
        from_attributes = True