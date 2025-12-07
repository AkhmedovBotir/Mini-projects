import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Box, Button, Card, Container, Stack, Typography, IconButton } from "@mui/material";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const BlogSection = () => {
  const swiperRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Tour data for mapping
  const tours = [
    {
      id: 1,
      type: "Автобусный тур",
      title: "Обзорная по Сочи (из Адлера)",
      duration: "6 часов",
      price: "618 ₽",
      description:
        'Приглашаем вас на экскурсию \n"Обзорная по Большому Сочи":\nЭкскурсия начнется с подъёма на гору Большой Ахун - это высшая точка (665 метров) на побережьи Сочи. На вершине горы Большой Ахун есть смотровая башня, построенная в 1935-36 годах по проекту архитектора С. И. Воробьева...',
      image: "https://s3-alpha-sig.figma.com/img/64c1/67d4/70f74e728e0ecd6b914323b8e0d65413?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=idzR5eXSrRURXmuMd0wmLcW6rniKbnUC044pg2bMfnnLGGRrj6JWfNL6YSv1ZhpFoIGR1NHAGcBgJ1-1FKDRc3PrcA9iaUy5rDEPmk1mIPMG-zPx3gJEh1KH0NSZ5oXX63IGaQq84ZradinYjkjS~VTh441ZBnWbINE5aTWQvSlpHCZHt916JmtspQkAbiT~-TGcYljuu7FjaLa2qgUnCfK2S45s4dcXyTyHf7upalMuAAkOLBhSH32B7glzmPSo1qGFxWgcv0oFQ8~QZvT3kSKy7rygCnqfI3anNVn6q~vCBtQkMOjrLhE5Ejz1qPqKuOOXj3HocdpPj-l35pV8oA__",
    },
    {
      id: 2,
      type: "Конный тур",
      title: "Конные прогулки",
      duration: "1,5 часа",
      price: "1 809 ₽",
      description:
        "Конные прогулки проходят в Лазурной долине. С долины открывается красивый вид на море, горы и лес. На всем пути следования экскурсии вас будут сопровождать опытные инструктора. Катание на лошадях или иппотерапия очень полезна для детей и взрослых...",
      image: "https://s3-alpha-sig.figma.com/img/a09e/8be0/7a2d9748f467b217061c7561fe0650af?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=GTKUGB8QAYmTrlI6DSpzKzvgV9e5UUD6z11-rWhmsHDlXXRdeKiiS57RVcmqaNfYDwpsVfZ2EbwODaGqsAPVEt3ddIM4A8E695rJU~rzCsYUQ3yJHsEOWbIruzx2ZH5sVdT8N1F~mO~l88D2hS7bjnp8qk9vwxiaEJyNYZL3vrFNkTds~x1bUCGxlcjIwMssRoneej3MDHNxlUfj-Dfen~13gdOi3InmcpYkpU44JygqlJJKXQSL8n6NoNpeVMI4NHlJpqGGNySSPUemqiw9DDUREJHH0G~qHnNvf79qeXXNjVStweg4aQ3ODzsnTwdFekVWxHlYrqaM6DLds73hXQ__",
    },
    {
      id: 3,
      type: "Квадротур",
      title: "Пасть дракона",
      duration: "2,5 часа",
      price: "3 515 ₽",
      description:
        'Маршрут на Квадроциклах проходит по горной реке Мзымта вдоль белых скал и самшитовый лес к водопаду Глубокий Яр или "Пасть Дракона" (экскурсионное название). \nВысота водопада 41,5 метр - это один из самых высоких водопадов Большого Сочи...',
      image: "https://s3-alpha-sig.figma.com/img/d39c/ca95/9915328f80ddbcfe3528ced8957eaea2?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Zttag0zuuBQTx9fH0~0jlNT5RNRF1Eu5lTSAIHksjzcdXJVzYNYMh~jVmU5npqlnCygdbYhX1dhswy-QfTB3WsU5XXqQZgQ7OAvwhOfXv~pSQNC-p33e3BRQJWGqeq8u7M0I47a5UNrbafjxH2ReZAH3IN-UowgFpbUaJaizr7ZHCYpIk5M7IaJyqTlbO2Xeh4axZSJfAXGl~l2AJCmlkstftpBw66brUY2A7o0glBhE5DhiAOa3PB7SIx9z~slcErLvTU9MCiZUzWORqAiHhFvLjKpR8pvKtqDZVtzBrhChA5rtaMJZ7L9S9GmlcX7LHtH0I63ivdwJK7VGU41qfA__",
    },
    {
      id: 4,
      type: "Автобусный тур",
      title: "Женский монастырь",
      duration: "4 часа",
      price: "618 ₽",
      description:
        "Троице - Георгиевский женский монастырь расположен в селе Лесное в живописном месте, в котором гармонично сочетаются красота природы и красота архитектуры сотворенная руками человека. \nЭто удивительное место расположено совсем недалеко от Чёрного моря - всего в 20 километрах",
      image: "https://s3-alpha-sig.figma.com/img/d394/f1fc/bbde3122d0f40e34f0f2ce664b8cccfd?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ieZ8WY~Yuy8vXrDfaXf4Pk-RFagYYyQCiKI2-BXijwPtIpq-nPK5p0KxxNHTNV2Hpqz3XzFM5GeCHG5z9amhEuqzoqjFH3TblrsBOxAu6ucSr2OX8OYD4UN8CZTvygn1Y8jvdRjNcfMDZXFtdFCI7LDH2gVf0cr-aPro3akLjouhc1qGfCRDq-wq4uXdFtsV7d3WdbyRMTbJ72GKrkIWLSa4VETRUsKrHx1hxTx0hkwTqlEjpnV42WqOQzhNufYrukThc8JkT92gUFoFBKFyKPSkUsWSxB1FjQQnrCfrxf7VDbAaN4dEuNkn1oO1eblQ34MrK70Tjy0vDSZNYJokZg__",
    },
    {
      id: 4,
      type: "Автобусный тур",
      title: "Женский монастырь",
      duration: "4 часа",
      price: "618 ₽",
      description:
        "Троице - Георгиевский женский монастырь расположен в селе Лесное в живописном месте, в котором гармонично сочетаются красота природы и красота архитектуры сотворенная руками человека. \nЭто удивительное место расположено совсем недалеко от Чёрного моря - всего в 20 километрах",
      image: "https://s3-alpha-sig.figma.com/img/d394/f1fc/bbde3122d0f40e34f0f2ce664b8cccfd?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ieZ8WY~Yuy8vXrDfaXf4Pk-RFagYYyQCiKI2-BXijwPtIpq-nPK5p0KxxNHTNV2Hpqz3XzFM5GeCHG5z9amhEuqzoqjFH3TblrsBOxAu6ucSr2OX8OYD4UN8CZTvygn1Y8jvdRjNcfMDZXFtdFCI7LDH2gVf0cr-aPro3akLjouhc1qGfCRDq-wq4uXdFtsV7d3WdbyRMTbJ72GKrkIWLSa4VETRUsKrHx1hxTx0hkwTqlEjpnV42WqOQzhNufYrukThc8JkT92gUFoFBKFyKPSkUsWSxB1FjQQnrCfrxf7VDbAaN4dEuNkn1oO1eblQ34MrK70Tjy0vDSZNYJokZg__",
    },
    {
      id: 4,
      type: "Автобусный тур",
      title: "Женский монастырь",
      duration: "4 часа",
      price: "618 ₽",
      description:
        "Троице - Георгиевский женский монастырь расположен в селе Лесное в живописном месте, в котором гармонично сочетаются красота природы и красота архитектуры сотворенная руками человека. \nЭто удивительное место расположено совсем недалеко от Чёрного моря - всего в 20 километрах",
      image: "https://s3-alpha-sig.figma.com/img/d394/f1fc/bbde3122d0f40e34f0f2ce664b8cccfd?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ieZ8WY~Yuy8vXrDfaXf4Pk-RFagYYyQCiKI2-BXijwPtIpq-nPK5p0KxxNHTNV2Hpqz3XzFM5GeCHG5z9amhEuqzoqjFH3TblrsBOxAu6ucSr2OX8OYD4UN8CZTvygn1Y8jvdRjNcfMDZXFtdFCI7LDH2gVf0cr-aPro3akLjouhc1qGfCRDq-wq4uXdFtsV7d3WdbyRMTbJ72GKrkIWLSa4VETRUsKrHx1hxTx0hkwTqlEjpnV42WqOQzhNufYrukThc8JkT92gUFoFBKFyKPSkUsWSxB1FjQQnrCfrxf7VDbAaN4dEuNkn1oO1eblQ34MrK70Tjy0vDSZNYJokZg__",
    },
    {
      id: 4,
      type: "Автобусный тур",
      title: "Женский монастырь",
      duration: "4 часа",
      price: "618 ₽",
      description:
        "Троице - Георгиевский женский монастырь расположен в селе Лесное в живописном месте, в котором гармонично сочетаются красота природы и красота архитектуры сотворенная руками человека. \nЭто удивительное место расположено совсем недалеко от Чёрного моря - всего в 20 километрах",
      image: "https://s3-alpha-sig.figma.com/img/d394/f1fc/bbde3122d0f40e34f0f2ce664b8cccfd?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ieZ8WY~Yuy8vXrDfaXf4Pk-RFagYYyQCiKI2-BXijwPtIpq-nPK5p0KxxNHTNV2Hpqz3XzFM5GeCHG5z9amhEuqzoqjFH3TblrsBOxAu6ucSr2OX8OYD4UN8CZTvygn1Y8jvdRjNcfMDZXFtdFCI7LDH2gVf0cr-aPro3akLjouhc1qGfCRDq-wq4uXdFtsV7d3WdbyRMTbJ72GKrkIWLSa4VETRUsKrHx1hxTx0hkwTqlEjpnV42WqOQzhNufYrukThc8JkT92gUFoFBKFyKPSkUsWSxB1FjQQnrCfrxf7VDbAaN4dEuNkn1oO1eblQ34MrK70Tjy0vDSZNYJokZg__",
    },
  ];

  const handleSlideChange = (swiper) => {
    const totalSlides = swiper.slides.length - swiper.params.slidesPerView + 1;
    const progress = ((swiper.activeIndex) / (totalSlides - 1)) * 100;
    setProgress(progress);
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 8, width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h4" fontWeight="bold" color="primary">
            Популярные экскурсии
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Смотреть все
          </Typography>
        </Box>

        {/* Swiper slider */}
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            // Initialize progress
            const totalSlides = swiper.slides.length - swiper.params.slidesPerView + 1;
            const initialProgress = ((swiper.activeIndex) / (totalSlides - 1)) * 100;
            setProgress(initialProgress);
          }}
          onSlideChange={handleSlideChange}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            600: {
              slidesPerView: 2,
            },
            900: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 4,
            },
          }}
          modules={[Navigation]}
        >
          {tours.map((tour) => (
            <SwiperSlide key={tour.id}>
              <Card
                sx={{
                  height: 497,
                  position: "relative",
                  backgroundImage: `url(${tour.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 0,
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
                    p: 2,
                    pt: 10,
                  }}
                >
                  <Typography variant="body2" color="white">
                    {tour.type}
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="warning.main"
                    sx={{ mt: 0.5 }}
                  >
                    {tour.title}
                  </Typography>

                  <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <AccessTimeIcon
                        sx={{ width: 12, height: 12, color: "white" }}
                      />
                      <Typography variant="body2" color="white">
                        {tour.duration}
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center">
                      <AttachMoneyIcon
                        sx={{ width: 15, height: 15, color: "white" }}
                      />
                      <Typography variant="body2" color="white">
                        {tour.price}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Typography
                    variant="body2"
                    color="white"
                    sx={{
                      mt: 2,
                      mb: 3,
                      fontSize: "0.75rem",
                      lineHeight: 1.4,
                    }}
                  >
                    {tour.description}
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      borderRadius: "40px",
                      textTransform: "none",
                      width: 160,
                      height: 40,
                    }}
                  >
                    Подробнее
                  </Button>
                </Box>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation controls and progress bar */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: 4 }}>
          <IconButton 
            onClick={() => swiperRef.current?.slidePrev()}
            sx={{ ml: 2 }}
            disabled={activeIndex === 0}
          >
            <ArrowBackIosNewIcon 
              sx={{
                color: activeIndex >= 1 ? 'primary.main' : 'gray'
              }} 
            />
          </IconButton>
          <IconButton 
            onClick={() => swiperRef.current?.slideNext()}
            sx={{ mr: 2 }}
            disabled={activeIndex >= tours.length - 4} // Assuming 4 slides are visible at max
          >
            <ArrowForwardIosIcon 
              sx={{
                color: activeIndex ? 'primary.main' : 'gray'
              }} 
            />

          </IconButton>
          
          <Box sx={{ flexGrow: 1, height: '4px', bgcolor: 'divider', borderRadius: '2px', position: 'relative' }}>
            <Box 
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: `${progress}%`,
                bgcolor: 'primary.main',
                borderRadius: '2px',
                transition: 'width 0.3s ease'
              }}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};