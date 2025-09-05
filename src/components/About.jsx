// components/About.jsx
import { Container, Typography, Grid, Box } from "@mui/material";
import { motion } from "framer-motion";

export default function About() {
  return (
    <Container>
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        Sobre mí
      </Typography>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Box
              component="img"
              src="/assets/about.jpg"
              alt="Sobre mí"
              sx={{ width: "100%", borderRadius: "16px", boxShadow: 4 }}
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="body1" paragraph>
              Soy un desarrollador Full Stack con experiencia en tecnologías modernas, apasionado por crear aplicaciones escalables y seguras.
            </Typography>
            <Typography variant="body1" paragraph>
              Mi objetivo es aportar valor en cada proyecto integrando innovación, eficiencia y una visión estratégica.
            </Typography>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
}
