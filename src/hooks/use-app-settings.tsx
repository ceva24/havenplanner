import {
    createContext,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
    useContext,
    useMemo,
    useState,
} from "react";
import { defaultSpoilerSettings } from "@/constants";

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
    children: ReactNode;
}

const AppSettingsProvider = ({ children }: AppSettingsProviderProps) => {
    const [appSettings, setAppSettings] = useState<AppSettings>({
        showPersonalQuest: false,
        selectedAbilityCardsTabIndex: 0,
        spoilerSettings: defaultSpoilerSettings,
    });

    const appSettingsValue = useMemo(() => ({ appSettings, setAppSettings }), [appSettings, setAppSettings]);

    return <AppSettingsContext.Provider value={appSettingsValue}>{children}</AppSettingsContext.Provider>;
};

export default AppSettingsProvider;
export { useAppSettingsContext };
