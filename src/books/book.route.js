const express=require('express');

const { postABook, getAllBooks, getABook, updateABook, deleteABook } = require('./bookController');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router=express.Router();


router.post("/create-book",verifyAdminToken, postABook);

router.get("/",getAllBooks);


router.get("/:id",getABook);

router.put("/edit/:id",verifyAdminToken,updateABook);

router.delete("/:id",verifyAdminToken,deleteABook);


module.exports=router; 