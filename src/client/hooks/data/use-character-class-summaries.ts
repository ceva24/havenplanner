import axios, { type AxiosError, type AxiosResponse } from "axios";
import useSWRImmutable from "swr/immutable";

interface UseCharacterClassSummaries {
    characterClassSummaries?: CharacterClassSummary[];
    isLoading: boolean;
    isError: boolean;
}

const useCharacterClassSummaries = (settings: Settings): UseCharacterClassSummaries => {
    const url = `/api/games/${settings.gameData.game.id}/classes`;

    const { data, error } = useSWRImmutable<CharacterClassSummary[], AxiosError>(
        JSON.stringify([url, settings.gameData.game.id, settings.spoilerSettings.classes]),
        async () => fetch(url, settings),
        {
            keepPreviousData: true,
        },
    );

    return {
        characterClassSummaries: data,
        isLoading: !data,
        isError: Boolean(error),
    };
};

const fetch = async (url: string, settings: Settings): Promise<CharacterClassSummary[]> => {
    const body: GameDataRequest = {
        spoilerSettings: settings.spoilerSettings,
    };

    return axios
        .post<ClassSummariesDataResponse>(url, body, {
            headers: { "content-type": "application/json", accept: "application/json" },
        })
        .then((response: AxiosResponse<ClassSummariesDataResponse>) => response.data.classes);
};

export { useCharacterClassSummaries, type UseCharacterClassSummaries, fetch };
