import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
const Hero = (): React.FC => {
  return (
    <>
      <Box
        sx={{
          minHeight: "55vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="h3" fontWeight="bold" className="text-6xl ">
            Discover & Collect <br />
            Extraordinary NFTs
          </Typography>
          <Typography sx={{ mt: 2, opacity: 0.8 }}>
            Enter the world of digital art and collectibles. Explore unique NFTs
            created by artists worldwide.
          </Typography>
          <Box
            sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "center" }}
          >
            {/* Gradient Button */}
            <Button
              variant="contained"
              sx={{
                borderRadius: "999px",
                backgroundColor: "#925aef ",
                gap: 1,
              }}
            >
              <RocketLaunchIcon /> Start Creating
            </Button>
            {/* Outlined Button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#374151",
                color: "white",
                gap: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PlayCircleOutlineIcon /> Watch Demo
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Hero;
