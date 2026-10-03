import { useRef } from "react";
import Meal from "./Meal.jsx";
import useHttp from "../hooks/useHttp.jsx";
import Error from "./Error.jsx";

export default function Meals() {
  const url = 'http://localhost:3000/meals';
  const config = useRef({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const {
    responseData: loadedMeals,
    isLoading: isFetching,
    error
  } = useHttp(url, config, []);

  if (isFetching) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals!" message={error} />;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <Meal key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}