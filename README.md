                                                            Event Logging with Node.js, Express, and MongoDB


This repository contains code for an event logging system using Node.js, Express, and MongoDB.

Packages Used
mongoose: Used for MongoDB interaction and schema modeling.
express: Utilized for creating the web server and defining routes.


How to Run the Code

Clone the Repository:
git clone https://github.com/your-username/your-repository.git

Install Dependencies:
cd your-repository
npm install


Run the Application:
node app.js

Access the Application:
Open a web browser and go to http://localhost:3000 to view the index page.
Trigger an event by accessing http://localhost:3000/trigger-event in a web browser or through tools like cURL or Postman. This triggers the 'click' event and logs it to the console and MongoDB.

Note:
Make sure you have MongoDB installed and running on your local machine at mongodb://localhost:27017/eventlog.
Adjust the MongoDB connection URL and port if needed in app.js.
The application runs a simple Express server on port 3000.

Overview
This code demonstrates an event logging system where events can be registered, triggered, and logged to MongoDB. It utilizes an Express server to serve an index page and expose an endpoint to trigger events.

