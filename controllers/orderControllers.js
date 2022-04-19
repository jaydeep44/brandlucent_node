const Order = require("../models/ordersModel");
const Product = require("../models/productModel");
exports.saveOrder = async (req, res) => {
  const orderSave = new Order({
    productId: req.body.productId,
    userId: req.body.userId,
  });
  await orderSave
    .save()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

exports.getUserOrder = async (req, res) => {
  const orders = await Order.find({ userId: req.params.id })
    .select("-userId")
    .populate([{ path: "productId" }])

    // .populate([{ path: "userId" }])

    .sort({ created_at: -1 })

    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate([{ path: "productId" }])

    .sort({ created_at: -1 })

    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};

exports.getBestSelling = async(req,res)=>{
  try{
     var f = [] ;
     await Order.find().select({productId: 1 ,_id : 0}).populate({path:"productId", select:{_id:0,cat_id : 0}}).sort({productId : -1}).limit(5) 
      .then(bestSelling =>{
            if(bestSelling.length === 0){
              res.status(200).send({
                message:"No product in best selling"
              })
            }else{
                for(var i = 0; i < bestSelling.length ; i++){
                  if(!f.includes(bestSelling[i].productId)){
                     f.push(bestSelling[i].productId);
                   }
              }
               res.status(200).send({
                message:"best selling product data",
                bestSelling : f
              })
            }
      }).catch(error=>{
        res.status(400).send({
          message:"best selling order not found",
          subError:error.message
        })
      })

     
  }catch(error){
    res.status(400).send({
      message:"Oops ! something went wrong in best selling",
      subError : error.message
    })
  }
}
exports.getpopularProduct = async(req,res)=>{
  try{
    
     var productId = [] ;
      var visitNumber = []
     await Order.find().populate({path:"productId"}).select({_id:0,userId:0})
      .then(popularProduct =>{
            if(popularProduct.length === 0){
              res.status(200).send({
                message:"No product in best selling"
              })
            }else{
                for(var i = 0; i < popularProduct.length ; i++){
                 productId.push(popularProduct[i].productId._id)
                 if(!visitNumber.includes(popularProduct[i].productId.visitedNumberOfTime)){
                  visitNumber.push(popularProduct[i].productId.visitedNumberOfTime)

                 }
              }
            var map = productId.reduce(function(p, c) {
              p[c] = (p[c] || 0) + 1;
              return p;
            }, {});
            
            var newTypesArray = Object.keys(map).sort(function(a, b) {
              return map[b] - map[a];
            });

             popularproduct(newTypesArray).then(pop=>{
                 res.status(200).send({
                        message:"best selling product data",
                        popularProduct :pop
                      })
             }).catch(error=>{
              res.status(400).send({
                message:"best selling product data",
                subError :error.message
              })
             })
            }
      }).catch(error=>{
        res.status(400).send({
          message:"best selling order not found",
          subError:error.message
        })
      })

     
  }catch(error){
    res.status(400).send({
      message:"Oops ! something went wrong in best selling",
      subError : error.message
    })
  }
}


async function popularproduct(productids) { // count occurances
      try{
           var a = []
          if(productids.length < 0){
             return {
               message:"popular product not found!"
             }
          }else{
            for(var i=0 ; i<productids.length ; i++){
              await Product.findById(productids[i]).then(popularProduct=>{
                a.push(popularProduct)
                
              }).catch(error=>{
                return {
                  message:error.message
                }
              })
            }
          }
      }catch(error){
        return {
          message:error.message
        }
      }
      return a;
}

