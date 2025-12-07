import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import { Box, Grid, Paper, Stack, Typography, useTheme, useMediaQuery } from "@mui/material";
import React from "react";

export const TestimonialSection = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  // Calendar data
  const month = "Ноябрь";
  const year = "2021";
  const weekDays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

  // Calendar dates data
  const calendarData = [
    // First row (1-7)
    [
      { day: "1", hours: null },
      { day: "2", hours: null },
      { day: "3", hours: null },
      { day: "4", hours: null },
      { day: "5", hours: null },
      { day: "6", hours: null },
      { day: "7", hours: "06:00-20:00" },
    ],
    // Second row (8-14)
    [
      { day: "8", hours: "06:00-20:00" },
      { day: "9", hours: "06:00-20:00" },
      { day: "10", hours: "06:00-20:00" },
      { day: "11", hours: "06:00-20:00" },
      { day: "12", hours: "06:00-20:00" },
      { day: "13", hours: "06:00-20:00" },
      { day: "14", hours: "06:00-20:00" },
    ],
    // Third row (15-21)
    [
      { day: "15", hours: "06:00-20:00" },
      { day: "16", hours: "06:00-20:00" },
      { day: "17", hours: "06:00-20:00" },
      { day: "18", hours: "06:00-20:00" },
      { day: "19", hours: "06:00-20:00" },
      { day: "20", hours: "06:00-20:00" },
      { day: "21", hours: "06:00-20:00" },
    ],
    // Fourth row (22-28)
    [
      { day: "22", hours: "06:00-20:00" },
      { day: "23", hours: "06:00-20:00" },
      { day: "24", hours: "06:00-20:00" },
      { day: "25", hours: "06:00-20:00" },
      { day: "26", hours: "06:00-20:00" },
      { day: "27", hours: "06:00-20:00" },
      { day: "28", hours: "06:00-20:00" },
    ],
    // Fifth row (29-30, 1-5 next month)
    [
      { day: "29", hours: "06:00-20:00" },
      { day: "30", hours: "06:00-20:00" },
      { day: "1", hours: null, nextMonth: true },
      { day: "2", hours: null, nextMonth: true },
      { day: "3", hours: null, nextMonth: true },
      { day: "4", hours: null, nextMonth: true },
      { day: "5", hours: null, nextMonth: true },
    ],
  ];

  return (
    <Box sx={{ 
      width: "100%", 
      position: "relative", 
      py: 4,
      overflow: "hidden"
    }}>
      {/* Title for desktop - positioned above calendar on right side */}
      {isMd && (
        <Typography
          variant="h5"
          fontWeight="bold"
          color="primary"
          sx={{
            position: "absolute",
            top: "150px",
            right: "calc(250px + 200px)", // 300px is the offset, 280px is half of calendar width
            transform: "translateX(50%)",
            zIndex: 1,
            textAlign: "center",
            width: "100%",
            maxWidth: "300px"
          }}
        >
          Календарь путешествий
        </Typography>
      )}

      <Grid container spacing={0}>
        <Grid item xs={12} md={8}>
          <Box
            component="img"
            src="https://c.animaapp.com/m8se7bge4ci0t5/img/------3.png"
            alt="Travel landscape"
            sx={{
              width: "100%",
              height: isMd ? "877px" : "400px",
              objectFit: "cover",
              maxHeight: 877,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          {/* Title for mobile - shown inside the calendar */}
          {!isMd && (
            <Typography
              variant="h5"
              fontWeight="bold"
              color="primary"
              sx={{ 
                mb: 3,
                textAlign: "center",
                width: "100%"
              }}
            >
              Календарь путешествий
            </Typography>
          )}
          
          <Paper
            elevation={0}
            sx={{
              backgroundColor: "#EDEDED",
              borderRadius: "10px",
              p: isMd ? 6 : isSm ? 4 : 3,
              position: "absolute",
              right: isMd ? "300px" : "50%",
              transform: isMd ? "none" : "translateX(50%)",
              top: isMd ? "270px" : "50%", // Adjusted top position for desktop
              ...(!isMd && { transform: "translate(50%, -50%)" }),
              width: isMd ? "560px" : "90%",
              maxWidth: "560px",
              height: isMd ? "456px" : "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Month and Year Navigation */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={2}
              sx={{ p: 2.5, width: "100%" }}
            >
              <ArrowBackIos
                sx={{
                  color: "primary.main",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              />
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={1}
                sx={{ flex: 1 }}
              >
                <Typography
                  variant={isMd ? "h5" : "h6"}
                  sx={{
                    fontFamily: "Montserrat, Helvetica",
                    fontWeight: "bold",
                    color: "primary.main",
                    textAlign: "center",
                  }}
                >
                  {month}
                </Typography>
                <Typography
                  variant={isMd ? "h5" : "h6"}
                  sx={{
                    fontFamily: "Montserrat, Helvetica",
                    fontWeight: "bold",
                    color: "primary.main",
                    textAlign: "center",
                  }}
                >
                  {year}
                </Typography>
              </Stack>
              <ArrowForwardIos
                sx={{
                  color: "primary.main",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              />
            </Stack>

            {/* Weekdays Header */}
            <Grid container sx={{ p: 1, width: "100%" }}>
              {weekDays.map((day, index) => (
                <Grid item xs key={index} sx={{ textAlign: "center" }}>
                  <Typography
                    variant={isMd ? "subtitle1" : "subtitle2"}
                    sx={{
                      fontFamily: "Montserrat, Helvetica",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {day}
                  </Typography>
                </Grid>
              ))}
            </Grid>

            {/* Calendar Grid */}
            <Box sx={{ flex: 1, width: "100%" }}>
              {calendarData.map((week, weekIndex) => (
                <Grid container key={weekIndex} sx={{ mb: 1.25 }}>
                  {week.map((day, dayIndex) => (
                    <Grid item xs key={dayIndex}>
                      <Box
                        sx={{
                          height: isMd ? "34px" : "28px",
                          position: "relative",
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          variant={isMd ? "body1" : "body2"}
                          sx={{
                            fontFamily: "Montserrat, Helvetica",
                            fontWeight: "medium",
                            color: day.nextMonth
                              ? "text.disabled"
                              : "text.primary",
                          }}
                        >
                          {day.day}
                        </Typography>
                        {day.hours && (
                          <Typography
                            variant="caption"
                            sx={{
                              fontFamily: "Montserrat, Helvetica",
                              fontWeight: "medium",
                              color: "primary.main",
                              fontSize: isMd ? "10px" : "8px",
                              display: "block",
                            }}
                          >
                            {day.hours}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};