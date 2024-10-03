# Chat App

This is a MERN stack application with authentication (login, register) functionality,
using MongoDB as its database for storing users and chats details in encrypted format.
Socket.io is used for real time communication and Postman for testing API's we've created.

## Run locally
---

Clone the project
- git clone https://github.com/janbezovsek/chatApp.git

Go to the project directory and install npm packages
in client and server folders 
- cd client/npm install
- cd server/npm install

Start the server (localhost:5000)
- open new terminal
- cd server/npm start (we are using nodemon for automatic restart of the server)

Start the client (localhost:3000)
- open new terminal
- cd client/npm run dev

---

## App explained
---

### Login/Registration
![chat2](https://github.com/user-attachments/assets/ea136e56-6daa-4e6e-92d8-32cabf911f46)


The first page shown after we run the client will be login/registration  page.
We can toggle between them. We save the provided data in MongoDB (with mongoose) database with
a unique string (DB_URL) that we save in .env file(different for each user). If we want
to use the guest user we have to first register with guest@example.com email and its password
will be password. In the login page it then autocompletes these fields.


### Chat page
![chat9](https://github.com/user-attachments/assets/cb274f2a-cdff-434b-b5eb-5ab45d97af37)


After successful authentication we are redirected to Chat page. There we can search for other
users that we have created, view our profile, logout and create new chats or chat groups.
We also have a notification bell for new messages.


![chat6](https://github.com/user-attachments/assets/8b5685cc-76d2-4b50-a3e3-4e53223ed27f)


If we open another window in the browser (new anonymous tab) and login with different user
we can test our app and see real time communication without refreshing the page.


![chat3](https://github.com/user-attachments/assets/5a545659-53af-4231-bead-dfd63b3d2643)


![chat4](https://github.com/user-attachments/assets/41d69f40-8447-4806-b6e1-b7e7c3ad39d8)


![chat5](https://github.com/user-attachments/assets/05100a2f-511d-45aa-b9e2-6eb4177e99c8)


![chat7](https://github.com/user-attachments/assets/cfab8ac8-1e93-4d78-8307-f0701d7fc489)


We have also implemented responsive design making it available for all sizes.


![chat8](https://github.com/user-attachments/assets/f49647e5-3000-4484-81b2-6d47a455036f)



