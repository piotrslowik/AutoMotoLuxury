import React from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Error404 = () => {
  return (
    <Box>
      <Typography
        sx={{
          color: 'primary.dark',
          fontWeight: 900,
          fontSize: {
            xs: '9em',
            md: '15em',
            xl: '20em',
          },
          zIndex: 1,
        }}
      >
        404
      </Typography>
      <Typography
        sx={{
          color: 'primary.light',
          fontWeight: 900,
          fontSize: {
            xs: '2em',
            md: '3em',
            xl: '5em',
          },
          position: 'absolute',
          top: '20%',
          zIndex: 1,
          textShadow: '1px 1px 5px black'
        }}
      >
        Strona miała kraksę...
      </Typography>
      <img
        src="/404.png"
        style={{
          position: 'absolute',
          top: '20vh',
          right: '10px',
          width: '70%',
        }}
      />
    </Box>
  )
}

export default Error404;
