import type { Dispatch, KeyboardEvent, SetStateAction } from "react";
import { Box, Typography } from "@mui/material";
import { SmallCard } from "@/components/core/cards";
import { addItem } from "@/components/items/items-autocomplete";

interface ItemGroupProps {
    title: string;
    items: Item[];
    handleClose: () => void;
    character: Character;
    setCharacter: Dispatch<SetStateAction<Character>>;
}

const ItemGroup = ({ title, items, handleClose, character, setCharacter }: ItemGroupProps) => {
    const addItemAndClose = (item: Item) => {
        addItem(item, character, setCharacter);
        handleClose();
    };

    const onKeyDown = (event: KeyboardEvent<HTMLElement>, item: Item) => {
        if (["Space", "Enter"].includes(event.code)) {
            event.preventDefault();
            addItemAndClose(item);
        }
    };

    const formattedTitle = formattedItemGroupTitle(title);

    return (
        <Box sx={{ textAlign: "center" }}>
            <Typography color="textPrimary" variant="h2" padding={3} paddingTop={0}>
                {formattedTitle}
            </Typography>
            <Box
                component="section"
                aria-label={formattedTitle}
                paddingBottom={3}
                sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
            >
                {items.map((item: Item) => (
                    <Box
                        key={item.id}
                        role="button"
                        tabIndex={0}
                        sx={{ margin: 1, cursor: "pointer", position: "relative" }}
                        onClick={() => {
                            addItemAndClose(item);
                        }}
                        onKeyDown={(event: KeyboardEvent<HTMLElement>) => {
                            onKeyDown(event, item);
                        }}
                    >
                        <SmallCard src={item.imageUrl} altText={item.name} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

const formattedItemGroupTitle = (title: string): string => {
    return Number.parseInt(title, 10) > 0 ? `Prosperity ${title}` : title;
};

export default ItemGroup;
