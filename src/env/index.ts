import { getConfig, getSanitizedConfig } from "./config/conf";

const config = getConfig();

const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;
