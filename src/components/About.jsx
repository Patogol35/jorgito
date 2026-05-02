import { Typography, Grid, Box } from "@mui/material";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useTheme } from "@mui/material/styles";

export default function About({ t }) {
  const theme = useTheme();

  const primary = theme.palette.primary.main;
  const secondary = theme.palette.text.secondary;

  const estudios = t.about.studies;

  const iconColors = ["#1976d2", "#9333ea"];

  return (
    <Box
      id="about"
      sx={{
        py: 4,
        scrollMarginTop: "80px",
        color: theme.palette.text.primary,
      }}
    >
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: "center", marginBottom: "2rem" }}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            px: 3,
            py: 1,
            borderRadius: "999px",
            background: theme.palette.action.hover,
            backdropFilter: "blur(6px)",
          }}
        >
          <GraduationCap size={22} color={primary} />

          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: primary,
              lineHeight: 1,
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Box
                sx={{
                  position: "relative",
                  textAlign: "center",
                  px: 3,
                  py: 3,
                  borderRadius: "16px",

                  // 🔥 Fondo con gradiente sutil
                  background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.action.hover})`,

                  // 🔥 Borde más suave
                  border: `1px solid ${theme.palette.divider}`,

                  // 🔥 Transición más fluida
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: `0 10px 25px rgba(0,0,0,0.1)`,
                    borderColor: primary,
                  },

                  // 🔥 Línea decorativa superior
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "3px",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    background: primary,
                  },
                }}
              >
                {/* 🔥 Ícono con fondo circular */}
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    mb: 1.5,
                    background: `${iconColors[i]}22`,
                  }}
                >
                  <GraduationCap size={24} color={iconColors[i]} />
                </Box>

                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, mt: 1 }}
                >
                  {est.titulo}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: secondary, opacity: 0.8 }}
                >
                  {est.institucion}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: secondary, opacity: 0.8 }}
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
