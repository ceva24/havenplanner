import axios, { type AxiosError, type AxiosResponse } from "axios";
import useSWRImmutable from "swr/immutable";

interface UseItems {
    items?: Item[];
    isLoading: boolean;
    isError: boolean;
}

const useItems = (settings: Settings): UseItems => {
    const url = `/api/games/${settings.gameData.game.id}/items`;

    const { data, error } = useSWRImmutable<Item[], AxiosError>(
        JSON.stringify([url, settings.gameData.game.id, settings.spoilerSettings.items]),
        async () => fetch(url, settings),
        {
            keepPreviousData: true,
        },
    );

    return {
        items: data,
        isLoading: !data,
        isError: Boolean(error),
    };
};

const fetch = async (url: string, settings: Settings): Promise<Item[]> => {
    const body: GameDataRequest = {
        spoilerSettings: settings.spoilerSettings,
    };

    return axios
        .post<ItemDataResponse>(url, body, {
            headers: { "content-type": "application/json", accept: "application/json" },
        })
        .then((response: AxiosResponse<ItemDataResponse>) => response.data.items);
};

export { useItems, type UseItems, fetch };
