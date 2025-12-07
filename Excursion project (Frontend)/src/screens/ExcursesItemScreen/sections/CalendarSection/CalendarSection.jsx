import PaidIcon from "@mui/icons-material/Paid";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import React from "react";

export const CalendarSection = () => {
  const theme = useTheme();
  // Data for the activity cards
  const activities = [
    {
      id: 1,
      name: "Дача Сталина",
      price: "200 ₽",
      hasPrice: true,
    },
    {
      id: 2,
      name: "Молочный водопад",
      price: "200 ₽",
      hasPrice: true,
    },
    {
      id: 3,
      name: "Новоафинская пещера",
      price: "500 ₽",
      hasPrice: true,
    },
    {
      id: 4,
      name: "Термальный источник",
      price: "500 ₽",
      hasPrice: true,
    },
    {
      id: 5,
      name: "Обед",
      price: "",
      hasPrice: false,
    },
  ];

  return (
    <Box sx={{ 
      width: "100%", 
      mt: 4, 
      mb: 4,
      maxWidth: theme.breakpoints.values.xl,
      mx: 'auto',
      px: 2
    }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        color="primary"
        fontFamily="Montserrat, Helvetica"
        mb={3}
        textAlign="left"
      >
        Дополнительные расходы (по желанию)
      </Typography>

      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        p: 2,
      }}>
        <Box 
          sx={{ 
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
            justifyContent: { xs: 'center', md: 'flex-start' },
            maxWidth: '100%',
          }}
        >
          {activities.map((activity) => (
            <Box
              key={activity.id}
              sx={{
                position: "relative",
                width: 180,
                height: 120,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexShrink: 0,
              }}
            >
              {/* Yellow circle */}
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: "warning.main",
                  borderRadius: "50%",
                  position: "absolute",
                  top: -15,
                  left: -15,
                  zIndex: 1,
                }}
              />

              {/* Card */}
              <Box
                sx={{
                  width: "100%",
                  height: 100,
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(10px) brightness(100%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  zIndex: 2,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)'
                  }
                }}
              >
                {activity.hasPrice && (
                  <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
                    <PaidIcon color="primary" sx={{ width: 30, height: 30 }} />
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      color="primary"
                      fontFamily="Montserrat, Helvetica"
                    >
                      {activity.price}
                    </Typography>
                  </Stack>
                )}

                <Typography
                  variant="body2"
                  fontWeight="medium"
                  fontFamily="Montserrat, Helvetica"
                  sx={{ 
                    mt: activity.hasPrice ? 0 : 2,
                    px: 1,
                    textAlign: 'center',
                    lineHeight: 1.2
                  }}
                >
                  {activity.name}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};