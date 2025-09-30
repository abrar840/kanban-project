from pydantic import BaseModel


class BoardBase(BaseModel):
    name: str
    total_cols: int


class BoardCreate(BoardBase):
    user_id: int


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
