import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import React from "react";

export const LocationSection = () => {
  // Tour information data
  const tourDescription = {
    title: "Описание экскурсии",
    text: 'Вас ждет путешествие по "Золотому Кольцу Абхазии" на Мерседес Спринтер (20 мест). По маршруту вас будет сопровождать профессиональный гид. Посадка на экскурсию осуществляется с вашего отеля или ближайшей автобусной остановки. Пересечение границы без пересадок.',
  };

  // Tour details cards data
  const tourDetails = [
    {
      id: 1,
      icon: <AttachMoneyIcon sx={{ width: 30, height: 30 }} />,
      value: "1 618 ₽",
      label: "Взрослый билет",
    },
    {
      id: 2,
      icon: <AttachMoneyIcon sx={{ width: 30, height: 30 }} />,
      value: "1 412 ₽",
      label: "Детский билет",
    },
    {
      id: 3,
      icon: <AccessTimeIcon sx={{ width: 30, height: 30 }} />,
      value: "12 часов",
      label: "",
    },
  ];

  return (
    <Container sx={{ py: 15 }} maxWidth="xl">
      <Stack direction={{ xs: "column", md: "row" }} spacing={4} alignItems="center" justifyContent="space-between">
        {/* Tour description section */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" fontWeight="bold" color="primary" sx={{py: 3}} gutterBottom>
            {tourDescription.title}
          </Typography>
          <Typography variant="body2" width={"70%"} fontWeight="medium">
            {tourDescription.text}
          </Typography>
        </Box>

        {/* Tour details cards */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          sx={{ flex: 1, minWidth: { sm: "fit-content" } }}
        >
          {tourDetails.map((detail) => (
            <Box 
              key={detail.id} 
              sx={{ 
                position: "relative", 
                width: 160, 
                height: 117 
              }}
            >
              {/* Yellow circle - positioned behind the card */}
              <Box
                sx={{
                  width: 57,
                  height: 57,
                  bgcolor: "#FFC700",
                  borderRadius: "50%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 0,
                }}
              />

              {/* Card with glass effect */}
              <Paper
                elevation={3}
                sx={{
                  width: "100%",
                  height: 100,
                  position: "absolute",
                  top: 17,
                  left: 18,
                  borderRadius: 2.5,
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(10px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
                }}
              >
                <Box sx={{ pl: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    {detail.icon}
                    <Typography variant="h5" fontWeight="bold" color="primary">
                      {detail.value}
                    </Typography>
                  </Stack>

                  {detail.label && (
                    <Typography variant="body2" fontWeight="medium" sx={{ mt: 0.5 }}>
                      {detail.label}
                    </Typography>
                  )}
                </Box>
              </Paper>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};