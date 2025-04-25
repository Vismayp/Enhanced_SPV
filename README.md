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

## Troubleshooting Deployment

If you encounter npm dependency errors during deployment:

1. Both projects now use `npm install --no-package-lock` to avoid package-lock.json issues
2. Each project has an `.npmrc` file with the following settings:
   - `legacy-peer-deps=true` to handle dependency conflicts
   - `save-exact=true` to ensure exact versions are used

3. If you still see errors like "Missing X from lock file", try these steps:
   - Delete node_modules and package-lock.json locally
   - Run `npm install` in each project directory
   - Commit the changes
   - Redeploy on Railway

4. Special handling for React 19+ errors:
   - React 19 is still in alpha, consider downgrading to React 18 if necessary
   - Add `--force` to the npm install command if needed

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