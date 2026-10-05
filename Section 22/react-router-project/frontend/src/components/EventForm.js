import {Form, redirect, useActionData, useNavigate, useNavigation} from 'react-router-dom';
import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useActionData();

  const errors = data?.errors;
  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      {errors && <ul>
        {Object.values(errors).map(error => (
          <li key={error}>{error}</li>
        ))}
      </ul>}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" defaultValue={event ? event.title : ''} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" defaultValue={event ? event.image : ''} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" defaultValue={event ? event.date : ''} />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" defaultValue={event ? event.description : ''} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save'}</button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function action({request, params}) {
  let url = 'http://localhost:8080/events';
  const method = request.method;
  const data = await request.formData();

  if (method === 'PATCH') {
    const eventId = params.eventId;
    url = `http://localhost:8080/events/${eventId}`;
  }

  const eventData = Object.fromEntries(data.entries());

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData)
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    if (method === 'POST') {
      throw new Response(JSON.stringify({message: 'Could not create the event.'}), { status: response.status });
    }

    if(method === 'PATCH'){
      throw new Response(JSON.stringify({message: 'Could not update the event.'}), { status: response.status });
    }
  }

  console.log(await response.json());

  return redirect('/events');
}
