from sqlalchemy import Column , Integer,String
from db.database import Base
from sqlalchemy.orm import relationship

class Board(Base):
    __tablename__ = "boards"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255),index=True, nullable=False)
    total_cols=Column(Integer,nullable=True)
    user_id = Column(Integer,nullable=False,index=True)
    
    user = relationship("User", back_populates="boards",)

    columns = relationship("Column", back_populates="board", cascade="all, delete-orphan")