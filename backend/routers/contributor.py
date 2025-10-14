from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
import models.contributor as contributor_model
import schemas.contributor as contributor_schema
import schemas.board as board_schema
import models.board as board_model
from services.utils import get_current_user
import models.user as user_model

router = APIRouter()

@router.post("/add-contributor", response_model=contributor_schema.Response)
def add_contributor(
    contributor: contributor_schema.Create,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user)
):
    new_contributor = contributor_model.Contributor(
        contributor_email=contributor.contributor_email,
        board_id=contributor.board_id,
        
    )
    db.add(new_contributor)
    db.commit()
    db.refresh(new_contributor)
    return new_contributor




@router.get("/get-contributions", response_model=list[board_schema.Response])
def get_contributed_boards(
    db: Session = Depends(get_db),
    user: str = Depends(get_current_user),
):
    
    contributors = db.query(contributor_model.Contributor).filter(
        contributor_model.Contributor.contributor_email == user.get("email")
    ).all()

   
    board_ids = [contributor.board_id for contributor in contributors]

    if not board_ids:
        return []  # no boards found

   
    boards = db.query(board_model.Board).filter(
        board_model.Board.id.in_(board_ids)
    ).all()
   
    return boards




@router.get("/get-contributors/{board_id}", response_model=list[contributor_schema.allResponse])
def get_contributors(
    board_id: int,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user)  # ✅ This must be a dict
):
    user_id = int(user["sub"])  # ✅ Extract user id from token

    contributors = db.query(contributor_model.Contributor).filter(
        contributor_model.Contributor.board_id == board_id
    ).all()
    
    result = []
    for contrib in contributors:
        contributor = (
            db.query(user_model.User)
            .filter(
                (user_model.User.email == contrib.contributor_email) &
                (user_model.User.id != user_id)
            )
            .first()
        )

       
    result.append({
        "id": contrib.id,
        "email": contrib.contributor_email,
        "name": contributor.full_name if user else None,
        "role": contrib.role,
        # Add more fields if needed
    })

    return result






@router.get("/get-contributor/{contributor_id}", response_model=contributor_schema.Response, )
def get_contributor(contributor_id: int,
    db: Session = Depends(get_db)
              ):
    db_contributor = db.query(contributor_model.Contributor).filter(contributor_model.Contributor.id == contributor_id).first()
    if not db_contributor:
        raise HTTPException(status_code=404, detail="Contributor not found")
    return db_contributor




@router.put("/update-contributor/{contributor_id}", response_model=contributor_schema.Response,)
def update_contributor(contributor_id: int, contributor: contributor_schema.UpdateContributor,
    db: Session = Depends(get_db)
              ):
    db_contributor = db.query(contributor_model.Contributor).filter(contributor_model.Contributor.id == contributor_id).first()
    if not db_contributor:
        raise HTTPException(status_code=404, detail="Contributor not found")

    if contributor.email is not None:
        db_contributor.email = contributor.email
    if contributor.board_id is not None:
        db_contributor.board_id = contributor.board_id
    if contributor.role is not None:
        db_contributor.role = contributor.role

    db.commit()
    db.refresh(db_contributor)
    return db_contributor


@router.delete("/delete-contributor/{contributor_id}")
def delete_contributor(contributor_id: int, db: Session = Depends(get_db)):
    db_contributor = db.query(contributor_model.Contributor).filter(contributor_model.Contributor.id == contributor_id).first()
    if not db_contributor:
        raise HTTPException(status_code=404, detail="Contributor not found")
    
    db.delete(db_contributor)
    db.commit()
    return {"detail": "Contributor deleted successfully"}
