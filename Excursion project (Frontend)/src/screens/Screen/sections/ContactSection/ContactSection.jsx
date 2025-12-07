import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PhoneIcon from "@mui/icons-material/Phone";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Box, Container, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import vk from "../../../../assets/vk2.png"; // Adjust the path to your VK icon

export const ContactSection = () => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  // Navigation links data
  const navLinks = [
    { text: "Главная", href: "#" },
    { text: "Экскурсии", href: "#" },
    { text: "Личный кабинет", href: "#" },
  ];

  // Contact information data
  const contactInfo = [
    { icon: <PhoneIcon fontSize="small" />, text: "+7 964 944 18 74" },
    { icon: <PhoneIcon fontSize="small" />, text: "+7 918 919 98 28" },
    {
      icon: <TelegramIcon fontSize="small" />,
      text: "Телеграм-бот PeroTravel",
    },
  ];

  // Social media icons
  const socialIcons = [
    <Box
      key="vk"
      component="img"
      src={vk}
      alt="VK"
      sx={{ width: 31, height: 20 }}
    />,
    <InstagramIcon style={{color: "#E59B06"}} key="instagram" />,
    <FacebookIcon style={{color: "#17C1BC"}} key="facebook" />,
  ];

  return (
    <Box sx={{ bgcolor: "#F6F6F6", py: { xs: 3, sm: 4 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 3, sm: 2 }} alignItems={isSmUp ? "center" : "flex-start"}>
          {/* Logo */}
          <Grid item xs={12} sm={3} sx={{ 
            display: "flex", 
            justifyContent: { xs: "center", sm: "flex-start" },
            order: { xs: 1, sm: 1 }
          }}>
            <Box
              component="img"
              src="https://s3-alpha-sig.figma.com/img/2362/9489/18c64aa97762b2a3a082962b9f5603a2?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QpSlprcEPEkD0QlQKS2xg6Z-KmCw5eeSFPPqaDE1YAT6oubW9DacmfebDoGrSyFjw0atpCpMxHO8PTw0T3Q40ddicUqOgOQSIHJgiNvrbI~p3W12R-oIbfP5aiVc2fT0dLjeaarwjQN0v9De-Py2YaVgd--Up7YHF1yQ5216SExgZa50joHy3bl8EvsbZ-ijP1VGHbcJXHlw5Qlst2Im7Dx8bcwAvCte3TRC1UlVEJJDqNsI-TWDNGS268ngOVCgv0iRMQfSsrmMI8WSS8ExDMAzNmGl4cv284jI5jbZHgY407iYod~VsEGVcpunwQXGH-2j5SVOehIu6wUXYFjQsw__"
              alt="Logo color"
              sx={{ 
                height: { xs: 90, sm: 114 }, 
                width: { xs: 60, sm: 80 }, 
                objectFit: "cover" 
              }}
            />
          </Grid>

          {/* Navigation Links */}
          <Grid item xs={12} sm={3} sx={{ order: { xs: 3, sm: 2 } }}>
            <Stack spacing={{ xs: 1, sm: 2 }}>
              {navLinks.map((link, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  fontFamily="Montserrat, Helvetica"
                  fontWeight={500}
                  color="#282828"
                  sx={{ 
                    cursor: "pointer",
                    textAlign: { xs: "center", sm: "left" },
                    fontSize: { xs: "0.875rem", sm: "inherit" }
                  }}
                >
                  {link.text}
                </Typography>
              ))}
            </Stack>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} sm={3} sx={{ order: { xs: 2, sm: 3 } }}>
            <Stack spacing={{ xs: 1, sm: 2 }}>
              {contactInfo.map((item, index) => (
                <Stack
                  key={index}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent={{ xs: "center", sm: "flex-start" }}
                >
                  {item.icon}
                  <Typography
                    variant="body2"
                    fontFamily="Montserrat, Helvetica"
                    fontWeight={500}
                    color="#282828"
                    sx={{ fontSize: { xs: "0.875rem", sm: "inherit" } }}
                  >
                    {item.text}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>

          {/* Email and Social Media */}
          <Grid item xs={12} sm={3} sx={{ order: { xs: 4, sm: 4 } }}>
            <Stack spacing={{ xs: 1, sm: 2 }} alignItems={{ xs: "center", sm: "flex-start" }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <EmailIcon fontSize="small" />
                <Typography
                  variant="body2"
                  fontFamily="Montserrat, Helvetica"
                  fontWeight={500}
                  color="#282828"
                  sx={{ fontSize: { xs: "0.875rem", sm: "inherit" } }}
                >
                  office@perotravel.ru
                </Typography>
              </Stack>

              <Stack 
                direction="row" 
                spacing={2} 
                sx={{ 
                  mt: { xs: 1, sm: 2 },
                  justifyContent: { xs: "center", sm: "flex-start" }
                }}
              >
                {socialIcons.map((icon, index) => (
                  <Box key={index} sx={{ cursor: "pointer" }}>
                    {icon}
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};