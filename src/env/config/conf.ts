export const getConfig = (): Config => {
  return {
    TMDB_TOKEN: import.meta.env.VITE_TMDB_TOKEN,
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
