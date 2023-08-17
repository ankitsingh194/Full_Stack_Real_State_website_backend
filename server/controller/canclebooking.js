import asyncHandler from 'express-async-handler'
import { prisma } from '../config/prismaConfig.js'

const cancelBooking = asyncHandler(async (req, res) =>{
    const {email} = req.body;
    const {id} = req.params
    try {
        const user = await prisma.user.findUnique({
            where: {email: email},
            select: {bookedVisits:true}
        })

        const index = user.bookedVisits.findIndex((visit)=> visit.id === id)

        if(index === -1){
            res.status(404).json({message:"Booking not found"})
        } else {
            user.bookedVisits.splice(index,1)
            await prisma.user.update({
                where : {email},
                data: {
                    bookedVisits: user.bookedVisits
                }
            })
            res.send("Booking cancelled successfully")
        }
    }catch(err){
        throw new Error(err.message)
    }
})


export default cancelBooking