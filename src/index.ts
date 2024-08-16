
import express, { Application } from "express";
import http from "http";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";


// Handle uncaught Exception
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    console.log(`shutting down the server for handling uncaught Exception`);
    process.exit(1);
});

const app: Application = express();
const server = http.createServer(app);

// CORS, JSON, and cookie-parser
const options: CorsOptions = {
    origin: ['http://localhost:5173', 'http://192.168.0.175:5173', 'http://192.168.1.37:5173', 'https://whatsapp-chat-imbu.onrender.com'],
    credentials: true,
    exposedHeaders: ["sessionID", "sessionId", "sessionid"]
};
app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('backend home route successful');
});


const port = process.env.PORT || 5000;
const newServer = server.listen(port, () => {
    console.log(`Server is running on port number ${port}`);
});


// Unhandled promise rejection
process.on("unhandledRejection", (err: Error) => {
    console.error("Unhandled Rejection:", err);
    newServer.close(() => {
        process.exit(1);
    });
});


export default app