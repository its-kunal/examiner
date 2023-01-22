"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
require("ejs");
const path_1 = __importDefault(require("path"));
const examiner_1 = __importDefault(require("./routes/examiner"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use("/examiner", examiner_1.default);
app.get("/", (req, res) => {
    res.render('index');
});
const hostname = "127.0.0.1";
app.listen(Number(process.env.PORT), hostname, () => {
    console.log("Server Started");
});
// function middleWare(req: Request, res: Response, next: NextFunction) {
//     console.log('Hello from middleware')
//     next()
// }
