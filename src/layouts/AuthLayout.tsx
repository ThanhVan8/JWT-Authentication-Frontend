import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-auth-bg bg-cover bg-center'>
      <main>
        <div className='w-[420px] bg-neutral-100 bg-opacity-60 border-2 border-neutral-100 border-opacity-75 p-10 text-slate-900 rounded-lg backdrop-blur-lg'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;