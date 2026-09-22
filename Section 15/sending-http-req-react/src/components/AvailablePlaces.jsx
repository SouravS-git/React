import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import ErrorPage from './Error.jsx';
import {sortPlacesByDistance} from '../loc.js';
import {fetchAvailablePlaces} from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isLoading, setIsLoading] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  /*useEffect(() => {
    fetch('http://localhost:3000/places').then((response) => {
      return response.json();
    }).then((data) => {
      setAvailablePlaces(data.places);
    });
  }, []);*/

  useEffect(() => {
    (async function fetchPlaces(){
      setIsLoading(true);

      try{
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
          setAvailablePlaces(sortedPlaces);
          setIsLoading(false);
        });

      }catch(error){
        setError({message: error.message || 'Something went wrong!'});
        setIsLoading(false);
      }

    })();
  }, []);

  if (error) {
    return (
      <ErrorPage title="An error occurred!" message={error.message} onConfirm={() => setError(null)} />
    );
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoading}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
