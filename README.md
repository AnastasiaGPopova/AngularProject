# AngularProject
AngularProject-SoftUni


I. Introduction

- "MuvieBuffs" project is a web app where people can share their passion for movies.
- The MEAN (MongoDB, Express, Angular, Node.js) stack project.
 - Deploy: 
        XXXXXXXXXXXXXXXXXXXXXXXXX
        - it takes some time to initially load/ -

II. Getting Started

Installation instructions:
1. Go to "client" folder and run "ng serve"
2. Go to "server" folder and run "npm run start"

III. Folder Structure

client folder structure:
- "scr/app" folder - contains:
        - api services folder -for all api requests
        - components folders - all components

IV. Components
The components are devided into 3 main categories: Core, Main, Movies, User, Shared
- Navigation component - contains the header and the navigation bar of the web app
- Catalog component - contains all listed entries and a search bar
- Create component - contains a creation form
- Details component - contains the details of the entries. Depending if user is logged , owner or guest - different functionalitites are shown
- Login component - contains login form
- Register component - contains register form
- Homepage component - contains the home page of the app
- Footer component - contains the footer information
- Not found component - contains the 404 not found page
- Profile component - contains the current logged in user information /created entries or liked entries/
- Movie component - contains the info card for each entry 
- Table component - contains the IMDB entries


V. Routing
- Routing is done with the help of "RouterModule".
- Private routes are done using "IsAuthenticatedGuard".



VI. APIs and Backend Integration
- Mongoose, Express, and Node.js
- CRUD Operations
All requests are sent to http:localhost/3030/:resource. Supported requests are GET, POST, PUT, PATCH, DELETE
- MongoDB Models: User, Comment, Record

VIII. Styling
- The application is divided into components with separate CSS files.
