"use client";
import { Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

// Define the structure of a single NFT object
interface NFT {
  nftName: string;
  nftDescription: string;
  nftLogoUrl: string;
  nftID: number;
  userWalletAddress: string;
}

// Define the structure of an array of NFT objects
type NFTArray = NFT[];
const MintGallery = () => {
  const { address, isConnected } = useAccount();
  const [product, setProduct] = useState<NFTArray>([]);
  useEffect(() => {
    const fetchNFTs = async () => {
      if (!address) return; // Avoid making a request if the address is not available yet

      try {
        const response = await axios.get(
          `http://localhost:5000/api/nft/gallery/${address}`
        );
        if (response.status === 200) {
          // Update state only if the response data is different from the previous data
          if (JSON.stringify(response.data) !== JSON.stringify(product)) {
            setProduct(response.data);
          }
        }
      } catch (error) {
        console.error("Error fetching NFT gallery:", error);
      }
    };

    fetchNFTs();
  }, [address, product]);

  return (
    <div className="container mx-auto mt-2">
      <Typography variant="h5" sx={{ fontWeight: 700 }} className="text-white">
        Your NFT Gallery
      </Typography>
      <Grid container marginTop={2}>
        {isConnected ? (
          product.length > 0 ? (
            product.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item?._id}>
                <Card sx={{ maxWidth: 400 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item?.nftLogoUrl}
                      alt={item?.nftName}
                    />
                    <CardContent
                      sx={{ backgroundColor: "#0a0f19", color: "white" }}
                    >
                      <Typography gutterBottom variant="h5" component="div">
                        {item?.nftName}
                      </Typography>
                      <Typography variant="body2" color="">
                        {item?.nftDescription}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" className="text-white">
              No NFTs found.
            </Typography>
          )
        ) : (
          <Typography variant="h6" className="text-white">
            Connect to Ethereum to view your NFTs
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default MintGallery;
