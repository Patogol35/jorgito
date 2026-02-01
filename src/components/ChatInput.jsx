import { Box, TextField, IconButton } from "@mui/material";
import { SendIcon } from "@mui/icons-material";

export default function ChatInput({ input, onInputChange, onSendMessage }) {
  return (
    <Box sx={{ display: "flex", p: 1 }}>
      <TextField
        fullWidth
        size="small"
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSendMessage();
          }
        }}
        placeholder="Escribe tu mensaje…"
      />
      <IconButton onClick={onSendMessage}>
        <SendIcon sx={{ color: "#03A9F4" }} />
      </IconButton>
    </Box>
  );
}
