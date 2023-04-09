/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        locales: ["en-US"],
        defaultLocale: "en-US",
    },
    async redirects() {
        return [
            {
                source: "/",
                destination: "/gloomhaven",
                permanent: false,
            },
        ];
    },
};

module.exports = nextConfig;
