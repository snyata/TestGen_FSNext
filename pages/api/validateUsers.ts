import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { username, password } = req.body;

  const results = [];
  fs.createReadStream(path.resolve('./data/users.csv')) // Adjust the path to your CSV file
    .pipe(csvParser())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      const user = results.find(u => u.username === username && u.password === password);
      if (user) {
        res.status(200).json({ valid: true, username: user.username });
      } else {
        res.status(401).json({ valid: false, message: 'Invalid credentials' });
      }
    });
}
