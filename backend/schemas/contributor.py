from pydantic import BaseModel
from typing import Optional




class ContributorBase(BaseModel):
    contributor_email: str
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
    contributor_email: Optional[str] = None
    board_id: Optional[int] = None

class allResponse(BaseModel):
    id: int
    email: str
    name: Optional[str] = None
    role: Optional[str] = "admin"

    class Config:
        orm_mode = True