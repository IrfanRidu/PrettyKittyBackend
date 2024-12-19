const Order = require("./order.model")


const createAOrder=async(req,res)=>{
    try {
       const newOrder= await Order(req.body);
       const savedOrder=newOrder.save();
       res.status(200).json(savedOrder);
    } catch (error) {
        console.log("Error Creating Order",error)
        res.status(500).json({massage:"Cann't Process the Order try again"});

       
    }
}


const getOrderByEmail= async(req,res)=>{

    try {
        const {email}=req.params;
        const orders = await Order.find({email}).sort({createdAt:-1})

        if(!orders){
            return res.status(400).json({massage:"NO orders found"})
        }
        res.status(200).json(orders);


    } catch (error) {
        console.log("Error Creating Order",error)
        res.status(500).json({massage:"Cann't Process the Order List try again"}); 
    }

}

module.exports={createAOrder,getOrderByEmail}