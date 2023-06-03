export type TAlgoStep = {
  id: number;
  text: string;
  isStepDecisionMaker: boolean,
  subSteps?: TAlgoStep[];
};

export type TAlgoComponent = {
  activeAlgo: "get" | "put";
  activeStep: number;
}