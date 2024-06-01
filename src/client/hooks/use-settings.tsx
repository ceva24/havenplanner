import { createContext, type Dispatch, type ReactNode, type SetStateAction, useContext, useMemo } from "react";

interface SettingsContextProperties {
    settings: Settings;
    setSettings: Dispatch<SetStateAction<Settings>>;
}

const SettingsContext = createContext<SettingsContextProperties | undefined>(undefined);

const useSettingsContext = (): [Settings, Dispatch<SetStateAction<Settings>>] => {
    const settingsContext = useContext(SettingsContext);

    if (!settingsContext) throw new Error("No SettingsContext Provider found when calling useSettingsContext");

    return [settingsContext.settings, settingsContext.setSettings];
};

interface SettingsProviderProperties {
    readonly settings: Settings;
    readonly setSettings: Dispatch<SetStateAction<Settings>>;
    readonly children: ReactNode;
}

const SettingsProvider = ({ settings, setSettings, children }: SettingsProviderProperties) => {
    const settingsValue = useMemo(() => ({ settings, setSettings }), [settings, setSettings]);

    return <SettingsContext.Provider value={settingsValue}>{children}</SettingsContext.Provider>;
};

export default SettingsProvider;
export { useSettingsContext };
