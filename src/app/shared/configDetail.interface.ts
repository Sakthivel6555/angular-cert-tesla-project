export interface Config {
    configDetails: ConfigDetail;
    towHitch:      boolean;
    steeringWheel: boolean;
}

export interface ConfigDetail {
    id:          number;
    description: string;
    range:       number;
    speed:       number;
    price:       number;
}