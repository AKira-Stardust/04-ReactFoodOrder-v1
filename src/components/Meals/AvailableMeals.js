import React, { useEffect, useState } from "react";

import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";

import MealItem from "./MealItem/MealItem";

//DB LINK
const mealDBLink = 
"https://react-http-start-default-rtdb.asia-southeast1.firebasedatabase.app/Meals.json";

  //COMPONENT FUNCTION
  function AvailableMeals() {

    //meals STATE
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);


    //ASYNC FUNCTION
    async function fetchMeals() {
      const response = await fetch(mealDBLink);
      
      if(!response.ok){
        throw new Error("Something went wrong!");}
      
      const data = await response.json();
      
      const loadedMeals = [];

      for (const key in data){
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    }

    
    //USE EFFECT CALL
    useEffect( ()=>{
       fetchMeals().catch( (error) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
    }, []);


    //ALTERNATE RETURN FOR LOADING..
    if (isLoading){
      return(
        <section className={styles.MealsLoading}>
          <p>Loading.. </p>
        </section>
      );
    }

    //ALTERNATE RETURN FOR ERROR.
    if (httpError){
      return(
        <section className={styles.MealsError}>
          <p>{httpError}</p>
        </section>
      );
    }

    //MAP FUNCTION FOR CALLING MEALITEM COMPONENT
    // const mealsList = DUMMY_MEALS.map(
      const mealsList = meals.map(
        (meal) => {return(
            <MealItem 
              id={meal.id}
              key={meal.id} 
              name={meal.name} 
              description={meal.description}
              price={meal.price} 
            />
        );}
    );

    
    //JSX RETURN 
    return(
        <section className={styles.meals}>
            <Card>
              <ul> {mealsList} </ul>
            </Card>
        </section>
    );
}

export default AvailableMeals;


//DUMMY MEAL FOR DEFAULT
// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },
//   ];