import {Await, redirect, useRouteLoaderData} from 'react-router-dom';
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import {Suspense} from "react";

export default function EventDetailPage() {
  const data = useRouteLoaderData('event-detail');
  const {events, event} = data;

  return (
    <>
      <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
        <Await resolve={event}>
          {event => <EventItem event={event} />}
        </Await>
      </Suspense>

      <Suspense fallback={<p style={{textAlign: 'center'}}>Loading events...</p>}>
        <Await resolve={events}>
          {events => <EventsList events={events} />}
        </Await>
      </Suspense>
    </>
  );
}

async function fetchEvent(eventId) {
  const response = await fetch(`http://localhost:8080/events/${eventId}`);

  if (!response.ok) {
    throw new Response(JSON.stringify({message: 'Could not fetch the event.'}), { status: response.status });
  }else {
    const resData = await response.json();
    return resData.event;
  }
}

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

export async function loader({ request, params}) {
  const eventId = params.eventId;

  return {
    event: await fetchEvent(eventId),
    events: fetchEvents()
  }
}

export async function action({request, params}) {
  const eventId = params.eventId;
  const method = request.method;

  const response = await fetch(`http://localhost:8080/events/${eventId}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({message: 'Could not delete the event.'}), { status: response.status });
  }

  console.log(await response.json());

  return redirect('/events');
}