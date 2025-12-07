import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Container, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

export const TestimonalsSection = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  const excursionTypes = [
    {
      id: 1,
      title: "Автобусный тур",
      description:
        "Один из самых насыщенных впечатлениями, доступных по цене и популярных видов отдыха. Во время одной поездки можно посмотреть достопримечательности сразу нескольких городов, причем обойдется это едва ли не в разы дешевле классического экскурсионного тура с ночевками в отелях.",
      image: "https://s3-alpha-sig.figma.com/img/43a7/99d7/a2d169555c408dff184238d1de39b2ae?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=kYWM3d6UhgyeuvPi2Honhy3iNi3a4tC8kUmgKkr1KyfdR7~oxtw5cMzrT277fdH-dzcMaJA-to12MiAZXjpjqa0FERnbpRBqysdNTjgJ5Ekn3qlDeSiYIZHbAUqyeNMpj07Di-aZQbyfubUOY-9TraK~gMV1PYfYF7m-BGq7HTXjKMk918ZPUP4Ff5IKWEwpdV-x4FlkaOwR8CeYk-sMYNDRr17I~aCw8wfboEpdgWEr739ecgcePh5ZqzIxE1rxS56Y60z8mt9n-EmbvKbw0exPkWaJxhXmsAxex56ra-WXcR9K7dGZgMuhVLZOmHzJPZ3IrBIqNUBCQxrP8DnNmA__",
    },
    {
      id: 2,
      title: "Джиппинг",
      description:
        "Это путешествие на автомобилях высокой проходимости с преодолением естественных препятствий, это экстремальный вид спорта и отдыха, представляющий собой прохождение туристического маршрута по бездорожью на автомобилях.",
      image: "https://s3-alpha-sig.figma.com/img/a1ee/0c81/f61a05bf1300854bba0a7b5d72a09143?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=F-D91tbYnl6B0zeMCwyq5dXzf2R~8alRowfyXD-FK7znaU7tqJbdKjDcZfHa0IO5j6i9tj7pAjOknI94iEmDMrE0uvsmJKynLAMADU1OLj1UdSewJD0NFE6AIHspjLhcAz8uVi7lqVaEHh0NnYdeHnUYzZTVPsrvlvfK00dy7humxLXE3422425SOAjdYOSHAWVZ3Gn82bCTTlkVVRneySHTTnaIPppPi2DOpWwnDDdSSFZJzCXFF~nwDzxrkWW3nZDXwlIzzyJmov0h5yAExHB4gipbLLzND8lzVFGy-IRvmBYW9cSR2rH9pHqF960IjSCK2Z6nFqP4~SmDRbgrUQ__",
    },
    {
      id: 3,
      title: "Яхтинг",
      description:
        "Это то же, что круиз на лайнере или прогулка на пароме, только на яхте больше свободы, размеры судна в разы меньше, нет назойливой команды, можно самостоятельно почувствовать себя капитаном, постоять за штурвалом. Именно здесь вы почувствуете величайшие просторы Черногор моря.",
      image: "https://s3-alpha-sig.figma.com/img/cd98/f05b/e66fc2e2ca69c6381af65cbccd7a82a0?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=rxiOSe0JDSjC6NKcYLHm9vkWK1ko~ozDSGo~sBjqF31QuRn2yPlusJduapk664UB8dV3AUK~SrQARsBKyhbx1oMWkFb9XkH0SrvjWPE4G0TqCiGXOkyssmE-JykHEsSqOAv3JogdrCfNlFM93Mwj1xp3BMdhi5i8Qq0c0RkjGCzJbakRdwmDmswfbpQXKVSgDGxGbAS0PNUr4UCsCtjREMpPKA3CZpzHIGL9DxVseNJPkf2IDOi~ZW-UEWFyKfhQdlNWOCKdoZRChkbXDpi4F7vLfIf7-XVL-eymDM5RBBmqouxncHx3c4En7tND9xhgpYAZhdxDDgh-O4seymqwfg__",
    },
    {
      id: 4,
      title: "Каньонинг",
      description:
        "Это экстремально-спортивный вид отдыха, который заключается в преодолении каньонов (обводненных или нет) при помощи альпинистского и иного снаряжения, а иногда и вброд, но без лодок или иных плавсредств.",
      image: "https://s3-alpha-sig.figma.com/img/4525/e6ff/dd2b39e5ca9ce21d4bd7af333e2624ac?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=nqKoVP-cXU4T8WgEgpvuL~1Uif8bEdgewgqxVtRxS5iyH9co42bonkbuLXHyLeS5ewgPeh2xSBTZktKhkqAm0jai8Yzfvo1o5RZPtZkUGp72RnbmvJNcqZtGP6PKAZeuhZKRZetjAZ6MCkKq3satvnriMNm9BITqhUGB1lAkSLWZaunNOMTWZ4YQ0NsI-M0GXLC8mt5LBY6csztP6S4zqABwjt6BaVvBE-kCF6p7j36DSgaQpxsF5gGTDH2zJlewfVDE64kCFOTVhkigZqkk5RGOD04lL~0Wxr7pTQWS~2Kt46vAaLNfz995rIqYRYqt0~xrvvtImKYDNqfdhKCrKw__",
    },
  ];

  return (
    <Container 
      sx={{ 
        py: isMd ? 8 : 4,
        px: 2 // Consistent padding on all screens
      }} 
      maxWidth="xl"
    >
      <Typography
        variant={isMd ? "h4" : "h5"}
        component="h2"
        sx={{ 
          mb: isMd ? 10 : 6,
          textAlign: "center",
          px: 0 // No additional horizontal padding
        }}
        fontWeight="bold"
        color="primary"
        gutterBottom
      >
        Виды экскурсий
      </Typography>

      <Grid container spacing={isMd ? 5 : 3}>
        {excursionTypes.map((item) => (
          <Grid item xs={12} md={6} key={item.id}>
            <Box sx={{ 
              display: "flex",
              mb: 2,
              gap: isMd ? 3 : 2,
              alignItems: "flex-start",
              px: 0 // No additional horizontal padding
            }}>
              <Box sx={{
                flexShrink: 0,
                width: isMd ? 75 : 60,
                height: isMd ? 74 : 60
              }}>
                <img
                  src={item.image}
                  alt={`${item.title} icon`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px"
                  }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant={isMd ? "h6" : "subtitle1"}
                  component="h3"
                  fontWeight="bold"
                  color="primary"
                  gutterBottom
                >
                  {item.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.primary"
                  sx={{
                    fontSize: isMd ? undefined : "0.875rem"
                  }}
                >
                  {item.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Stack 
        alignItems="center" 
        spacing={2} 
        sx={{ 
          mt: isMd ? 4 : 3,
          px: 0 // No additional horizontal padding
        }}
      >
        <Typography 
          variant="body2" 
          align="center" 
          sx={{ 
            maxWidth: 550,
            fontSize: isSm ? undefined : "0.875rem"
          }}
        >
          Выбирайте на нашем сайте экскурсию, которая подходит именно вам и
          записывайтесь онлайн без очередей, просто и быстро!
        </Typography>

        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIcon />}
          sx={{
            borderRadius: "60px",
            px: 3,
            py: 1,
            fontSize: isSm ? undefined : "0.875rem"
          }}
          size={isSm ? "medium" : "small"}
        >
          К экскурсиям
        </Button>
      </Stack>
    </Container>
  );
};