import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const createBoxes = (color) => {
  return [1, 2, 3, 4].map(n => <Box sx={{ border: `18px solid ${color}`, borderColor: `${color} transparent transparent transparent` }} key={n} />);
}

const Loader = ({text, color}) => {
    return (
        <div className="Loader">
            <div className="Loader__spinner">
              { createBoxes(color) }
            </div>
            {text
            ?   <Typography variant="h5" sx={{ color, mt: 2 }}>{text}</Typography>
            :   null
            }
        </div>
    )
}

Loader.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
}

Loader.defaultProps = {
  color: '#FFF',
}

export default Loader;
