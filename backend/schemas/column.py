from pydantic import BaseModel
from typing import Optional


class ColumnBase(BaseModel):
    title: str
    position: int


class ColumnCreate(ColumnBase):
    board_id: int


class ColumnResponse(ColumnBase):
    id: int
    board_id: int

    class Config:
        orm_mode = True


class UpdateColumn(BaseModel):
    title: Optional[str] = None
    position: Optional[int] = None
