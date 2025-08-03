__🪺SmartNest-LEARNING-TRACKER-BACKEND API__
*Backend*

 _This backend API is a Node.js/Express backend API for the SmartNest Learning Tracker application. It provides secure user authentication, course management, and learning session tracking wiht MongoDB integration._


 __Features__


 _Authentication & Security_
 
  *JWT Authentication - secure token-based authentication with expiration.
  
  *Password hashing - bcrypt encryption with 10 salt rounds.
  
  *Protected Routes - middleware based route protection.
  
  *User Authorization - users can only access their own data.
  
  *CORS support - cross-origin resource sharing for frontend integration.



 _Course Management_


   *Full C.R.U.D. operations - create, read,update, delete courses.
   
   *Course Categories - Programming, Design, Business, Data Science, Investing, Other
   
   *Status Tracking - "On the horizon", "Working it", "BAM did it"
   
   *User Ownership - each course belongs to a specific user.
   
   *URL storage - optional course links for external resources.
   


_Session Tracking_


   *Learning Sessions - track study sessions for each course.
   
   *Session Notes - detailed notes for each learning session.
   
   *Topics Learned - array of topics covered in each session.
   
   *Date Tracking- automatic timestamp for session creation.
   
  *Nested Resources - sessions belong to courses wiht proper authorization.



_Database Design_

   *MongoDB Integration - Mongoose Object Document Model for data modeling.
   
   *Schema Validation - built-in validation for all data fields.
   
   *Relationships - proper use-course and course-session relationships.
   
   *Indexes - optimized queries with user-based filtering.



 

System Architecture WIREFRAME
<img width="3840" height="1677" alt="Wireframe SmartNest Learning Tracker 7-29-25 _ Mermaid Chart-2025-07-29-041555" src="https://github.com/user-attachments/assets/78fc1af0-cd1d-4ac2-8e92-8b05d3598b24" />
[used mermaidchart.com](https://www.mermaidchart.com/app/projects/5d210069-0590-4424-940e-f4ec9da1af6d/diagrams/2c6b60af-aaa1-4a79-a20d-37534513b643/version/v0.1/edit)

