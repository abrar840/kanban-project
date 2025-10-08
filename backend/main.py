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

origins = [
    "http://localhost:5173",  # React app URL during development
    "http://127.0.0.1:5173",  # in case you use this version
    # Add your production frontend URL here when deploying
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # ✅ use specific origins, not "*"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# register routers 
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(create_board.router, prefix="", tags=["Board"])
app.include_router(column.router, prefix="", tags=["Column"])
app.include_router(task.router, prefix="", tags=["Task"])
app.include_router(contributor.router, prefix="", tags=["Contributor"])

@app.get("/")
def root():
    return {'message': "Api is runnin"}
