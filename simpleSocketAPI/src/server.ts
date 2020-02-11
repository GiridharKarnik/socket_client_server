import express from "express";
import * as http from "http";
import WebSocket, { AddressInfo } from "ws";

import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";

const app: express.Application = express();

//initialize a simple http server
const server = http.createServer(app);

//middleware and logging
app.use(bodyParser.json());

app.use(bodyParser.text());

app.use(cors());

app.use(morgan("dev"));

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws: WebSocket) => {
  //connection is up, let's add a simple event
  ws.on("message", (message: string) => {
    //log the received message and send it back to the client
    console.log("received: %s", message);
    ws.send(`${message}`);
  });

  //send immediatly a feedback to the incoming connection
  ws.send("Hi there, I am a WebSocket server");
});

// app.post("/test/", (req: express.Request, res: express.Response) => {
//   res
//     .status(200)
//     .send(`Email: ${req.body.email}, phoneNumber: ${req.body.phoneNumber}`);
// });

// app.get("/test", (req, res) => {
//     res.status(200).send("test response");
// });

//start our server
server.listen(process.env.PORT || 8999, () => {
  const serverAddress: any = server.address();
  console.log(`Server started on port something ${serverAddress.port}:)`);
});


// var newRoute = express.Router();

// newRoute.get("/", (req, res) => {
//     res.status(200).send("new valid route");
// });

// newRoute.get("/something", (req, res) => {
//     res.status(200).send("new valid route");
// });

// app.use("/test/", newRoute);