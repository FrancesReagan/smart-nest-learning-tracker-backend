__🪺SmartNest-LEARNING-TRACKER-BACKEND API__
*Backend*

 _This backend API is a Node.js/Express backend API for the SmartNest Learning Tracker application. It provides secure user authentication, course management, and learning session tracking wiht MongoDB integration.
 _Built with Node.js, Express, MongoDB and depolyed on Render.com_

[SmartNest-Learning-tracker-backend]( https://smart-nest-learning-tracker-backend.onrender.com/api)


--------------------------------------------------------
__Architecture__

`Frontend (Netlify) <--> Backend API (Render) <--> MongoDB (Compass/Atlas)`

`Frontend: https://smartnesttracker.netlify.app/`

`Backend: https://smart-nest-learning-tracker-backend.onrender.com`

`Database: MongoDB Atlas or Compass`


System Architecture WIREFRAME
<img width="3840" height="1677" alt="Wireframe SmartNest Learning Tracker 7-29-25 _ Mermaid Chart-2025-07-29-041555" src="https://github.com/user-attachments/assets/78fc1af0-cd1d-4ac2-8e92-8b05d3598b24" />
[used mermaidchart.com](https://www.mermaidchart.com/app/projects/5d210069-0590-4424-940e-f4ec9da1af6d/diagrams/2c6b60af-aaa1-4a79-a20d-37534513b643/version/v0.1/edit)


-------------------------------------------------------------------


 __Features__


 _Authentication & Security_
 
     * JWT Authentication - secure token-based authentication with expiration.
  
     * Password hashing - bcrypt encryption with 10 salt rounds.
  
     * Protected Routes - middleware based route protection.
  
     * User Authorization - users can only access their own data.
  
     * CORS support - cross-origin resource sharing for frontend integration.



 _Course Management_


   * Full C.R.U.D. operations - create, read,update, delete courses.
   
   * Course Categories - Programming, Design, Business, Data Science, Investing, Other
   
   * Status Tracking - "On the horizon", "Working it", "BAM did it"
   
   * User Ownership - each course belongs to a specific user.
   
   * URL storage - optional course links for external resources.
   


_Session Tracking_


   * Learning Sessions - track study sessions for each course.
   
   * Session Notes - detailed notes for each learning session.
   
   * Topics Learned - array of topics covered in each session.
   
   * Date Tracking- automatic timestamp for session creation.
   
  * Nested Resources - sessions belong to courses wiht proper authorization.



_Database Design_

   * MongoDB Integration - Mongoose Object Document Model for data modeling.
   
   * Schema Validation - built-in validation for all data fields.
   
   * Relationships - proper use-course and course-session relationships.
   
   * Indexes - optimized queries with user-based filtering.


-----------------------------------------------------------------------------------------------------

__Tech Stack__


 _Core Tech_
 
  -Node.js - JavaScript runtime environment.
  
  -Express.js - Web application framework
  
  -MongoDb - NoSQL database wiht Mongoose
  
  -ES6 Modules - Modern JavaScript module system.


_Authentication Security_


 -JWT (jsonwebtoken) - token-based authentication
 
 -bcrypt - password hashing and verification.
 
 -CORS - cross-origin resource sharing.


_Development Tools_


 -Morgan - HTTP request logging.
 
 -dotenv - environment variable management
 
 -Nodemon - development server with auto-restart 


--------------------------------------------------------------------------------------------------------------------------

__Project Structure__

<img width="193" height="539" alt="image" src="https://github.com/user-attachments/assets/475bcbdc-21ca-4dd7-87ce-23c2344ce796" />


<img width="411" height="257" alt="image" src="https://github.com/user-attachments/assets/ad5a8c52-1b78-487d-9c85-1179ab20be49" />




---------------------------------------------------------------------------------------------

_Creating this project_

  need: *Node.js, *npm, *MongoDB Atlas account 

  installation: 
     - Clone repo: `git clone https://github.com/FrancesReagan/smart-nest-learning-tracker-backend`
                   `cd smart-nest-learning-tracker-backend`

     -Install dependencies - `npm install`

     -set up environment variables - create `.env` file in root directory: 
     
                           `MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/smartnest?retryWrites=true&w=majority&appName=Cluster0
                           JWT_SECRET=your-super-secret-jwt-key-here
                           PORT=3000
                           NODE_ENV=development`

    -start the development server: `npm run dev`

    -verify the server is running  - sever will start on http://localhost:3000
                                   - MongoDB connection will be logged to console.


 -----------------------------------------------------------------------------------------------------------------------

 __Database Schema/Models__


  _User Schema_

  {
  
  _id: ObjectId,
  
  username: String (required, unique, trimmed),
  
  email: String (required, unique, validated),
  
  password: String (required, hashed, min 5 chars),
  
  createdAt: Date (auto-generated)
  
}
  


_Course Schema_

 {
 
  _id: ObjectId,
  
  title: String (required, trimmed),
  
  description: String (required, trimmed),
  
  category: String (enum: Programming, Design, Business, Data Science, Investing, Other),
  
  url: String (optional, trimmed),
  
  status: String (enum: "On the horizon", "Working it", "BAM did it"),
  
  user: ObjectId (ref: User, required),
  
  createdAt: Date (auto-generated)
  
 }


_Session Schema_


{

  _id: ObjectId,
  
  course: ObjectId (ref: Course, required),
  
  date: Date (required, default: now),
  
  notes: String (optional, trimmed),
  
  topicsLearned: [String] (array of topics, trimmed),
  
  createdAt: Date (auto-generated)
  
}

-------------------------------------------------------------------------------------------------------

__API Endpoints__

 _Authentication Endpoints_
 
  _Register Uer_
  
     POST /api/users/register
     Content-Type: application/json

{

  "username": "spacekitten",
  
  "email": "spacey@cat.com",
  
  "password": "abc1234"
  
}

Response: 201 Created


{

  "token": "jwt_token_here",
  
  "user": {
  
    "_id": "user_id",
    
    "username": "spacekitten",
    
    "email": "spacey@cat.com"
    
  }
}

----------------------------------
_Login User_

POST /api/users/login
Content-Type: application/json

{

  "email": "spacey@cat.com",
  
  "password": "abc1234"
  
}

Response: 200 OK


{
  "token": "jwt_token_here",
  
  "user": {
  
    "_id": "user_id",
    
    "username": "spacekitten",
    
    "email": "spacey@cat.com"
    
  }
}

----------------------------------------------------------

_Get Current User_

GET /api/users/me
Authorization: Bearer jwt_token_here

Response: 200 OK

{

  "_id": "user_id",
  
  "username": "spaceykittene",
  
  "email": "spacey@cat.com"
  
}

-------------------------------------------------------

Course Endpoints (Protected)

Get All User Courses
GET /api/courses
Authorization: Bearer jwt_token_here

Response: 200 OK

[
  {
     "_id": "course_id",
     
    "title": "React Fundamentals",
    
    "description": "Learn React basics",
    
    "category": "Programming",
    
    "url": "https://example.com/course",
    
    "status": "Working it",
    
    "user": {
    
      "_id": "user_id",
      
      "username": "spacekitten"
      
    },
    
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
]

--------------------------------------------------------------------

_Create New Course_

POST /api/courses
Authorization: Bearer jwt_token_here
Content-Type: application/json

{

  "title": "Node.js Backend Development",
  
  "description": "Build REST APIs with Node.js",
  
  "category": "Programming",
  
  "url": "https://example.com/nodejs-course",
  
  "status": "On the horizon"
  
}

Response: 201 Created

{

  "_id": "course_id",
  
  "title": "Node.js Backend Development",
  
  "description": "Build REST APIs with Node.js",
  
  "category": "Programming",
  
  "url": "https://example.com/nodejs-course",
  
  "status": "On the horizon",
  
  "user": {
  
    "_id": "user_id",
    
    "username": "spacekitten"
    
  },
  
  "createdAt": "2025-01-01T00:00:00.000Z"
  
}


 ------------------------------------------------------------------------------------

_Get Single Course_
GET /api/courses/:id

Authorization: Bearer jwt_token_here

Response: 200 OK

{

  "_id": "course_id",
  
  "title": "React Fundamentals",
  
  "description": "Learn React basics",
  
  "category": "Programming",
  
  "status": "Working it",
  
  "user": {
  
    "_id": "user_id",
    
    "username": "spacekitten"
  }
}


----------------------------------------------------------------------------------------------------

_Update Course_

PUT /api/courses/:id

Authorization: Bearer jwt_token_here
Content-Type: application/json


{

  "title": "Advanced React Patterns",
  
  "status": "BAM did it"
  
}

Response: 200 OK

{

  "_id": "course_id",
  
  "title": "Advanced React Patterns",
  
  "description": "Learn React basics",
  
  "category": "Programming",
  
  "status": "BAM did it",
  
  "user": {
  
    "_id": "user_id",
    
    "username": "spacekitten"
    
  }
}

 ---------------------------------------------
 
Delete Course 

DELETE /api/courses/:id

Authorization: Bearer jwt_token_here

Response: 200 OK

{

  "message": "Success...course and all its sessions have been deleted."
  
}
 



-----------------------------------------------------

_Session Endpoints (protected)

Get all sessions for a course

GET /api/courses/:courseId/sessions
Authorization: Bearer jwt_token_here

Response: 200 OK

[
  {
  
    "_id": "session_id",
    
    "course": "course_id",
    
    "date": "2025-01-01T00:00:00.000Z",
    
    "notes": "Learned about React hooks",
    
    "topicsLearned": ["useState", "useEffect", "custom hooks"],
    
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
]


-----------------------------------------------------------------------------------------

_Create New Session_

POST /api/courses/:courseId/sessions
Authorization: Bearer jwt_token_here
Content-Type: application/json

{

  "notes": "Today I learned about how to make custom hooks",
  
  "topicsLearned": ["custom hooks", "react"]
  
}


Response: 201 Created


{

  "_id": "session_id",
  
  "course": "course_id",
  
  "date": "2025-01-01T00:00:00.000Z",
  
  "notes": "Today I learned about how to make custom hooks",
  
  "topicsLearned": ["custom hooks", "react"],
  
  "createdAt": "2025-01-01T00:00:00.000Z"
  
}


----------------------------------------------------------------------------------------------

_Get a single session_

GET /api/courses/:courseId/sessions/:sessionId
Authorization: Bearer jwt_token_here

Response: 200 OK

{

  "_id": "session_id",
  
  "course": {
  
    "_id": "course_id",
    
    "title": "React Fundamentals",
    
    "user": "user_id"
    
  },
  
  "date": "2025-01-01T00:00:00.000Z",
  
  "notes": "leared about custom hooks",
  
  "topicsLearned": ["hooks", "custom hooks"]
  
}

---------------------------------------------------------------------------------

_Update Session_

PUT /api/courses/:courseId/sessions/:sessionId
Authorization: Bearer jwt_token_here
Content-Type: application/json


{

  "notes": "Updated notes about React custom hooks",
  
  "topicsLearned": ["custom hooks in React", "hooks", "best practices with custom hooks"]
}


Response: 200 OK

{

  "_id": "session_id",
  
  "course": "course_id",

 
  "date": "2025-01-01T00:00:00.000Z",
  
  "notes": "Updated notes about React custom hooks",
  
  "topicsLearned": ["custom hooks in React", "hooks", "best practices with custom hooks"],
  
  "createdAt": "2025-01-01T00:00:00.000Z"
  
}


-------------------------------------------------------------------------------------------

_Delete Session_
DELETE /api/courses/:courseId/sessions/:sessionId

Authorization: Bearer jwt_token_here

Response: 200 OK

{

  "message": "Session deleted successfully"
  
}

--------------------------------------------------------------------------------------------

___Deployment & Production__

 _Architecture_


  - Backend: Deployed on Render.com
    
  - Frontend: deployed on Netlify.com
    
  - Database: MongoDB Atlas
    
  - Live API: https://smart-nest-learning-tracker-backend.onrender.com



_Render.com Deployment_

 * Prepare Repository
   
    - ensure all code is pushed to GitHub
      
    - verify production-ready configuration
      
    - check environment variables are properly set.



 * Deploy to Render
   
    - signup/login to Render.com
    - 
    - create web service: connect to your GitHub repo, choose "web service" type, set build command - `npm install`, set start command - ` npm start`, choose node.js environment.

    - Configure environment variables: `MONGO_URI=your-mongodb-atlas-connection-string
    - 
                                        JWT_SECRET=your-super-secret-jwt-key
      
                                        NODE_ENV=production
      
                                        PORT=3000`
----------------------------------------------------------------
//CORS//

---------------------------------------------------------

__Frontend Connection Setup__

_Environment Variables for the Frontend_

   -frontend should use these environment variables - 
     - Local Dev in .env file- `VITE_API_URL=http://localhost:3000`
     - Production in .env.production - `VITE_API_URL="https:https://smart-nest-learning-tracker-backend.onrender.com`

_Production Environment Variables_

   _Required environment variables_
   
      - Database Connection  - `MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/smartnest?retryWrites=true&w=majority&appName=Cluster0`
      - JWT Configuration - `JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long`
      - Server Configuration - `PORT=3000
                                NODE_ENV=production`

   _Security_

      -JWT secret - use a random generated secret -32 or -64 characters in length.
      - MongoDB - use MongoDB Atlas with strong passwords
      - Environment Variables - never comit `.env` files to version control
      - CORS - can restrict the origins as you see fit.

 -------------------------------------------------------------------------------------------------------------

   _API_
      _Live API Base URL_
        `https://smart-nest-learning-tracker-backend.onrender.com/api`

     _Authentication Required_
       - Authentication header:  Authorization: Bearer your_jwt_token_here
          - All endpoints require this except the /users/register and /users/login  as registration creates the token for the user to be used for all other endpoints.
          - Test all Endpoints manually with Postman (as seen above)

    ---------------------------------------------------------------------------------------------

    _Contribute_
         _PUll request_
         
           - fork the repo
           
           - create feature branch - ` git checkout -b feature/awesome-feature
           
                                      `git checkout -b fix/bug fix`
                                      
           - commit changes `git commit -m "add new feature"
           
           - push to branch - `git push origin feature/new-feature
           
           - open a pull request

       

-------------------------------------------

__References__

_core tech_

[Express.js Doc](https://expressjs.com/) - web framework API reference

[Mongoose Doc](https://mongoosejs.com/docs/guide.html) - MongoDB ODB schemas and queries

[JWT.io](https://www.jwt.io/) - cool JSON web token encoder/decoder and docs

[bcrypt](https://www.npmjs.com/package/bcrypt) - password hashing library



_database & deployment_

[MongoDB Atlas](https://www.mongodb.com/docs/atlas/) - cloud database setup and managment

[Render.com Docs](https://render.com/docs) - backend deployment platform

[REST API Design Guide] - RESTful API best practices



_Dev tools_

[Postman Learning Center](https://learning.postman.com/docs/introduction/overview/) - API Testing and documentation

[HTTP Status Codes](https://www.webfx.com/web-development/glossary/http-status-codes/) - reference guide for response codes

[CORS Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) - Cross Origin resource sharing guid




____________________________________________________________________________________________________

    Acknowledgements:  Thank you to my instructors Abrahamm Tavarez and Colton Wright for your guidance and support; thank you to my fellow 2025-RTT-23 cohort for your support.

