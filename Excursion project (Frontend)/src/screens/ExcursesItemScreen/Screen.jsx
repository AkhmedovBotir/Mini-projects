import { Box, Container } from "@mui/material";
import React from "react";
import { BookingSection } from "./sections/BookingSection";
import { CalendarSection } from "./sections/CalendarSection";
import { DescriptionSection } from "./sections/DescriptionSection";
import { FooterSection } from "./sections/FooterSection";
import { GallerySection } from "./sections/GallerySection";
import { HeroSection } from "./sections/HeroSection";
import { HighlightsSection } from "./sections/HighlightsSection";
import { InfoSection } from "./sections/InfoSection";
import { LocationSection } from "./sections/LocationSection";
import { TestimonialSection } from "./sections/TestimonialSection";

export const Screen = () => {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          overflow: "hidden",
          position: "relative",
        }}
      >
        <GallerySection />
        <LocationSection />
        <TestimonialSection />
        <HighlightsSection />
        <CalendarSection />
        <BookingSection />
        <HeroSection />
        <InfoSection />
        <FooterSection />
        <DescriptionSection />
      </Container>
    </Box>
  );
};
