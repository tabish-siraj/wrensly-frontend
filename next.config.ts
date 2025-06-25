/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // wildcard for any domain (not officially supported for all wildcards but works for most)
            },
        ],
    },
    // images: {
    //     domains: ["encrypted-tbn0.gstatic.com", "example.com"], // add any others you need
    // },
};

export default nextConfig;
