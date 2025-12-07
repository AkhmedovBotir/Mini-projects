import { Box, Container } from "@mui/material";
import React from "react";
import { AboutUsSection } from "./sections/AboutUsSection";
import { BlogSection } from "./sections/BlogSection";
import { ContactSection } from "./sections/ContactSection";
import { FeaturedDestinationsSection } from "./sections/FeaturedDestinationsSection";
import { GallerySection } from "./sections/GallerySection";
import { HeroSection } from "./sections/HeroSection";
import { NewsletterSection } from "./sections/NewsletterSection";
import { TestimonalsSection } from "./sections/TestimonalsSection";

export const Screen = () => {
  return (
    <Box
    >
      {/* <Container
        maxWidth={false}
        disableGutters
        sx={{
          bgcolor: "white",
          overflow: "hidden",
          maxWidth: "1440px",
          position: "relative",
        }}
      > */}
      <div>
        <AboutUsSection />
        <BlogSection />
        <GallerySection />
        <TestimonalsSection />
        <HeroSection />
        <FeaturedDestinationsSection />
        <NewsletterSection />
        <ContactSection />
      </div>
      {/* </Container> */}
    </Box>
  );
};
