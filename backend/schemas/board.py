from pydantic import BaseModel


class BoardBase(BaseModel):
    name:str
 
    total_cols:int

class BoardCreate(BoardBase):   
       user_id:int 

class Response(BoardBase):
    id:int

class GetBoard(BaseModel):
     id:int

class UpdateBoard(BaseModel):
    name:str
    total_cols:int
    

