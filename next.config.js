
import {i18n}  from './next-i18next.config.js'

/** @type {import('next').NextConfig} */
export default  {
    reactStrictMode: true,
    swcMinify: true,
    i18n,
    webpack(config) {
        config.resolve.fallback = {
          ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
            // by next.js will be dropped. Doesn't make much sense, but how it is
          fs: false, // the solution
        };
    
        return config;
      },
}

