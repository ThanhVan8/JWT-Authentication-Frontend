import { useEffect, useState } from "react";
import { instance } from "../config/axios-config";
import { ClipLoader } from "react-spinners";

type User = {
  id: number;
  name: string;
  email: string;
  username: string;
};

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const getProfile = async () => {
    setLoading(true);
    try {
      const response = await instance.get<User>(`/user/profile`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching profile', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className='text-slate-800 text-2xl font-bold p-4'>Profile</h1>
      <div className="mt-10">
        {loading && 
          <ClipLoader />
        }
        {user &&
          <div className="flex flex-col gap-4">
            <p className="text-lg"><strong>Email:</strong> {user.email}</p>
            <p className="text-lg"><strong>Username:</strong> {user.username}</p>
          </div>
        }
        {
          !loading && !user &&
          <p className="text-red-500">User not found</p>
        }
      </div>
    </div>
  );
};

export default Profile;