import React from 'react';
import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const MultiSelect = ({items, value, label, onChange}) => {
  const theme = useTheme();

  const getStyles = (id) => {
    return {
      fontWeight:
        value.map(item => item.id).indexOf(id) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    onChange(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          multiple
          value={s}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, my: -0.6 }}>
              {selected.map((val) => (
                <Chip key={val.id} label={val.text} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {items.map(item => (
            <MenuItem
              key={item.id}
              value={item}
              style={getStyles(item.id)}
            >
              {item.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

MultiSelect.defaultProps = {
  label: '',
  onChange: () => {},
  value: [],
  items: [],
};

MultiSelect.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
  })),
  label: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
  })),
  onChange: PropTypes.func,
};

export default MultiSelect;
