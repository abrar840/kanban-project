from pydantic import BaseModel


class ColumnCreate(BaseModel):
    title:str
    board_id:int
    position:int

class ColumnResponse(ColumnCreate):
    id:int

class GetBoard(BaseModel):
    board_id:int

class UpdateColumn(BaseModel):
    title:str
    position:int
