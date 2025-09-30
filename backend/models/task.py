from sqlalchemy import Column, Integer, String, ForeignKey
from db.database import Base


class Task(Base):
    __tablename__="tasks"
    id = Column(Integer, index=True, index=True, primary_key=True, nullable=False)
    title = Column(String(255), nulllable=False)
    description = Column(String(255), nullable=True)
    column_id = Column(Integer, ForeignKey("columns.id"), nullable=False, index=True)
    position = Column(Integer, nullable=False, index=True)
    board_id = Column(Integer, nullable=False, index=True)
    
    column = relationship("Column", back_populates="tasks")