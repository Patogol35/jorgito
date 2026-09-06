import { Typography, Grid, Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Brain,
  Bot,
} from "lucide-react";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

import {
  fadeCinematic,
  container,
  certificationsStyles,
} from "../Styles/certificationsStyles";

export default function Certifications({ t }) {
  const { palette } = useTheme();

  const isDark = palette.mode === "dark";
  const primaryColor = isDark ? "#bbdefb" : "#1976d2";

  const certificaciones = t.certifications.items;

  const iconTypes = [
    { type: "lucide", icon: GraduationCap },
    { type: "mui", icon: WorkspacePremiumIcon },
    { type: "mui", icon: WorkspacePremiumIcon },
    { type: "lucide", icon: Brain },
    { type: "mui", icon: WorkspacePremiumIcon },
    { type: "lucide", icon: Bot },
    { type: "lucide", icon: Brain },
  ];

  const iconColors = [
    "#1976d2",
    "#3b82f6",
    "#2563eb",
    "#1976d2",
    "#3b82f6",
    "#2563eb",
  ];

  return (
    <Box
      id="certifications"
      sx={certificationsStyles.section(palette)}
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Título */}
        <motion.div variants={fadeCinematic}>
          <Box sx={certificationsStyles.titleContainer}>
            <Box sx={certificationsStyles.titleBadge(isDark)}>
              <WorkspacePremiumIcon
                sx={{
                  fontSize: 22,
                  color: primaryColor,
                }}
              />

              <Typography
                variant="h6"
                sx={certificationsStyles.title(primaryColor)}
              >
                {t.certifications.title}
              </Typography>
            </Box>
          </Box>
        </motion.div>

        {/* Certificaciones */}
        <Grid container spacing={3} justifyContent="center">
          {certificaciones.map((cert, i) => {
            const { type, icon: Icon } =
              iconTypes[i % iconTypes.length];

            const color =
              iconColors[i % iconColors.length];

            return (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <motion.div
                  variants={fadeCinematic}
                  whileHover={{
                    y: -5,
                    scale: 1.05,
                  }}
                  style={certificationsStyles.certificationMotion}
                >
                  <Box
                    sx={certificationsStyles.certification}
                  >
                    {/* Icono */}
                    {type === "mui" ? (
                      <Icon
                        sx={{
                          fontSize: 28,
                          color,
                        }}
                      />
                    ) : (
                      <Icon
                        size={28}
                        color={color}
                      />
                    )}

                    {/* Título */}
                    <Typography
                      variant="subtitle1"
                      sx={
                        certificationsStyles.certificationTitle
                      }
                    >
                      {cert.titulo}
                    </Typography>

                    {/* Institución y año */}
                    <Typography
                      variant="body2"
                      sx={
                        certificationsStyles.certificationInfo
                      }
                    >
                      {cert.institucion} | {cert.año}
                    </Typography>

                    {/* Botón */}
                    {cert.link && (
                      <Button
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        variant="outlined"
                        sx={certificationsStyles.button(
                          color,
                          isDark
                        )}
                      >
                        {t.certifications.view}
                      </Button>
                    )}

                    {/* Línea divisora */}
                    <Box
                      sx={certificationsStyles.divider(
                        color,
                        isDark
                      )}
                    />
                  </Box>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </motion.div>
    </Box>
  );
                    }
