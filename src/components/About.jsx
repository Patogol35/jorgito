import { Typography, Grid, Box } from "@mui/material";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const estudios = [
{
titulo: "💻 Máster en Ingeniería de Software y Sistemas Informáticos",
institucion: "Universidad Internacional de La Rioja, España",
detalle: "Nota TFM: 9 | Promedio final: 8.68",
icon: <GraduationCap size={28} color="#1976d2" />,
},
{
titulo: "💻 Ingeniero en Sistemas",
institucion: "Universidad Indoamérica, Ecuador",
detalle: "Nota Tesis: 9.50 | Promedio final: 9",
icon: <GraduationCap size={28} color="#9333ea" />,
},
];

export default function About() {
return (
<Box id="about" sx={{ py: 4, scrollMarginTop:"80px" }}>
{/* Título */}
<motion.div
initial={{ opacity: 0, y: 50 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
style={{ textAlign: "center", marginBottom: "1rem" }}
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
Formación Académica
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

{/* Grid */}  
  <Grid container spacing={3} justifyContent="center">  
    {estudios.map((est, i) => (  
      <Grid item xs={12} sm={6} md={4} key={i}>  
        <motion.div  
          initial={{ opacity: 0, y: 20 }}  
          whileInView={{ opacity: 1, y: 0 }}  
          transition={{ duration: 0.5, delay: i * 0.4 }}  
        >  
          <Box sx={{ textAlign: "center", px: 1 }}>  
            {est.icon}  
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>  
              {est.titulo}  
            </Typography>  
            <Typography variant="body2" color="text.secondary">  
              {est.institucion}  
            </Typography>  
            <Typography variant="body2" color="text.secondary">  
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

