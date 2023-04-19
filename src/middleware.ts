import { NextResponse } from "next/server";

const middleware = () => {
    const response = NextResponse.next();

    response.headers.set("x-robots-tag", "noindex");

    return response;
};

export const config = {
    matcher: "/api/:path*",
};

export { middleware };
