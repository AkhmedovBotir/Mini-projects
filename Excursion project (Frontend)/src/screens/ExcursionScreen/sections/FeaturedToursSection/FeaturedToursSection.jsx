import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Stack,
  Grid
} from "@mui/material";
import React from "react";
import { Link } from 'react-router-dom';

export const FeaturedToursSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));

  const toursData = [
    {
      id: 1,
      title: "Золотое кольцо Абхазии (из Адлера)",
      type: "Автобусный тур",
      adultPrice: "1 618 ₽",
      childPrice: "1 412 ₽",
      duration: "2,5 часа",
      description: 'Вас ждет путешествие по "Золотому Кольцу Абхазии" на Мерседес Спринтер (20 мест). По маршруту вас будет сопровождать профессиональный гид. Посадка на экскурсию осуществляется с вашего отеля или ближайшей автобусной остановки. Пересечение границы без пересадок...',
      image: "https://c.animaapp.com/m8pweegwWhFvRw/img/rectangle-40-3.png",
    },
    {
      id: 2,
      title: "Тур по Сочи и Красной Поляне",
      type: "Групповая экскурсия",
      adultPrice: "2 350 ₽",
      childPrice: "1 950 ₽",
      duration: "6 часов",
      description: "Экскурсия по самым красивым местам Сочи и Красной Поляны. Посещение Олимпийского парка, смотровых площадок с видом на горы, и других достопримечательностей. Включен обед в традиционном кавказском ресторане.",
      image: "https://c.animaapp.com/m8pweegwWhFvRw/img/rectangle-40-3.png",
    },
    {
      id: 3,
      title: "Морская прогулка по Черному морю",
      type: "Морская экскурсия",
      adultPrice: "1 200 ₽",
      childPrice: "900 ₽",
      duration: "1,5 часа",
      description: "Незабываемая морская прогулка вдоль побережья с возможностью купания в открытом море. На борту есть все необходимое для комфортного отдыха. В стоимость включены прохладительные напитки.",
      image: "https://c.animaapp.com/m8pweegwWhFvRw/img/rectangle-40-3.png",
    },
  ];

  return (
    <Box sx={{ width: "100%", py: { xs: 1, md: 2 } }}>
      <Grid container spacing={3}>
        {toursData.map((tour) => (
          <Grid item xs={12} key={tour.id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                height: { xs: "auto", md: 320 },
                borderRadius: "10px",
                boxShadow: 2,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: { xs: "100%", md: 300 },
                  height: { xs: 200, md: "100%" },
                  objectFit: "cover",
                  flexShrink: 0
                }}
                image={tour.image}
                alt={tour.title}
              />

              <CardContent sx={{
                flex: 1,
                p: { xs: 2, md: 3 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}>
                <Box>
                  <Typography
                    variant="overline"
                    color="warning.main"
                    fontWeight="bold"
                    component="div"
                    sx={{ mb: 0.5 }}
                  >
                    {tour.type}
                  </Typography>

                  <Typography
                    variant={isMobile ? "h6" : "h5"}
                    component="h2"
                    fontWeight="bold"
                    sx={{ mb: 2, lineHeight: 1.2 }}
                  >
                    {tour.title}
                  </Typography>

                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={6} sm={4}>
                      <Stack direction="row" alignItems="center">
                        <AttachMoneyIcon color="primary" sx={{ mr: 1 }} />
                        <Box>
                          <Typography
                            variant="h6"
                            color="primary"
                            fontWeight="bold"
                          >
                            {tour.adultPrice}
                          </Typography>
                          <Typography variant="caption">
                            Взрослый билет
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid>

                    <Grid item xs={6} sm={4}>
                      <Stack direction="row" alignItems="center">
                        <AttachMoneyIcon color="primary" sx={{ mr: 1 }} />
                        <Box>
                          <Typography
                            variant="h6"
                            color="primary"
                            fontWeight="bold"
                          >
                            {tour.childPrice}
                          </Typography>
                          <Typography variant="caption">
                            Детский билет
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <Stack direction="row" alignItems="center">
                        <AccessTimeIcon color="primary" sx={{ mr: 1 }} />
                        <Typography
                          variant="h6"
                          color="primary"
                          fontWeight="bold"
                        >
                          {tour.duration}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>

                  <Box
                    sx={{
                      borderLeft: "3px solid",
                      borderColor: "divider",
                      pl: 2,
                      mb: 2
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {tour.description}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    component={Link}
                    to="/excurses-item"
                    sx={{
                      borderRadius: "40px",
                      px: 3,
                      textTransform: "none",
                      fontWeight: "bold",
                      textDecoration: 'none', // Ensure no underline appears
                      '&:hover': {
                        textDecoration: 'none' // Remove hover underline
                      }
                    }}
                  >
                    Подробнее
                  </Button>
                  <IconButton
                    color="primary"
                    sx={{
                      bgcolor: "grey.200",
                      border: 2,
                      borderColor: "primary.main",
                      width: 40,
                      height: 40,
                      '&:hover': {
                        bgcolor: "primary.light"
                      }
                    }}
                    aria-label="add to favorites"
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default FeaturedToursSection;