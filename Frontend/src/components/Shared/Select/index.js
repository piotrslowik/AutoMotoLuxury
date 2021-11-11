import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const SingleSelect = ({label, value, onChange, items, ...props}) => {
  const [localValue, setLocalValue] = useState(value);
  useEffect(() => setLocalValue(value), [value]); 

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setLocalValue(value);
    onChange(value);
  };

  return (
    <Box>
      <FormControl fullWidth>
        { label && <InputLabel>{label}</InputLabel> }
        <Select
          value={localValue}
          label={label}
          onChange={handleChange}
          MenuProps={MenuProps}
          {...props}
        >
          {items.map(item => (
            <MenuItem
              value={item.id}
              key={item.id}
            >
              {item.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

SingleSelect.defaultProps = {
  onChange: () => {},
  //value: {},
  value: '',
  items: [],
  disabled: false,
};

SingleSelect.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  // value: PropTypes.shape({
  //   id: PropTypes.string,
  //   text: PropTypes.string,
  // }),
  value: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
  })),
  disabled: PropTypes.bool,
};

export default SingleSelect;
