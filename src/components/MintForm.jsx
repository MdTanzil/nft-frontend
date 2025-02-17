import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { parseEther } from "viem";
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";
const CONTRACT_ADDRESS = "0x743f49311a82fe72eb474c44e78da2a6e0ae951c";
const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0d131e",
      paper: "#0d131e",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#9CA3AF",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#1F2937",
          borderRadius: "8px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#374151" },
            "&:hover fieldset": { borderColor: "#9CA3AF" },
            "&.Mui-focused fieldset": { borderColor: "#EC4899" },
          },
          input: { color: "white" },
          textarea: { color: "white" },
        },
      },
    },
  },
});
const MintForm = () => {
  const { address, isConnected } = useAccount();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTransactionSent, setIsTransactionSent] = useState(false);
  const {
    data: hash,
    error,
    isPending,
    sendTransaction,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  const mintNFT = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first!");
      return;
    }

    if (loading || isTransactionSent) {
      return; // Prevent multiple submissions if the transaction is already in progress
    }

    setLoading(true);
    setIsTransactionSent(true); // Prevent further submissions until current transaction is processed

    // 1️⃣ Generate a unique token ID (random number)
    const tokenId = Number(Math.floor(Math.random() * 1000000));
    console.log("Generated Token ID:", tokenId);

    // 2️⃣ Store metadata in backend
    const metadata = {
      nftID: tokenId,
      nftName: name,
      nftDescription: description,
      nftLogoUrl: imageUrl,
      userWalletAddress: address,
    };
    const mintingToast = toast.loading("Storing metadata...");
    try {
      // Store metadata
      const response = await axios.post(
        "https://nft-backend-chi.vercel.app/api/nft",
        metadata
      );
      const { metadataUrl } = response.data;

      toast.success("Metadata stored successfully!", { id: mintingToast });

      // 3️⃣ Mint NFT on the blockchain
      toast.loading("Minting NFT on the blockchain...", { id: mintingToast });
      await sendTransaction({
        to: CONTRACT_ADDRESS,
        value: parseEther("0.001"),
      });

      toast.success("Minting initiated! Check your wallet.", {
        id: mintingToast,
      });
    } catch (error) {
      console.error("Minting failed:", error);
      toast.error("Minting failed! Please try again.", { id: mintingToast });
    } finally {
      // Reset form and loading state after transaction completion
      setName("");
      setDescription("");
      setImageUrl("");
      setLoading(false);
      setIsTransactionSent(false); // Allow future submissions
    }
  };

  return (
    <div className="container mx-auto">
      <ThemeProvider theme={theme}>
        <Card
          sx={{
            backgroundColor: "##0d131e",
            borderRadius: "16px",
            padding: "24px",
            width: "600px",
            margin: "auto",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "white", mb: 2 }}
            >
              Mint Your NFT
            </Typography>

            <TextField
              fullWidth
              label="NFT Name"
              variant="outlined"
              sx={{ mb: 2 }}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              multiline
              rows={3}
              sx={{ mb: 2 }}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              fullWidth
              label="Image URL"
              variant="outlined"
              sx={{ mb: 3 }}
              onChange={(e) => setImageUrl(e.target.value)}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{
                background: "linear-gradient(90deg, #EC4899, #8B5CF6)",
                color: "white",
                padding: "12px",
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "none",
                borderRadius: "8px",
                "&:hover": { opacity: 0.9 },
              }}
              startIcon={
                <img src={"./white-logo.svg"} className="text-white" alt="" />
              }
              type="submit"
              onClick={mintNFT}
              disabled={loading || isTransactionSent}
            >
              {loading ? "Minting..." : "Mint NFT"}
            </Button>
          </CardContent>
        </Card>
      </ThemeProvider>
    </div>
  );
};

export default MintForm;
