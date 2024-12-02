# RPG Showcase
You've just finished your Dungeons and Dragons Campaign, or your Pathfinder one shot... now what? What do you do with the character you spent so much time developing and roleplaying? Immortalize and display your ttrpg character in RPG Showcase!

## Live Demo
To see the deployed app, go to [https://rpg-showcase.onrender.com/](https://rpg-showcase.onrender.com/)

## Features
List the key features of your application.

* User authentication (signup, login, logout).
* Create, update, and delete tasks.
* Responsive UI.
* Real-time updates using WebSockets.

## Technologies Used
List the main technologies and libraries used:

### Frontend (React)
* React
* React Router
* Axios (for API calls)
* Bootstrap
* Material-UI
  
### Backend (Node.js)
* Node.js
* Express.js
* MongoDB
* AWS S3
* JWT for authentication

## Setup and run
Create **.env** in backend directory

### Install
```shell
git clone git@github.com:yusuf-quddus/RPG-Showcase.git
cd RPG-Showcase
```

setup environment variables
```
MONGODB_URI='your-mongodb'
PORT=3001
TEST_MONGODB_URI='mongo for testing'
SECRET='your secret'
BUCKET_NAME='S3 bucken name'
BUCKET_REGION='s3 region'
ACCESS_KEY='your key'
SECRET_ACCESS_KEY='your secret key'
```

setup and run frontend
```shell
cd frontend
npm install
npm run dev
```

setup and run backend
```shell
cd backend
npm install
npm run dev
```

## Run tests
```shell
cd backend
npm run test
```

## Folder Structure
```
project-name/
├── frontend/          # Frontend code
│   ├── public/
│   │   ├── images/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── package.json
│   ├── .env            # Environment variables
├── backend/            # Backend code
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── tests/
│   ├── utils/
│   ├── app.js
│   ├── package.json
│   └── index.js
└──  README.md
```
