import { Typography, Grid, Box, Button } from "@mui/material";
import { motion } from "framer-motion";

function ProjectCard({ p, i, palette }) {
  const Icon = p.icon;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: i * 0.12 }}
        viewport={{ once: false }}
      >
        <Box sx={{ textAlign: "center", px: 1 }}>
          <Icon sx={{ fontSize: 30, color: p.color }} />

          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1, mb: 1 }}>
            {p.titulo}
          </Typography>

          {/* 🔥 BOTÓN PRO */}
          <Button
            component={motion.a}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            variant="contained"
            size="small"
            sx={{
              borderRadius: "999px",
              textTransform: "none",
              fontWeight: 600,
              background: p.color,
              boxShadow: `0 4px 12px ${p.color}55`,

              "&:hover": {
                background: p.color,
                boxShadow: `0 6px 18px ${p.color}88`,
              },
            }}
          >
            Ver proyecto
          </Button>
        </Box>
      </motion.div>
    </Grid>
  );
}
