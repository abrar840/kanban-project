from typing import Dict,List
from fastapi import WebSocket

class connectionManager:
    def __init__(self):
        #store connec
        self.active_connections:Dict[int,List[WebSocket]]={}

    async def connect(self,websocket:WebSocket,board_id:int):
        await websocket.accept()
        if board_id not in  self.active_connections:
             self.active_connections[board_id] = []  # Create new list first
        
        self.active_connections[board_id].append(websocket)
   
    async def disconnect(self,websocket:WebSocket,board_id:int):
        if board_id in self.active_connections:
            self.active_connections[board_id].remove(websocket)
            if not self.active_connections[board_id]:
             del self.active_connections[board_id]

    async def broadcast_to_board(self, board_id: int, message: dict):
        if board_id not in self.active_connections:
           
            return

    
        disconnected = []

        for connection in self.active_connections[board_id]:
            try:
                await connection.send_json(message)
                 
            except Exception as e:
                 
                disconnected.append(connection)

        # Remove disconnected sockets
        for connection in disconnected:
            if connection in self.active_connections[board_id]:
                self.active_connections[board_id].remove(connection)
                 

        # Clean up if board has no active connections
        if board_id in self.active_connections and not self.active_connections[board_id]:
            del self.active_connections[board_id]
             



manager = connectionManager()
