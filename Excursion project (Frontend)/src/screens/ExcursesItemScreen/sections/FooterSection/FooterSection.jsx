import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FavoriteIcon from "@mui/icons-material/Favorite";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  TextField,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const FooterSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const [formData, setFormData] = useState({
    date: new Date(),
    adults: 2,
    children: 0,
  });

  const [isFavorite, setIsFavorite] = useState(false);

  const handleDateChange = (date) => {
    setFormData({...formData, date});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: parseInt(value) || 0});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const adultOptions = [1, 2, 3, 4, 5, 6];
  const childrenOptions = [0, 1, 2, 3, 4];

  return (
    <Grid container sx={{ position: "relative", minHeight: isMobile ? "auto" : "640px" }}>
      <Grid item xs={12} md={8} order={isMobile ? 2 : 1}>
        <Box
          component="img"
          src="https://c.animaapp.com/m8se7bge4ci0t5/img/-----.png"
          alt="Scenic landscape"
          sx={{
            width: "100%",
            height: isMobile ? "300px" : "640px",
            objectFit: "cover",
          }}
        />
      </Grid>

      <Grid item xs={12} md={4} order={isMobile ? 1 : 2}>
        <Box 
          sx={{ 
            p: 4, 
            mt: isMobile ? 2 : 8,
            backgroundColor: isMobile ? "rgba(255, 255, 255, 0.9)" : "transparent",
            borderRadius: isMobile ? theme.shape.borderRadius : 0,
            boxShadow: isMobile ? theme.shadows[3] : "none"
          }}
          component="form"
          onSubmit={handleSubmit}
        >
          <Stack spacing={3}>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="primary"
              fontFamily="Montserrat, Helvetica"
            >
              Забронировать тур
            </Typography>

            {/* Date field */}
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              customInput={
                <Paper
                  elevation={1}
                  sx={{
                    p: 0,
                    borderRadius: "10px",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 2,
                    width: "100%",
                  }}
                >
                  <Typography
                    fontFamily="Montserrat, Helvetica"
                    fontWeight="medium"
                    variant="body2"
                  >
                    {formData.date.toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </Typography>
                  <CalendarTodayIcon fontSize="small" />
                </Paper>
              }
            />

            {/* Adults field */}
            <TextField
              select
              name="adults"
              value={formData.adults}
              onChange={handleInputChange}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: "10px",
                  height: "50px",
                },
                '& .MuiSelect-select': {
                  display: "flex",
                  alignItems: "center",
                  py: "14px",
                }
              }}
              InputProps={{
                endAdornment: <KeyboardArrowDownIcon fontSize="small" />,
              }}
            >
              {adultOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option} {option === 1 ? 'взрослый' : 'взрослых'}
                </MenuItem>
              ))}
            </TextField>

            {/* Children field */}
            <TextField
              select
              name="children"
              value={formData.children}
              onChange={handleInputChange}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: "10px",
                  height: "50px",
                },
                '& .MuiSelect-select': {
                  display: "flex",
                  alignItems: "center",
                  py: "14px",
                }
              }}
              InputProps={{
                endAdornment: <KeyboardArrowDownIcon fontSize="small" />,
              }}
            >
              {childrenOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option} {option === 1 ? 'ребёнок' : option > 1 && option < 5 ? 'ребёнка' : 'детей'}
                </MenuItem>
              ))}
            </TextField>

            {/* Booking buttons */}
            <Box sx={{ display: "flex", gap: 2, flexDirection: isMobile ? "column" : "row" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: "60px",
                  height: "50px",
                  flexGrow: 1,
                  fontFamily: "Montserrat, Helvetica",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Забронировать
              </Button>

              <IconButton
                sx={{
                  bgcolor: "grey.200",
                  width: "50px",
                  height: "50px",
                  backdropFilter: "blur(500px)",
                  alignSelf: isMobile ? "flex-start" : "auto",
                }}
                onClick={toggleFavorite}
              >
                <FavoriteIcon color={isFavorite ? "error" : "action"} />
              </IconButton>
            </Box>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};

export default FooterSection;