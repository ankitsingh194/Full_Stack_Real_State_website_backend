import asyncHandler from 'express-async-handler'
import { prisma } from '../config/prismaConfig.js'

const toFav = asyncHandler( async(req,res)=> {
    const {email} = req.body;
    const {rid} = req.params;

    try{

        const user = await prisma.user.findUnique({
            where: {email}
        })

        if (user.favResidenciesID.includes(rid)){
            const updateUser = await prisma.user.update({
                where: {email},
                data: {
                    favResidenciesID :{
                        set:  user.favResidenciesID.filter((id)=> id !==rid)
                    }
                }
            });
            res.send({message:"Removed from favorites", user: updateUser})
        } else {
            const updateUser = await prisma.user.update({
                where: {email},
                data:{
                    favResidenciesID: {
                        push: rid
                    }
                }
            })
            res.send({message: "Update favorites", user: updateUser})
        }

    }catch(err)
    {
        throw new Error(err.message);
    }
})

export default toFav