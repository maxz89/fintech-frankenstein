// ChatbotPage.tsx
import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
} from '@mui/material';

const ChatPrompt = () => {
  const [userQuestion, setUserQuestion] = useState('');
  const [botResponse, setBotResponse] = useState('');

  const handleQuestionSubmit = async () => {
    // Simulate a response from a chatbot (replace with actual API call)
    const response = await fetchBotResponse(userQuestion);

    // Set the response in the state
    setBotResponse(response);
  };

  const fetchBotResponse = async (question: string) => {
    // In a real application, you would send the question to a chatbot API
    // and receive a response. For simplicity, we're just echoing the question.
    return `You asked: ${question}`;
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5">Chatbot for Financial News</Typography>
        <TextField
          fullWidth
          label="Ask a question"
          variant="outlined"
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleQuestionSubmit}
        >
          Submit
        </Button>
        {botResponse && (
          <div style={{ marginTop: '20px' }}>
            <Typography variant="h6">Bot's Response:</Typography>
            <Typography>{botResponse}</Typography>
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default ChatPrompt;
