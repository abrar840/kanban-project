from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    email: EmailStr
    full_name: str | None = None

class UserCreate(UserBase):
    password: str
    user_id: int | None = None

class UserResponse(UserBase):
    id: int

    class Config:
        orm_mode = True   
class UserLogin(BaseModel):
    email: EmailStr
    password: str
