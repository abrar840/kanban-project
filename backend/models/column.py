from sqlalchemy import Column,String,Integer
from db.database import Base
from sqlalchemy.orm import relationship


class Column(Base):
    __tablename__="columns"

    id = Column(Integer, index=True, primary_key=True, nullable=False)
    title = Column(String(255), nullable=False)
    board_id = Column(Integer, nullable=False, index=True)
    position = Column(Integer,nullable=False,index=True)
    
    column = relationship("Board", back_populates="columns")
    tasks = relationship("Task", back_populates="column", cascade="all, delete-orphan")
