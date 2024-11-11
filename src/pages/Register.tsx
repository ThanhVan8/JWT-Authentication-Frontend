import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { TextField, Button, Box, InputAdornment } from '@mui/material';
import { RiMailFill, RiLockFill, RiUserFill } from '@remixicon/react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axios-config';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

type FormValues = {
  email: string;
  username: string;
  password: string;
};

interface ErrorResponse {
  message: string;
}

const Register = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = async data => {
    console.log(data);
    try {
      const res = await axios.post('/auth/register', data);
      toast.success(res.data.message);
      navigate('/login');
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;

      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.message ||
        "An unexpected error occurred";

      toast.error(errorMessage);
    }
  };

  return (
    <Box className='flex flex-col items-center' component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <h2 className='text-slate-800 font-semibold text-2xl mb-2'>Create account</h2>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{ required: 'Email is required', pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: 'Invalid email' } }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            type="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            variant="outlined"
            required={true}
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <RiMailFill size={20} />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />
      <Controller
        name="username"
        control={control}
        defaultValue=""
        rules={{ required: 'Username is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Username"
            type="text"
            error={!!errors.username}
            helperText={errors.username?.message}
            variant="outlined"
            required={true}
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <RiUserFill size={20} />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{ required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Password"
            type="password"
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : "At least 8 characters"}
            variant="outlined"
            required={true}
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <RiLockFill size={20} />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />
      <Button
        size='large'
        type="submit" 
        variant="contained" 
        color="primary"
        fullWidth
      >
        Sign Up
      </Button>
      <p className='text-slate-800'>Already have an account? 
        <Link to='/login'>        
          <span className='font-medium text-primary'> Login</span>
        </Link>
      </p>
    </Box>
  );
};

export default Register;
