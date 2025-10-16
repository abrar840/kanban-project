from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session,joinedload
from db.database import get_db
import models.task as task_model
import schemas.task as task_schema
from services.utils import get_current_user
from models.task import Task
from typing import List
from services.websocket_manager import manager
import asyncio

router = APIRouter()


@router.post("/create-task", response_model=task_schema.TaskResponse)
async def create_task(task: task_schema.TaskCreate, db: Session = Depends(get_db), user: str = Depends(get_current_user)):
    new_task = task_model.Task(
        title=task.title,
        description=task.description,
        column_id=task.column_id,
        position=task.position,
        board_id=task.board_id
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    
    await manager.broadcast_to_board(new_task.board_id,{
        "type":"task_created",
        "task": {
        "id": new_task.id,
        "title": new_task.title,
        "description": new_task.description,
        "column_id": new_task.column_id,
        "position": new_task.position
    }
    })
    return new_task


@router.get("/get-task-by-id/{task_id}", response_model=task_schema.TaskResponse)
def get_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.query(task_model.Task).options(
        
        joinedload(Task.user)
         
    ).filter(task_model.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return db_task



@router.get("/get-task-by-boardid/{board_id}", response_model=List[task_schema.TaskResponse])
def get_task(board_id: int, db: Session = Depends(get_db)):
    db_task = db.query(task_model.Task).filter(task_model.Task.board_id == board_id).all()
    if not db_task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return db_task



@router.put("/update-task/{task_id}", response_model=task_schema.TaskResponse)
async def update_task(task_id: int, task: task_schema.UpdateTask, db: Session = Depends(get_db)):
    db_task = db.query(task_model.Task).filter(task_model.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")

    if task.title is not None:
        db_task.title = task.title
    if task.description is not None:
        db_task.description = task.description
    if task.position is not None:
        db_task.position = task.position
  
    if hasattr(task, "user_id"):
        db_task.user_id = task.user_id  


    db.commit()
    db.refresh(db_task)

    await manager.broadcast_to_board(db_task.board_id,{
        "type":"task_updated",
        "task": {
        "id": db_task.id,
        "title": db_task.title,
        "position": db_task.position,
        "column_id":db_task.column_id
    }
    })

    return db_task


@router.delete("/delete-task/{task_id}")
async def delete_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.query(task_model.Task).filter(task_model.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")

    board_id = db_task.board_id
    task_position = db_task.position

    db.delete(db_task)
    db.commit()

    await manager.broadcast_to_board(board_id, {
        "type": "task_deleted",
        "task": {
            "id": task_id,
            "position": task_position
        }
    })

    return {"message": "Task deleted successfully", "task_id": task_id}
