from pydantic import BaseModel


class TaskCreate(BaseModel):
    title:str
    description:str
    column_id:int
    position:int
    user_id:int

class TaskResponse(TaskCreate):
    id:int
    


class GetTask(BaseModel):
    id:int
    user_id:int

class UpdateTask(BaseModel):
    title:str
    descriptiom:str
    position:int
    user_id:int

