

from fastapi import FastAPI
from contextlib import asynccontextmanager
from sqlalchemy.orm import Session
from database import Base, engine, getDatabase
from models import Roles  # ORM model
from schemas import RoleResponse
from typing import List
from sqlalchemy import select

def createDatabaseAndTables(app:FastAPI):
    Base.metadata.create_all(engine)

@asynccontextmanager
async def lifespan(app:FastAPI):
    createDatabaseAndTables(app)
    yield

app = FastAPI(lifespan=lifespan)

@app.post("/roles/")
def createRole(role:RoleResponse):
    with Session(engine) as session:
        role_model = Roles(name=role.name)  # Convert schema -> model
        session.add(role_model)
        session.commit()
        session.refresh(role_model)
        return {"Added": f"New role {role_model.name}"}

@app.get("/roles/", response_model=List[RoleResponse])
def readRoles():
    with Session(engine) as session:
        roles = session.scalars(select(Roles)).all()  # Query ORM table
        return [RoleResponse.from_orm(r) for r in roles]