// 1. Import required modules
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3000;

// 2. Define the schema for logging events
const eventSchema = new mongoose.Schema({
  event: String,
  triggerTime: String,
});

// 3. Create a model based on the schema
const EventLog = mongoose.model('EventLog', eventSchema);

// 4. Create an Events class for event handling
class Events {
  constructor() {
    this.eventHandlers = {};
  }

  // Register an event handler
  on(eventName, callback) {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(callback);
  }

  // Trigger all callbacks associated with a given eventName
  async trigger(eventName) {
    const eventTime = new Date().toLocaleString();
    if (this.eventHandlers[eventName]) {
      for (const callback of this.eventHandlers[eventName]) {
        await callback();
        await this.logEventInMongoDB(eventName, eventTime);
      }
    }
  }

  // Remove all event handlers associated with the given eventName
  off(eventName) {
    if (this.eventHandlers[eventName]) {
      delete this.eventHandlers[eventName];
    }
  }

  // Log the triggered event in MongoDB and app.log
  async logEventInMongoDB(eventName, eventTime) {
    // Create a new document for the event log
    const eventLog = new EventLog({ event: eventName, triggerTime: eventTime });

    try {
      // Save the document to MongoDB
      await eventLog.save();
    } catch (error) {
      console.error('Error saving event log to MongoDB:', error);
    }

    // Log event in app.log
    console.log(`${eventName} --> ${eventTime}`);
  }
}

// 5. Create an instance of the Events class
const eventEmitter = new Events();

// 6. Set up Express server routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/trigger-event', async (req, res) => {
  try {
    await eventEmitter.trigger('click');
    res.json({ message: 'Event triggered successfully' });
  } catch (error) {
    console.error('Error triggering event:', error);
    res.status(500).json({ error: 'Failed to trigger event' });
  }
});

// 7. Connect to MongoDB and start the server
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.dtzfcae.mongodb.net/eventlog')
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
