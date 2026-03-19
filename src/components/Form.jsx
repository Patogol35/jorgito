export default function Form({ t }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primaryColor = isDark ? "#bbdefb" : theme.palette.primary.main;

  const formRef = useRef(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_fd9ejbr",
        "template_pwsn0sn",
        formRef.current,
        "Try7tc29-wnfxyPyf"
      )
      .then(() => {
        setSuccess(true);
        formRef.current.reset();
      })
      .catch(() => alert(t.form.error)); // 🔥 i18n
  };

  return (
    <Box id="form" sx={{ py: { xs: 4, md: 6 } }}>
      <Container maxWidth="sm">
        {/* ================= TÍTULO ================= */}
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
              background: isDark
                ? "rgba(144,202,249,0.06)"
                : "rgba(25,118,210,0.06)",
              border: `1px solid ${
                isDark
                  ? "rgba(144,202,249,0.25)"
                  : "rgba(25,118,210,0.25)"
              }`,
              backdropFilter: "blur(6px)",
            }}
          >
            <ContactMailIcon sx={{ fontSize: 22, color: primaryColor }} />
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: primaryColor, lineHeight: 1 }}
            >
              {t.form.title}
            </Typography>
          </Box>
        </motion.div>

        {/* ================= SUBTÍTULO ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              mb: 4,
            }}
          >
            {t.form.subtitle}
          </Typography>
        </motion.div>

        {/* ================= FORM ================= */}
        <Box
          component="form"
          ref={formRef}
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          {[
            {
              name: "from_name",
              label: t.form.fields.name,
              icon: <PersonIcon sx={{ color: primaryColor }} />,
            },
            {
              name: "from_email",
              label: t.form.fields.email,
              type: "email",
              icon: <EmailIcon sx={{ color: primaryColor }} />,
            },
            {
              name: "message",
              label: t.form.fields.message,
              multiline: true,
              rows: 4,
              icon: <MessageIcon sx={{ color: primaryColor }} />,
            },
          ].map((field, i) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <TextField
                {...field}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={
                        field.multiline
                          ? { alignSelf: "flex-start", mt: 1 }
                          : {}
                      }
                    >
                      {field.icon}
                    </InputAdornment>
                  ),
                }}
                sx={inputStyle(theme)}
              />
            </motion.div>
          ))}

          {/* ================= BOTÓN ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              type="submit"
              startIcon={<SendIcon />}
              sx={{
                borderRadius: "25px",
                textTransform: "none",
                fontWeight: "bold",
                px: 5,
                py: 1.4,
                color:
                  theme.palette.mode === "light"
                    ? "#ffffff"
                    : "#020617",
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
                boxShadow: "none",
                "&:hover": {
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, #3b82f6)`,
                  transform: "scale(1.04)",
                },
                transition: "transform 0.2s ease",
              }}
            >
              {t.form.button}
            </Button>
          </motion.div>
        </Box>

        {/* ================= ALERT ================= */}
        <Snackbar
          open={success}
          autoHideDuration={3500}
          onClose={() => setSuccess(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{
            top: "50% !important",
            transform: "translateY(-50%)",
          }}
        >
          <Alert
            severity="success"
            icon={false}
            sx={{
              px: 4,
              py: 2,
              borderRadius: 3,
              fontWeight: 600,
              textAlign: "center",
              fontSize: "0.95rem",
              color: theme.palette.mode === "dark" ? "#dcfce7" : "#14532d",
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, #064e3b, #022c22)"
                  : "linear-gradient(135deg, #dcfce7, #bbf7d0)",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 20px 40px rgba(0,0,0,0.6)"
                  : "0 20px 40px rgba(22,163,74,0.35)",
            }}
          >
            <strong>{t.form.success}</strong>
            <br />
            {t.form.successMsg}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
