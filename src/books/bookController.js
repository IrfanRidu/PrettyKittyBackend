const Book = require("./book.model");

const postABook=async (req,res)=>{

    try {
        const newBook=await Book({...req.body});
        await newBook.save();
        res.status(200).send({message:"Book Posted",book:newBook})
    } catch (error) {
       console.error(error)
       res.status(500).send({message:"Book Posting failed"})
    }

}

const getAllBooks=async (req,res)=>{

   try {
    const books=await Book.find().sort({createdAt:-1});
 
    res.status(200).send(books)

   } catch (error) {
    console.log("Error fetching books",error);
    res.status(500).send({message:"Cann't fetch books"})
   }
    
}


const getABook=async (req,res)=>{

    try {
        const {id}= req.params;
        const book = await Book.findById(id);

         if(!book){
            return res.status(404).send({message:"Book not found"})
         }
        res.status(200).send(book)
        
    } catch (error) {
        console.log("Failed to fatch a book",error)
        res.status(500).send({message:"Cann't fatch a book"})
    }
}


const updateABook=async (req,res)=>{
 try {
    const {id}=req.params;
    const updatedBook=await Book.findByIdAndUpdate(id ,req.body, {new:true});
    if(!updatedBook){
        return res.status(404).send({message:"Book not found!"})
    }
    res.status(200).send({message:"Book updeted successfully",book:updatedBook})
 } catch (error) {
    console.log("Failed to update the book",error);
    res.status(500).send({message:"Cann't update the book"})
 }

}



const deleteABook=async(req,res)=>{
    try {
        const {id}=req.params;
        const deletedBook=await Book.findByIdAndDelete(id)
        if(!deletedBook){
            return res.status(404).send({message:"Book not found!"})
        }
        res.status(200).send({message:"Book deleted successfully"})
        
    } catch (error) {
     console.log("Failed to delete the book",error);
     res.status(500).send(error,"Cann't delete the book")
    }
}


module.exports={
 postABook,getAllBooks,getABook,updateABook,deleteABook

}