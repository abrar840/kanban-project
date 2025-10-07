from fastapi import FastAPI
from db.database import engine, Base
from routers import auth
from routers import create_board
from routers import column
from routers import task
from routers import contributor
from fastapi.middleware.cors import CORSMiddleware

# create database tables 
Base.metadata.create_all(bind=engine)

app = FastAPI(title="kanban app Api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# register routers 
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(create_board.router, prefix="/create", tags=["Board"])
app.include_router(column.router, prefix="/create", tags=["Column"])
app.include_router(task.router, prefix="/create", tags=["Task"])
app.include_router(contributor.router, prefix="/contributor", tags=["Contributor"])

@app.get("/")
def root():
    return {'message': "Api is runnin"}
