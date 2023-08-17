import asyncHandler from 'express-async-handler'
import toFav from './addfavRes.js';
import { prisma } from '../config/prismaConfig.js'



const getAllFavorites = asyncHandler(async (req, res) => {
    const {email} = req.body;
    try{
        const favRead = await prisma.user.findUnique({
            where: {email},
            select:{favResidenciesID:true},
        });
        res.status(200).send(favRead);

    }catch(err){
        throw new Error(err.message);
    }
});

export default getAllFavorites