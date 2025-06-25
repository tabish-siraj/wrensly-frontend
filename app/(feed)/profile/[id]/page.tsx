import { FC } from 'react';

interface ProfilePageProps {
  params: {
    id: string;
  };
}

const ProfilePage: FC<ProfilePageProps> = ({ params }) => {
  return (
    <div>
      <h1>Profile Page</h1>
      <p>User ID: {params.id}</p>
    </div>
  );
};

export default ProfilePage;
