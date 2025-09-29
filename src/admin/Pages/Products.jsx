import React, { useState } from 'react';
import { Box, Divider, Button, } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Search from '../../components/Search/index.jsx';
import { h5 } from "../../styles/typographyStyles.jsx";
import { btnCart } from "../../styles/btnStyles.jsx";
import AdminBreadcrumbs from '../AdminBreadcrumbs/AdminBreadcrumbs.jsx';
import { checkboxStyles } from '../../styles/inputStyles.jsx';
import { btnAdminCheck } from '../../styles/btnStyles.jsx';
import image1 from '../../assets/images/coffe/image_1.png';
import image2 from '../../assets/images/coffe/image_2.png';
import hideIcon from '../../assets/admin/hide.svg';
import deleteIcon from '../../assets/admin/delete.svg';
import ProductsTable from '../AdminComponents/Dashboard/ProductsTable.jsx';
import { useNavigate } from 'react-router-dom';

const productsData = [
  { id: 1, image: image1, name: 'Instant coffee Jacobs Barista', category: 'Coffee', price: 20, stock: 40, status: 'Active' },
  { id: 2, image: image1, name: 'Instant coffee Jacobs Barista', category: 'Coffee', price: 20, stock: 40, status: 'Draft' },
  { id: 3, image: image1, name: 'Instant coffee Jacobs Barista', category: 'Coffee', price: 20, stock: 40, status: 'Hidden' },
  { id: 4, image: image1, name: 'Instant coffee Jacobs Barista', category: 'Coffee', price: 20, stock: 40, status: 'Out of stock' },
  { id: 5, image: image1, name: 'Instant coffee Jacobs Barista', category: 'Coffee', price: 20, stock: 40, status: 'Active' },
  { id: 6, image: image1, name: 'Instant coffee Jacobs Barista', category: 'Coffee', price: 20, stock: 40, status: 'Active' },
  { id: 7, image: image1, name: 'Instant coffee Jacobs Barista', category: 'Coffee', price: 20, stock: 40, status: 'Draft' },
  { id: 8, image: image1, name: 'Instant coffee Jacobs Barista', category: 'Coffee', price: 20, stock: 40, status: 'Hidden' },
  { id: 9, image: image1, name: 'Instant coffee Jacobs Barista', category: 'Coffee', price: 20, stock: 40, status: 'Out of stock' },
  { id: 10, image: image1, name: 'Instant coffee Jacobs Barista', category: 'Coffee', price: 20, stock: 40, status: 'Active' },
  { id: 11, image: image2, name: 'Instant coffee Jacobs Barista', category: 'Coffee', price: 20, stock: 40, status: 'Active' },
  { id: 12, image: image2, name: 'Instant coffee Jacobs Barista', category: 'Coffee', price: 20, stock: 40, status: 'Draft' },
  { id: 13, image: image2, name: 'Instant coffee Jacobs Barista', category: 'Coffee', price: 20, stock: 40, status: 'Hidden' },
  { id: 14, image: image2, name: 'Instant coffee Jacobs Barista', category: 'Coffee', price: 20, stock: 40, status: 'Out of stock' },
  { id: 15, image: image2, name: 'Instant coffee Jacobs Barista', category: 'Coffee', price: 20, stock: 40, status: 'Active' },
  { id: 16, image: image2, name: 'Instant coffee Jacobs Barista', category: 'Coffee', price: 20, stock: 40, status: 'Active' },
  { id: 17, image: image2, name: 'Instant coffee Jacobs Barista', category: 'Coffee', price: 20, stock: 40, status: 'Draft' },
  { id: 18, image: image2, name: 'Instant coffee Jacobs Barista', category: 'Coffee', price: 20, stock: 40, status: 'Hidden' },
  { id: 19, image: image2, name: 'Instant coffee Jacobs Barista', category: 'Coffee', price: 20, stock: 40, status: 'Out of stock' },
  { id: 20, image: image2, name: 'Instant coffee Jacobs Barista', category: 'Coffee', price: 20, stock: 40, status: 'Active' },
];

export default function Products() {
  const [products] = useState(productsData);
  const [selectedIds, setSelectedIds] = useState([]);
  const navigate = useNavigate();
  const allSelected = selectedIds.length === products.length;

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedIds(products.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDeleteSelected = () => {
    console.log('Delete selected:', selectedIds);
    //  implement deletion
  };

  const handleHideSelected = () => {
    console.log('Hide selected:', selectedIds);
    // implement hiding
  };

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(products.length / rowsPerPage);

  const handlePageChange = (e, newPage) => setPage(newPage);

  const paginatedProducts = products.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box sx={{ width: '100%', mt: 4, mb: 3 }}>
      <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
        <AdminBreadcrumbs />

        {selectedIds.length > 0 && (
          <Box display="flex" alignItems="center" gap={1}>
            <Divider orientation="vertical" flexItem sx={{ mr: 1, bgcolor: '#999', width: '1px' }} />
            <Button sx={{ ...btnAdminCheck, display: 'flex', alignItems: 'center', gap: 1, }} onClick={handleDeleteSelected}>
              <Box component="img" src={deleteIcon} sx={{ width: 20, height: 20 }} />
              Delete items
            </Button>
            <Button sx={{ ...btnAdminCheck, display: 'flex', alignItems: 'center', gap: 1, }} onClick={handleHideSelected}>
              <Box component="img" src={hideIcon} sx={{ width: 20, height: 20 }} />
              Hide items
            </Button>
          </Box>
        )}


        <Box display="flex" gap={2}>
          <Search />
          <Button variant="contained" onClick={() => navigate('add')} startIcon={<AddIcon />} sx={{ ...btnCart }}>Add new product</Button>
        </Box>
      </Box>

      <ProductsTable
        products={paginatedProducts}
        selectedIds={selectedIds}
        handleSelectAll={handleSelectAll}
        handleSelectOne={handleSelectOne}
        allSelected={allSelected}
        h5={h5}
        checkboxStyles={checkboxStyles}
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        variant="admin"
      />
    </Box>
  );
}
