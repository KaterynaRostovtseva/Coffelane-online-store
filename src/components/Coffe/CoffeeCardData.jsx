import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { h1, h4, h7, } from "../../styles/typographyStyles.jsx";
import { btnCart, btnInCart } from "../../styles/btnStyles.jsx";
import favorite from "../../assets/icons/favorite.svg";
import incart from "../../assets/icons/incart.svg";
import favoriteActive from "../../assets/icons/favorite-active.svg";
import shopping from "../../assets/icons/shopping.svg"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, addToCart } from "../../store/slice/cartSlice.jsx";
import ClampText from "../ClampText.jsx";

export default function CoffeeCardData({ products }) {
    const [isfavorites, setFavorites] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartEntries = useSelector(selectCartItems);

    const toggleFavorite = (id) => {
        setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleAddToCart = (item) => {
        const selectedSupply = item.supplies?.[0] || { id: "default", price: item.price || 0 };
        const key = `${item.id}-${selectedSupply?.id || "default"}`;

        dispatch(
            addToCart({
                product: {
                    ...item,
                    price: Number(selectedSupply?.price || item.price || 0),
                    selectedSupplyId: selectedSupply?.id || null,
                },
                quantity: 1,
            })
        );
    };

    if (!products || products.length === 0) {
        return (
            <Typography sx={{ mb: 1 }}>
                No products found
            </Typography>
        );
    }


    return (
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", }}>

            {products?.map((item) => {
                const selectedSupply = item.supplies?.[0] || { id: "default", price: item.price || 0 };
                const cartKey = `${item.id}-${selectedSupply.id}`;
                const isInCart = cartEntries.some(([key]) => key === cartKey);
                const price = selectedSupply.price;

                return (

                    <Card key={cartKey} sx={{ width: "300px", height: "480px", display: "flex", padding: "16px", flexDirection: "column", borderRadius: "24px", boxShadow: 2, }}>
                        <Box sx={{ position: "relative", width: "250px", height: "250px", mx: "auto", p: 1, mt: 1 }}>
                            {item.photos_url?.[0]?.url ? (
                                <CardMedia component="img" image={item.photos_url?.[0]?.url} alt={item.name} sx={{ width: "100%", height: "100%", objectFit: "contain" }} />
                            ) : (
                                <Box sx={{ width: "100%", height: "250px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f0f0f0", color: "#888", fontSize: 14 }}>
                                    No image
                                </Box>
                            )}
                            <Box component="img" src={isfavorites[item.id] ? favoriteActive : favorite} alt="favorite" sx={{ position: "absolute", top: 16, right: 16, width: "32px", height: "32px", cursor: "pointer" }} onClick={() => toggleFavorite(item.id)} />
                        </Box>
                        <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                            <Box sx={{ height: 88, overflow: "hidden" }}>
                                <Typography sx={{ ...h4, mb: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer' }} onClick={() => navigate(`/coffee/product/${item.id}`)}>
                                    {item.name || 'No name'}
                                </Typography>
                                <ClampText lines={2} sx={{ ...h7, mb: 1, wordBreak: "break-word", overflowWrap: "anywhere" }}>
                                    {item.description || "No description"}
                                </ClampText>
                            </Box>
                            <Typography sx={{ mt: 1, color: '#16675C', fontSize: '14px', fontWeight: 700, fontFamily: "Montserrat, sans-serif", textAlign: "right", mb: 1 }}>
                                ${Number(price).toFixed(2)}
                            </Typography>
                            <Button variant="contained" onClick={() => handleAddToCart(item)} sx={isInCart ? btnInCart : btnCart}
                                endIcon={<Box component="img" src={isInCart ? incart : shopping} alt={isInCart ? "In cart" : "Shopping cart"} sx={{ width: "24px", height: "24px", ml: 1 }} />}>
                                {isInCart ? "In cart" : "Add to bag"}
                            </Button>
                        </CardContent>
                    </Card>
                )
            })}
        </Box>
    );
}


