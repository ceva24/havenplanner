import type { Dispatch, SetStateAction } from "react";
import { Typography, Slider } from "@mui/material";
import type { Mark } from "@mui/base/useSlider";
import { useSettingsContext } from "@/hooks/use-settings";

const ProsperitySlider = () => {
    const [settings, setSettings] = useSettingsContext();

    const onChange = (event: Event, value: number | number[]) => {
        if (typeof value === "number") updateProsperity(value, settings, setSettings);
    };

    return (
        <>
            <Typography id="input-slider">Prosperity</Typography>
            <Slider
                id="prosperity-slider"
                sx={{ width: { xs: "90%", sm: "80% " } }}
                aria-labelledby="input-slider"
                valueLabelDisplay="off"
                step={1}
                marks={marks()}
                min={1}
                max={9}
                value={settings.spoilerSettings.items.prosperity}
                onChange={onChange}
            />
        </>
    );
};

const marks = (): Mark[] => {
    return Array.from({ length: 9 }).map((item: unknown, index: number) => ({
        value: index + 1,
        label: index + 1,
    }));
};

const updateProsperity = (prosperity: number, settings: Settings, setSettings: Dispatch<SetStateAction<Settings>>) => {
    const newSettings: Settings = { ...settings };

    newSettings.spoilerSettings.items.prosperity = prosperity;

    setSettings(newSettings);
};

export default ProsperitySlider;
export { marks, updateProsperity };
