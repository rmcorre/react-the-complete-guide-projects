import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  //Can't use async here beacuse useEffect cannot return
  //a promise
  useEffect(() => {
    //So we create a function inside useEffect to use async
    // on it
    const fetchMeals = async () => {
      const response = await fetch(
        'https://realisticexample-default-rtdb.firebaseio.com/meals.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      //responseData is an object
      const responseData = await response.json();

      //We need an array
      const loadedMeals = [];

      //Transform the fetch data to an array
      //of objects with the corresponding data
      //as we need
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      //We have are data, so set meals
      setMeals(loadedMeals);

      //Loading is over, set isLoading to false to remove it from the DOM
      setIsLoading(false);
    };

    //Because fetchMeals() returns a promise, we use catch() like this
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
