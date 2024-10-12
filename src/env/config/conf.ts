export const getConfig = (): Config => {
  return {
    TMDB_TOKEN: import.meta.env.VITE_TMDB_TOKEN,
    PROXY_HOST: import.meta.env.VITE_PROXY_HOST,
    PROXY_PORT: import.meta.env.VITE_PROXY_PORT,
    PROXY_USERNAME: import.meta.env.VITE_PROXY_USERNAME,
    PROXY_PASSWORD: import.meta.env.VITE_PROXY_PASSWORD,
  };
};

export const getSanitizedConfig = (config: Config): SanitizedConfig => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as SanitizedConfig;
};
