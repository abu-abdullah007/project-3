import { Request, Response } from "express";
import prisma from "../../DB";
import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET


// create user and signup controller -------------------------------------//

export async function createUser(request: Request, response: Response) {
    const { username, email, password } = request.body
    try {
        const registerUser = await prisma.user.create({
            data: {
                username,
                email,
                password
            }
        })

        response.status(201).json({
            message: "User created successfuly",
            status: 201,
            success: true
        })
    } catch (error) {
        response.status(500).json({
            message: "User creation faild !",
            status: 500,
            success: false,
            err: error
        })
    }
}



// login controller -------------------------------------------------------//

export async function loginUser(request:Request,response:Response){
    const {email} = request.body
    const token = jwt.sign({email},JWT_SECRET as string,{expiresIn:'1h'});
    response.status(200).json({
        message:"Login successfuly",
        status:200,
        success:true,
        token
    })
}