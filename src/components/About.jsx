import { Typography, Grid, Box } from "@mui/material";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useTheme, alpha } from "@mui/material/styles";

export default function About({ t }) {
  const theme = useTheme();

  const estudios = t.about.studies;

  return (
    <Box
      id="about"
      sx={{
        py: 4,
        scrollMarginTop: "80px",
        color: "text.primary",
      }}
    >
      {/* HEADER */}
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
            py: 0.9,
            borderRadius: "999px",

            // ✅ PRO: usar alpha en lugar de rgba hardcodeado
            background: alpha(theme.palette.primary.main, 0.06),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,

            backdropFilter: "blur(6px)",
          }}
        >
          <GraduationCap size={22} color={theme.palette.primary.main} />

          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              lineHeight: 1,
            }}
          >
            {t.about.title}
          </Typography>
        </Box>
      </motion.div>

      {/* GRID */}
      <Grid container spacing={3} justifyContent="center">
        {estudios.map((est, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.25 }}
              viewport={{ once: true }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  px: 2,
                  py: 2,
                  borderRadius: 3,

                  // ✅ opcional pero PRO: tarjeta ligera
                  backgroundColor: "background.paper",

                  transition: "all 0.25s ease",

                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow:
                      theme.palette.mode === "light"
                        ? "0 6px 16px rgba(0,0,0,0.08)"
                        : "0 6px 16px rgba(0,0,0,0.5)",
                  },
                }}
              >
                {/* ICONO */}
                <GraduationCap
                  size={28}
                  color={theme.palette.primary.main}
                />

                {/* TEXTO */}
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mt: 1 }}
                >
                  {est.titulo}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {est.institucion}
                </Typography>

                <Typography variant="body2" color="text.secondary">
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
