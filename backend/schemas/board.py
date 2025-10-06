from pydantic import BaseModel
from typing import Optional

 
class BoardBase(BaseModel):
    name: str
    total_cols: Optional[int] = None


 
class BoardCreate(BoardBase):
    user_id: int


 
class Response(BoardBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True   


 
class GetBoard(BaseModel):
    id: int


 
class UpdateBoard(BaseModel):
    name: Optional[str] = None
    total_cols: Optional[int] = None
