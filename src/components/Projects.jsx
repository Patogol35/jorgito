import {
  Typography,
  Grid,
  Box,
  Button,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";

// Íconos
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import QuizIcon from "@mui/icons-material/Quiz";
import FunctionsIcon from "@mui/icons-material/Functions";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const ChessIcon = ({ sx }) => (
  <Box
    component="span"
    sx={{
      fontSize: "30px",
      lineHeight: 1,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      ...sx,
    }}
  >
    ♟
  </Box>
);

import {
  fadeCinematic,
  container,
  projectsStyles,
} from "../Styles/projectsStyles";

// =====================
// Tarjeta
// =====================

function ProjectCard({ p, palette, variants }) {
  const Icon = p.icon;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <motion.div
        variants={variants}
        whileHover={{
          y: -6,
          scale: 1.06,
          transition: {
            duration: 0.25,
          },
        }}
        style={projectsStyles.cardMotion}
      >
        <Box sx={projectsStyles.card}>
          {/* Icono */}
          <Icon
            sx={{
              fontSize: 30,
              color: p.color,
            }}
          />

          {/* Título */}
          <Typography
            variant="subtitle1"
            sx={projectsStyles.cardTitle}
          >
            {p.titulo}
          </Typography>

          {/* Descripción */}
          <Typography
            variant="body2"
            sx={projectsStyles.cardDescription}
          >
            {p.descripcion}
          </Typography>

          {/* Link */}
          {p.link && (
            <Button
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              variant="outlined"
              sx={projectsStyles.button(
                p.color,
                palette
              )}
            >
              {p.viewText || "Ver proyecto"}
            </Button>
          )}

          {/* Línea */}
          <Box
            sx={projectsStyles.divider(
              p.color,
              palette
            )}
          />
        </Box>
      </motion.div>
    </Grid>
  );
}

// =====================
// MAIN COMPONENT
// =====================

export default function Projects({ t }) {
  const { palette } = useTheme();

  const isDark = palette.mode === "dark";

  const primaryColor = isDark
    ? "#bbdefb"
    : "#1976d2";

  const proyectosText = t.projects.items;

  const colors = [
    "#1976d2",
    "#3b82f6",
    "#2563eb",
    "#1976d2",
    "#3b82f6",
    "#2563eb",
    "#1976d2",
    "#1976d2",
  ];

  const icons = [
    WbSunnyIcon,
    ShoppingCartIcon,
    ChessIcon,
    QuizIcon,
    FunctionsIcon,
    SmartToyIcon,
  ];

  const proyectos = proyectosText.map((item, i) => ({
    ...item,
    color: colors[i % colors.length],
    icon: icons[i % icons.length],
    viewText: t.projects.view,
  }));

  return (
    <Box
      id="projects"
      sx={projectsStyles.section(palette)}
    >
      {/* Animación */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Header */}
        <motion.div variants={fadeCinematic}>
          <Box sx={projectsStyles.headerContainer}>
            <Box
              sx={projectsStyles.headerBadge(isDark)}
            >
              <WorkOutlineIcon
                sx={{
                  fontSize: 22,
                  color: primaryColor,
                }}
              />

              <Typography
                variant="h6"
                sx={projectsStyles.headerTitle(
                  primaryColor
                )}
              >
                {t.projects.title}
              </Typography>
            </Box>
          </Box>
        </motion.div>

        {/* Grid */}
        <Grid
          container
          spacing={3}
          justifyContent="center"
        >
          {proyectos.map((p, i) => (
            <ProjectCard
              key={i}
              p={p}
              palette={palette}
              variants={fadeCinematic}
            />
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
}
