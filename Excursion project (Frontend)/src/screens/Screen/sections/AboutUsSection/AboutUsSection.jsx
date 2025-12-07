import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FacebookIcon from "@mui/icons-material/Facebook";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { 
  Box, 
  Button, 
  IconButton, 
  Stack, 
  Typography,
  Drawer,
  useMediaQuery,
  ThemeProvider,
  createTheme
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import bgVideo from "../../../../assets/video2.mp4";
import vk from "../../../../assets/vk.png"; // Adjust the path to your VK icon
import { Instagram } from "@mui/icons-material";
import logo from "../../../../assets/logo.png"
export const AboutUsSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const autoplayRef = useRef(null);
  const isTablet = useMediaQuery('(max-width:1024px)');

  // Navigation items
  const navItems = [
    { text: "Главная", isActive: true, link: "/" },
    { text: "Экскурсии", isActive: false, link: "/excursion" },
    { text: "Личный кабинет", isActive: false, link: "/" },
  ];

  // Social media icons
  const socialIcons = [
    {
      alt: "VK",
      src: vk,
    },
    {
      alt: "Group",
      component: <Instagram sx={{width: 30, height: 30, color: "#fff"}}/>
    },
    {
      component: <FacebookIcon sx={{ width: 30, height: 30, color: '#fff' }} />,
      alt: "Facebook",
    },
  ];

  // Bottom images array
  const bottomImages = [
    {
      id: 1,
      type: "image",
      src: "https://s3-alpha-sig.figma.com/img/bfde/9227/4fddbb3487fd7605b478da9c8a1a5b74?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pcp97ehSVnSdekYurKlQLkUGncY-pvbUvrgagW7QejKrIx~AbvJrx-lpFwBJBsviEuIFUj5dyEGOdDcJhR-dzPDFUVZPs7Ji6erZQUvoRiw3QUakPnCTeUFpLoXooR7OHmKh0iEANaFuc1qgMUJVl71Ts8DRnbZ4CGsna3eS8ouo~yffP-cKCk7G4w7RibtmZPsxgC7xHGoB5OYmditXKMrqQo-QBDLEwTumtMIWxh7NIdY96~-CmKZ9ibKswldhd4295ypbGr~Vrx1XO77FveZ-z2BNIrNTsWWDo2Q~PG4XRFGOZn2lCTvonaJoFNeXjNpFuN3ERY8taZGa4K11eA__",
      alt: "Travel image 1"
    },
    {
      id: 2,
      type: "image",
      src: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      alt: "Travel image 2"
    },
    {
      id: 3,
      type: "video",
      src: "https://s3-alpha-sig.figma.com/img/cbf4/5631/2da4a49c5d1c73c4fb12509384c0dedc?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=BFDpeCE0lo1170~uilxMhnx5PHUbh4ME9qizgBqplD3ZfE-MhEnhXm8fUOL4AOgmK-QRkm824ABeTnzf8ShLyTTGhQC0T1Hkkzk7x8nhcildpUYhlxA-ur5~ZuM6VVsLPwrc6JizY6kjycdN~PiLDmCI4SlUMl7rU~sfVDVokXYwwSPzqZNluqqXYnFbT-njblyJ5GdQ12IO4c9ZUs0PaXuTExfcucBcV64f5IYu9JZkM8JfrAJbANW4sC5wV2SlH9aVO2kXLxm7lXdMHGLSb74-WWmkFcF9aCzhfiHNSyrc6y3oKO2VmkN6NtoswVfvSy85-4SWrqQ1ehVUbcWYsg__",
      alt: "Video thumbnail"
    },
    {
      id: 4,
      type: "image",
      src: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      alt: "Travel image 3"
    },
    {
      id: 5,
      type: "image",
      src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      alt: "Travel image 4"
    }
  ];

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    resetAutoplay();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Autoplay functionality
  const startAutoplay = () => {
    autoplayRef.current = setInterval(() => {
      setCurrentImageIndex(prevIndex => 
        prevIndex === bottomImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
  };

  const resetAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    startAutoplay();
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, []);

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
            variant="h5"
            component={Link}
            to={item.link}
            onClick={handleDrawerToggle}
            sx={{
              fontFamily: "Montserrat, Helvetica",
              fontWeight: 500,
              color: item.isActive ? "#ffc700" : "white",
              cursor: "pointer",
              textDecoration: 'none',
              '&:hover': {
                color: '#ffc700'
              }
            }}
          >
            {item.text}
          </Typography>
        ))}
      </Stack>
    </Box>
  );

  return (
    <Box sx={{ position: "relative", height: "902px", width: "100%", overflow: "hidden" }}>
      {/* Video Background */}
      <Box
        component="video"
        autoPlay
        muted
        loop
        src={bgVideo}
        sx={{
          width: "100%",
          height: "790px",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />

      {/* Logo and Navigation */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: "space-between", 
        alignItems: 'center', 
        position: 'absolute', 
        top: '26px', 
        left: '160px', 
        right: '160px',
        '@media (max-width: 1024px)': {
          left: '20px',
          right: '20px'
        }
      }}>
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            width: "40px",
            height: "57px",
            marginRight: '40px'
          }}
        />
        
        {!isTablet ? (
          <Stack direction="row" spacing={4}>
            {navItems.map((item, index) => (
              <Typography
                key={index}
                variant="subtitle2"
                component={Link}
                to={item.link}
                sx={{
                  fontFamily: "Montserrat, Helvetica",
                  fontWeight: 500,
                  color: item.isActive ? "#ffc700" : "white",
                  cursor: "pointer",
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#ffc700'
                  }
                }}
              >
                {item.text}
              </Typography>
            ))}
          </Stack>
        ) : (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ color: '#fff' }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
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

      {/* Rest of the components remain the same */}
      {/* Main Heading */}
      <Box
        sx={{
          position: "absolute",
          top: "237px",
          left: "160px",
          width: "723px",
          height: "192px",
          '@media (max-width: 1024px)': {
            left: '20px',
            width: 'calc(100% - 40px)'
          }
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: "Montserrat, Helvetica",
            fontWeight: 700,
            fontSize: "64px",
            color: "white",
            position: "absolute",
            top: 0,
            left: "2px",
            '@media (max-width: 768px)': {
              fontSize: '48px'
            }
          }}
        >
          ПУТЕШЕСТВУЙ
        </Typography>

        <Typography
          variant="h1"
          sx={{
            fontFamily: "Helvetica",
            letterSpacing: "0.05em",
            fontWeight: 900,
            fontSize: "72px",
            color: "transparent",
            WebkitTextStroke: "2px #ffffff",
            position: "absolute",
            top: "75px",
            left: 0,
            '@media (max-width: 768px)': {
              fontSize: '54px'
            }
          }}
        >
          PERO TRAVEL
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontFamily: "'mr_KindlyJasmineG-Regular', Helvetica",
            fontWeight: 400,
            fontSize: "64px",
            color: "#ffc700",
            position: "absolute",
            top: "48px",
            left: "500px",
            '@media (max-width: 1024px)': {
              left: '300px'
            },
            '@media (max-width: 768px)': {
              fontSize: '48px',
              left: '200px'
            }
          }}
          style={{ fontFamily: "mr_KindlyJasmineG" }}
        >
          вместе с
        </Typography>
      </Box>

      {/* Excursions Button */}
      <Button
        variant="contained"
        endIcon={<ArrowForwardIosIcon sx={{ width: "14px", height: "7px" }} />}
        sx={{
          position: "absolute",
          top: "491px",
          left: "160px",
          width: "230px",
          height: "50px",
          borderRadius: "60px",
          backgroundColor: "#0499DD",
          "&:hover": {
            backgroundColor: "#0388c5",
          },
          textTransform: "none",
          fontFamily: "Montserrat, Helvetica",
          fontWeight: 700,
          fontSize: "14px",
          '@media (max-width: 1024px)': {
            left: '20px'
          }
        }}
        component={Link}
        to="/excursion"
      >
        К экскурсиям
      </Button>

      {/* Social Media Icons */}
      <Stack
        spacing={2}
        sx={{
          position: "absolute",
          top: "333px",
          right: "163px",
          '@media (max-width: 1024px)': {
            right: '20px'
          }
        }}
      >
        {socialIcons.map((icon, index) => (
          <IconButton
            key={index}
            sx={{ width: "32px", height: "32px", padding: 0 }}
          >
            {icon.component || (
              <Box
                component="img"
                src={icon.src}
                alt={icon.alt}
                sx={{
                  width: icon.alt === "VK" ? "26px" : "27px",
                  height: icon.alt === "VK" ? "17px" : "27px",
                  color: "white",
                }}
              />
            )}
          </IconButton>
        ))}
      </Stack>

      {/* Bottom Images Carousel */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "227px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            position: "relative",
            padding: "0 50px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              transition: "transform 0.5s ease",
              transform: `translateX(${-currentImageIndex * 250 + 250}px)`,
            }}
          >
            {bottomImages.map((image, index) => {
              const isCenter = index === currentImageIndex;

              return (
                <Box
                  key={image.id}
                  onClick={() => handleImageClick(index)}
                  sx={{
                    width: isCenter ? "360px" : "235px",
                    height: "227px",
                    backgroundImage: `url(${image.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                    borderRadius: "10px",
                    margin: "0 10px",
                    transition: "all 0.3s ease",
                    transform: isCenter ? "scale(1.05)" : "scale(0.9)",
                    opacity: isCenter ? 1 : 0.8,
                    zIndex: isCenter ? 2 : 1,
                    flexShrink: 0,
                    cursor: "pointer",
                    "&:hover": {
                      transform: isCenter ? "scale(1.08)" : "scale(0.95)",
                    },
                  }}
                  aria-hidden={!isCenter}
                  tabIndex={isCenter ? "0" : "-1"}
                  role="option"
                  aria-describedby={`slide-${index}`}
                >
                  {image.type === "video" && isCenter && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "66px",
                        height: "66px",
                        borderRadius: "33px",
                        border: "1px solid #ffc700",
                        boxShadow: "0px 0px 4px #ffc600, 0px 0px 6px rgba(0, 0, 0, 0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        zIndex: 3,
                      }}
                    >
                      <PlayArrowIcon
                        sx={{ width: "44px", height: "44px", color: "#ffc700" }}
                      />
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutUsSection;