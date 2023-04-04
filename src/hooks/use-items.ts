import axios, { type AxiosError, type AxiosResponse } from "axios";
import useSWRImmutable from "swr/immutable"; // eslint-disable-line n/file-extension-in-import

interface UseItems {
    items?: Item[];
    isLoading: boolean;
    isError: boolean;
}

const useItems = (settings: Settings): UseItems => {
    const requestData: ItemsRequestData = createRequestData(settings);

    const { data, error } = useSWRImmutable<Item[], AxiosError>(
        JSON.stringify(requestData),
        async () => fetch(requestData),
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

const createRequestData = (settings: Settings): ItemsRequestData => {
    return {
        gameId: settings.gameData.game.id,
        spoilerSettings: settings.spoilerSettings,
    };
};

const fetch = async (requestData: ItemsRequestData): Promise<Item[]> => {
    return axios
        .post<ItemsResponseData>("/api/items", requestData, { timeout: 5000 })
        .then((response: AxiosResponse<ItemsResponseData>) => response.data.items);
};

export { useItems, type UseItems };
