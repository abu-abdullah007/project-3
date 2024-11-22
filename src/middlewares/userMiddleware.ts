import { NextFunction, Request, Response } from "express";
import prisma from "../../DB";

// user credentials checking middleware-----------------------------------//

export async function checkUserMiddleware(request: Request, response: Response, next: NextFunction) {
    const { username, email, password } = request.body

    if (username && email && password) {
        const findUser = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (findUser) {
            response.status(409).json({
                message: "User allready exist",
                status: 409,
                success: false
            })
        } else {
            next()
        }
    } else {
        response.status(400).json({
            message: "No any credentials are given",
            status: 400,
            success: 400
        })
    }
}



// user data matching with database ---------------------------------------//


export async function checkDataValidation(request:Request,response:Response,next:NextFunction){
    const {email,password} = request.body

    try {
        const findUsers = await prisma.user.findUnique({
            where:{
                email
            }
        })

        if(findUsers){
            if(password === findUsers.password){
                next()
            }else{
                response.status(401).json({
                    message:"Password not match, Please try againe !",
                    status:401,
                    success:false
                })
            }
        }else{
            response.status(404).json({
                message:"User not found !",
                status:404,
                success:false
            })
        }
    } catch (error) {
        response.status(500).json({
            message:"Authentication faild",
            status:500,
            success:false,
            error
        })
    }
}