import { useRouter } from "next/router";
import { useEffect } from "react";

const useClearQueryString = () => {
    const router = useRouter();

    useEffect(() => {
        clearQueryString(router);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

interface Router {
    replace: Function; // eslint-disable-line @typescript-eslint/ban-types
}

const clearQueryString = (router: Router) => {
    void router?.replace("/", undefined, { shallow: true });
};

export { useClearQueryString, clearQueryString };
