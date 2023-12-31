import React, {useContext,useState} from "react";
import noteContext from "../Context/notes/noteContext";

const AddNote = (props) => {
    const context = useContext(noteContext);
  const {addNote } = context;
  const[note,setNote]=useState({title:"", description:"", tag:""})
  
  const handleClick = (e) =>{
    e.preventDefault();
addNote(note.title, note.description, note.tag="default")
setNote({title:"", description:"", tag:""})
props.showAlert("Added Succesfully","success");
  }

  const onChange= (e)=>{
    setNote({...note, [e.target.name]:e.target.value})
  }
  return (
    <div className="container">
      <h2>Add a Note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
          onChange={onChange}
          value={note.title}
          minLength={5} required
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
          />
         
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={note.description}

            name="description"
            onChange={onChange}
            minLength={5} required

          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            value={note.tag}

            name="tag"
            onChange={onChange}
            minLength={5} required

          />
        </div>
       
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary my-2" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
