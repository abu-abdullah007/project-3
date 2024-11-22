"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserMiddleware = checkUserMiddleware;
const DB_1 = __importDefault(require("../../DB"));
function checkUserMiddleware(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email, password } = request.body;
        if (username && email && password) {
            const findUser = yield DB_1.default.user.findUnique({
                where: {
                    email
                }
            });
            if (findUser) {
                response.status(409).json({
                    message: "User allready exist",
                    status: 409,
                    success: false
                });
            }
            else {
                next();
            }
        }
        else {
            response.status(400).json({
                message: "No any credentials are given",
                status: 400,
                success: 400
            });
        }
    });
}
