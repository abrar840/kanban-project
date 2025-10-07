from pydantic import BaseModel
from typing import Optional


class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    position:  Optional[int] = None


class TaskCreate(TaskBase):
    column_id: int
    board_id: int


class TaskResponse(TaskBase):
    id: int
    column_id: int
    board_id: int

    class Config:
        orm_mode = True


class UpdateTask(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    position: Optional[int] = None
