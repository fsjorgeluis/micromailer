import express from 'express';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
// Public and protected routes
import sendRoute from './routes/sendRoute.js';

const app = express();
const PORT = process.env.PORT || 4000;

dotenv.config();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200);
    res.json({
        "status": "MicroMailer service running...",
        "name": "micromailer",
        "version": "1.0.0",
        "description": "Nodejs mailer microservice",
        "author": {
            "name": "Jorge Fernandez",
            "email": "fsjorgeluis@gmail.com"
        }
    });
    res.end();
});

app.use('/send', sendRoute);

app.use(notFound);
app.use(errorHandler);

app.listen({ port: PORT }, () => {
    console.log(`🚀 Service in ${process.env.NODE_ENV} mode, ready at http://localhost:${PORT}`)
});