// Import necessary modules
import express from 'express';
import bodyParser from 'body-parser';

// Create an instance of Express app
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Placeholder array to store tasks (you'd replace this with a database)
let tasks = [];

// Route handler for adding a new task
app.post('/user-added/task', (req, res) => {
  // Extract task data from the request body
  const { text, projectId } = req.body;
  
  // Validate request data
  if (!text || !projectId) {
    return res.status(400).json({ error: 'Missing required data' });
  }

  // Generate a unique task ID (you might want to use a better method in production)
  const taskId = Math.random().toString(36).substring(7);

  // Create a new task object
  const newTask = {
    id: taskId,
    text: text,
    projectId: projectId,
  };

  // Store the new task (in memory, replace this with database storage)
  tasks.push(newTask);

  // Send the newly created task as the response
  res.status(201).json(newTask);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
