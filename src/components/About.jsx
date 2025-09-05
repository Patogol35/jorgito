import { Container, Typography, Paper, Grid } from "@mui/material";
import { motion } from "framer-motion";

export default function About() {
  return (
    <Container id="about" sx={{ py: 10 }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={4}>
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
            <img
              src="/assets/profile.png"
              alt="Yo"
              style={{ width: "100%", borderRadius: "16px", boxShadow: "0 8px 20px rgba(0,0,0,0.2)" }}
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} md={8}>
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: "16px" }}>
              <Typography variant="h4" gutterBottom>
                Sobre mí
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Soy un desarrollador apasionado por crear aplicaciones modernas y
                escalables. Tengo experiencia en Django REST Framework, React y
                despliegues en la nube con Render y Vercel.
              </Typography>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
}
