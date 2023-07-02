import {
  DIAGRAM_OPERATIONS,
  TSvgNodeItem,
} from "../components/svg-diagram/svg-diagram.type";

export type TAlgo = "put" | "get";
export type TMapItem = {
  key: number;
  data: { value: number; address: string };
};

type TAlgoState = {
  activeStep: number;
  status: "not-running" | "running" | "completed";
};
type TAlgoApi = {
  changeAlgoState: (mode: TAlgoState["status"]) => void;
  changeStep: (step: TAlgoState["activeStep"]) => void;
};

export type TMapState = {
  map: Map<TMapItem["key"], TMapItem["data"]>;
};
type TMapApi = {
  updateMap: () => void;
};

type TOperationFormState = {
  activeAlgo: TAlgo;
};
type TOperationFormApi = {
  onAlgoChange: (algo: TOperationFormState["activeAlgo"]) => void;
  onFormSubmit: (
    key: TSvgNodeItem["key"],
    value: TMapItem["data"]["value"]
  ) => void;
};

type TDiagramState = {
  diagramOperation: DIAGRAM_OPERATIONS | null;
  key: TSvgNodeItem["key"] | null;
  value: TSvgNodeItem["value"] | null;
  address: TSvgNodeItem["address"] | null;
  lastNodeKey: TSvgNodeItem["key"] | null; // reference to remove entry from the map
  nodeList: TSvgNodeItem[];
  showArrows: boolean;
  moveNodeMeta?: {
    targetIndex: number;
  }
};
type TDiagramApi = {
  addNewNode: () => void;
  removeTargetNode: () => void;
  setDiagramOperation: (operation: DIAGRAM_OPERATIONS) => void;
  removeNodeBeforeEnd: () => void;
  updateValue: () => void;
  updateNodesX: () => void;
  setArrowState: (flag: TDiagramState["showArrows"]) => void;
};

export type TAlgoStoreState = {
  operationFormState: TOperationFormState;
  algoState: TAlgoState;
  mapState: TMapState;
  diagramState: TDiagramState;
};
export type TAlgoStoreApi = {
  algoActions: TAlgoApi;
  operationFormActions: TOperationFormApi;
  mapActions: TMapApi;
  diagramActions: TDiagramApi;
};
