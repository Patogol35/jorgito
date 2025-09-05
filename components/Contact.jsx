
import { Container, Typography, TextField, Button, Paper } from "@mui/material";

export default function Contact() {
  return (
    <Container id="contact" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: "16px" }}>
        <Typography variant="h4" gutterBottom>
          📩 Contáctame
        </Typography>
        <form>
          <TextField fullWidth label="Nombre" margin="normal" />
          <TextField fullWidth label="Email" margin="normal" />
          <TextField
            fullWidth
            label="Mensaje"
            multiline
            rows={4}
            margin="normal"
          />
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Enviar
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
