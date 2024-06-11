// src/components/BotMessage.js
import React from 'react';
import { Typography } from '@mui/material';

const BotMessage = ({ content }) => {
  const sections = content.split('\n');

  return (
    <div>
      {sections.map((section, index) => {
        if (section.trim() === '') return null;

        const boldIndex = section.indexOf('**');

        if (boldIndex !== -1) {
          const startBold = boldIndex + 2;
          const endBold = section.indexOf('**', startBold);
          const beforeBold = section.substring(0, boldIndex);
          const boldText = section.substring(startBold, endBold);
          const afterBold = section.substring(endBold + 2);

          return (
            <Typography key={index} component="div" variant="caption" sx={{ lineHeight: '1.5' }}>
              {beforeBold}
              <Typography component="span" variant="caption" fontWeight="bold">{boldText}</Typography>
              {afterBold}
            </Typography>
          );
        }

        return (
          <Typography key={index} component="div" variant="caption" sx={{ lineHeight: '1.5' }}>
            {section}
          </Typography>
        );
      })}
    </div>
  );
};

export default BotMessage;
