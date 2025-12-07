import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
    Box,
    Container,
    Pagination,
    PaginationItem,
    Typography,
} from "@mui/material";
import React from "react";
import { FeaturedToursSection } from "./sections/FeaturedToursSection";
import { HeaderSection } from "./sections/HeaderSection";
import { MainSection } from "./sections/MainSection";

import { TourFilterSection } from "./sections/TourFilterSection";
import ToursMain from "./ToursMain/ToursMain";

export const Screen = () => {
    return (
        <Box
            sx={{
                bgcolor: "neutral.50",
                width: "100%",
            }}
        >
            <div>
                <MainSection />

                <TourFilterSection />

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: "bold",
                        color: "primary.main",
                        my: 10,
                        textAlign: "center",
                    }}
                >
                    Наши туры
                </Typography>

                    <ToursMain />

                <HeaderSection />
            </div>

        </Box>
    );
};
