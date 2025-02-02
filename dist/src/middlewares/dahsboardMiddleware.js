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
exports.tokenValidation = tokenValidation;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const JWT_SECRET = process.env.JWT_SECRET;
function tokenValidation(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const token = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (token) {
            try {
                const tokenVrfy = jsonwebtoken_1.default.verify(token, JWT_SECRET);
                request.body = tokenVrfy;
                next();
            }
            catch (error) {
                response.status(500).json({
                    message: "Invalid token !",
                    status: 500,
                    success: false
                });
            }
        }
        else {
            response.status(404).json({
                message: "Token not found !",
                status: 404,
                success: false
            });
        }
    });
}
