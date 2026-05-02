import { Typography, Grid, Box } from "@mui/material";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useTheme } from "@mui/material/styles";

export default function About({ t }) {
  const theme = useTheme();

  const primary = theme.palette.primary.main;
  const secondary = theme.palette.text.secondary;

  const estudios = t.about.studies;

  const iconColors = ["#1976d2", "#9333ea", "#0ea5e9"];

  return (
    <Box
      id="about"
      sx={{
        py: 6,
        px: 2,
        scrollMarginTop: "80px",
        color: theme.palette.text.primary,
      }}
    >
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: "3rem" }}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1.5,
            px: 3,
            py: 1.2,
            borderRadius: "999px",
            background: theme.palette.action.hover,
            backdropFilter: "blur(10px)",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <GraduationCap size={22} color={primary} />

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: primary,
              letterSpacing: 0.5,
            }}
          >
            {t.about.title}
          </Typography>
        </Box>
      </motion.div>

      {/* ================= GRID ================= */}
      <Grid container spacing={3} justifyContent="center">
        {estudios.map((est, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  px: 3,
                  py: 3,
                  borderRadius: "20px",

                  // 🔥 glass effect
                  background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.action.hover})`,
                  backdropFilter: "blur(12px)",

                  // 🔥 borde elegante
                  border: `1px solid ${theme.palette.divider}`,

                  // 🔥 sombra suave
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",

                  transition: "all 0.3s ease",

                  "&:hover": {
                    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                    borderColor: primary,
                  },
                }}
              >
                {/* ICON */}
                <Box
                  sx={{
                    width: 55,
                    height: 55,
                    margin: "0 auto",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 1.5,

                    background: `linear-gradient(135deg, ${iconColors[i % iconColors.length]}, ${primary})`,
                    color: "#fff",
                  }}
                >
                  <GraduationCap size={26} />
                </Box>

                {/* TITULO */}
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    mb: 0.5,
                  }}
                >
                  {est.titulo}
                </Typography>

                {/* INSTITUCION */}
                <Typography
                  variant="body2"
                  sx={{
                    color: secondary,
                    fontWeight: 500,
                  }}
                >
                  {est.institucion}
                </Typography>

                {/* DETALLE */}
                <Typography
                  variant="body2"
                  sx={{
                    color: secondary,
                    opacity: 0.8,
                    mt: 0.5,
                    fontSize: "0.8rem",
                  }}
                >
                  {est.detalle}
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
