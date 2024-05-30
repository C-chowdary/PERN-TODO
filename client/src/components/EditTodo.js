import React,{Fragment,useState} from 'react'

function EditTodo(props) {
  const [description,setDescription] = useState(props.todo.description);

  async function updateDescription(event){
    event.preventDefault();
    try {
      const body = {description};
      // eslint-disable-next-line
      const response = await fetch(`http://localhost:5001/todos/${props.todo.tid}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      });
     window.location = "/";

    } catch (error) {
      console.error(error.message);
    }

  }

   
  return (
    <Fragment>
      <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${props.todo.tid}`}>Edit</button>
      <div className="modal" id={`id${props.todo.tid}`} onClick={()=>{setDescription(props.todo.description)}}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button type="button" className="close" data-dismiss="modal" onClick={()=>{
                setDescription(props.todo.description);
              }}>&times;</button>
            </div>
            <div className="modal-body">
              <input type='text' className='form-control' value={description} onChange={ e => {
                setDescription(e.target.value);
              }}/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={updateDescription}>Edit</button>
              <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={()=>{
                setDescription(props.todo.description);
              }}>Close</button>
            </div>
          </div>
        </div>
      </div>
</Fragment>
  )
}

export default EditTodo;
