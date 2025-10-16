from fastapi import APIRouter,WebSocket,WebSocketDisconnect
from services.websocket_manager import manager



router = APIRouter()



@router.websocket("/ws/{board_id}")
async def websocket_endpoint(websocket:WebSocket,board_id:int):
    await manager.connect(websocket,board_id)
    try:
        while True:
            data = await websocket.receive_json()
            await manager.broadcast_to_board(board_id,data)
    except WebSocketDisconnect:
        manager.disconnect(websocket,board_id)