import express from "express";
import createUser from '../controller/usercntrl1.js'
import bookVisit from '../controller/usercntrl.js'
import getAllBookings from "../controller/usercntrl3.js";
import cancelBooking from "../controller/canclebooking.js";
import toFav from "../controller/addfavRes.js";
import getAllFavorites from "../controller/getAllFavRes.js";
import jwtCheck from "../config/auth0Config.js";

const router = express.Router()


router.post("/register",createUser);
router.post("/bookvisit/:id", bookVisit)
router.post("/allBookings",getAllBookings)
router.post("/cancleBooking/:id",cancelBooking)
router.post("/toFav/:rid", toFav)
router.post("/allFav/", getAllFavorites)

export {router as userRoute}