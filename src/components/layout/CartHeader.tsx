import React from "react";
import { Box, Badge, Typography } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

interface CartHeaderProps {
  itemCount: number;
  totalValue: number;
}

const CartHeader: React.FC<CartHeaderProps> = ({ itemCount, totalValue }) => {
  return (
    <Box
      className="z-50 w-full h-20"
      display="flex"
      alignItems="center"
      sx={{ cursor: "pointer" }}
    >
      <Box className="relative flex justify-between items-center pt-4 pl-6 pr-6">
        <Badge
          badgeContent={itemCount}
          color="primary"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <ShoppingCart />
        </Badge>
      </Box>
      <Box>
        <Typography variant="body2">Ver carrinho</Typography>
        <Typography variant="body2" fontWeight="bold">
          R$ {totalValue.toFixed(2).replace(".", ",")}
        </Typography>
      </Box>
    </Box>
  );
};

export default CartHeader;
