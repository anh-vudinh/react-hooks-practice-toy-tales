import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({toysArray, deleteToyFromDB, patchToyToDB}) {

  const singleToyObject = toysArray.map(toy => <ToyCard key={toy.id} toy={toy} deleteToyFromDB={deleteToyFromDB} patchToyToDB={patchToyToDB}/>)

  return (
    <div id="toy-collection">{singleToyObject}</div>
  );
}

export default ToyContainer;
