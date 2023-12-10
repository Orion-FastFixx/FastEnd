"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const morgan_1 = __importDefault(require("morgan"));
const index_routes_1 = require("./app/routes/index.routes");
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const relations_models_1 = require("./app/models/relations.models");
const scheduler_1 = require("./app/utils/scheduler");
var app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'app/public')));
app.use((0, express_session_1.default)({
    secret: 'house of el',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));
app.use('/api/v1', index_routes_1.routes);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // return the error in JSON format
    return res.status(err.status || 500).json({
        message: err.message,
        error: err,
    });
});
(0, relations_models_1.relations)();
// Start the cron job
(0, scheduler_1.checkOrderTimeouts)();
module.exports = app;
//# sourceMappingURL=app.js.map