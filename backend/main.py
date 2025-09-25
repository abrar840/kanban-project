from fastapi import FastAPI
from db.database import engine, Base
from routers import auth



#create database tables 

Base.metadata.create_all(bind=engine)

app = FastAPI (title="kanban app Api")

#reGistyer routers 
app.include_router(auth.router, prefix="/auth" , tags=["Auth"])

@app.get("/")
def root():
    return {'message:':"Api is runnin"}