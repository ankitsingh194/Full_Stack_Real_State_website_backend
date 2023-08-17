import asyncHandler from 'express-async-handler'
import { prisma } from '../config/prismaConfig.js'


const bookVisit = asyncHandler(async(req,res)=>{
    const {email,date} = req.body
    const {id} = req.params

    


    try{

        const alreadyBooked = await prisma.user.findUnique({
        where: {email},
        select: {bookedVisits : true}
        })

        if(alreadyBooked.bookedVisits.some((visit)=> visit.id === id)){
            res.status(400).send({message:"This residency is already booked by you"})
        }
        else{
            await prisma.user.update({
                where: {email: email},
                data: {
                    bookedVisits: {push: {id,date}}
                }
            })
        }
        res.send("your visit is booked succesfully")
    }catch(err){
        throw new Error(err.message)
    }
})



export default bookVisit
