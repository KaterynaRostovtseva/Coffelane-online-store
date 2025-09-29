import React, { useEffect, useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../store/slice/cartSlice.jsx';
import imageBg from '../../assets/images/home/imagebg.png';
import { btnCart } from '../../styles/btnStyles.jsx';
import { headTitle } from '../../styles/typographyStyles.jsx';
import tornbottombg from '../../assets/images/home/tornbottombg.svg';


const CoffeeBanner = () => {
    const dispatch = useDispatch();
    const videoRef = useRef(null);
    const { items: products, loading, error } = useSelector((state) => state.products);
    const weeklySpecialProduct = React.useMemo(() => {
        if (!products || !Array.isArray(products)) return null;
        return products.find(product =>
            product?.name?.toLowerCase().includes('starbucks') ||
            product?.name?.toLowerCase().includes('veranda') ||
            product?.name?.toLowerCase().includes('blend')
        ) || products[0];
    }, [products]);

    const fallbackProduct = {
        name: 'Coffee Starbucks Veranda Blend natural roasted ground coffee',
        price: 20,
        supplies: [{ id: 'default', price: 20 }],
        photos_url: [{ id: 'default', url: imageBg, position: 1 }]
    };

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => { });
            }
        }
    }, []);

    const handleAddToCart = () => {
        const product = weeklySpecialProduct || fallbackProduct;
        if (!product) return;

        const selectedSupply = product.supplies?.[0] || {
            id: "default",
            price: product.price || 0
        };

        // Apply 15% discount for weekly special
        const originalPrice = Number(selectedSupply.price) || 0;
        const discountedPrice = Number(originalPrice * 0.85);

        // Create updated supplies with discounted price
        const updatedSupplies = product.supplies ? 
            product.supplies.map(supply => 
                supply.id === selectedSupply.id 
                    ? { ...supply, price: discountedPrice.toString() }
                    : supply
            ) : [{ id: "default", price: discountedPrice.toString() }];

        dispatch(addToCart({
            product: {
                ...product,
                price: discountedPrice,
                supplies: updatedSupplies,
                originalPrice: originalPrice,
                selectedSupplyId: selectedSupply.id,
            },
            quantity: 1,
        }));
    };

    return (
        <Box sx={{ position: 'relative', width: '100%', height: 600, overflow: 'hidden', backgroundImage: 'url(/images/preview.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', }}>

            <video ref={videoRef} src="/videos/bannervideopreview.mp4" poster="/images/preview.jpg" autoPlay loop muted playsInline preload="auto" style={{ position: "absolute", top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, }} />

            <Box component="img" src={tornbottombg} alt="tornbottombg" sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 'auto', zIndex: 3, pointerEvents: 'none', }} />
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2, display: 'flex', }} >
                <Box 
                    component="img" 
                    src={(weeklySpecialProduct || fallbackProduct)?.photos_url?.[0]?.url || imageBg} 
                    alt={(weeklySpecialProduct || fallbackProduct)?.name || 'Weekly Special Product'} 
                    sx={{ 
                        width: 460, 
                        height: 460, 
                        objectFit: 'contain', 
                        backgroundColor: 'transparent',
                        padding: 2,
                        mixBlendMode: 'multiply',
                        filter: 'contrast(1.1) brightness(1.05)'
                    }} 
                />
                <Box sx={{ width: 460, height: 460, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography sx={{ ...headTitle, mb: 1 }}>Weekly Special</Typography>
                    <Typography sx={{ mb: 2, fontWeight: 400, fontSize: 24, color: '#EAD9C9' }}>
                        {(weeklySpecialProduct || fallbackProduct)?.name || 'Coffee Starbucks Veranda Blend natural roasted ground coffee'}
                    </Typography>
                    <Typography sx={{ fontFamily: "Vujahday Script, cursive", fontWeight: 400, fontSize: 40, color: '#FE9400', }}>
                        Limited time 15% off
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems:'center', mb: 2 }}>
                        {(() => {
                            const product = weeklySpecialProduct || fallbackProduct;
                            if (product) {
                                const originalPrice = Number(product.supplies?.[0]?.price || product.price || 0);
                                const discountedPrice = Number(originalPrice * 0.85);
                                return (
                                    <>
                                        <Typography sx={{ fontWeight: 700, fontSize: 48, color: '#fff' }}>
                                            ${discountedPrice % 1 === 0 ? discountedPrice.toFixed(0) : discountedPrice.toFixed(2)}
                                        </Typography>
                                        <Typography sx={{ fontWeight: 600, fontSize: 32, color: '#999', ml: 1, textDecoration: 'line-through', }}>
                                            ${originalPrice % 1 === 0 ? originalPrice.toFixed(0) : originalPrice.toFixed(2)}
                                        </Typography>
                                    </>
                                );
                            }
                            return (
                                <>
                                    <Typography sx={{ fontWeight: 700, fontSize: 48, color: '#fff' }}>$17</Typography>
                                    <Typography sx={{ fontWeight: 600, fontSize: 32, color: '#999', ml: 1, textDecoration: 'line-through', }}>$20</Typography>
                                </>
                            );
                        })()}
                    </Box>

                    <Button
                        variant="contained"
                        onClick={handleAddToCart}
                        disabled={loading}
                        sx={{ ...btnCart, textTransform: 'none', width: "100%" }}
                    >
                        {loading ? 'Loading...' : 'Add to cart'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default CoffeeBanner;
