import foodModel from "../models/foodModel.js";
import fs from 'fs';


//add food item
const addFood=async (req,res)=>{
    let image_filename=`${req.file.filename}`;
    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try{
        await food.save();
        res.json({'success':true,'message':'Food is added'});
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:'error'});
    }

}

//get foods
const listFood=async (req,res)=>{
    try{
        const foods=await foodModel.find();
        res.json({success:"true",data:foods});
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:'error'});
    }

}

const listFoodById= async (req,res)=>{
    try {
    const food = await foodModel.findById(req.params.id);
    res.json({ success: true, data: food });
  } catch (err) {
    res.json({ success: false, message: "Error fetching item" });
  }
}

const updateFood = async (req, res) => {
  try {
    const id=req.params.id;
    const {  name, description, price, category } = req.body;
    let updateData = { name, description, price, category };
    

    if (req.file) {
      const oldFood = await foodModel.findById(id);
      fs.unlink(`uploads/${oldFood.image}`, () => {
        console.log('Old image deleted');
      });
      updateData.image = req.file.filename;
    }

    const updatedFood = await foodModel.findByIdAndUpdate(id, updateData, { new: true });
    res.json({ success: true, message: 'Food updated', data: updatedFood });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: 'Error updating food' });
  }
};

//remove food item
const removeFood=async(req,res)=>{
    try{
        const food=await foodModel.findById(req.query.id);
        fs.unlink(`uploads/${food.image}`,()=>{
            console.log('image deleted');
        })
        await foodModel.findByIdAndDelete(req.query.id);
        res.json({success:true,message:'Food Deleted'});
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:'error'});
    }
}

export {addFood,listFood,removeFood,updateFood,listFoodById}