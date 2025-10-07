
Project Setup Instructions
=========================

Backend Setup:
--------------
1. Open a terminal and navigate to the `backend` directory:
    cd backend
2. (Optional) Create and activate a Python virtual environment:
    python -m venv venv
    venv\Scripts\activate
3. Install dependencies:
    pip install -r requirements.txt
4. Start the FastAPI server:
    uvicorn main:app --reload

Frontend Setup:
---------------
1. Open a new terminal and navigate to the `frontend` directory:
    cd frontend
2. Install dependencies:
    npm install
3. Start the development server:
    npm run dev

---

Kanban App Project
==================

Overview
--------
This is a full-stack Kanban board application. It consists of a Python FastAPI backend and a React frontend. The app allows users to create boards, columns, and tasks, and manage them in a Kanban-style workflow.

Project Structure
-----------------
- backend/
    - main.py: FastAPI application entry point
    - requirements.txt: Python dependencies
    - db/: Database setup and connection
    - models/: SQLAlchemy models for Board, Column, Task, User, Contributor
    - routers/: FastAPI routers for authentication, board, column, contributor, and task management
    - schemas/: Pydantic schemas for API validation and serialization
    - services/: Utility functions
- frontend/
    - src/: React source code
        - components/: UI components (Sidebar, TopBar, ProtectedRoute, etc.)
        - lib/: Axios and utility functions
        - pages/: Main pages (Board, Login, SignUp)
    - public/: Static assets
    - package.json: Frontend dependencies
    - vite.config.js: Vite configuration
    - index.html: Main HTML file

Backend Features
----------------
- User authentication (JWT-based)
- Board creation, update, and retrieval
- Column and task management
- SQLAlchemy ORM and Pydantic schemas
- RESTful API endpoints

Frontend Features
-----------------
- React-based Kanban board UI
- Board, column, and task display and manipulation
- Login and signup pages
- Protected routes for authenticated users
- Axios for API requests

Setup Instructions
------------------
1. Backend
    - Navigate to the `backend` directory
    - Create and activate a Python virtual environment
    - Install dependencies: `pip install -r requirements.txt`
    - Run the FastAPI server: `uvicorn main:app --reload`

2. Frontend
    - Navigate to the `frontend` directory
    - Install dependencies: `npm install`
    - Start the development server: `npm run dev`

API Endpoints
-------------
- POST /add-board: Create a new board
- GET /get-boards: Get all boards for a user
- GET /get-board/{board_id}: Get board details (columns and tasks)
- PUT /update-board/{board_id}: Update board details
- Additional endpoints for columns, tasks, contributors, and authentication

Notes
-----
- Make sure the backend server is running before using the frontend.
- Update API URLs in the frontend as needed to match your backend server address.
- For development, use environment variables or config files to manage secrets and URLs.

Author
------
- Project by abrar840
