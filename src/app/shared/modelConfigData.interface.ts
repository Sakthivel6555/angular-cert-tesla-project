export interface ModelConfigData {
    [key:string]: ModelConfig;
}

export interface ModelConfig {
    configs:  Config[];
    towHitch?: boolean;
    yoke?:     boolean;
}

export interface ConfigDetail {
    configDetails: Config;
    towHitch:      boolean|null|undefined;
    steeringWheel: boolean|null|undefined;
}

export interface Config {
    id:          number;
    description: string;
    range:       number;
    speed:       number;
    price:       number;
}
