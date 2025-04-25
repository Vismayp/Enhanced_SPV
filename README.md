# Enhanced SPV - Railway Deployment

This project consists of a backend and frontend that are deployed to Railway.

## Deployment Instructions

### Backend Deployment

1. Create a new project in Railway
2. Connect your GitHub repository
3. Add the `spv_backend` directory as a service
4. Set the following environment variables:
   - `FRONTEND_URL`: URL of your deployed frontend (e.g., https://your-frontend-app.railway.app)

### Frontend Deployment

1. Create a new service in the same Railway project
2. Connect the `enhanced_spv` directory as a service
3. Set the following environment variables:
   - `REACT_APP_API_URL`: URL of your deployed backend (e.g., https://your-backend-app.railway.app)

## Project Structure

- `spv_backend`: Express.js backend for blockchain simulation
- `enhanced_spv`: React frontend application

## Local Development

To run the project locally:

### Backend
```
cd spv_backend
npm install
npm start
```

### Frontend
```
cd enhanced_spv
npm install
npm start
```

The backend will run on port 8080 and the frontend on port 3000. 