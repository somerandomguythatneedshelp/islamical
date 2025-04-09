import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import withPWA, {PWAConfig} from "next-pwa";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    // Add pwa config here, inside nextConfig
    pwa: {
        dest: "public",
        disable: process.env.NODE_ENV === "development", // disables PWA during local dev
    },
};

export default withNextIntl(withPWA(<PWAConfig>nextConfig));
