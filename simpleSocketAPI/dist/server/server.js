"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const ws_1 = __importDefault(require("ws"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
//initialize a simple http server
const server = http.createServer(app);
//middleware and logging
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.text());
app.use(cors_1.default());
app.use(morgan_1.default("dev"));
//initialize the WebSocket server instance
const wss = new ws_1.default.Server({ server });
wss.on("connection", (ws) => {
    //connection is up, let's add a simple event
    ws.on("message", (message) => {
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
    const serverAddress = server.address();
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
//# sourceMappingURL=server.js.map