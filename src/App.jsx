// ================= App.jsx =================
import { useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import { translations } from "./i18n";
import Hero from "./components/Hero";

function App() {
  const storedMode = localStorage.getItem("themeMode") || "dark";
  const storedLang = localStorage.getItem("lang") || "es";

  const [mode, setMode] = useState(storedMode);
  const [lang, setLang] = useState(storedLang);

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const t = translations[lang];

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box>
        <Hero
          mode={mode}
          setMode={setMode}
          t={t}
          lang={lang}
          setLang={setLang}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
