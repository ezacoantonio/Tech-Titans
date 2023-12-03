// src/components/HalfRating.js
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

const labels = {
  0.5: 'Useless+',
  1: 'Useless+',
  1.5: 'Poor+',
  2: 'Poor+',
  2.5: 'Ok+',
  3: 'Ok+',
  3.5: 'Good+',
  4: 'Good+',
  4.5: 'Excellent+',
  5: 'Excellent+',
};

export default function HalfRating({ value, readOnly }) {
  const [hover, setHover] = React.useState(-1);

  return (
    <div>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        onChange={(event, newValue) => {
          // Handle rating change if needed
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<span style={{ opacity: 0.55 }}>★</span>}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </div>
  );
}
