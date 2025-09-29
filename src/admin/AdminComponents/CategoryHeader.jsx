import { IconButton, Menu, MenuItem, Divider, TableCell } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import { useState } from 'react';
import { h5 } from '../../styles/typographyStyles.jsx';

export default function CategoryHeader() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <TableCell sx={{ ...h5, display: 'flex', alignItems: 'center', gap: 0.5 }}>
            Category
            <IconButton size="small" onClick={handleClick}>
                <ArrowDropDown fontSize="small" />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                PaperProps={{ sx: { border: '1px solid #000', borderRadius: 2, overflow: 'hidden', }, }}>
                <MenuItem onClick={handleClose}>Coffee items</MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>Accessories</MenuItem>
            </Menu>
        </TableCell>
    );
}
