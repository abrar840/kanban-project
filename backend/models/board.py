from sqlalchemy import Column , Integer,String
from db.database import Base


class Board(Base):
    __tablename__ = "boards"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255),index=True, nullable=False)
    total_cols=Column(Integer,nullable=True)
    user_id = Column(Integer,nullable=False,index=True)
