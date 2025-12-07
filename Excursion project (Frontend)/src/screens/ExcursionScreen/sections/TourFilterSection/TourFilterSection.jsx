import CalendarToday from "@mui/icons-material/CalendarToday";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import LocationOn from "@mui/icons-material/LocationOn";
import People from "@mui/icons-material/People";
import {
  Box,
  Button,
  Container,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  Menu,
  MenuItem,
  Popover,
  IconButton,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useState } from "react";

export const TourFilterSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [tabValue, setTabValue] = useState(0);
  const [locationAnchorEl, setLocationAnchorEl] = useState(null);
  const [peopleAnchorEl, setPeopleAnchorEl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateAnchorEl, setDateAnchorEl] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("Абхазия");
  const [peopleCount, setPeopleCount] = useState(5);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLocationClick = (event) => {
    setLocationAnchorEl(event.currentTarget);
  };

  const handleLocationClose = () => {
    setLocationAnchorEl(null);
  };

  const handlePeopleClick = (event) => {
    setPeopleAnchorEl(event.currentTarget);
  };

  const handlePeopleClose = () => {
    setPeopleAnchorEl(null);
  };

  const handleDateClick = (event) => {
    setDateAnchorEl(event.currentTarget);
  };

  const handleDateClose = () => {
    setDateAnchorEl(null);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    handleDateClose();
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    handleLocationClose();
  };

  const handlePeopleSelect = (count) => {
    setPeopleCount(count);
    handlePeopleClose();
  };

  // Tour type options
  const tourTypes = [
    { label: "АВТОБУСНЫЙ ТУР", value: 0 },
    { label: "ДЖИППИНГ", value: 1 },
    { label: "ЯХТИНГ", value: 2 },
    { label: "КАНЬОНИНГ", value: 3 },
  ];

  // Location options
  const locations = [
    "Абхазия",
    "Алтай",
    "Байкал",
    "Кавказ",
    "Камчатка",
    "Крым",
    "Сочи",
  ];

  // People count options
  const peopleCounts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Format date to display
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <Container maxWidth="xl">
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          mx: "auto",
          borderRadius: "10px",
          p: { xs: 2, sm: 3, md: 5 },
          mt: { xs: 2, sm: 4 },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 2, sm: 4 } }}>
          {/* Tour type tabs */}
          <Box sx={{ width: "100%", overflowX: isMobile ? 'auto' : 'visible' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant={isMobile ? "scrollable" : "standard"}
              scrollButtons={isMobile ? "auto" : false}
              sx={{
                "& .MuiTabs-flexContainer": {
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "center",
                  alignItems: "center",
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#1976d2",
                },
              }}
            >
              {tourTypes.map((type) => (
                <Tab
                  key={type.value}
                  label={isMobile ? type.label.split(' ')[0] : type.label}
                  sx={{
                    minWidth: 'unset',
                    px: { xs: 1, sm: 2 },
                    borderBottom: "3px solid #E0E0E0",
                    fontFamily: "Montserrat, Helvetica",
                    fontWeight: 500,
                    fontSize: { xs: "12px", sm: "14px" },
                    color: tabValue === type.value ? "#1976d2" : "#000000",
                  }}
                />
              ))}
            </Tabs>
          </Box>

          {/* Filter inputs */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {/* Location */}
            <Box sx={{ width: { xs: "100%", sm: 235 } }}>
              <TextField
                fullWidth
                variant="outlined"
                value={selectedLocation}
                onClick={handleLocationClick}
                InputProps={{
                  readOnly: true,
                  startAdornment: <LocationOn sx={{ color: "#0499DD", mr: 1 }} />,
                  endAdornment: (
                    <KeyboardArrowDown sx={{ color: "#0499DD" }} />
                  ),
                  sx: {
                    height: 50,
                    borderRadius: "10px",
                    fontFamily: "Montserrat, Helvetica",
                    fontWeight: 500,
                    fontSize: "14px",
                    cursor: "pointer",
                    pl: 1,
                  },
                }}
              />
              <Menu
                anchorEl={locationAnchorEl}
                open={Boolean(locationAnchorEl)}
                onClose={handleLocationClose}
              >
                {locations.map((location) => (
                  <MenuItem
                    key={location}
                    onClick={() => handleLocationSelect(location)}
                  >
                    {location}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Date */}
            <Box sx={{ width: { xs: "100%", sm: 235 } }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={formatDate(selectedDate)}
                  onClick={handleDateClick}
                  InputProps={{
                    readOnly: true,
                    startAdornment: <CalendarToday sx={{ color: "#0499DD", mr: 1 }} />,
                    endAdornment: (
                      <KeyboardArrowDown sx={{ color: "#0499DD" }} />
                    ),
                    sx: {
                      height: 50,
                      borderRadius: "10px",
                      fontFamily: "Montserrat, Helvetica",
                      fontWeight: 500,
                      fontSize: "14px",
                      cursor: "pointer",
                      pl: 1,
                    },
                  }}
                />
                <Popover
                  open={Boolean(dateAnchorEl)}
                  anchorEl={dateAnchorEl}
                  onClose={handleDateClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <DatePicker
                    openTo="day"
                    views={["year", "month", "day"]}
                    value={selectedDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Popover>
              </LocalizationProvider>
            </Box>

            {/* People count */}
            <Box sx={{ width: { xs: "100%", sm: 235 } }}>
              <TextField
                fullWidth
                variant="outlined"
                value={`${peopleCount} человек`}
                onClick={handlePeopleClick}
                InputProps={{
                  readOnly: true,
                  startAdornment: <People sx={{ color: "#0499DD", mr: 1 }} />,
                  endAdornment: (
                    <KeyboardArrowDown sx={{ color: "#0499DD" }} />
                  ),
                  sx: {
                    height: 50,
                    borderRadius: "10px",
                    fontFamily: "Montserrat, Helvetica",
                    fontWeight: 500,
                    fontSize: "14px",
                    cursor: "pointer",
                    pl: 1,
                  },
                }}
              />
              <Menu
                anchorEl={peopleAnchorEl}
                open={Boolean(peopleAnchorEl)}
                onClose={handlePeopleClose}
              >
                {peopleCounts.map((count) => (
                  <MenuItem
                    key={count}
                    onClick={() => handlePeopleSelect(count)}
                  >
                    {count} человек
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Show button */}
            <Button
              fullWidth={isMobile}
              sx={{
                background: "linear-gradient(90deg, #0499DD 0%, #17C1BC 100%)",
                color: "#FFFFFF",
                width: { xs: "100%", sm: 235 },
                height: 50,
                borderRadius: "10px",
                textTransform: "none",
                fontFamily: "Montserrat, Helvetica",
                fontWeight: 700,
                fontSize: "14px",
                mt: { xs: isMobile ? 0 : 0, sm: 0 },
              }}
            >
              Показать
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};