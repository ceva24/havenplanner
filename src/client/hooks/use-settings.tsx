import { createContext, type Dispatch, type ReactNode, type SetStateAction, useContext, useMemo } from "react";

interface SettingsContextProps {
    settings: Settings;
    setSettings: Dispatch<SetStateAction<Settings>>;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

const useSettingsContext = (): [Settings, Dispatch<SetStateAction<Settings>>] => {
    const settingsContext = useContext(SettingsContext);

    if (!settingsContext) throw new Error("No SettingsContext Provider found when calling useSettingsContext");

    return [settingsContext.settings, settingsContext.setSettings];
};

interface SettingsProviderProps {
    settings: Settings;
    setSettings: Dispatch<SetStateAction<Settings>>;
    children: ReactNode;
}

const SettingsProvider = ({ settings, setSettings, children }: SettingsProviderProps) => {
    const settingsValue = useMemo(() => ({ settings, setSettings }), [settings, setSettings]);

    return <SettingsContext.Provider value={settingsValue}>{children}</SettingsContext.Provider>;
};

export default SettingsProvider;
export { useSettingsContext };
