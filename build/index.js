"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var products_1 = __importDefault(require("./routes/products"));
var orders_1 = __importDefault(require("./routes/orders"));
var users_1 = __importDefault(require("./routes/users"));
var dashboard_1 = __importDefault(require("./routes/dashboard"));
var app = (0, express_1.default)();
var port = 8080;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.get("/", function (_req, res) {
    res.json("Hello World!");
});
app.use("/products", products_1.default);
app.use("/orders", orders_1.default);
app.use("/users", users_1.default);
app.use("/dashboard", dashboard_1.default);
app.listen(port, function () {
    console.log("Server started at localhost:".concat(port));
});
exports.default = app;
