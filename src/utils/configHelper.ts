export type Config = {
    token: string;
}

import * as fs from 'fs';

export default class ConfigHelper {
    config: Config;

    constructor() {
        let configFile;
        if (fs.existsSync('./rast_config.json')) {
            configFile = fs.readFileSync('./rast_config.json', 'utf8');
            this.config = JSON.parse(configFile);
            return;
        }

        fs.writeFileSync(
            './rast_config.json', JSON.stringify({
                token: null,
            }));
        configFile = fs.readFileSync('./rast_config.json', 'utf8');
        this.config = JSON.parse(configFile);
    }

    
    
    async saveConfig() {
        fs.writeFileSync(
            './rast_config.json', JSON.stringify({
                token: this.config.token,
            }, null, "\t"));
    }
}