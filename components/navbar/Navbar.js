import * as React from 'react';
import {
  AppBar,
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
    const path = `/search/${formData.get('selection')}/${q}/1`;
    router.push(path);
  };

  return (
    <AppBar position="sticky" className="bg-purple-600">
      <Container className="bg-purple-600 max-w-screen-lg xl:px-0">
        <Toolbar disableGutters className="toolbar md:toolbar-md">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2 }}
            className="logo">
            <Link href="/manga/1">ANIMANGA</Link>
          </Typography>
          <IconButton
            size="large"
            aria-label="menu"
            className="menu-btn md:hidden "
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit">
            <AiOutlineMenu />
          </IconButton>
          <Menu
            id="menu-appbar"
            className="bloack md:hidden"
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
            onClose={handleCloseNavMenu}>
            <Link href="/manga/1">
              <a
                className={`text-black ${
                  pathname.includes('manga') ? 'text-purple-800' : ''
                }`}>
                <MenuItem onClick={handleCloseNavMenu}>Top Manga</MenuItem>
              </a>
            </Link>
            <Link href="/anime/1">
              <a
                className={`text-black ${
                  pathname.includes('anime') ? 'text-purple-800' : ''
                }`}>
                <MenuItem onClick={handleCloseNavMenu}>Top Anime</MenuItem>
              </a>
            </Link>
          </Menu>
          <motion.div
            className="profile-btn"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            whileHover={{ scale: 0.9 }}>
            <Link href="/profile">
              <a>
                <CgProfile className="cursor-pointer text-white md:mx-2 text-3xl" />
              </a>
            </Link>
          </motion.div>
          <NavForm handler={handler} clearSearch={clearSearch} />
          <div className="links hidden md:flex justify-self-start">
            <Link href="/manga/1">
              <a>
                <Button
                  className={`link ${
                    pathname.includes('manga') ? 'active' : ''
                  }`}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}>
                  Top Manga
                </Button>
              </a>
            </Link>
            <Link href="/anime/1">
              <a>
                <Button
                  onClick={handleCloseNavMenu}
                  className={`link ${
                    pathname.includes('anime') ? 'active' : ''
                  }`}
                  sx={{ my: 2, color: 'white', display: 'block' }}>
                  Top Anime
                </Button>
              </a>
            </Link>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
