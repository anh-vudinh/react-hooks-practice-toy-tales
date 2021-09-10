import React,{useState} from "react";

function ToyForm({postToyToDB, toysArray}) {

  const initialFormState = {
    name: "",
    image: ""
  }

  const [formData, setFormData] = useState(initialFormState)

  function handleFormData(event){
    setFormData({...formData, [event.name]: event.value})
  }

  function onFormSubmit(event){
    event.preventDefault()
    const newToyObject = {
      id: toysArray.length === 0? 1 : toysArray[toysArray.length -1].id + 1,
      ...formData,
      likes: 0
    }
    postToyToDB(newToyObject)
    setFormData(initialFormState)
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={onFormSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={formData.name}
          onChange={(e)=> handleFormData(e.target)}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={formData.image}
          onChange={(e)=> handleFormData(e.target)}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
