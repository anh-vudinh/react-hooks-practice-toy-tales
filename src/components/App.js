import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);

//   - _When our application loads_, make a GET request to `/toys` to fetch the toy
//   array. Given your component tree, think about which component should be
//   responsible for the array. After you have put the data in the proper
//   component, your next job is to render the `ToyCard` components on the page.
  const BASE_URL = "http://localhost:3001/toys"
  const [toysArray, setToysArray] = useState([])

  useEffect(()=>{
    fetch(BASE_URL)
    .then(resp => resp.json())
    .then(data => setToysArray(data))
  },[])

// - _When the `ToyForm` is submitted_, make a POST request to `/toys` to save a
//   new toy to the server. Using the ideas of controlled form and inverse data
//   flow, think about how to render a new `ToyCard` for the toy that you created.
  function postToyToDB(toyObject){
    fetch(BASE_URL,{
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(toyObject)
    })
    .then (resp => resp.json())
    .then (data => {
      setToysArray([...toysArray, data])
    })
  }

// - _When the `Donate to Goodwill` button is clicked_, make a DELETE request to
//   `/toys/:id` with the ID of the toy that was clicked to delete the toy from the
//   server. The `ToyCard` that you clicked on should also be removed from the DOM.

  function deleteToyFromDB(toyToDelete){
    fetch(`${BASE_URL}/${toyToDelete.id}`,{
      method: "DELETE",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(toyToDelete)
    })
    .then(resp => resp.json())
    .then(
      setToysArray(toysArray.filter(toy => toy.id !== toyToDelete.id))//delete from toyArray
    )
  }

// - _When the like button is clicked_, make a PATCH request to `/toys/:id` with
//   the id of the toy that was clicked, along with the new number of likes (this
//   should be sent in the body of the PATCH request, as a object:
//   `{ likes: 10 }`), to update the toy on the server. Clicking on the button
//   should also increase the number of likes on the DOM.

  function patchToyToDB(toyToPatch){
    fetch(`${BASE_URL}/${toyToPatch.id}`,{
      method: "PATCH",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(toyToPatch)
    })
  }

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm postToyToDB={postToyToDB} toysArray={toysArray}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toysArray={toysArray} deleteToyFromDB={deleteToyFromDB} patchToyToDB={patchToyToDB}/>
    </>
  );
}

export default App;
