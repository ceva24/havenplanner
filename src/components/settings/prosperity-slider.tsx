import type { Dispatch, SetStateAction } from "react";
import { Typography, Slider } from "@mui/material";
import type { Mark } from "@mui/base/SliderUnstyled";
import { useAppSettingsContext } from "@/hooks/use-app-settings";

const ProsperitySlider = () => {
    const [appSettings, setAppSettings] = useAppSettingsContext();

    const onChange = (event: Event, value: number | number[]) => {
        if (typeof value === "number") updateProsperity(value, appSettings, setAppSettings);
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
                value={appSettings.spoilerSettings.items.prosperity}
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

const updateProsperity = (
    prosperity: number,
    appSettings: AppSettings,
    setAppSettings: Dispatch<SetStateAction<AppSettings>>
) => {
    const newAppSettings: AppSettings = { ...appSettings };

    newAppSettings.spoilerSettings.items.prosperity = prosperity;

    setAppSettings(newAppSettings);
};

export default ProsperitySlider;
export { marks, updateProsperity };
