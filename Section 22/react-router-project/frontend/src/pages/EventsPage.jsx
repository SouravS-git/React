import EventsList from '../components/EventsList';
import {Await, useLoaderData} from 'react-router-dom';
import {Suspense} from "react";

function EventsPage() {
  /*const [isLoading, setIsLoading] = useState(false);
  const [fetchedEvents, setFetchedEvents] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true);
      const response = await fetch('http://localhost:8080/events');

      if (!response.ok) {
        setError('Fetching events failed.');
      } else {
        const resData = await response.json();
        setFetchedEvents(resData.events);
      }
      setIsLoading(false);
    }

    fetchEvents();
  }, []);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
      {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />}
    </>
  );*/

  const data = useLoaderData();   // We can also use this useLoaderData() to get the data inside of EventsList component

  /*if (data.isError){
    return <p>{data.message}</p>;
  }*/

  /*return (
    <EventsList events={data.events} />
  );*/

  return (
    <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
      <Await resolve={data.events}>
        {events => <EventsList events={events} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

// useLoader automatically resolves the promise and returns the data
/*
export function loader() {
  return fetch('http://localhost:8080/events');
}
*/

/*export async function loader() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // Manually handling the error
    // return {isError: true, message: 'Could not fetch events.'};

    // This way React router will automatically render the closest errorElement in case of error
    // throw { message: 'Could not fetch events.' };
    // throw new Error('Could not fetch events.');
    throw new Response(JSON.stringify({message: 'Could not fetch events.'}), { status: 500 });

    // Doesn't work with React Router v7
    /!*return json(
      {message: 'Could not fetch events.'},
      { status: 500 }
    );*!/

  } else {
    return await response.json();
  }
}*/

async function fetchEvents() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // Manually handling the error
    // return {isError: true, message: 'Could not fetch events.'};

    // This way React router will automatically render the closest errorElement in case of error
    // throw { message: 'Could not fetch events.' };
    // throw new Error('Could not fetch events.');
    throw new Response(JSON.stringify({message: 'Could not fetch events.'}), { status: 500 });

    // Doesn't work with React Router v7
    /*return json(
      {message: 'Could not fetch events.'},
      { status: 500 }
    );*/

  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export function loader() {

  /*return defer({
    events: fetchEvents()
  });*/

  // For React Router v7
  return {
    events: fetchEvents()
  }
}
