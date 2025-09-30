from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    email:EmailStr
    full_name:str | None = None
    
    
class UserCreate(UserBase):
    password:str
    
class UserResponse(UserBase):
    id:int
    
class UserLogin(BaseModel):
    email: EmailStr
    password: str
    
class Config:
    orm_mode = True