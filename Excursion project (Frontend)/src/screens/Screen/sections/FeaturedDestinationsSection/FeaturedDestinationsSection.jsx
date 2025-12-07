import { Box, Card, Container, Typography, Link, IconButton, useTheme, useMediaQuery } from "@mui/material";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const FeaturedDestinationsSection = () => {
  const swiperRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Иван Иванов, 25 лет",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "https://s3-alpha-sig.figma.com/img/77b1/65d7/cb632d3571d960b32d5468d67b43f4d8?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=iQekVX052dt2PMe2sd362MEuSTGQzCcaQf8stl~B~OlzTEwxQnT1a12Zza2P7EbWsuV7UUTodauApyThwhE9uJvzy~iKaVAu-CW1ASkSSiIhYQv9Kr68cJure9eWMGIaUFebe6LFfLBxtfvx9J~-auVUYIicDBT1d9yjLG6Fr6ZM53QP3Y3~hifvSbBcaofvgiQfEDFM-PY7ArSclj0P4NsOtTQO1JGBsbboLYM9sexsRCdz1GqmwHyG9O3kNse1oS77Z2LRgN0u5AiqgK~kkmPxHXpThb1a1gWMwowHw0GOzBTRgPVGTZzrOUv2wiT7WH88uVoq6TXrlVo4nnJJ-w__",
    },
    {
      id: 2,
      name: "Петр Петров, 30 лет",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "https://s3-alpha-sig.figma.com/img/a5fe/3956/cebfed890cb5929684934c84831a3508?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=F52gFLK2gN3mLb8fnOsHHPklomlBjA8ZLfig~xAmi1MxraKt4zkkLZ3iUkQbGUhr1r9Xr~ZIX3ufAHT7tepNdd4ZKboSwOV9s~pPDgYRqZhGe7ahuq6nd89AFl9oiQC6pF-Kut0VmRefDRKkKv8Pd-0~KSQR9irB6MO1D7IPS13W6HI~GjIapxq8mt9HdTPXnmiJxBS9T8aUI44X74c7OUea5cbpIzAwLtEsMOMwAxuBAS9RX5rDKrig6v1ndksSQPGXS9ddow8q9Iffwh5Wt2NwycRdv-PwjgqwpDOiW~F-mFl-Q098~srrO0mY0yjiitGDX-eDDAWjO4AAvI5XZw__",
    },
    {
      id: 3,
      name: "Анна Сидорова, 28 лет",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "https://s3-alpha-sig.figma.com/img/77b1/65d7/cb632d3571d960b32d5468d67b43f4d8?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=iQekVX052dt2PMe2sd362MEuSTGQzCcaQf8stl~B~OlzTEwxQnT1a12Zza2P7EbWsuV7UUTodauApyThwhE9uJvzy~iKaVAu-CW1ASkSSiIhYQv9Kr68cJure9eWMGIaUFebe6LFfLBxtfvx9J~-auVUYIicDBT1d9yjLG6Fr6ZM53QP3Y3~hifvSbBcaofvgiQfEDFM-PY7ArSclj0P4NsOtTQO1JGBsbboLYM9sexsRCdz1GqmwHyG9O3kNse1oS77Z2LRgN0u5AiqgK~kkmPxHXpThb1a1gWMwowHw0GOzBTRgPVGTZzrOUv2wiT7WH88uVoq6TXrlVo4nnJJ-w__",
    },
    {
      id: 4,
      name: "Мария Кузнецова, 35 лет",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "https://s3-alpha-sig.figma.com/img/a5fe/3956/cebfed890cb5929684934c84831a3508?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=F52gFLK2gN3mLb8fnOsHHPklomlBjA8ZLfig~xAmi1MxraKt4zkkLZ3iUkQbGUhr1r9Xr~ZIX3ufAHT7tepNdd4ZKboSwOV9s~pPDgYRqZhGe7ahuq6nd89AFl9oiQC6pF-Kut0VmRefDRKkKv8Pd-0~KSQR9irB6MO1D7IPS13W6HI~GjIapxq8mt9HdTPXnmiJxBS9T8aUI44X74c7OUea5cbpIzAwLtEsMOMwAxuBAS9RX5rDKrig6v1ndksSQPGXS9ddow8q9Iffwh5Wt2NwycRdv-PwjgqwpDOiW~F-mFl-Q098~srrO0mY0yjiitGDX-eDDAWjO4AAvI5XZw__",
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
    <Container sx={{ py: { xs: 5, md: 10 } }} maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: { xs: 4, md: 10 },
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="primary">
          Отзывы
        </Typography>
        <Link
          href="#"
          underline="always"
          sx={{
            fontSize: "0.75rem",
            color: "#282828",
            fontWeight: 500,
            '&:hover': {
              color: 'primary.main',
            }
          }}
        >
          Смотреть все
        </Link>
      </Box>

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
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={`${testimonial.id}-${index}`}>
              <Card
                sx={{
                  position: "relative",
                  height: { xs: 'auto', sm: 322 },
                  minHeight: { xs: 400, sm: 322 },
                  borderRadius: "10px",
                  bgcolor: "#F8F8F8",
                  p: 2,
                  overflow: "visible",
                }}
              >
                <Box sx={{ 
                  display: "flex", 
                  flexDirection: { xs: 'column', sm: 'row' },
                  height: '100%'
                }}>
                  <Box
                    component="img"
                    src={testimonial.image}
                    alt="User"
                    sx={{
                      width: { xs: '100%', sm: 245 },
                      height: { xs: 200, sm: 245 },
                      objectFit: "cover",
                      borderRadius: { xs: '8px 8px 0 0', sm: '8px' },
                      mb: { xs: 2, sm: 0 },
                    }}
                  />
                  <Box sx={{ 
                    ml: { sm: 3 }, 
                    width: "100%",
                    position: 'relative',
                    zIndex: 1
                  }}>
                    <Typography
                      fontWeight="bold"
                      fontSize="0.875rem"
                      color="#282828"
                      sx={{ mb: 1 }}
                    >
                      {testimonial.name}
                    </Typography>
                    <Typography
                      fontSize="0.875rem"
                      color="#282828"
                      fontWeight="medium"
                      sx={{ 
                        maxWidth: 395,
                        display: '-webkit-box',
                        WebkitLineClamp: { xs: 6, sm: 8 },
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {testimonial.text}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  sx={{
                    position: "absolute",
                    top: { xs: 30, sm: 56 },
                    right: { xs: 20, sm: 36 },
                    fontSize: { xs: '300px', sm: '500px' },
                    fontFamily: "'Marko One', Helvetica",
                    color: "#FFD700",
                    opacity: 0.4,
                    transform: "rotate(16.66deg)",
                    lineHeight: 1,
                    zIndex: 0,
                  }}
                >
                  "
                </Typography>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Navigation controls and progress bar */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mt: 4,
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 2, sm: 0 }
      }}>
        <Box sx={{ 
          display: 'flex', 
          order: { xs: 2, sm: 1 },
          width: { xs: '100%', sm: 'auto' },
          justifyContent: { xs: 'center', sm: 'flex-start' }
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
            disabled={activeIndex >= testimonials.length - (isMobile ? 1 : isTablet ? 1.5 : 2)}
          >
            <ArrowForwardIosIcon
              sx={{
                color: activeIndex < testimonials.length - (isMobile ? 1 : isTablet ? 1.5 : 2) ? 'primary.main' : 'grey.500',
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
  order: { xs: 1, sm: 2 },
  ml: { sm: 2 },
  width: { xs: '100%', sm: 'auto' },
  overflow: 'hidden' // Qo'shimcha: progress chegaradan chiqib ketmasligi uchun
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
      minWidth: '4px' // Progress bar hech bo'lmaganda ko'rinadigan bo'lishi uchun
    }}
  />
</Box>
      </Box>
    </Container>
  );
};