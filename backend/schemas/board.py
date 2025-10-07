from pydantic import BaseModel
from typing import List, Optional


class BoardBase(BaseModel):
    name: str
   


class BoardCreate(BoardBase):
   total_cols: int


class Response(BoardBase):
    id: int

    class Config:
        orm_mode = True  # Important for SQLAlchemy models


class GetBoard(BaseModel):
    id: int


class UpdateBoard(BaseModel):
    id: int  # <-- You should include id here for update to know which board
    name: str | None = None
    total_cols: int | None = None


class TaskOut(BaseModel):
    id: int
    title: str
    description: Optional[str]
    position: int
    board_id: int
    column_id: int

    class Config:
        orm_mode = True


class BoardColumnOut(BaseModel):
    id: int
    title: str
    board_id: int
    tasks: List[TaskOut] = []
    position: int

    class Config:
        orm_mode = True


class BoardDetailResponse(BaseModel):
    id: int
    name: str
    total_cols: Optional[int]
    user_id: int
    columns: List[BoardColumnOut] = []

    class Config:
        orm_mode = True
