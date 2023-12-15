import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

interface User {
    username: string;
    password: string;
    stack: string;
  }

const PORT = 3001;
const usersFilePath = path.join(__dirname, 'users.json');
const app = express();
app.use(express.json());
app.use(cors());

// Read users data from JSON file
const readUsers = (): User[] => {
  const data = fs.readFileSync(usersFilePath, 'utf8');
  return JSON.parse(data || '[]');
};

// Write users data to JSON file
const writeUsers = (users: User[]): void => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
};

// Simple validation function
const validateInput = (username: string, password: string, stack: string): boolean => {
  if (!username || !password || !stack) return false;
  return true;
};

// Validate input
if (!validateInput(username, password, stack)) {
    return res.status(400).send('Invalid input');
  };

// POST endpoint to receive user data
app.post('/submit', (req: Request, res: Response) => {
  const { username, password, stack } = req.body as User;

  // Check if user already exists   
  const users = readUsers();
  const userExists = users.some((user) => user.username === username);
  if (userExists) {
    return res.status(409).send('User already exists');
  }

  users.push({ username, password, stack });
  writeUsers(users);

  res.status(200).send('User added successfully');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
