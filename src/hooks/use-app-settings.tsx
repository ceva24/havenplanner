import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useMemo, useState } from "react";

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
    character: Character;
    children: ReactNode;
}

const AppSettingsProvider = ({ character, children }: AppSettingsProviderProps) => {
    const [appSettings, setAppSettings] = useState<AppSettings>({
        hidePersonalQuest: Boolean(character.personalQuest),
        selectedAbilityCardsTabIndex: 0,
        spoilerSettings: {
            prosperity: determineInitialProsperity(character),
        },
    });

    const appSettingsValue = useMemo(() => ({ appSettings, setAppSettings }), [appSettings, setAppSettings]);

    return <AppSettingsContext.Provider value={appSettingsValue}>{children}</AppSettingsContext.Provider>;
};

const determineInitialProsperity = (character: Character): number => {
    if (character.items.length === 0) return 1;

    return Math.max.apply(
        0,
        character.items.map((characterItem: CharacterItem) => Number.parseInt(characterItem.item.group, 10))
    );
};

export default AppSettingsProvider;
export { useAppSettingsContext, determineInitialProsperity };
