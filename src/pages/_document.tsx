import { NextPage } from "next";
import { Html, Head, Main, NextScript } from "next/document";

const Document: NextPage = () => {
    return (
        <Html>
            <Head />
            <body style={{ backgroundColor: "#0f0302" }}>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default Document;
