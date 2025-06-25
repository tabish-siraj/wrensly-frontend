type ProfilePageProps = {
  params: {
    id: string;
  }
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { id } = params;
  return (
    <div>
      Profile ID: {id}
    </div>
  );
}