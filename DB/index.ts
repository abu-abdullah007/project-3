import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log:['error','query','warn']
})

export default prisma