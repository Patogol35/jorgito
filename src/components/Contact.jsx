Este digo import { Container, Typography, Box, Link, IconButton, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { GitHub, LinkedIn, Facebook, Instagram, MailOutline } from "@mui/icons-material";
import React from "react";

export default function Contact() {
const socialLinks = [
{
icon: <Facebook fontSize="large" />,
color: "#1877F2",
href: "https://www.facebook.com/share/1C9RgHAPvL/",
},
{
icon: <Instagram fontSize="large" />,
color: "#E4405F",
href: "https://www.instagram.com/jorge_patricio_26",
},
{
icon: <GitHub fontSize="large" />,
color: "#fff", // 👈 blanco para fondo oscuro
href: "https://github.com/Patogol35",
},
{
icon: <LinkedIn fontSize="large" />,
color: "#0A66C2",
href: "https://www.linkedin.com/in/jorge-patricio-santamaría-cherrez-2a73792b2",
},
{
icon: <MailOutline fontSize="large" />,
color: "#1976d2",
href: "mailto:patogol3535@gmail.com",
},
];

return (
<Box
id="contact"
sx={{
background: "transparent", // el Paper del App.jsx manda el fondo
py: 12,
color: "#fff",
scrollMarginTop:"80px",

}}  
>  
  <Container maxWidth="sm">  
    <motion.div  
      initial={{ opacity: 0, y: 50 }}  
      whileInView={{ opacity: 1, y: 0 }}  
      viewport={{ once: true }}  
      transition={{ duration: 0.8 }}  
    >  
      {/* Título */}  
      <motion.div  
        initial={{ opacity: 0, y: 50 }}  
        whileInView={{ opacity: 1, y: 0 }}  
        transition={{ duration: 0.8 }}  
        style={{ textAlign: "center", marginBottom: "1.5rem" }}  
      >  
        <Typography  
          variant="h4"  
          align="center"  
          sx={{  
            fontWeight: 700,  
            color: "#1976d2",  
            position: "relative",  
            display: "inline-block",  
          }}  
        >  
          Contáctame   
          <Box  
            component="span"  
            sx={{  
              position: "absolute",  
              left: "50%",  
              bottom: -6,  
              transform: "translateX(-50%)",  
              width: "60%",  
              height: "3px",  
              background: "#1976d2",  
              borderRadius: "6px",  
            }}  
          />  
        </Typography>  
      </motion.div>  

      {/* Redes sociales + correo */}  
      <Stack  
        direction="row"  
        spacing={3}  
        justifyContent="center"  
        alignItems="center"  
      >  
        {socialLinks.map((s, i) => (  
          <motion.div  
            key={i}  
            initial={{ opacity: 0, scale: 0.8 }}  
            whileInView={{ opacity: 1, scale: 1 }}  
            transition={{ duration: 0.5, delay: i * 0.2 }}  
            whileHover={{ scale: 1.2, rotate: 8 }}  
            whileTap={{ scale: 0.9 }}  
          >  
            <IconButton  
              component={Link}  
              href={s.href}  
              target="_blank"  
              rel="noopener"  
              sx={{  
                "&:hover": {  
                  backgroundColor: "transparent",  
                  transform: "scale(1.2)",  
                },  
              }}  
            >  
              {React.cloneElement(s.icon, { sx: { color: s.color } })}  
            </IconButton>  
          </motion.div>  
        ))}  
      </Stack>  
    </motion.div>  
  </Container>  
</Box>

);
}

