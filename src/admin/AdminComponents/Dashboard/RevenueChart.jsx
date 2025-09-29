import { BarChart, Bar, XAxis, Tooltip, CartesianGrid, ResponsiveContainer,} from 'recharts';
import { Box, Typography, Paper } from '@mui/material';
import {  h3, h4, h5, h7 } from '../../../styles/typographyStyles';

const revenueData = [
  { day: '02', thisWeek: 4, lastWeek: 6 },
  { day: '03', thisWeek: 2, lastWeek: 3 },
  { day: '04', thisWeek: 4, lastWeek: 5 },
  { day: '05', thisWeek: 7, lastWeek: 5 },
  { day: '06', thisWeek: 8, lastWeek: 4 },
  { day: '07', thisWeek: 5, lastWeek: 6 },
];

const renderLegend = () => (
  <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 3, mt: 1,  }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: '#02715C' }} />
      <Typography sx={{...h7}}>This Week</Typography>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: '#999' }} />
      <Typography sx={{...h7}}>Last Week</Typography>
    </Box>
  </Box>
);

export default function RevenueChart() {
  return (
    <Paper sx={{ p: 2, mb: 4, borderRadius:'24px' }}>
      <Typography sx={{...h5, mb: 2 }}>Revenue</Typography>
      <Typography sx={{...h4, mb: 1 }}>USDT 7,852,000</Typography>
      <Typography component="span" color="#02715C">▲2.1% vs yesterday  </Typography>
      <Typography variant="subtitle2" sx={{...h7, color: '#999', my: 2}}>Sales from 1-7 Sep, 2025</Typography>


      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <Tooltip />
          <Bar dataKey="thisWeek" fill="#02715C" />
          <Bar dataKey="lastWeek" fill="#999" />
        </BarChart>
      </ResponsiveContainer>

      {renderLegend()}
    </Paper>
  );
}
