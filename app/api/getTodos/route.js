// pages/api/getTodos.js
import fs from 'fs/promises';
import path from 'path';


export async function GET(req) {
    try {
        const filePath = path.join(process.cwd(), 'public', 'array.json');
        const fileContent = await fs.readFile(filePath, 'utf8');
        return new Response(fileContent, { status: 200 });
    } catch (error) {
        console.error("Error in API: ", error);
        return new Response(JSON.stringify({ error: 'Error getting todos' }), { status: 500 });
    }
}
