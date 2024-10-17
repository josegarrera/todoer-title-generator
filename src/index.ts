import express from 'express';
import axios from 'axios';
import cors from 'cors';
import winston from 'winston';

const app = express();
const port = 3002;

app.use(cors());

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/random-title', async (req, res) => {
  try {
    // Hacemos una solicitud a la API externa para obtener todos
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
    const todos = response.data;

    // Seleccionamos un título de manera aleatoria
    const randomTodo = todos[Math.floor(Math.random() * todos.length)];

    // Devolvemos el título aleatorio
    res.json({ title: randomTodo.title });
  } catch (error) {
    logger.error('Error fetching random title:', error);
    res.status(500).json({ message: 'Error fetching external todos' });
  }
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

app.listen(port, () => {
  logger.info(`External integration service running at http://localhost:${port}`);
});
