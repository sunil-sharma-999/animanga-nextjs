import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
} from '@mui/material';

import { AiOutlineMenu } from 'react-icons/ai';
import NavForm from './NavForm';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CgProfile } from 'react-icons/cg';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const router = useRouter();
  const { pathname } = router;

  const clearSearch = (e, inputNode) => {
    e.preventDefault();
    inputNode.value = '';
    const path = pathname.includes('manga') ? '/manga/1' : '/anime/1';
    router.push(path);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handler = (e, inputNode, formNode) => {
    e.preventDefault();
    const formData = new FormData(formNode);
    const q = inputNode.value;
    inputNode.value = '';
    const path = `/search/${formData.get('selection')}/${q}/1`;
    router.push(path);
  };

  return (
    <AppBar position="sticky" className="bg-purple-600">
      <Container className="bg-purple-600 max-w-screen-lg xl:px-0">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2 }}
            className="hidden md:flex ">
            <Link href="/manga/1">ANIMANGA</Link>
          </Typography>

          <Box sx={{ flexGrow: 1 }} className="flex md:hidden">
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <AiOutlineMenu />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  href="/manga/1"
                  className={`text-black mr-3 ${
                    pathname.includes('manga') ? 'active' : ''
                  }`}>
                  Top Manga
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  href="/anime/1"
                  className={`text-black mr-3 ${
                    pathname.includes('anime') ? 'active' : ''
                  }`}>
                  Top Anime
                </Link>
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1 }}
            className="flex md:hidden">
            <Link href="/manga/1">ANIMANGA</Link>
          </Typography>

          <Box sx={{ flexGrow: 1 }} className="hidden md:flex">
            <Link href="/manga/1" passHref={true}>
              <Button
                className={`link ${pathname.includes('manga') ? 'active' : ''}`}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}>
                Top Manga
              </Button>
            </Link>
            <Link href="/anime/1" passHref={true}>
              <Button
                onClick={handleCloseNavMenu}
                className={`link ${pathname.includes('anime') ? 'active' : ''}`}
                sx={{ my: 2, color: 'white', display: 'block' }}>
                Top Anime
              </Button>
            </Link>
            <NavForm
              formclass="ml-auto flex justify-center items-center mr-4"
              classnames="hidden md:flex"
              handler={handler}
              clearSearch={clearSearch}
            />
          </Box>

          <Link href="/profile" passHref>
            <motion.a
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              whileHover={{ scale: 0.9 }}>
              <CgProfile className="cursor-pointer text-white text-4xl" />
            </motion.a>
          </Link>
        </Toolbar>

        <NavForm
          classnames="flex md:hidden mb-3"
          handler={handler}
          clearSearch={clearSearch}
        />
      </Container>
    </AppBar>
  );
};
export default Navbar;
