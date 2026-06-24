import express from 'express';
import morgan from 'morgan';
import agentRouter from './routes/agent.routes.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:5173',
    methods: [ "GET", "POST", "PATCH", "DELETE" ],
    credentials: true
}));

app.get('/api/ai/healthz', (req, res) => {
    res.status(200).json({
        message: 'AI Orchestration API is healthy',
        status: 'ok'
    });
});

app.use('/api/ai', agentRouter);

export default app;