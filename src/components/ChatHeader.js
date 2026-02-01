import { Box, Typography, IconButton } from "@mui/material";
import { SmartToyIcon, DeleteIcon, CloseIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

export default function ChatHeader({ primaryBg, onClear, onClose }) {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        p: 1,
        bgcolor: primaryBg,
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <SmartToyIcon fontSize="small" />
        <Typography fontWeight="bold">Sasha</Typography>
      </Box>

      <Box>
        <IconButton
          size="small"
          sx={{ color: "#fff" }}
          onClick={onClear}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          sx={{ color: "#fff" }}
          onClick={onClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}
