import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { ConnectButton } from "@rainbow-me/rainbowkit";
const Navbar = () => {
  return (
    <div className="bg-[#000000]">
      <Box sx={{ flexGrow: 1 }} className="container mx-auto">
        <AppBar position="static" sx={{ backgroundColor: "#000000" }}>
          <Toolbar>
            <Box component="div" sx={{ flexGrow: 1 }}>
              <img src="./logo.svg" alt="" />
            </Box>
            <ConnectButton showBalance={false} accountStatus="address" />
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Navbar;
