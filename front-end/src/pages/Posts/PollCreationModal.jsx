import { useState } from 'react';
import {Box, Button, Typography, TextField, IconButton, styled, Card, Stack, Modal} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

// const StyledModal = styled(({ className, ...other }) => (
//   <Card {...other} classes={{ root: className }} />
// ))(({ theme }) => ({
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: '400px',
//   maxHeight: '90vh',
//   overflowY: 'auto',
//   bgcolor: theme.palette.background.paper,
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
//   borderRadius: theme.shape.borderRadius,
// }));

const PollCreationModal = ({ isOpen, onClose }) => {
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);

  const handlePollQuestionChange = (event) => {
    setPollQuestion(event.target.value);
  };

  const handleAddOption = () => {
    setPollOptions([...pollOptions, '']);
  };

  const handleRemoveOption = (index) => {
    const newOptions = pollOptions.filter((_, i) => i !== index);
    setPollOptions(newOptions);
  };

  const handleOptionChange = (index, event) => {
    const newOptions = [...pollOptions];
    newOptions[index] = event.target.value;
    setPollOptions(newOptions);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
    >
      <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            maxHeight: '90vh',
            overflowY: 'auto',
            bgcolor: "white",
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: "25px",
          }}

      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="poll-creation-modal-title" variant="h6" component="h2" textAlign="center">
          Create a Poll
        </Typography>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Poll Question"
            variant="outlined"
            value={pollQuestion}
            onChange={handlePollQuestionChange}
            sx={{ mb: 2 }}
          />
          {pollOptions.map((option, index) => (
            <Stack key={index} direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <TextField
                fullWidth
                label={`Option ${index + 1}`}
                variant="outlined"
                value={option}
                onChange={(e) => handleOptionChange(index, e)}
              />
              <IconButton aria-label="delete" onClick={() => handleRemoveOption(index)}>
                <RemoveCircleOutlineIcon />
              </IconButton>
            </Stack>
          ))}
          <Button
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleAddOption}
            sx={{ mb: 2 }}
          >
            Add Option
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={() => alert('Poll created!')}
            disabled={!pollQuestion.trim() || pollOptions.some((option) => !option.trim())}
          >
            Create Poll
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PollCreationModal;
