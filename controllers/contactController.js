
const asyncHandler = require("express-async-handler")
const Student = require("../models/contactModel")

//description get all students
//route get /api/students
//access private
const getAllContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contact);
});

//description get a students
//route get /api/students/:id
//access private
const getSingleContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact)
});

//description to create a students
//route post /api/students
//access private
const createContact = asyncHandler(async(req,res)=>{
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All feilds are mandatory")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    res.status(201).json(contact)
    
});
//description update students
//route put /api/students/:id
//access private
const updateContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("user dont have permission to update the contact");
    }
    const updatedContact = await Contact.findOneAndUpdate(
        req.param.body,
        req.body,
        {new: true}
    )
    res.status(200).json(updatedContact)
});

//description delete a students
//route get /api/students/:id
//access private
const deleteContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("user dont have permission to delete the contact");
    }
    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(contact)
});

module.exports = {getAllContact,getSingleContact,createContact,updateContact,deleteContact}