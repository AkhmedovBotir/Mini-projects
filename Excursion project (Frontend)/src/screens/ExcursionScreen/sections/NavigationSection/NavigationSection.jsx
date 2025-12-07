import Add from "@mui/icons-material/Add";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Refresh from "@mui/icons-material/Refresh";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Paper,
  Slider,
  Stack,
  ToggleButton,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import React, { useState } from "react";

export const NavigationSection = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(900)); // Custom 900px breakpoint
  
  // State for filter values
  const [priceRange, setPriceRange] = useState([1600, 4000]);
  const [peopleCount, setPeopleCount] = useState("5");
  const [locations, setLocations] = useState({
    abkhazia: true,
    krasnayaPolyana: false,
    sochi: false,
    adler1: false,
    adler2: false,
  });
  const [sectionsCollapsed, setSectionsCollapsed] = useState({
    duration: false,
    date: false,
  });

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handlePeopleCountChange = (value) => {
    setPeopleCount(value);
  };

  const handleLocationChange = (event) => {
    setLocations({
      ...locations,
      [event.target.name]: event.target.checked,
    });
  };

  const toggleSection = (section) => {
    setSectionsCollapsed({
      ...sectionsCollapsed,
      [section]: !sectionsCollapsed[section],
    });
  };

  const resetFilters = () => {
    setPriceRange([1600, 4000]);
    setPeopleCount("5");
    setLocations({
      abkhazia: true,
      krasnayaPolyana: false,
      sochi: false,
      adler1: false,
      adler2: false,
    });
  };

  const peopleCountOptions = [
    { value: "1", label: "1 чел." },
    { value: "2", label: "2 чел." },
    { value: "3", label: "3 чел." },
    { value: "4", label: "4 чел." },
    { value: "5", label: "5 чел." },
    { value: "6", label: "6 чел." },
    { value: "7", label: "7 чел." },
    { value: "8", label: "8 чел." },
    { value: "9", label: "9 чел." },
    { value: "10", label: "10 чел." },
    { value: "10+", label: ">10 чел." },
  ];

  const locationOptions = [
    { name: "abkhazia", label: "Абхазия" },
    { name: "krasnayaPolyana", label: "Красная поляна" },
    { name: "sochi", label: "Сочи" },
    { name: "adler1", label: "Адлер" },
    { name: "adler2", label: "Адлер" },
  ];

  return (
    <Box sx={{ 
      width: isDesktop ? 295 : "100%",
      minWidth: isDesktop ? 295 : "auto",
      position: isDesktop ? "sticky" : "static",
      top: isDesktop ? 20 : "auto"
    }}>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          borderRadius: "10px",
          p: isDesktop ? 3 : 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Filters Header */}
        <Typography variant="subtitle1" fontWeight="bold" color="primary" fontFamily="Montserrat, Helvetica">
          Фильтры
        </Typography>

        {/* Price Range Section */}
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle2" fontWeight="bold" fontFamily="Montserrat, Helvetica">
              Стоимость
            </Typography>
            <ExpandLess fontSize="small" />
          </Box>

          <Stack direction="row" spacing={2} mt={2}>
            <Button
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                borderRadius: "40px",
                textTransform: "none",
                fontFamily: "Montserrat, Helvetica",
                fontWeight: 500,
                fontSize: 12,
                minWidth: 0
              }}
            >
              {priceRange[0]} ₽
            </Button>
            <Button
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                borderRadius: "40px",
                textTransform: "none",
                fontFamily: "Montserrat, Helvetica",
                fontWeight: 500,
                fontSize: 12,
                minWidth: 0
              }}
            >
              {priceRange[1]} ₽
            </Button>
          </Stack>

          <Box px={1} mt={2}>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              min={0}
              max={10000}
              step={100}
              valueLabelDisplay="off"
              sx={{
                "& .MuiSlider-thumb": {
                  width: 15,
                  height: 15,
                  backgroundColor: "white",
                  border: "1px solid #d3d3d3",
                  "&::after": {
                    width: 7,
                    height: 7,
                    backgroundColor: "primary.main",
                    borderRadius: "50%",
                    top: 3,
                    left: 3,
                  },
                  "&::before": {
                    display: "none",
                  },
                },
                "& .MuiSlider-track": {
                  backgroundColor: "primary.main",
                  height: 3,
                },
                "& .MuiSlider-rail": {
                  height: 3,
                  backgroundColor: "#d3d3d3",
                },
              }}
            />
          </Box>
        </Box>

        <Divider />

        {/* People Count Section */}
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle2" fontWeight="bold" fontFamily="Montserrat, Helvetica">
              Количество человек
            </Typography>
            <ExpandLess fontSize="small" />
          </Box>

          <Box mt={2} sx={{ 
            display: 'grid', 
            gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : 'repeat(auto-fill, minmax(80px, 1fr))',
            gap: 1
          }}>
            {peopleCountOptions.map((option) => (
              <Button
                key={option.value}
                variant={peopleCount === option.value ? "contained" : "outlined"}
                onClick={() => handlePeopleCountChange(option.value)}
                sx={{
                  height: 30,
                  borderRadius: "40px",
                  textTransform: "none",
                  fontFamily: "Montserrat, Helvetica",
                  fontWeight: 500,
                  fontSize: 12,
                  minWidth: 0,
                  p: 0
                }}
              >
                {option.label}
              </Button>
            ))}
          </Box>
        </Box>

        <Divider />

        {/* Location Section */}
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle2" fontWeight="bold" fontFamily="Montserrat, Helvetica">
              Место
            </Typography>
            <Add fontSize="small" />
          </Box>

          <Stack spacing={1} mt={2}>
            {locationOptions.map((option) => (
              <FormControlLabel
                key={option.name}
                control={
                  <Checkbox
                    checked={locations[option.name]}
                    onChange={handleLocationChange}
                    name={option.name}
                    size="small"
                    sx={{
                      width: 15,
                      height: 15,
                      borderRadius: "50%",
                      padding: 0,
                      marginRight: 1,
                      "& .MuiSvgIcon-root": {
                        width: 15,
                        height: 15,
                        borderRadius: "50%",
                      },
                      "&.Mui-checked": {
                        "& .MuiSvgIcon-root": {
                          backgroundColor: "white",
                          border: "1px solid #d3d3d3",
                          borderRadius: "50%",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            width: 7,
                            height: 7,
                            backgroundColor: "primary.main",
                            borderRadius: "50%",
                            top: 3,
                            left: 3,
                          },
                        },
                      },
                    }}
                  />
                }
                label={
                  <Typography variant="caption" fontWeight={500} fontFamily="Montserrat, Helvetica">
                    {option.label}
                  </Typography>
                }
                sx={{ margin: 0 }}
              />
            ))}
          </Stack>
        </Box>

        <Divider />

        {/* Duration Section */}
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            onClick={() => toggleSection("duration")}
            sx={{ cursor: "pointer" }}
          >
            <Typography variant="subtitle2" fontWeight="bold" fontFamily="Montserrat, Helvetica">
              Длительность
            </Typography>
            {sectionsCollapsed.duration ? <ExpandMore fontSize="small" /> : <ExpandLess fontSize="small" />}
          </Box>
        </Box>

        <Divider />

        {/* Date Section */}
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            onClick={() => toggleSection("date")}
            sx={{ cursor: "pointer" }}
          >
            <Typography variant="subtitle2" fontWeight="bold" fontFamily="Montserrat, Helvetica">
              Дата
            </Typography>
            {sectionsCollapsed.date ? <ExpandMore fontSize="small" /> : <ExpandLess fontSize="small" />}
          </Box>
        </Box>

        <Divider />

        {/* Show Button */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            borderRadius: "40px",
            height: 40,
            textTransform: "none",
            fontFamily: "Montserrat, Helvetica",
            fontWeight: "bold",
            fontSize: 14,
            mt: 1
          }}
        >
          Показать
        </Button>

        {/* Reset Filters */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ cursor: "pointer" }}
          onClick={resetFilters}
        >
          <Refresh fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="caption" fontWeight={500} fontFamily="Montserrat, Helvetica">
            Сбросить фильтры
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};