import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useMemo, useState } from "react";

interface AppSettingsContextProps {
    appSettings: AppSettings;
    setAppSettings: Dispatch<SetStateAction<AppSettings>>;
}

const AppSettingsContext = createContext<AppSettingsContextProps | undefined>(undefined);

interface AppSettingsProviderProps {
    character: Character;
    children: ReactNode;
}

const AppSettingsProvider = ({ character, children }: AppSettingsProviderProps) => {
    const [appSettings, setAppSettings] = useState<AppSettings>({
        hidePersonalQuest: Boolean(character.personalQuest),
        selectedAbilityCardsTabIndex: 0,
        spoilerSettings: {
            prosperity: 1,
        },
    });

    const appSettingsValue = useMemo(() => ({ appSettings, setAppSettings }), [appSettings, setAppSettings]);

    return <AppSettingsContext.Provider value={appSettingsValue}>{children}</AppSettingsContext.Provider>;
};

const useAppSettingsContext = (): AppSettingsContextProps => {
    const appSettingsContext = useContext(AppSettingsContext);

    if (!appSettingsContext) throw new Error("No AppSettingsContext Provider found when calling useAppSettingsContext");

    return appSettingsContext;
};

export default AppSettingsProvider;
export { useAppSettingsContext };
