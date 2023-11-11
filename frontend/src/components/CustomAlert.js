import React from 'react';
import { Alert as MuiAlert, Stack } from '@mui/material';

const CustomAlert = ({ showAlert, alertMessage, success }) => {
    return (
        showAlert && (
            <Stack sx={{ width: '100%', mt: 2 }} spacing={2}>
                <MuiAlert variant="filled" severity={success ? 'success' : 'error'}>
                    {alertMessage}
                </MuiAlert>
            </Stack>
        )
    );
};

export default CustomAlert;
