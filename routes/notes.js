const express =require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//Route 1: get all the notes using GET: /api/notes/fethchallnotes . Login required
router.get('/fetchallnotes', fetchuser, async(req,res)=>{
    try{
   const notes = await Note.find({user:req.user.id})
    res.json(notes)
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
      }
})
// route 2 adding the note login is required
router.post('/addnote', fetchuser,[
   body('title', 'Enter a valid Title').isLength({min:3}),
   body('description', 'Enter a valid description').isLength({min:5}),],async (req,res)=>{

    try{
        const {title, description, tag} = req.body;
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const note = new Note({
                title, description, tag, user: req.user.id
        })
const savedNote = await note.save()
res.json(savedNote);
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})


// route 3 updating the note login is /api/notes/updatenote/":id requried
router.put('/updatenote/:id',fetchuser,async (req,res) =>{
    const {title,description,tag}= req.body;
    try {
        const newNote = {};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(title){newNote.tag=tag};

    //find the note and then update it
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not found")}

    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not allowed")
    }
    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note})
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
    
})

// route 4 deleting the note login is /api/notes/deletenote/":id requried
router.delete('/deletenote/:id',fetchuser,async (req,res) =>{
  try {
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not found")}

    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not allowed")
    }
    note = await Note.findByIdAndDelete(req.params.id )
        res.json({"Sucess": "This note has been deleted", note:note})
  } catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error")
}
    //find the note and then delete it
   
    
})
module.exports = router