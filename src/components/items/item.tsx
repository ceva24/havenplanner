import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { SmallCard } from "@/components/cards";

const Item = () => {
    return (
        <Box sx={{ margin: 1 }}>
            <SmallCard src="/worldhaven/images/items/gloomhaven/1-14/gh-002-winged-shoes.png" altText="Boot" />
            <Box>
                <IconButton aria-label="delete" sx={{ color: "secondary.main" }}>
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Item;
