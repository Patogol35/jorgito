import { useMemo } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import BuildIcon from "@mui/icons-material/Build";

import { useSkillsFilter } from "../hooks/useSkillsFilter";
import { skills, categories, categoryIcons } from "../data/skillsData";

export default function Skills() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const { filter, setFilter, containerRef, buttonRefs } = useSkillsFilter();

  const colors = {
    primary: theme.palette.primary.main,
    primaryText: isDark ? "#bbdefb" : "#1976d2",
    headerBg: isDark
      ? "rgba(144,202,249,0.06)"
      : "rgba(25,118,210,0.06)",
    headerBorder: isDark
      ? "rgba(144,202,249,0.25)"
      : "rgba(25,118,210,0.25)",
    cardBg: isDark
      ? "rgba(255,255,255,0.05)"
      : "rgba(255,255,255,0.85)",
  };

  const filteredSkills = useMemo(() => {
    if (filter === "All") return skills;
    return skills.filter((s) => s.category === filter);
  }, [filter]);

  return (
    <Box id="skills" sx={{ py: 4, scrollMarginTop: "80px" }}>
      <Container>

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "2rem" }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 3,
              py: 1,
              borderRadius: "999px",
              background: colors.headerBg,
              border: `1px solid ${colors.headerBorder}`,
            }}
          >
            <BuildIcon sx={{ color: colors.primaryText }} />
            <Typography fontWeight="bold" color={colors.primaryText}>
              Stack Tecnológico
            </Typography>
          </Box>
        </motion.div>

        {/* FILTERS */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>
          <Box
            ref={containerRef}
            sx={{
              maxWidth: "100%",
              overflowX: "auto",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            <ToggleButtonGroup
              value={filter}
              exclusive
              onChange={(e, val) => val && setFilter(val)}
              sx={{ gap: 1.2 }}
            >
              {categories.map((cat) => (
                <ToggleButton
                  key={cat}
                  value={cat}
                  ref={(el) => (buttonRefs.current[cat] = el)}
                  component={motion.button}
                  whileTap={{ scale: 0.92 }}
                  sx={{
                    borderRadius: "999px",
                    px: 2.4,
                    py: 1,
                    fontWeight: 600,
                    textTransform: "none",
                    display: "flex",
                    gap: 1,
                    "&.Mui-selected": {
                      background: `linear-gradient(135deg, ${colors.primary}, ${theme.palette.primary.dark})`,
                      color: "#fff",
                    },
                  }}
                >
                  {categoryIcons[cat]}
                  {cat}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        </Box>

        {/* GRID */}
        <Grid container spacing={4} justifyContent="center">
          <AnimatePresence>
            {filteredSkills.map((skill, index) => (
              <Grid item xs={6} sm={4} md={3} key={skill.name}>
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  viewport={{ once: true }}
                >
                  <Paper
                    sx={{
                      p: 3,
                      textAlign: "center",
                      borderRadius: "22px",
                      background: colors.cardBg,
                      transition: "all 0.25s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <Box
                      component={motion.img}
                      src={skill.img}
                      alt={skill.name}
                      whileHover={{ scale: 1.14, y: -5 }}
                      transition={{ type: "spring", stiffness: 200, damping: 16 }}
                      sx={{
                        width: 65,
                        height: 65,
                        mb: 2,
                        objectFit: "contain",
                        filter: isDark
                          ? "invert(1) brightness(1.2)"
                          : "drop-shadow(0 0 5px rgba(0,0,0,0.25))",
                      }}
                    />
                    <Typography fontWeight="bold">
                      {skill.name}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>

      </Container>
    </Box>
  );
                                   }
