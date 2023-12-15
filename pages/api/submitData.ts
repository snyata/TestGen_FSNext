import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { user, data } = req.body;
  const uuid = uuidv4();
  const date = new Date().toISOString().split('T')[0];

  // CSV Data
  const csvData = `${uuid},${user},${date},${data.Page},${data.Action},${data.Module},${data.Element}\n`;
  const csvFilePath = path.resolve('./data/testReqs/data.csv');
  fs.appendFileSync(csvFilePath, csvData);

  // JSON Data
  const jsonData = { UUID: uuid, User: user, Date: date, ...data };
  const jsonFilePath = path.resolve(`./data/json/${uuid}_${date}.json`);
  fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));

  res.status(200).json({ message: 'Data submitted successfully' });
}
