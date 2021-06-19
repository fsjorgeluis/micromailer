import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
// Public and protected routes
import sendRoute from './routes/sendRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const corsOptions = {
    origin: process.env.CORS_ORIGIN
};

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

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
// cors(corsOptions),
app.use('/send', sendRoute);

app.use(notFound);
app.use(errorHandler);

app.listen({ port: port }, () => {
    console.log(`🚀 Service in ${process.env.NODE_ENV} mode, ready at http://localhost:${port}`)
});