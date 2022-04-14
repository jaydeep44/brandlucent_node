const Header = require('../models/headerModel')
const Footer = require('../models/footerModel')
const Banner = require("../models/bannerModel")
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// header CURD 
exports.createHeader = (req,res)=>{
    try{
        const body = req.body
        if (Object.keys(body).length === 0 && body.constructor === Object) {
            res.status(400).send({ message: "Data Not Proper Formated..." });
          }
         const header = new Header(body);
         header.save().then(headerInfo =>{
             if(!headerInfo){
                 res.status(400).send({
                     message:"header not created !",
                     headerData : headerInfo
                 })
             }else{
                 res.status(200).send({
                     message:"header created succusfully !",
                     headerData:headerInfo
                 })
             }
             
             }).catch(error =>{
             res.status(400).send({
                 message:"header not created !",
                 subError:error.message
             })
         })
    }catch(error){
        res.status(400).send({
            message:"Oops ! something went wrong in create herder",
            subError:error.message
        })
    }
   

}
exports.getHeaderById = (req,res)=>{
    try{
        const headerid = req.query.headerid
        if (!ObjectId.isValid(headerid) && !ObjectId(headerid)) {
            res.status(400).send({ message: "user id not valid" });
          }else{
            Header.findById(headerid).then(headerData=>{
                if(!headerData){
                    res.status(400).send({
                        message:"header not found",
                    })
                }else{
                    res.status(200).send({
                        message:"header Data",
                        headerData:headerData
                    })
                }
        }).catch(error=>{
            res.status(400).send({
                message:"header not found",
                subError:error.message
            })
           })
          }
      }catch(error){
        res.status(400).send({
            message:"Oops try agin with header id",
            subError:error.message
        })
    }
    

}
exports.deleteHeaderById =(req,res)=>{
    try{
        const headerid = req.query.headerid
        if (!ObjectId.isValid(headerid) && !ObjectId(headerid)) {
            res.status(400).send({ message: "footer id not valid" });
          }else{
            Header.findByIdAndDelete(headerid,(error,deletedData)=>{
                if(error){
                    res.status(400).send({
                        message:"header not found",
                        subError:error.message
                    })
                }else{
                    res.status(200).send({
                        message:"header deleted Data",
                        headerData:deletedData
                    })
                }
            });
          }
      
    }catch(error){
        res.status(400).send({
            message:"Oops try agin with header id",
            subError:error.message
        })
    }
}
exports.updateHeader = (req,res)=>{
    try{
        
        const body = req.body;
        const headerUpdateData = {
            labelofheader:body.labelofheader,
            titleofcontent:body.titleofcontent,
            contentofpage:body.contentofpage
        }
        if (Object.keys(body).length === 0 && body.constructor === Object) {
            res.status(400).send({ message: "body will not empty" });
          } 
        else if (!ObjectId.isValid(body._id) && !ObjectId(body._id)) {
            res.status(400).send({ message: "user id not valid" });
          }else{
            Header.findByIdAndUpdate({ _id: body._id },headerUpdateData,{ new: true },(error,updatedData)=>{
                if(error){
                    res.status(400).send({
                        message:"header not found",
                        subError:error.message
                    })
                }else{
                    res.status(200).send({
                        message:"header updated Data",
                        headerData:updatedData
                    })
                }
            });
          }
      
    }catch(error){
        res.status(400).send({
            message:"Oops try agin with header id",
            subError:error.message
        })
    }
}


//CURD footer
exports.createFooter = (req,res)=>{
    try{
        const body = req.body
        if (Object.keys(body).length === 0 && body.constructor === Object) {
            res.status(400).send({ message: "body should not empty" });
          }else{
            const footer = new Footer(body);
            footer.save().then(footerInfo =>{
                if(!footerInfo){
                    res.status(400).send({
                        message:"footer not created !",
                        headerData : headerInfo
                    })
                }else{
                    res.status(200).send({
                        message:"footer created succusfully !",
                        footerData:footerInfo
                    })
                }
                
                }).catch(error =>{
                res.status(400).send({
                    message:"footer not created !",
                    subError:error.message
                })
            })  
          }
   
    }catch(error){
        res.status(400).send({
            message:"Oops ! something went wrong in create footer",
            subError:error.message
        })
    }
   

}

exports.getFooter = (req,res)=>{
    try{
        const footerValue = req.query.footerkey
        if(!footerValue){
            Footer.find().then(footerData =>{
                if(!footerData.length > 0){
                    res.status(400).send({
                        message :"no footer data found",
                        footerData:footerData
                    })
                }else{
                    res.status(400).send({
                        message :"footer data found",
                        footerData:footerData
                    })
                }
    
            }).catch(error=>{
                res.status(400).send({
                    message :"no data found",
                    subError:error.message
                })
            })
        }else{
            Footer.find({title:footerValue}).then(footerData =>{
                if(!footerData.length > 0){
                    res.status(400).send({
                        message : `no ${footerValue} footer data found`,
                        footerData:footerData
                    })
                }else{
                    res.status(200).send({
                        message : `${footerValue} footer data found`,
                        footerData:footerData
                    })
                }
    
            }).catch(error=>{
                res.status(400).send({
                    message :`no ${footerValue} footer data found`,
                    subError:error.message
                })
            })
        }

      }catch(error){
        res.status(400).send({
            message:"Oops something went wrong",
            subError:error.message
        })
    }
    

}

exports.deleteFooterById = (req,res)=>{
    try{
        const footerid = req.query.footerid
        if (!ObjectId.isValid(footerid) && !ObjectId(footerid)) {
            res.status(400).send({ message: "footer id not valid" });
          }else{
            Header.findByIdAndDelete(footerid,(error,deletedData)=>{
                if(error){
                    res.status(400).send({
                        message:"footer data not found",
                        subError:error.message
                    })
                }else{
                    res.status(200).send({
                        message:"footer deleted Data",
                        footerData:deletedData
                    })
                }
            });
          }
      
    }catch(error){
        res.status(400).send({
            message:"Oops try agin with header id",
            subError:error.message
        })
    }
}

exports.updateFooter = (req,res)=>{
    try{
        const body = req.body;
        const footerUpdateData = {
            title:body.title,
            labeloffooter:body.labeloffooter,
            titleoffooter:body.titleoffooter,
            contentofpage:body.contentofpage
        }
        if (Object.keys(body).length === 0 && body.constructor === Object) {
            res.status(400).send({ message: "body will not empty" });
          } 
        else if (!ObjectId.isValid(body._id) && !ObjectId(body._id)) {
            res.status(400).send({ message: "footer id not valid" });
          }else{
            Footer.findByIdAndUpdate({ _id: body._id },footerUpdateData,{ new: true },(error,updatedData)=>{
                if(error){
                    res.status(400).send({
                        message:"footer not found",
                        subError:error.message
                    })
                }else{
                    res.status(200).send({
                        message:"footer updated Data",
                        headerData:updatedData
                    })
                }
            });
          }
      
    }catch(error){
        res.status(400).send({
            message:"Oops try agin with footer id",
            subError:error.message
        })
    }
}

exports.createBanner = async (req,res)=>{
    try{
        let imagePath = "";
        let logo = "";
        if (req.files) {
            logo =req.files.logo[0].path
            imagePath = req.files.banner[0].path;
        }
        const banner = new Banner({
            logo: logo,
            title: req.body.title,
            description: req.body.description,
            banner: imagePath,
        });
      
        await banner.save().then((response) => {
            res.status(200).send({
                message:"banner created successfully !",
                bannerData : response
            });
          })
          .catch((error) => {
            res.status(400).send({ 
                message:"Banner not created !",
                subError : error.message
            });
          });
    }catch(error){
        res.status(400).send({ 
            message:"Banner not created !",
            subError : error.message
        });
    }
   
}
exports.getBanner = async(req,res)=>{
    try{
        const bannerid =req.query.bannerid;
        if(!bannerid){
            Banner.find().then(bannerData=>{
                res.status(200).send({
                    message:"banner Data",
                    bannerData:bannerData
                })
             }).catch(error =>{
                res.status(400).send({
                    message:"Oops ! something went wrong",
                    subError: error.message
                })
             })
        }else{
            Banner.find({_id:bannerid}).then(bannerData=>{
                res.status(200).send({
                    message:"banner Data",
                    bannerData:bannerData
                })
             }).catch(error =>{
                res.status(400).send({
                    message:"Oops ! something went wrong",
                    subError: error.message
                })
             })
        }
       
    }catch(error){
        res.status(400).send({
            message:"Oops ! something went wrong",
            subError: error.message
        })
    }
}