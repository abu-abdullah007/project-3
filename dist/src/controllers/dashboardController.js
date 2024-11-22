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
exports.sendDashboardData = sendDashboardData;
const DB_1 = __importDefault(require("../../DB"));
function sendDashboardData(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = request.body;
        try {
            const findUser = yield DB_1.default.user.findUnique({
                where: {
                    email
                }
            });
            if (findUser) {
                response.status(200).json({
                    message: "Your credentials get successfuly !",
                    status: 200,
                    success: true,
                    findUser
                });
            }
        }
        catch (error) {
            response.status(500).json({
                message: "User data getting faild",
                status: 500,
                success: false,
                error
            });
        }
    });
}
