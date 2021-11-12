import React from 'react';
// import PropTypes from 'prop-types';

import ImagesList from '../../Shared/ImagesList';
import LabelledInput from '../../Shared/Fields/LabelledInput';
import { Box, Typography } from '@mui/material';

const ImageInput = ({
  images,
  onAddImage,
  onDeleteImage,
}) => {

  const handleInput = event => {
    const file = event.target.files[0];
    onAddImage(file);
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h5">
          Dodaj zdjęcia
        </Typography>
        <LabelledInput type="file" onChange={handleInput} />
      </Box>
      <Box sx={{ display: 'flex', mt: 3 }}>
        <ImagesList images={images} onDelete={onDeleteImage} />
      </Box>
    </Box>
  )
}

export default ImageInput;
