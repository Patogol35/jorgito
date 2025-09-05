import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import { Email, Person } from "@mui/icons-material";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <Box
      id="contact"
      sx={{
        background: "linear-gradient(135deg, #42a5f5, #1976d2)",
        py: 10,
      }}
    >
      <Container>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: "16px",
              background: "rgba(255,255,255,0.9)",
            }}
          >
            <Typography variant="h4" gutterBottom>
              📩 Contáctame
            </Typography>
            <form>
              <Stack spacing={2}>
                <TextField fullWidth label="Nombre" InputProps={{ startAdornment: <Person sx={{ mr: 1 }} /> }} />
                <TextField fullWidth label="Email" InputProps={{ startAdornment: <Email sx={{ mr: 1 }} /> }} />
                <TextField fullWidth label="Mensaje" multiline rows={4} />
                <Button variant="contained" size="large">
                  Enviar
                </Button>
              </Stack>
            </form>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
