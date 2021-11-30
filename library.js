
const express= require('express');

const mongoose = require('mongoose');
const app= express();

app.use(express.json())

const connect =()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/library")
}


  // books schema
 const bookschema= new mongoose.Schema({
      bookname:{type:String,required:true},
      body:{type:String,required:true},
      price:{type:Number,required:true},
      id:{type:Number,required:true},
     
 
   section_id:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"section",
       required:true
   },
    checkout_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"checkout",
        required:true
    },

   author_id:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"author",
    required:true
   }]
 }
,
 {
     versionKey:false,
     timestamps: true,
 })

 const books=mongoose.model("Book",bookschema); // books collections


 // author schema
 const authorschema=new mongoose.Schema({
     first_name:{type:String,required:true},
     last_name:{type:String,required:false},

     book_ids:[{ 
         type:mongoose.Schema.Types.ObjectId,
         ref:"Book",
         required:true
     }]

 })

  const author=mongoose.model("author",authorschema)  // author collection


  // checkout schema
 const checkoutschema=new mongoose.Schema({
     id:{type:Number,required:true},
     type:{type:Boolean,required:true},
    
 })

 //checkout collection
 const checkout=mongoose.model('checkout',checkoutschema)


// checkout crud operations

//   app.post("/checkouts", async (req, res) => {
//        const checkout= await checkout.create(req.body);
//        res.status(201).send({checkout})
//   })

   app.get("/checkouts", async (req, res) => {
       const checkout= await checkout.find().lean().exec();
       res.send({checkout})
   })






 // section schema 
  const sectionschema= new mongoose.Schema({
        title:{type:String,required:true},
        //   books_ids:[{
        //       type:mongoose.Schema.Types.ObjectId,
        //       ref:"book",
        //       required:true
        //   }],
  },{
    versionKey:false,
    timestamps: true,
  })

  const section= mongoose.model("section",sectionschema); // section collections

 app.post("/sections", async (req, res) => {
     const section= await section.create(req.body);
     res.send({section});
 })





 console.log("hello")

app.listen(1200, async ()=>{
    await connect()
    console.log("listening on port 1200...")
})