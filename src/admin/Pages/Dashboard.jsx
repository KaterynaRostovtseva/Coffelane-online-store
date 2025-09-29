import React, { useState } from 'react';
import { Box, Paper, Typography, Button, } from '@mui/material';
import { h3, h4, h5, h7 } from '../../styles/typographyStyles.jsx';
import exportIcon from '../../assets/admin/export.svg';
import { btnCart } from "../../styles/btnStyles.jsx";
import RevenueChart from '../AdminComponents/Dashboard/RevenueChart.jsx';
import dashboard1 from '../../assets/admin/dashboard1.svg';
import dashboard2 from '../../assets/admin/dashboard2.svg';
import dashboard3 from '../../assets/admin/dashboard3.svg';
import ProductsTable from '../AdminComponents/Dashboard/ProductsTable.jsx';
import image1 from '../../assets/images/coffe/image_1.png';
import image2 from '../../assets/images/coffe/image_2.png';
import { checkboxStyles } from '../../styles/inputStyles.jsx';

const salesCards = [
  { title: 'Total Sales', value: '$1k', diff: '+8% from yesterday', color: '#ffe5e9', icon: dashboard1 },
  { title: 'Total Order', value: '300', diff: '+5% from yesterday', color: '#e5ffe9', icon: dashboard2 },
  { title: 'New Customers', value: '8', diff: '0.5% from yesterday', color: '#efe5ff', icon: dashboard3 },
];



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



export default function Dashboard() {

  const [selected, setSelected] = useState([]);

  const allSelected = selected.length === productsData.length;
  const handleSelectAll = (e) =>
    setSelected(e.target.checked ? productsData.map((p) => p.id) : []);
  const toggleSelect = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(productsData.length / rowsPerPage);

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };

  const paginatedProducts = productsData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box sx={{ width: '100%', my: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 4 }}>
        <Typography sx={{ ...h3 }}>
          Dashboard
        </Typography>
        <Button sx={{ ...btnCart, gap: 1, display: 'flex', alignItems: 'center', }}>
          <Box component="img" src={exportIcon} sx={{ width: 24, height: 24 }} />
          Export
        </Button>
      </Box>
      <Box mb={4} sx={{ backgroundColor: '#fff', borderRadius: '24px', p: 2, }}>
        <Typography sx={{ ...h5 }}>Today’s Sales</Typography>
        <Typography sx={{ ...h7, color: '#999', mb: 2 }}>Sales Summary</Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {salesCards.map((c) => (
            <Paper key={c.title} sx={{ flex: 1, p: 2, backgroundColor: c.color, borderRadius: '24px', display: 'flex', alignItems: ' flex-start', flexDirection: 'column', gap: 2, }}>
              <Box component="img" src={c.icon} alt={c.title} sx={{ width: 40, height: 40 }} />
              <Box>
                <Typography variant="h6">{c.value}</Typography>
                <Typography variant="subtitle1">{c.title}</Typography>
                <Typography variant="caption" color="primary">
                  {c.diff}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
      <RevenueChart />
      <ProductsTable
        products={paginatedProducts}
        selectedIds={selected}
        handleSelectAll={handleSelectAll}
        handleSelectOne={toggleSelect}
        allSelected={allSelected}
        h5={h5}
        checkboxStyles={checkboxStyles}
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        variant="admin"
      />
    </Box >

  );
}