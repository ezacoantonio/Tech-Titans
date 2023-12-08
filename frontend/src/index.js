import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App'; // or the path to your main component

const theme = createTheme();

createRoot(document.getElementById('root')).render(<App />);
