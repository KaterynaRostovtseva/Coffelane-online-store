import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/header/logo.svg';
import { Box, Button, Grid, } from '@mui/material';
import account from '../../assets/icons/account.svg';
import ShoppingCart from '../../assets/icons/shopping-cart.svg';
import Search from '../../assets/icons/search-icon.svg';
import TopLine from '../TopLine/index.jsx';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/index.jsx';
import LoginModal from "../LoginModal/index.jsx";
import CartModal from "../CartModal/index.jsx";
import { useSelector } from "react-redux";
import { selectCartCount } from "../../store/slice/cartSlice.jsx";
import SettingsIcon from '@mui/icons-material/AdminPanelSettings';

function Header() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const cartCount = useSelector(selectCartCount);
    const orderCompleted = useSelector((state) => state.cart.orderCompleted);
    const user = useSelector(state => state.auth.user);

    
    const handleOpenLoginModal = () => {
        setIsLoginModalOpen(true);
    }
    const handleCloseLoginModal = () => {
        setIsLoginModalOpen(false);

    };

    const handleOpenCartModal = () => {
        setIsCartModalOpen(true);
    }
    useEffect(() => {
    }, [isCartModalOpen]);

    const handleCloseCartModal = () => {
        setIsCartModalOpen(false);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <TopLine />
            <Grid container alignItems="center" justifyContent="space-between" sx={{ height: '83px', backgroundColor: '#EAD9C9', padding: '0 48px' }}>
                <Link to="/">
                    <Box component="img" src={logo} alt="Coffee Lane logo"
                        sx={{ width: '144px', height: '35px', cursor: 'pointer' }} />
                </Link>
                <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Navbar />
                </Grid>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button disableRipple sx={{ minWidth: 0, padding: 0, backgroundColor: "transparent", border: "none", "&:hover, &:focus, &:active": { backgroundColor: "#EAD9C9", } }}>
                        <Box component="img" src={Search} alt="search-icon"
                            sx={{ width: '24px', height: '24px', cursor: 'pointer', }} />
                    </Button>

                    <Button onClick={handleOpenLoginModal} disableRipple sx={{ minWidth: 0, padding: 0, backgroundColor: "transparent", border: "none", "&:hover, &:focus, &:active": { backgroundColor: "#EAD9C9", } }}>
                        <Box component="img" src={account} alt="User account"
                            sx={{ marginLeft: '48px', width: '24px', height: '24px', cursor: 'pointer', }} />
                    </Button>
                    {!orderCompleted && (
                        <Button onClick={handleOpenCartModal} disableRipple sx={{ minWidth: 0, padding: 0, backgroundColor: "transparent", border: "none", "&:hover, &:focus, &:active": { backgroundColor: "#EAD9C9", }, position: "relative", }}>
                            <Box component="img" src={ShoppingCart} alt="Shopping cart"
                                sx={{ marginLeft: '48px', width: '24px', height: '24px', cursor: 'pointer', }} />
                            {cartCount > 0 && (
                                <Box sx={{ position: "absolute", top: -14, right: -9, bgcolor: "#16675C", color: "#fff", borderRadius: "50%", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: "500", }} >
                                    {cartCount}
                                </Box>
                            )}
                        </Button>
                    )}
                    {user?.role === 'admin' && (
                        <Tooltip title="Admin panel">
                            <IconButton
                                color="inherit"
                                onClick={() => navigate('/admin')}
                                aria-label="Admin panel"
                            >
                                <SettingsIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>
            </Grid>

            <LoginModal open={isLoginModalOpen} onClose={handleCloseLoginModal} />
            <CartModal open={isCartModalOpen} onClose={handleCloseCartModal} />
        </Box>

    );
}

export default Header;