import { useEffect } from "react";
import { useRouter, type NextRouter } from "next/router";

const useClearQueryString = () => {
    const router = useRouter();

    useEffect(() => {
        clearQueryString(router);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

const clearQueryString = (router: NextRouter) => {
    void router?.replace("/", undefined, { shallow: true });
};

export { useClearQueryString, clearQueryString };
