import { Box, Stack, Typography, IconButton, Drawer, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import bgVideo from "../../../../assets/video2.mp4"; // Adjust the path to your video

export const MainSection = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isTablet = useMediaQuery('(max-width:1024px)');
  const isMobile = useMediaQuery('(max-width:600px)');

  // Navigation items data
  const navItems = [
    { label: "Главная", isActive: false, link: "/" },
    { label: "Экскурсии", isActive: true, link: "/excursion" },
    { label: "Личный кабинет", isActive: false, link: "/" },
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
            href={item.link}
            onClick={handleDrawerToggle}
            sx={{
              fontFamily: "'Montserrat', Helvetica",
              fontWeight: 500,
              color: item.isActive ? "#FFFF00" : "white",
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
    <Box width="100%" position="relative" sx={{ height: { xs: "200px", sm: "250px", md: "290px" } }}>
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
          height: { xs: "200px", sm: "250px", md: "290px" },
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />

      {/* Logo */}
      <Box
        component="img"
        src="https://c.animaapp.com/m8pweegwWhFvRw/img/----.png"
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
              href={item.link}
              sx={{
                fontFamily: "'Montserrat', Helvetica",
                fontWeight: 500,
                fontSize: "0.875rem",
                color: item.isActive ? "#FFFF00" : "white",
                letterSpacing: 0,
                lineHeight: "normal",
                textDecoration: "none",
                cursor: "pointer",
                '&:hover': {
                  color: "#FFFF00"
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

      {/* Title */}
      <Box
        position="absolute"
        top={{ xs: "50%", sm: 142 }}
        left={{ xs: 20, md: 160 }}
        right={{ xs: 20, md: "auto" }}
        sx={{
          transform: { xs: "translateY(-50%)", sm: "none" },
          textAlign: { xs: "center", md: "left" }
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: "'Montserrat', Helvetica",
            fontWeight: 700,
            fontSize: { xs: "2rem", sm: "3rem", md: "4.5rem" },
            color: "white",
            letterSpacing: 0,
            lineHeight: "normal",
            textShadow: "1px 1px 3px rgba(0,0,0,0.5)"
          }}
        >
          НАШИ ЭКСКУРСИИ
        </Typography>
      </Box>
    </Box>
  );
};