import { Box, Typography } from "@mui/material";

export default function ChatMessage({ message, isDark, theme, isLandscape }) {
  const isUser = message.from === "user";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        mb: 1,
      }}
    >
      <Box
        sx={{
          maxWidth: "80%",
          px: 1.5,
          py: 1,
          borderRadius: 2,
          bgcolor: isUser
            ? isDark
              ? theme.palette.primary.light
              : theme.palette.primary.main
            : isDark
            ? "rgba(255,255,255,0.10)"
            : "rgba(0,0,0,0.06)",
          color: isUser
            ? isDark
              ? "#000"
              : "#fff"
            : "inherit",
          whiteSpace: "pre-line",
        }}
      >
        <Typography
          sx={{
            fontSize: isLandscape ? "0.85rem" : "0.95rem",
            lineHeight: isLandscape ? 1.4 : 1.5,
          }}
        >
          {message.text}
        </Typography>
      </Box>
    </Box>
  );
}
