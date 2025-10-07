from pydantic import BaseModel
from typing import Optional




class ContributorBase(BaseModel):
    email: str
    board_id: int

class Create(ContributorBase):
    role: Optional[str] = "admin"


class Response(ContributorBase):
    id: int
    role: Optional[str] = "admin"

    class Config:
        orm_mode = True 

class UpdateContributor(BaseModel):
    role: Optional[str] = None
    email: Optional[str] = None
    board_id: Optional[int] = None
