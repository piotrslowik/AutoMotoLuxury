import React from 'react';

import { Link, Box } from '@mui/material';

const Logo = () => {
    return (
        <Link href="/" className="Logo-link">
            <Box className="Logo" sx={{ color: 'secondary.light' }}>
                <p>Auto-Moto</p>
                <p className="luxury">LUXURY</p>
            </Box>
        </Link>
    )
}

export default Logo;
