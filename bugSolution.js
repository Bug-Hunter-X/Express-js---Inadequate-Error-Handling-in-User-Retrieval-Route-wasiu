const express = require('express');
const app = express();

// Simulate database operations (replace with your actual database logic)
const users = {
  '1': { id: '1', name: 'John Doe' },
  '2': { id: '2', name: 'Jane Smith' },
};

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (users[id]) {
        resolve(users[id]);
      } else {
        reject(new Error('User not found'));
      }
    }, 500); // Simulate database delay
  });
}

app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const userData = await getUser(userId);
    res.json(userData);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(error.message === 'User not found' ? 404 : 500).json({ error: 'Failed to retrieve user' });
  }
});

// Centralized error handler middleware (for more robust error handling)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(3000, () => console.log('Server listening on port 3000'));