import { Box, Button, Stack, Typography, TextField, useTheme, useMediaQuery } from "@mui/material";
import React from "react";

export const NewsletterSection = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  // Form field data for mapping
  const formFields = [
    { id: "name", label: "Имя" },
    { id: "phone", label: "Телефон" },
    { id: "email", label: "Почта" },
  ];

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "auto", md: "700px" },
        minHeight: { xs: "600px", md: "auto" },
        backgroundImage: "url(https://s3-alpha-sig.figma.com/img/d7b4/6343/7c59f0eb3d59497e76861bf3a363da36?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ri5beS1Ia~PPVKL8VKIDsnaEhSz2YDW5IsPqmSi6wimKklVHLNJlKT13G6Bkmg-syLF3YYOOEw0Eq3PJ8ElkDqODjAtvbkWop3bxiUUO3fcgGgyPltOC0p12VLEVoqesQWSU~hyeu-wsrsflJ36HcG6w53kFT4UCfxPJPM7mvFw~w1jxCBNgMUdE9uVQW5sIA~UA4YloHaKM4Ni~iE0pnHH31jQCNwGl63DnwbXbAE6QPl9G3fDql-e9glZ9c6W-nX7x4G4P-TU6bCh41qxWXBi5IXJtLc82OlN4E5HscWgz4PcWwJFkF~rJtmapXMUtvU0mcDXiafYpjLtLgQgAIw__)",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: { xs: "center", md: "flex-end" },
        alignItems: "center",
        padding: { xs: "40px 20px", md: "0" }
      }}
    >
      {/* Background overlay for mobile to maintain readability */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: { xs: "rgba(0, 0, 0, 0.5)", md: "transparent" },
          display: { md: "none" }
        }}
      />
      
      <Box
        sx={{
          position: "relative",
          width: { xs: "100%", sm: "90%", md: "600px" },
          height: { xs: "auto", md: "100%" },
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(10px)",
          marginRight: { xs: "0", md: "200px" },
          padding: { xs: "40px 20px", sm: "60px 40px", md: "100px" },
          boxSizing: "border-box",
          zIndex: 1
        }}
      >
        <Typography
          variant={isSmUp ? "h5" : "h6"}
          fontFamily="Montserrat, Helvetica"
          fontWeight="bold"
          color="white"
          mb={2}
        >
          Остались вопросы?
        </Typography>

        <Typography
          variant="body2"
          fontFamily="Montserrat, Helvetica"
          fontWeight="medium"
          color="yellow"
          mb={4}
        >
          Оставь заявку и мы ответим
        </Typography>

        <Stack spacing={isSmUp ? 5 : 3}>
          {formFields.map((field) => (
            <Box 
              key={field.id} 
              sx={{ 
                position: "relative",
                paddingBottom: "8px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.5)"
              }}
            >
              <TextField
                id={field.id}
                label={field.label}
                variant="standard"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                  style: {
                    color: "white",
                    fontFamily: "Montserrat, Helvetica",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "white",
                    fontFamily: "Montserrat, Helvetica",
                    fontWeight: "medium",
                    fontSize: "0.875rem",
                  },
                }}
                sx={{
                  "& .MuiInput-root": {
                    paddingBottom: 0
                  },
                  "& .MuiInput-root:before": {
                    borderBottom: "none",
                  },
                  "& .MuiInput-root:after": {
                    borderBottom: "none",
                  },
                }}
              />
            </Box>
          ))}
        </Stack>

        <Button
          variant="contained"
          sx={{
            width: { xs: "100%", sm: "230px" },
            height: "50px",
            borderRadius: "60px",
            backgroundColor: "#007BFF",
            marginTop: { xs: "30px", md: "50px" },
            textTransform: "none",
            fontFamily: "Montserrat, Helvetica",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          Оставить заявку
        </Button>
      </Box>
    </Box>
  );
};