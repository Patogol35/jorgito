import { Typography, Grid, Box } from "@mui/material";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useTheme } from "@mui/material/styles";

import {
  fadeCinematic,
  container,
  aboutStyles,
} from "../Styles/aboutStyles";

export default function About({ t }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const primaryColor = isDark ? "#bbdefb" : "#1976d2";
  const estudios = t.about.studies;

  const iconColors = ["#1976d2", "#1976d2"];

  return (
    <Box id="about" sx={aboutStyles.section(theme)}>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Título */}
        <motion.div variants={fadeCinematic}>
          <Box sx={aboutStyles.titleContainer}>
            <Box sx={aboutStyles.titleBadge(isDark)}>
              <GraduationCap size={22} color={primaryColor} />

              <Typography
                variant="h6"
                sx={aboutStyles.title(primaryColor)}
              >
                {t.about.title}
              </Typography>
            </Box>
          </Box>
        </motion.div>

        {/* Estudios */}
        <Grid container spacing={3} justifyContent="center">
          {estudios.map((est, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <motion.div
                variants={fadeCinematic}
                style={aboutStyles.motionStudy}
              >
                <Box sx={aboutStyles.study}>
                  <GraduationCap
                    size={28}
                    color={iconColors[i]}
                  />

                  <Typography
                    variant="subtitle1"
                    sx={aboutStyles.studyTitle}
                  >
                    {est.titulo}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={aboutStyles.studyText}
                  >
                    {est.institucion}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={aboutStyles.studyText}
                  >
                    {est.detalle}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
}
