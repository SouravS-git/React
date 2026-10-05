import {redirect, useRouteLoaderData} from 'react-router-dom';
import EventItem from "../components/EventItem";

export default function EventDetailPage() {
  const data = useRouteLoaderData('event-detail');

  return (
    <EventItem event={data.event} />
  );
}

export async function loader({ request, params}) {
  const eventId = params.eventId;
  const response = await fetch(`http://localhost:8080/events/${eventId}`);

  if (!response.ok) {
    throw new Response(JSON.stringify({message: 'Could not fetch the event.'}), { status: response.status });
  }else {
    return response;
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