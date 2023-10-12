import fs from 'fs/promises';  // Verwendung von Promises für bessere Handhabung
import path from 'path';


export async function POST(req) {
  try {
    const newTodo = await req.json();  

    if (!newTodo || typeof newTodo.task !== 'string' || typeof newTodo.completed !== 'boolean') {
      console.error("Invalid input: ", newTodo);
      return new Response(JSON.stringify({ error: 'Invalid input' }), {status: 400});
    }

    const filePath = path.join(process.cwd(), 'public', 'array.json');
    let fileContent = await fs.readFile(filePath, 'utf8');
      
    // Wenn die Datei leer ist, initialisiere sie mit einem leeren Array
    if (!fileContent.trim()) {
      fileContent = '[]';
    }

    const todos = JSON.parse(fileContent);

    // Finden der höchsten ID im bestehenden Array
    const highestId = todos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0);

    // Fügen einer ID zum neuen Todo hinzu
    newTodo.id = highestId + 1;

    todos.push(newTodo);
    await fs.writeFile(filePath, JSON.stringify(todos));

    return new Response(JSON.stringify(newTodo), {status: 200});
  } catch (error) {
    console.error("Error in API: ", error);
    return new Response(JSON.stringify({ error: 'Error adding todo' }), {status: 500});
  }
}
