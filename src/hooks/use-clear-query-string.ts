import { useRouter, type NextRouter } from "next/router";

const useClearQueryString = () => {
    const router = useRouter();

    return () => {
        clearQueryString(router);
    };
};

const clearQueryString = (router: NextRouter) => {
    void router?.replace("/", undefined, { shallow: true });
};

export { useClearQueryString, clearQueryString };
