// src/components/Page.js
import React, { useState, useEffect, useRef } from 'react';
import { Container, TextField, Button, List, ListItem, ListItemText, CircularProgress, Typography, Paper, Box } from '@mui/material';
import BotMessage from './BotMessage';
import UserMessage from './UserMessage';

function Page() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const listRef = useRef(null);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsBotTyping(true);

    try {
      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      const botMessage = { role: 'bot', content: data.utterance };

      setTimeout(() => {
        setIsBotTyping(false);
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleReset = async () => {
    try {
      await fetch(`${BACKEND_URL}/reset`, { method: 'POST' });
      setMessages([]);
    } catch (error) {
      console.error('Error resetting chat:', error);
    }
  };

  return (
    <Container maxWidth="lg" disableGutters>
      <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#333', minHeight: '100vh' }}>
        <Typography variant="h6" gutterBottom sx={{ px: 2, position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#333', paddingTop: '10px' }}>
          RAG Demo
        </Typography>
        <List ref={listRef} style={{ flexGrow: 1, overflowY: 'auto', backgroundColor: '#333', padding: '10px' }}>
          {messages.map((msg, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemText
                primary={msg.role === 'user' ? 'You' : 'Bot'}
                secondary={msg.role === 'bot' ? <BotMessage content={msg.content} /> : <UserMessage content={msg.content} />}
                primaryTypographyProps={{ variant: 'overline', color: msg.role === 'user' ? 'primary' : 'secondary' }}
              />
            </ListItem>
          ))}
          {isBotTyping && (
            <ListItem>
              <CircularProgress size={24} />
            </ListItem>
          )}
        </List>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          InputProps={{
            sx: { fontSize: '0.8rem', color: 'text.primary', marginTop: '8px', marginBottom: '8px' },
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '8px', paddingBottom: '16px' }}>
          <Button variant="caption" color="primary" onClick={sendMessage} sx={{ marginRight: '8px' }}>
            Send
          </Button>
          <Button variant="caption" color="secondary" onClick={handleReset}>
            Reset
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Page;
