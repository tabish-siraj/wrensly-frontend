export default function ProfilePage({ params }) {
  const { id } = params;
  return (
    <div>
      Profile ID: {id}
    </div>
  );
}