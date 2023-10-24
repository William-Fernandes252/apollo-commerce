import NavBar from '@/components/NavBar';
import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <div>
      <NavBar />
      <Box component={'main'} sx={{ p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </div>
  );
}
