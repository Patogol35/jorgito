import { Box, Chip, Stack } from "@mui/material";

export default function ChatSuggestions({ suggestions, onSuggestionClick, isLandscape }) {
  return (
    <Box sx={{ p: 1 }}>
      {isLandscape ? (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            overflowX: "auto",
            whiteSpace: "nowrap",
            pb: 1,
          }}
        >
          {suggestions.map((q) => (
            <Chip
              key={q}
              label={q}
              size="small"
              onClick={() => onSuggestionClick(q)}
              sx={{ flexShrink: 0 }}
            />
          ))}
        </Box>
      ) : (
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {suggestions.map((q) => (
            <Chip
              key={q}
              label={q}
              size="small"
              onClick={() => onSuggestionClick(q)}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}
