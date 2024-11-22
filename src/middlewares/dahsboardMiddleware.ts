import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import 'dotenv/config'
const JWT_SECRET = process.env.JWT_SECRET

export async function tokenValidation(request: Request, response: Response, next: NextFunction) {
    const token = request.headers.authorization?.split(' ')[1]

    if (token) {
        try {
            const tokenVrfy = jwt.verify(token, JWT_SECRET as string)
            request.body = {
                tokenExtract:tokenVrfy,
                ...request.body
            }
            next()
        } catch (error) {
            response.status(500).json({
                message:"Invalid token !",
                status:500,
                success:false
            })
        }
    }else{
        response.status(404).json({
            message:"Token not found !",
            status:404,
            success:false
        })
    }
}