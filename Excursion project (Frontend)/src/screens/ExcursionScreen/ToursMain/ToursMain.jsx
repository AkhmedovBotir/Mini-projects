import { Box, Container, Pagination, PaginationItem, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { NavigationSection } from '../sections/NavigationSection'
import { FeaturedToursSection } from '../sections/FeaturedToursSection'
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function ToursMain() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    return (
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
            <Box sx={{ 
                display: "flex", 
                flexDirection: { xs: "column-reverse", md: "row" },
                mt: { xs: 1, sm: 2 }, 
                gap: { xs: 3, md: 4 } 
            }}>
                {/* Navigation Section - moves to top on mobile */}
                <Box sx={{ 
                    width: { xs: "100%", md: "20%" },
                    order: { xs: 1, md: 1 }
                }}>
                    <NavigationSection />
                </Box>

                {/* Main Content */}
                <Box sx={{ 
                    width: { xs: "100%", md: "80%" },
                    order: { xs: 2, md: 2 }
                }}>
                    <FeaturedToursSection />

                    {/* Pagination - centered with adjusted margins */}
                    <Box sx={{ 
                        display: "flex", 
                        justifyContent: "center", 
                        my: { xs: 3, md: 4 },
                        '& .MuiPagination-ul': {
                            flexWrap: 'nowrap'
                        }
                    }}>
                        <Pagination
                            count={5}
                            size={isMobile ? "small" : "medium"}
                            renderItem={(item) => (
                                <PaginationItem
                                    slots={{
                                        previous: ArrowBackIosNewIcon,
                                        next: ArrowForwardIosIcon,
                                    }}
                                    {...item}
                                    sx={{
                                        "&.Mui-selected": {
                                            color: "primary.main",
                                        },
                                        minWidth: { xs: 32, sm: 40 },
                                        height: { xs: 32, sm: 40 },
                                    }}
                                />
                            )}
                        />
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}