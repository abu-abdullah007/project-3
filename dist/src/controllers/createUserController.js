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
exports.createUser = createUser;
exports.loginUser = loginUser;
const DB_1 = __importDefault(require("../../DB"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
// create user and signup controller -------------------------------------//
function createUser(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email, password } = request.body;
        try {
            const registerUser = yield DB_1.default.user.create({
                data: {
                    username,
                    email,
                    password
                }
            });
            response.status(201).json({
                message: "User created successfuly",
                status: 201,
                success: true
            });
        }
        catch (error) {
            response.status(500).json({
                message: "User creation faild !",
                status: 500,
                success: false,
                err: error
            });
        }
    });
}
// login controller -------------------------------------------------------//
function loginUser(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = request.body;
        const token = jsonwebtoken_1.default.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
        response.status(200).json({
            message: "Login successfuly",
            status: 200,
            success: true,
            token
        });
    });
}
