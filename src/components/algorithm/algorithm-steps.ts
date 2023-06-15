import { TAlgoStep } from "./algorithm.type";

export const putAlgo: TAlgoStep[] = [
  {
    id: 1,
    text: "Is `key` present in the map?",
    isStepDecisionMaker: true,
    subSteps: [
      { id: 1.1, text: "Update the node value", isStepDecisionMaker: false },
      { id: 1.2, text: "Put the node after head", isStepDecisionMaker: false },
      { id: 1.3, text: "Update the Map", isStepDecisionMaker: false },
    ],
  },
  {
    id: 2,
    text: "Is map size < cache size?",
    isStepDecisionMaker: true,
    subSteps: [
      {
        id: 2.1,
        text: "Create & Insert the node after head",
        isStepDecisionMaker: false,
      },
      { id: 2.2, text: "Update the Map", isStepDecisionMaker: false },
    ],
  },
  {
    id: 3,
    text: "Else",
    isStepDecisionMaker: false,
    subSteps: [
      {
        id: 3.1,
        text: "Delete the node before End node",
        isStepDecisionMaker: false,
      },
      { id: 3.2, text: "Update the Map", isStepDecisionMaker: false },
      {
        id: 3.3,
        text: "Create & Insert the node after head",
        isStepDecisionMaker: false,
      },
      { id: 3.4, text: "Update the Map", isStepDecisionMaker: false },
    ],
  },
];

export const getAlgo: TAlgoStep[] = [
  {
    id: 1,
    text: "Is `key` present in Map",
    isStepDecisionMaker: true,
    subSteps: [
      {
        id: 1.1,
        text: "Put the Node after Head node",
        isStepDecisionMaker: false,
      },
      { id: 1.2, text: "Return node value", isStepDecisionMaker: false },
    ],
  },
  {
    id: 2,
    text: "Else",
    isStepDecisionMaker: false,
    subSteps: [{ id: 2.1, text: "Return -1", isStepDecisionMaker: false }],
  },
];
