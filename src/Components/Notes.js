import React, { useContext, useEffect, useRef,useState } from "react";
import noteContext from "../Context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import {useNavigate} from "react-router-dom"
const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getNotes,editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();

    }
    else{
      navigate("/login")
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);


  const[note,setNote]=useState({id:"", etitle:"", edescription:"", etag:""})
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id,etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
  };
  
  const handleClick = (e) =>{
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    props.showAlert("Updated Succesfully","success");
  }

  const onChange= (e)=>{
    setNote({...note, [e.target.name]:e.target.value})
  }
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        type="button"
        ref={ref}
        className="btn btn-primary mx-2 my-2 d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
       
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
          onChange={onChange}
          minLength={5} required
            type="text"
            value={note.etitle}
            className="form-control"
            id="etitle"
            name="etitle"
            aria-describedby="emailHelp"
          />
         
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
                    minLength={5} required

            type="text"
            className="form-control"
            id="edescription"
            name="edescription"
            value={note.edescription}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            value={note.etag}
            className="form-control"
            id="etag"
            name="etag"
            onChange={onChange}
          />
        </div>
       
      </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">
                Update Note   
                           </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">
          {notes.length===0 && 'No Notes to Display'}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
