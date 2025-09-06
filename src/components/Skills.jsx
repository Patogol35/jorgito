import { 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  Box, 
  ToggleButton, 
  ToggleButtonGroup 
} from "@mui/material";  
import { motion, AnimatePresence } from "framer-motion";  
import { useState } from "react";  

const skills = [  
  { name: "React", category: "Frontend", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },  
  { name: "JavaScript", category: "Frontend", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },  
  { name: "Spring Boot", category: "Backend", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },  
  { name: "Python", category: "Backend", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },  
  { name: "MySQL", category: "Database", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },  
  { name: "PostgreSQL", category: "Database", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },  
  { name: "Elasticsearch", category: "Database", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg" },  
  { name: "AWS", category: "Cloud", img: "https://cdn.worldvectorlogo.com/logos/aws-2.svg" },  
  { name: "Vercel", category: "Cloud", img: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/vercel.svg" },  
  { name: "Render", category: "Cloud", img: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/render.svg" },  
  { name: "Supabase", category: "Cloud", img: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/supabase.svg" },  
  { name: "Postman", category: "Tools", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },  
  { name: "npm", category: "Tools", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" },  
];  

export default function Skills() {  
  const [filter, setFilter] = useState("All");  

  const filteredSkills =  
    filter === "All" ? skills : skills.filter((s) => s.category === filter);  

  return (  
    <Box id="skills" sx={{ py: 4, scrollMarginTop: "80px" }}>  
      <Container>  
        {/* Título */}  
        <motion.div  
          initial={{ opacity: 0, y: 50 }}  
          whileInView={{ opacity: 1, y: 0 }}  
          transition={{ duration: 0.8 }}  
          style={{ textAlign: "center", marginBottom: "3rem" }}  
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
            Tecnologías que domino  
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

        {/* Filtros */}  
        <Box display="flex" justifyContent="center" mb={6}>  
          <ToggleButtonGroup  
            value={filter}  
            exclusive  
            onChange={(e, newFilter) => newFilter && setFilter(newFilter)}  
            aria-label="Filtros de Skills"  
            sx={{  
              background: "rgba(255,255,255,0.7)",  
              borderRadius: "12px",  
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",  
            }}  
          >  
            {["All", "Frontend", "Backend", "Database", "Cloud", "Tools"].map(  
              (cat) => (  
                <ToggleButton  
                  key={cat}  
                  value={cat}  
                  sx={{  
                    textTransform: "none",  
                    fontWeight: "bold",  
                    px: 1.5,  
                    py: 0.5,  
                    fontSize: "0.85rem",  
                    "&.Mui-selected": {  
                      background: "linear-gradient(90deg,#1976d2,#6d28d9)",  
                      color: "white",  
                    },  
                    "&:hover": {  
                      background: "linear-gradient(90deg,#2563eb,#4f46e5)",  
                      color: "white",  
                    },  
                  }}  
                >  
                  {cat}  
                </ToggleButton>  
              )  
            )}  
          </ToggleButtonGroup>  
        </Box>  

        {/* Grid */}  
        <Grid container spacing={4} justifyContent="center">  
          <AnimatePresence>  
            {filteredSkills.map((skill, index) => (  
              <Grid item xs={6} sm={4} md={3} key={skill.name}>  
                <motion.div  
                  initial={{ opacity: 0, scale: 0.9 }}  
                  whileInView={{ opacity: 1, scale: 1 }}  
                  exit={{ opacity: 0, scale: 0.8 }}  
                  transition={{ duration: 0.4, delay: index * 0.05 }}  
                  viewport={{ once: true }}  
                  whileHover={{ scale: 1.08 }}  
                >  
                  <Paper  
                    elevation={8}  
                    sx={{  
                      p: 3,  
                      textAlign: "center",  
                      borderRadius: "20px",  
                      backdropFilter: "blur(12px)",  
                      background: "rgba(255, 255, 255, 0.8)",  
                      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",  
                      transition: "all 0.3s ease-in-out",  
                      "&:hover": {  
                        background: "rgba(255, 255, 255, 0.95)",  
                        boxShadow: "0 12px 24px rgba(0,0,0,0.2)",  
                      },  
                    }}  
                  >  
                    <Box  
                      component="img"  
                      src={skill.img}  
                      alt={skill.name}  
                      sx={{  
                        width: 65,  
                        height: 65,  
                        objectFit: "contain",  
                        mb: 2,  
                        transition: "transform 0.3s ease",  
                        "&:hover": { transform: "rotate(8deg) scale(1.1)" },  
                      }}  
                    />  
                    <Typography  
                      variant="subtitle1"  
                      fontWeight="bold"  
                      sx={{  
                        transition: "color 0.3s",  
                        "&:hover": { color: "#1976d2" },  
                      }}  
                    >  
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
