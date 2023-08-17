import asyncHandler from 'express-async-handler'

import { prisma } from '../config/prismaConfig.js'


const getAllBookings = asyncHandler(async (req,res) => {
    const {email}= req.body
    try{
        const bookings = await prisma.user.findUnique({
            where: {email},
            select: {bookedVisits:true}
        })
        res.status(200).send(bookings)
    }catch(err){
        throw new Error(err.message);
    }
})


export default getAllBookings