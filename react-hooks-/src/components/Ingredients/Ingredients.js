import React, {
  useEffect,
  useReducer,
  useState,
  useCallback,
  useMemo,
} from "react";
import IngredientList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";
const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter((ing) => ing.id !== action.id);
    default:
      throw new Error("Should not get there!");
  }
};
const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null };
    case "RESPONSE":
      return { ...curHttpState, loading: false };
    case "ERROR":
      return { loading: false, error: action.errorMessage };
    case "CLEAR":
      return { ...curHttpState, error: null };
    default:
      throw new Error("Should not be reached!");
  }
};
function Ingredients() {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []); //initially empty array
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
  });
  // const [userIngredient, setUserIngredient] = useState([]);
  // const [isLoading,setIsLoading]= useState(false);
  // const [error,setError]= useState();
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
    // setUserIngredient(filteredIngredients);
    dispatch({ type: "SET", ingredients: filteredIngredients });
  }, []);

  const addIngredientHandler = useCallback((ingredient) => {
    // setIsLoading(true);
    dispatchHttp({ type: "SEND" });
    fetch("https://react-hooks-247b2.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        // setIsLoading(false);
        dispatchHttp({ type: "RESPONSE" });
        return response.json();
      })
      .then((responseData) => {
        dispatch({
          type: "ADD",
          ingredient: { id: responseData.name, ...ingredient },
        });
        // setUserIngredient((prevIngredients) => [
        //   ...prevIngredients,
        //   { id: responseData.name, ...ingredient },
        // ]);
      });
  }, []);
  const removeIngredientHandler = useCallback((ingredientId) => {
    // setIsLoading(true);
    dispatchHttp({ type: "SEND" });
    fetch(
      `https://react-hooks-247b2.firebaseio.com/ingredients/${ingredientId}.json`,
      {
        method: "DELETE",
      }
    )
      .then((responseData) => {
        // setIsLoading(false);
        dispatchHttp({ type: "RESPONSE" });
        dispatch({ type: "DELETE", id: ingredientId });
        // setUserIngredient((prevIngredients) =>
        //   prevIngredients.filter((ingredient) => ingredient.id !== ingredientId)
        // );
      })
      .catch((error) => {
        dispatchHttp({ type: "ERROR", errorMessage: "Something went wrong!" });
        // setError(error.message);
        // setIsLoading(false);
      });
  }, []);
  const clearError = useCallback(() => {
    // setError(null);
    dispatchHttp({ type: "CLEAR" });
  },[]);

const ingredientList=useMemo(()=>{
  return(
    <IngredientList
    ingredients={userIngredients}
    onRemoveItem={removeIngredientHandler}
  />
  )

},[userIngredients,removeIngredientHandler]);

  return (
    <div className="App">
      {httpState.error && (
        <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
      )}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={httpState.loading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
