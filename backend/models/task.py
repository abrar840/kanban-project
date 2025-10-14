from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from db.database import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(String(255), nullable=True)
    column_id = Column(Integer, ForeignKey("columns.id"), nullable=False, index=True)
    position = Column(Integer, nullable=True, index=True)
    board_id = Column(Integer, ForeignKey("boards.id"), nullable=False, index=True)
    user_id =Column(Integer,ForeignKey("users.id"), nullable=True, index=True)
    
    column = relationship("BoardColumn", back_populates="tasks")
    user = relationship("User", back_populates="tasks")
