import { createContext, type Dispatch, type ReactNode, type SetStateAction, useContext, useMemo } from "react";

interface AppSettingsContextProps {
    appSettings: AppSettings;
    setAppSettings: Dispatch<SetStateAction<AppSettings>>;
}

const AppSettingsContext = createContext<AppSettingsContextProps | undefined>(undefined);

const useAppSettingsContext = (): [AppSettings, Dispatch<SetStateAction<AppSettings>>] => {
    const appSettingsContext = useContext(AppSettingsContext);

    if (!appSettingsContext) throw new Error("No AppSettingsContext Provider found when calling useAppSettingsContext");

    return [appSettingsContext.appSettings, appSettingsContext.setAppSettings];
};

interface AppSettingsProviderProps {
    appSettings: AppSettings;
    setAppSettings: Dispatch<SetStateAction<AppSettings>>;
    children: ReactNode;
}

const AppSettingsProvider = ({ appSettings, setAppSettings, children }: AppSettingsProviderProps) => {
    const appSettingsValue = useMemo(() => ({ appSettings, setAppSettings }), [appSettings, setAppSettings]);

    return <AppSettingsContext.Provider value={appSettingsValue}>{children}</AppSettingsContext.Provider>;
};

export default AppSettingsProvider;
export { useAppSettingsContext };
