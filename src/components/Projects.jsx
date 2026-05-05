import { Typography, Grid, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import ItemCard from "./ItemCard";

// ICONS
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MovieIcon from "@mui/icons-material/Movie";
import QuizIcon from "@mui/icons-material/Quiz";
import FunctionsIcon from "@mui/icons-material/Functions";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

export default function Projects({ t }) {
  const { palette } = useTheme();
  const isDark = palette.mode === "dark";
  const primaryColor = isDark ? "#bbdefb" : "#1976d2";

  const iconConfig = [
    { icon: WbSunnyIcon, color: "#1976d2" },
    { icon: ShoppingCartIcon, color: "#9333ea" },
    { icon: MovieIcon, color: "#16a34a" },
    { icon: QuizIcon, color: "#e11d48" },
    { icon: FunctionsIcon, color: "#f59e0b" },
    { icon: AccessTimeIcon, color: "#0ea5e9" },
    { icon: QrCode2Icon, color: "#10b981" },
  ];

  const proyectosUI = t.projects.items.map((item, i) => {
    const { icon: Icon, color } = iconConfig[i % iconConfig.length];

    return {
      ...item,
      Icon,
      color,
      subtitle: item.descripcion,
      title: item.titulo,
    };
  });

  return (
    <Box id="projects" sx={{ py: 4, scrollMarginTop: "80px" }}>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <WorkOutlineIcon sx={{ color: primaryColor }} />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {t.projects.title}
        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {proyectosUI.map((p, i) => (
          <Grid item xs={12} sm={6} md={4} key={p.title}>
            <ItemCard {...p} palette={palette} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
