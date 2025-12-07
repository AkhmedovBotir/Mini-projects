import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, Typography, Drawer, Stack, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import bgVideo from "../../../../assets/video2.mp4"; // Adjust the path to your video
import logo from "../../../../assets/logo.png"

export const GallerySection = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isTablet = useMediaQuery('(max-width:1024px)');
  const isMobile = useMediaQuery('(max-width:600px)');

  // Navigation menu items
  const navItems = [
    { label: "Главная", href: "#", isActive: false },
    { label: "Экскурсии", href: "#", isActive: true },
    { label: "Личный кабинет", href: "#", isActive: false },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(56, 77, 112)',
        padding: '20px'
      }}
    >
      <IconButton
        onClick={handleDrawerToggle}
        sx={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          color: '#fff'
        }}
      >
        <CloseIcon />
      </IconButton>
      <Stack spacing={4}>
        {navItems.map((item, index) => (
          <Typography
            key={index}
            variant={isMobile ? "h6" : "h5"}
            component="a"
            href={item.href}
            onClick={handleDrawerToggle}
            sx={{
              fontFamily: "'Montserrat', Helvetica",
              fontWeight: 500,
              color: item.isActive ? "#FFCC00" : "white",
              letterSpacing: 0,
              lineHeight: "normal",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            {item.label}
          </Typography>
        ))}
      </Stack>
    </Box>
  );

  return (
    <Box sx={{ position: "relative", width: "100%", height: { xs: "400px", sm: "500px", md: "670px" } }}>
      {/* Video Background */}
      <Box
        component="video"
        autoPlay
        muted
        loop
        playsInline
        src={bgVideo}
        sx={{ 
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        {/* Fallback text if video doesn't load */}
        Your browser does not support the video tag.
      </Box>

      {/* Logo */}
      <Box
        component="img"
        src={logo}
        alt="Logo"
        sx={{
          position: "absolute",
          width: { xs: 30, sm: 40 },
          height: { xs: 43, sm: 57 },
          top: { xs: 16, sm: 26 },
          left: { xs: 20, sm: 40, md: 160 },
          objectFit: "contain"
        }}
      />

      {/* Navigation - Desktop */}
      {!isTablet ? (
        <Stack
          direction="row"
          spacing={2}
          position="absolute"
          top={{ xs: 20, md: 46 }}
          right={{ xs: 20, sm: 40, md: 154 }}
        >
          {navItems.map((item, index) => (
            <Typography
              key={index}
              component="a"
              href={item.href}
              sx={{
                fontFamily: "'Montserrat', Helvetica",
                fontWeight: 500,
                fontSize: "0.875rem",
                color: item.isActive ? "#FFCC00" : "white",
                letterSpacing: 0,
                lineHeight: "normal",
                textDecoration: "none",
                cursor: "pointer",
                '&:hover': {
                  color: "#FFCC00"
                }
              }}
            >
              {item.label}
            </Typography>
          ))}
        </Stack>
      ) : (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            position: "absolute",
            top: { xs: 16, sm: 26 },
            right: 20,
            color: '#fff',
            zIndex: 1
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: '100%',
            backgroundColor: 'rgb(56, 77, 112)',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Favorite Button */}
      <IconButton
        sx={{
          position: "absolute",
          top: { xs: "70%", sm: "408px" },
          left: { xs: "50%", sm: "447px" },
          transform: { xs: "translateX(-50%)", sm: "none" },
          width: "50px",
          height: "50px",
          borderRadius: "25px",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(500px) brightness(100%)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          },
        }}
      >
        <FavoriteIcon
          sx={{ color: "white", width: "30px", height: "30px" }}
        />
      </IconButton>

      {/* Back to tours button */}
      <Button
        variant="text"
        sx={{
          position: "absolute",
          top: { xs: "70%", sm: "408px" },
          left: { xs: "50%", sm: "160px" },
          transform: { xs: "translateX(-50%)", sm: "none" },
          width: { xs: "200px", sm: "274px" },
          height: "50px",
          borderRadius: "60px",
          color: "white",
          fontFamily: "'Montserrat', Helvetica",
          fontWeight: "bold",
          fontSize: "14px",
          mt: { xs: 6, sm: 0 },
        }}
        endIcon={
          <ArrowForwardIosIcon sx={{ width: "14px", height: "7px" }} />
        }
      >
        К другим экскурсиям
      </Button>

      {/* Tour Title Section */}
      <Box
        sx={{
          position: "absolute",
          width: { xs: "90%", md: "765px" },
          top: { xs: "30%", sm: "211px" },
          left: { xs: "50%", md: "160px" },
          transform: { xs: "translateX(-50%)", md: "none" },
          textAlign: { xs: "center", md: "left" }
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Montserrat', Helvetica",
            fontWeight: "bold",
            fontSize: { xs: "18px", md: "24px" },
            color: "#FFCC00",
            lineHeight: "normal",
          }}
        >
          Автобусный тур
        </Typography>

        <Typography
          variant="h1"
          sx={{
            mt: { xs: 1, md: "39px" },
            fontFamily: "'Montserrat', Helvetica",
            fontWeight: "bold",
            fontSize: { xs: "24px", sm: "36px", md: "48px" },
            color: "white",
            lineHeight: "normal",
          }}
        >
          ЗОЛОТОЕ КОЛЬЦО АБХАЗИИ
          <br />
          (ИЗ АДЛЕРА)
        </Typography>
      </Box>
    </Box>
  );
};