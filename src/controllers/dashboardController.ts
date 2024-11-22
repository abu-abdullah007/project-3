import { Request, Response } from "express";
import prisma from "../../DB";

// after login send data to user ---------------------------------------------//

export async function sendDashboardData(request: Request, response: Response) {
    const { email } = request.body
    try {
        const findUser = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (findUser) {
            response.status(200).json({
                message: "Your credentials get successfuly !",
                status: 200,
                success: true,
                findUser
            })
        }
    } catch (error) {
        response.status(500).json({
            message: "User data getting faild",
            status: 500,
            success: false,
            error
        })
    }
}

// create post controller ---------------------------------------------------//


export async function updateData(request: Request, response: Response) {
    const { username, email, password } = request.body

    if (username || email || password) {
        try {
            const findDBUser = await prisma.user.findUnique({
                where: {
                    email
                }
            })

            if (findDBUser) {
                const updateFind = await prisma.user.update({
                    where: {
                        email
                    },
                    data: {
                        username,
                        email,
                        password
                    }
                })

                response.status(200).json({
                    message: "User data updated",
                    status: 200,
                    success: true,
                    updateFind
                })
            } else {
                response.status(404).json({
                    message: "User not found",
                    status: 404,
                    success: false
                })
            }
        } catch (error) {
            response.status(500).json({
                message: "User data update faild",
                status: 500,
                success: true,
                error
            })
        }
    }else{
        response.status(404).json({
            message: "No data given",
            status: 404,
            success: true,
            username,
            email,
            password
        })
    }
}