import axios, { type AxiosError, type AxiosResponse } from "axios";
import useSWRImmutable from "swr/immutable"; // eslint-disable-line n/file-extension-in-import

const url = "/api/items";

interface UseItems {
    items?: Item[];
    isLoading: boolean;
    isError: boolean;
}

const useItems = (settings: Settings): UseItems => {
    const { data, error } = useSWRImmutable<Item[], AxiosError>(
        JSON.stringify([url, settings.gameData.game.id, settings.spoilerSettings.items]),
        async () => fetch(settings),
        {
            keepPreviousData: true,
        }
    );

    return {
        items: data,
        isLoading: !data,
        isError: Boolean(error),
    };
};

const fetch = async (settings: Settings): Promise<Item[]> => {
    const body: ItemsRequestData = {
        gameId: settings.gameData.game.id,
        spoilerSettings: settings.spoilerSettings,
    };

    return axios
        .post<ItemsResponseData>(url, body)
        .then((response: AxiosResponse<ItemsResponseData>) => response.data.items);
};

export { useItems, type UseItems };
