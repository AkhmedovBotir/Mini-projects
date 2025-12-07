import { Box, Grid, Stack, Typography, Container, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const HighlightsSection = () => {
  const swiperRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Route description items data
  const routeItems = [
    {
      text: 'Город Гагра, Колоннада, ресторан "Гагрипш", Парк принца Ольденбурского;',
    },
    {
      text: 'Смотровая площадка "Прощай Родина", "Чабгарский" карниз, Подвесной мост через реку "Бзыбь";',
    },
    {
      text: 'Дегустация сыра, меда, вина, чачи (входит в стоимость экскурсии), Голубое Озеро, Юпшарский каньон ("Каменный мешок"), Озеро "Рица", Водопады "Девичьи и мужские слезы".',
    },
  ];

  // Optional route items
  const optionalRouteItems = [
    {
      text: 'Монастырь "Новый Афон", Новоафонская Пещера, "Рукотворный" водопад, храм "Симона Кананита", Лебединое озеро.',
    },
    {
      text: "Термальный источник в с. Приморское.",
    },
  ];

  // Destination images data
  const destinations = [
    {
      image: "https://c.animaapp.com/m8se7bge4ci0t5/img/------2.png",
      name: "Гагра",
    },
    {
      image: "https://c.animaapp.com/m8se7bge4ci0t5/img/------1.png",
      name: "Коллонада",
    },
    {
      image: "https://c.animaapp.com/m8se7bge4ci0t5/img/------2.png",
      name: "Гагра",
    },
    {
      image: "https://c.animaapp.com/m8se7bge4ci0t5/img/------1.png",
      name: "Коллонада",
    },
  ];

  const handleSlideChange = (swiper) => {
    const slidesPerView = isMobile ? 1 : isTablet ? 1.5 : 2;
    const totalSlides = swiper.slides.length - (slidesPerView) + 1;
    const progress = ((swiper.activeIndex) / (totalSlides - 1)) * 100;
    setProgress(progress);
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, sm: 3 } }}>
      <Grid container spacing={4}>
        {/* Left side - Route description */}
        <Grid item xs={12} md={5}>
          <Box>
            <Typography
              variant="h4"
              fontWeight="bold"
              color={blue[700]}
              gutterBottom
              fontFamily="Montserrat, Helvetica"
              sx={{ fontSize: { xs: '1.75rem', md: '2.125rem' } }}
            >
              Описание маршрута
            </Typography>

            <Stack spacing={3} sx={{ mt: 4 }}>
              {routeItems.map((item, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "flex-start" }}
                >
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      bgcolor: "warning.main",
                      borderRadius: 1,
                      mt: 0.5,
                      mr: 2,
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    variant="body2"
                    fontWeight="medium"
                    fontFamily="Montserrat, Helvetica"
                  >
                    {item.text}
                  </Typography>
                </Box>
              ))}

              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{ ml: 5 }}
                fontFamily="Montserrat, Helvetica"
              >
                Далее на выбор:
              </Typography>

              {optionalRouteItems.map((item, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "flex-start" }}
                >
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      bgcolor: "warning.main",
                      borderRadius: 1,
                      mt: 0.5,
                      mr: 2,
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    variant="body2"
                    fontWeight="medium"
                    fontFamily="Montserrat, Helvetica"
                  >
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Grid>

        {/* Right side - Destination images slider */}
        <Grid item xs={12} md={7}>
          <Box sx={{ position: "relative" }}>
            {/* Swiper slider */}
            <Box sx={{ position: 'relative' }}>
              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  // Initialize progress
                  const slidesPerView = isMobile ? 1 : isTablet ? 1.5 : 2;
                  const totalSlides = swiper.slides.length - (slidesPerView) + 1;
                  const initialProgress = ((swiper.activeIndex) / (totalSlides - 1)) * 100;
                  setProgress(initialProgress);
                }}
                onSlideChange={handleSlideChange}
                slidesPerView={1}
                spaceBetween={20}
                breakpoints={{
                  600: {
                    slidesPerView: 1.5,
                  },
                  900: {
                    slidesPerView: 2,
                  },
                }}
                modules={[Navigation]}
                style={{ padding: '0 10px' }}
              >
                {destinations.map((destination, index) => (
                  <SwiperSlide key={index}>
                    <Box
                      sx={{
                        position: "relative",
                        width: '100%',
                        height: { xs: 300, sm: 400, md: 570 },
                        backgroundImage: `url(${destination.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "50% 50%",
                        borderRadius: 2,
                        overflow: 'hidden'
                      }}
                    >
                      <Typography
                        sx={{
                          position: "absolute",
                          bottom: 16,
                          left: 24,
                          color: "warning.main",
                          fontFamily: "Montserrat, Helvetica",
                          fontWeight: "medium",
                          fontSize: 14,
                        }}
                      >
                        {destination.name}
                      </Typography>
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>

            <Box sx={{ 
              mt: 4, 
              display: "flex", 
              alignItems: "center",
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 0 }
            }}>
              
              
              {/* Navigation controls and progress bar */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                flexGrow: 1,
                order: { xs: 1, sm: 2 },
                width: '100%',
                ml: { sm: 4 }
              }}>

                <Box sx={{ 
                  display: 'flex', 
                  mr: 2,
                  minWidth: 'max-content'
                }}>
                  <IconButton
                    onClick={() => swiperRef.current?.slidePrev()}
                    sx={{ 
                      mr: 1,
                      '&:disabled': {
                        opacity: 0.5
                      }
                    }}
                    disabled={activeIndex === 0}
                  >
                    <ArrowBackIosNewIcon
                      sx={{
                        color: activeIndex >= 1 ? 'primary.main' : 'grey.500',
                        fontSize: { xs: '1rem', sm: '1.25rem' }
                      }}
                    />
                  </IconButton>

                  <IconButton
                    onClick={() => swiperRef.current?.slideNext()}
                    sx={{ 
                      ml: 1,
                      '&:disabled': {
                        opacity: 0.5
                      }
                    }}
                    disabled={activeIndex >= destinations.length - (isMobile ? 1 : isTablet ? 1.5 : 2)}
                  >
                    <ArrowForwardIosIcon
                      sx={{
                        color: activeIndex < destinations.length - (isMobile ? 1 : isTablet ? 1.5 : 2) ? 'primary.main' : 'grey.500',
                        fontSize: { xs: '1rem', sm: '1.25rem' }
                      }}
                    />
                  </IconButton>
                </Box>
                <Box sx={{ 
                  flexGrow: 1, 
                  height: '4px', 
                  bgcolor: 'divider', 
                  borderRadius: '2px', 
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      height: '100%',
                      width: `${progress}%`,
                      bgcolor: 'primary.main',
                      borderRadius: '2px',
                      transition: 'width 0.3s ease',
                      minWidth: '4px'
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};