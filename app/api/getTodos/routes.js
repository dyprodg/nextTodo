import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'public', 'array.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const todos = JSON.parse(fileContent);

  res.status(200).json(todos);
}
