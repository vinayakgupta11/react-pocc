import React, { useEffect, useState, useCallback } from "react";
import IngredientList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import ErrorModal from '../UI/ErrorModal'
import Search from "./Search";

function Ingredients() {
  const [userIngredient, setUserIngredient] = useState([]);
  const [isLoading,setIsLoading]= useState(false);
  const [error,setError]= useState();
  // useEffect(() => {
  //   fetch("https://react-hooks-247b2.firebaseio.com/ingredients.json")
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       const loadedIng = [];
  //       for (const key in responseData) {
  //         loadedIng.push({
  //           id: key,
  //           title: responseData[key].title,
  //           amount: responseData[key].amount,
  //         });
  //       }
  //       setUserIngredient(loadedIng);
  //     });
  // }, []);
  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    setUserIngredient(filteredIngredients);
  }, []);

  const addIngredientHandler = (ingredient) => {
    setIsLoading(true);
    fetch("https://react-hooks-247b2.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setIsLoading(false);
        return response.json();
      })
      .then((responseData) => {
        setUserIngredient((prevIngredients) => [
          ...prevIngredients,
          { id: responseData.name, ...ingredient },
        ]);
      });
  };
  const removeIngredientHandler = (ingredientId) => {
    setIsLoading(true);
    fetch(
      `https://react-hooks-247b2.firebaseio.com/ingredients/${ingredientId}.json`,
      {
        method: "DELETE",
      }
    ).then((responseData) => {
      setIsLoading(false);
      setUserIngredient((prevIngredients) =>
        prevIngredients.filter((ingredient) => ingredient.id !== ingredientId)
      );
    }).catch(error=>
    {
      setError(error.message);
      setIsLoading(false);
    });
  };
const clearError=()=>{
  setError(null);
 
}
  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={userIngredient}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
