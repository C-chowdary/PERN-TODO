import React, { Fragment, useState } from 'react'

function InputTodo() {
    const [description,setDescription] = useState("");

    function changehandler(event){
        const value = event.target.value;
        setDescription(value);
    }
    async function onSubmitForm(event){
        event.preventDefault();
        try {
            const body = {description};
            // eslint-disable-next-line
            const response = await fetch("http://localhost:5001/todos",{
                method: "post",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(body)
            });
           window.location = "/";
        } catch (err) {
            console.error(err.message);
        }

    }

  return (
    <Fragment>
   
      <h1 className='text-center mt-5'>Todo List</h1>
      <form className='d-flex' onSubmit={onSubmitForm}>
        <input type="text" className='form-control' value={description} onChange={changehandler} />
        <button className='btn btn-success'>Add</button>
      </form>
  
    </Fragment>
  )
}

export default InputTodo;
