import { useFormStatus } from 'react-dom';

export default function Submit() {
  const { pending } = useFormStatus();  // We can also use pending from the useActionState hook instead of this

  return (
    <p className="actions">
      <button type="submit" disabled={pending}>{pending ? 'Submitting...' : 'Submit'}</button>
    </p>
  );
}