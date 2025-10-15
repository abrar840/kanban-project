from pydantic import BaseModel
from typing import Optional


class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    position:  Optional[int] = None


class TaskCreate(TaskBase):
    column_id: int
    board_id: int
class UserOut(BaseModel):
    id: int
    email: str
    full_name: Optional[str] = None

    class Config:
        orm_mode = True

class TaskResponse(TaskBase):
    id: int
    column_id: int
    board_id: int
    user: Optional[UserOut] = None

    class Config:
        orm_mode = True


class UpdateTask(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    user_id:Optional[int] = None
    position: Optional[int] = None

 
