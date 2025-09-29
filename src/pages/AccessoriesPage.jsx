
import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import AccessoriesCardData from '../components/Accessories/AccessoriesCardData.jsx'
import { h5 } from "../styles/typographyStyles.jsx";
import { Box, Typography, CircularProgress } from '@mui/material';
import FilterAccessories from '../components/Filter/FilterAccessories.jsx'
import PaginationControl from "../components/PaginationControl/PaginationControl.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccessories } from '../store/slice/accessoriesSlice.jsx';
import { useNavigate, useLocation } from "react-router-dom";

const itemsPerPage = 12;

export default function AccessoriesPage({ products }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { items, loading, error, totalPages, currentPage } = useSelector((state) => state.accessories);
  // console.log("ffffffffffff", items)

  const [filters, setFilters] = useState({ sort: "lowToHigh" });
  const [page, setPage] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageParam = parseInt(params.get("page"), 10);
    setPage(!isNaN(pageParam) && pageParam > 0 ? pageParam : 1);
  }, [location.search]);

  useEffect(() => {
    let ordering = "";
    if (filters.sort === "lowToHigh") ordering = "price";
    if (filters.sort === "highToLow") ordering = "-price";

    dispatch(fetchAccessories({ page, size: itemsPerPage, ordering }));
  }, [dispatch, page, filters]);

  const handlePageChange = (event, value) => {
    setPage(value);
    navigate(`?page=${value}`);
  };

  if (error) return <p>{error?.detail || error || "Error"}</p>;



  return (
    <Grid container sx={{ p: 4 }}>
      <Grid size={12} sx={{ pl: 4 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ color: "#3E3027", fontFamily: "Kefa", fontWeight: 400, fontSize: "40px", mb: 1 }}>
            Accessories
          </Typography>
          <Typography sx={{ ...h5, mb: 4 }}>
            Designed for coffee lovers
          </Typography>
        </Box>
        <FilterAccessories filters={filters} setFilters={setFilters} />
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <AccessoriesCardData products={items} />
        )}

        <PaginationControl page={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </Grid>
    </Grid>
  );
}