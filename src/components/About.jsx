import { Typography, Grid, Box } from "@mui/material";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useTheme } from "@mui/material/styles";

export default function About({ t }) {
  const theme = useTheme();

  const primary = theme.palette.primary.main;
  const secondary = theme.palette.text.secondary;

  const estudios = t.about.studies;

  const iconColors = ["#1976d2", "#9333ea", "#06b6d4"];

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
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: "3rem" }}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1.5,
            px: 4,
            py: 1.5,
            borderRadius: "999px",
            background: `linear-gradient(135deg, ${primary}, #9333ea)`,
            color: "#fff",
            boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
          }}
        >
          <GraduationCap size={22} />

          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              lineHeight: 1,
            }}
          >
            {t.about.title}
          </Typography>
        </Box>
      </motion.div>

      {/* ================= GRID ================= */}
      <Grid container spacing={4} justifyContent="center">
        {estudios.map((est, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  px: 3,
                  py: 3,
                  borderRadius: "20px",

                  // glass effect
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(10px)",

                  border: "1px solid transparent",

                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",

                  transition: "all 0.3s ease",

                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 18px 45px rgba(0,0,0,0.3)",
                    border: `1px solid ${primary}`,
                  },
                }}
              >
                {/* ICONO */}
                <Box
                  sx={{
                    width: 55,
                    height: 55,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    mb: 2,
                    background: `${iconColors[i % iconColors.length]}22`,
                  }}
                >
                  <GraduationCap
                    size={26}
                    color={iconColors[i % iconColors.length]}
                  />
                </Box>

                {/* TITULO */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
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
                    opacity: 0.8,
                  }}
                >
                  {est.institucion}
                </Typography>

                {/* DETALLE */}
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    mt: 1,
                    color: secondary,
                    opacity: 0.6,
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
