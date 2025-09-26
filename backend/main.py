from fastapi import FastAPI
from db.database import engine, Base
from routers import auth
from fastapi.middleware.cors import CORSMiddleware



#create database tables 

Base.metadata.create_all(bind=engine)

app = FastAPI (title="kanban app Api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#reGistyer routers 
app.include_router(auth.router, prefix="/auth" , tags=["Auth"])

@app.get("/")
def root():
    return {'message:':"Api is runnin"}