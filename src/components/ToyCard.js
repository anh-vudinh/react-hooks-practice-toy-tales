import React, {useState} from "react";

function ToyCard({toy, deleteToyFromDB, patchToyToDB}) {
  const {name, image} = toy
  const [likes, setLikes] = useState(toy.likes)

  function handleAddLikes(){
    setLikes(likes+1)
    const toyToPatch ={
      id: toy.id,
      likes: likes+1
    }
    patchToyToDB(toyToPatch)
  }

  return (
    <div className="card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleAddLikes}>Like {"<3"}</button>
      <button className="del-btn" onClick={()=> deleteToyFromDB(toy)}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
