// src/components/UserMessage.js
import React from 'react';
import { Typography, Box } from '@mui/material';

function UserMessage({ content }) {
  return (
    <Box>
      {content.split('\n').map((line, index) => (
        <Typography key={index} component="div" variant="caption" sx={{ lineHeight: '1.5' }}>
          {line}
        </Typography>
      ))}
    </Box>
  );
}

export default UserMessage;
