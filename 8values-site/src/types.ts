export type Effect = {
    econ: number;
    dipl: number;
    govt: number;
    scty: number;
};

export type Question = {
    question: string;
    effect: Effect;
};

export type Ideology = {
    name: string;
    stats: Effect;
};
