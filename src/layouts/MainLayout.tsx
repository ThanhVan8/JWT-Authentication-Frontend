import { Link, Outlet } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { SyntheticEvent, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';

const MainLayout = () => {
  const [open, setOpen] = useState(false);
  const { isLogged, setIsLogged } = useContext(UserContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (_: SyntheticEvent, reason: string) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLogged(false);
    setOpen(false);
    toast.success('You\'ve logged out');
  }

  return (
    <div className="flex flex-col min-h-screen bg-main-bg bg-cover bg-center bg-fixed">
      <header id='header' className="h-16 w-full flex items-center justify-between px-5 bg-neutral-100 bg-opacity-80 border-b-2 border-neutral-100 border-opacity-75 fixed top-0 left-0 z-50 ">
        <nav>
          <Link to="/" className="mr-4 font-semibold text-slate-800">Home</Link>
        </nav>
        { !isLogged ? 
        <Link to='/login'>
          <Button
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </Link> :
        <div className='flex gap-4'>
          <Link to='/profile'>
            <Button
              variant="outlined"
              color="secondary"
            >
              Profile
            </Button>
          </Link>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleClickOpen()}
          >
            Logout
          </Button>
        </div>
        }
      </header>
      <main className="flex-grow p-5 mt-16">
        <Outlet />
      </main>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm logout"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleLogout} autoFocus color='error'>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MainLayout;