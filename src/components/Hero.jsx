import {
  Toolbar,
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
  Grid,
  Paper,
} from "@mui/material";
import {
  Description,
  WorkspacePremium,
  SmartToy,
  Brightness4,
  Brightness7,
  Terminal,
  Api,
  Storage,
  Security,
  SupportAgent,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

/* ================= TOOLS ================= */
const tools = [
  { label: "Linux", icon: <Terminal /> },
  { label: "Postman", icon: <Api /> },
  { label: "VirtualBox", icon: <Storage /> },
  { label: "NextDNS", icon: <Security /> },
  { label: "AnyDesk", icon: <SupportAgent /> },
  { label: "Microsoft Office", icon: <Description /> },
];

export default function Hero({ mode, setMode }) {
  const theme = useTheme();

  const easeOutExpo = [0.16, 1, 0.3, 1];

  const fadeCinematic = {
    hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: easeOutExpo },
    },
  };

  return (
    <>
      <Toolbar />

      <Box
        id="hero"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 5, md: 8 },
          px: { xs: 2, md: 8 },
          pt: { xs: 6, md: 10 },
          pb: 6,
        }}
      >
        {/* ================= AVATAR ================= */}
        <motion.div
          initial={{ opacity: 0, rotateY: -180, scale: 0.9 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
          transition={{ duration: 2.2, ease: easeOutExpo }}
        >
          <Avatar
            src="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1768080897/file_00000000abe471f8a911de56e6d3cb7f_e0quhw.png"
            sx={{
              width: { xs: 140, sm: 180, md: 200 },
              height: { xs: 140, sm: 180, md: 200 },
              border: `3px solid ${theme.palette.primary.main}`,
              boxShadow: `0 0 25px ${theme.palette.primary.main}66`,
            }}
          />
        </motion.div>

        {/* ================= CONTENIDO ================= */}
        <Box maxWidth="640px">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.18 } },
            }}
          >
            <motion.div variants={fadeCinematic}>
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: { xs: "1.9rem", md: "2.6rem" },
                }}
              >
                Hola, soy Jorge Patricio Santamaría Cherrez
              </Typography>
            </motion.div>

            <motion.div variants={fadeCinematic}>
              <Typography
                variant="h6"
                sx={{ mt: 1, fontStyle: "italic" }}
                color="text.secondary"
              >
                Ingeniero en Sistemas · Máster en Ingeniería de Software
              </Typography>
            </motion.div>

            <motion.div variants={fadeCinematic}>
              <Typography
                sx={{
                  mt: 3,
                  lineHeight: 1.9,
                  opacity: 0.9,
                }}
              >
                Me apasiona crear tecnología que transforma ideas en realidades
                digitales. Desarrollo soluciones seguras, escalables y
                orientadas a generar impacto real.
              </Typography>
            </motion.div>

            {/* ================= TOOLS GRID ================= */}
            <motion.div variants={fadeCinematic}>
              <Typography
                sx={{
                  mt: 4,
                  mb: 2,
                  fontWeight: 600,
                  color: theme.palette.text.secondary,
                }}
              >
                🛠 Herramientas principales
              </Typography>

              <Grid container spacing={2}>
                {tools.map((tool, i) => (
                  <Grid item xs={6} sm={4} key={tool.label}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 1,
                          borderRadius: 3,
                          backdropFilter: "blur(10px)",
                          background:
                            theme.palette.mode === "dark"
                              ? "rgba(15,23,42,0.55)"
                              : "rgba(241,245,249,0.8)",
                          border: `1px solid ${theme.palette.primary.main}33`,
                          transition: "all 0.35s ease",
                          "&:hover": {
                            transform: "translateY(-6px) scale(1.03)",
                            boxShadow: `0 12px 30px ${theme.palette.primary.main}33`,
                          },
                        }}
                      >
                        <Box
                          sx={{
                            color: theme.palette.primary.main,
                            fontSize: 34,
                          }}
                        >
                          {tool.icon}
                        </Box>
                        <Typography fontWeight={500}>
                          {tool.label}
                        </Typography>
                      </Paper>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>

            {/* ================= BOTONES ================= */}
            <motion.div variants={fadeCinematic}>
              <Box
                sx={{
                  mt: 5,
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<Description />}
                  href="/Jorge.CV.pdf"
                  target="_blank"
                  sx={{ borderRadius: 25, px: 4 }}
                >
                  Ver CV
                </Button>

                <Button
                  variant="contained"
                  startIcon={<WorkspacePremium />}
                  href="https://res.cloudinary.com/dqkwc0kf7/image/upload/v1759022233/image_b835ddca-c010-4f78-a300-676248ea3fd120250927_201635_cizk17.jpg"
                  target="_blank"
                  sx={{ borderRadius: 25, px: 4 }}
                >
                  Ver Título
                </Button>

                <IconButton
                  onClick={() =>
                    setMode(mode === "light" ? "dark" : "light")
                  }
                >
                  {mode === "light" ? <Brightness4 /> : <Brightness7 />}
                </IconButton>
              </Box>
            </motion.div>
          </motion.div>
        </Box>
      </Box>
    </>
  );
}
