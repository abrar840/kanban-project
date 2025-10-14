from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Connection string
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:password@localhost:3306/kanban_db"

 
engine = create_engine(SQLALCHEMY_DATABASE_URL)

 
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for ORM models
Base = declarative_base()

# Dependency for FastAPI routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
