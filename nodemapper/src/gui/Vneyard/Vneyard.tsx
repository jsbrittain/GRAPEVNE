import { Box } from '@mui/material';
import React from 'react';
import { useAppSelector } from 'redux/store/hooks';

const Vineyard = () => {
  const vneyard_url = useAppSelector((state) => state.settings.vneyard_url);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100vh',
      }}
    >
      <iframe
        src={vneyard_url + '?no-cache=' + new Date().getTime() /* prevents caching */}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
      />
    </Box>
  );
};

export default Vineyard;
