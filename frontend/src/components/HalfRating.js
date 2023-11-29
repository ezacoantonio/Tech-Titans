import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function HalfRating({ value, readOnly }) {
    console.log('Rating value:', value);
    console.log('Is Read Only:', readOnly);
    
  return (
    <Stack spacing={1}>
      <Rating name="half-rating" Value={2.5} precision={0.5} />
      <Rating name="half-rating-read" Value={2.5} precision={0.5} readOnly />
    </Stack>
  );
}