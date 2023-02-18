import type { Dispatch, SetStateAction } from "react";
import { Box, Typography, Slider } from "@mui/material";
import type { Mark } from "@mui/base/SliderUnstyled";
import { useAppSettingsContext } from "@/hooks/app-settings";

const ProsperitySlider = () => {
    const { appSettings, setAppSettings } = useAppSettingsContext();

    const onChange = (event: Event, value: number | number[]) => {
        if (typeof value === "number") updateProsperity(value, appSettings, setAppSettings);
    };

    return (
        <>
            <Typography id="input-slider">Prosperity</Typography>
            <Slider
                id="prosperity-slider"
                sx={{ width: "80%" }}
                aria-labelledby="input-slider"
                valueLabelDisplay="off"
                step={1}
                marks={marks()}
                min={1}
                max={9}
                value={appSettings.spoilerSettings.prosperity}
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
    setAppSettings({ ...appSettings, spoilerSettings: { prosperity } });
};

export default ProsperitySlider;
export { marks, updateProsperity };
