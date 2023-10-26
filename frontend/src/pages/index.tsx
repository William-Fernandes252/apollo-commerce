import NavBar from '@/components/NavBar';
import { Box, Container, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <Container maxWidth="xl" sx={{ height: '100vh' }}>
      <NavBar />
      <Box component={'main'} sx={{ p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Container>
  );
}
