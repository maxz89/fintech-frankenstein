import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';

const ChatPrompt = () => {
  const [userQuestion, setUserQuestion] = useState('');
  const [botResponse, setBotResponse] = useState('');
  const [selectedButton, setSelectedButton] = useState(''); // Add state for selected radio button

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
        <RadioGroup
          value={selectedButton}
          onChange={(e) => setSelectedButton(e.target.value)}
        >
          <FormControlLabel
            value="button1"
            control={<Radio />}
            label="PaLM 2"
          />
          <FormControlLabel
            value="button2"
            control={<Radio />}
            label="InvestLM"
          />
          <FormControlLabel
            value="button3"
            control={<Radio />}
            label="GPT"
          />
          <FormControlLabel
            value="button4"
            control={<Radio />}
            label="FindMA"
          />
        </RadioGroup>
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
