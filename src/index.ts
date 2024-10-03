import express from 'express';
import axios from 'axios';
import cors from 'cors';
import winston from 'winston';

const app = express();
const port = 3002;

app.use(cors());

app.get('/external-todos', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
    res.json(response.data);
  } catch (error) {
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
