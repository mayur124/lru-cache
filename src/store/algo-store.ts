import { create } from "zustand";
import { TAlgoStoreState, TAlgoStoreApi } from "./algo-store.type";
import { getNodeAddress } from "./helper";
import { SVG_CONSTANTS as C, CACHE_SIZE } from "../helpers/constants";
import {
  DIAGRAM_OPERATIONS,
  TSvgNodeItem,
} from "../components/svg-diagram/svg-diagram.type";

export const useAlgoStore = create<TAlgoStoreState & TAlgoStoreApi>((set) => ({
  operationFormState: {
    activeAlgo: "put",
  },
  algoState: {
    activeStep: 0,
    allowStepMove: false,
    status: "not-running",
  },
  mapState: {
    map: new Map(),
  },
  diagramState: {
    diagramOperation: null,
    key: null,
    value: null,
    address: null,
    lastNodeKey: null,
    showArrows: true,
    nodeList: [
      {
        id: crypto.randomUUID(),
        isHeadNode: true,
        key: 0,
        value: "H",
        address: "H",
        x: 70,
      },
      {
        id: crypto.randomUUID(),
        isEndNode: true,
        key: 0,
        value: "E",
        address: "E",
        x: 190,
      },
    ],
  },
  algoActions: {
    changeStep(step) {
      set((state) => {
        return {
          ...state,
          algoState: {
            ...state.algoState,
            activeStep: step,
            status: step === 0 ? "completed" : state.algoState.status,
          },
        };
      });
    },
    changeAlgoState(mode) {
      set((state) => {
        return {
          ...state,
          algoState: {
            ...state.algoState,
            status: mode,
          },
        };
      });
    },
  },
  operationFormActions: {
    onAlgoChange(algo) {
      set((state) => {
        return {
          ...state,
          operationFormState: {
            ...state.operationFormState,
            activeAlgo: algo,
          },
        };
      });
    },
    onFormSubmit(key, value) {
      set((state) => {
        if (state.operationFormState.activeAlgo === "put") {
          const existingNode = state.mapState.map.get(key);
          return {
            ...state,
            algoState: {
              ...state.algoState,
              activeStep: 1,
              status: "running",
            },
            diagramState: {
              ...state.diagramState,
              key,
              value,
              address: !existingNode ? getNodeAddress() : existingNode.address,
            },
          };
        } else {
          return {
            ...state,
            algoState: {
              ...state.algoState,
              activeStep: 1,
              status: "running",
            },
          };
        }
      });
    },
  },
  mapActions: {
    updateMap() {
      set((state) => {
        // prettier-ignore
        const { key, value, lastNodeKey, diagramOperation } = state.diagramState;
        const mapClone = structuredClone(state.mapState.map);
        const existingItem = mapClone.get(key!);
        switch (diagramOperation) {
          case DIAGRAM_OPERATIONS.REMOVE: {
            if (mapClone.size >= CACHE_SIZE) {
              mapClone.delete(lastNodeKey!);
              return {
                ...state,
                mapState: {
                  ...state.mapState,
                  map: mapClone,
                },
              };
            }
            break;
          }
          case DIAGRAM_OPERATIONS.UPDATE_VALUE: {
            if (existingItem) {
              mapClone.set(key!, {
                value: +value!,
                address: existingItem.address,
              });
              return {
                ...state,
                mapState: {
                  ...state.mapState,
                  map: mapClone,
                },
              };
            }
            break;
          }
          default: {
            const address = state.diagramState.address!;
            mapClone.set(key!, {
              value: +value!,
              address,
            });
            return {
              ...state,
              diagramState: {
                ...state.diagramState,
                address,
                value,
              },
              mapState: {
                ...state.mapState,
                map: mapClone,
              },
            };
          }
        }
        return state;
      });
    },
  },
  diagramActions: {
    setDiagramOperation(operation) {
      set((state) => {
        return {
          ...state,
          diagramState: {
            ...state.diagramState,
            diagramOperation: operation,
          },
        };
      });
    },
    updateNodesX() {
      set((state) => {
        for (
          let index = 1;
          index < state.diagramState.nodeList.length;
          index++
        ) {
          state.diagramState.nodeList[index].x =
            state.diagramState.nodeList[index - 1].x +
            C.RECTANGLE_SIZE +
            C.ARROW_WIDTH;
        }
        return {
          ...state,
          diagramState: {
            ...state.diagramState,
            nodeList: [...state.diagramState.nodeList],
          },
        };
      });
    },
    addNewNode() {
      set((state) => {
        const { key, value, address } = state.diagramState;
        const node: TSvgNodeItem = {
          id: crypto.randomUUID(),
          x: 0,
          key: key!,
          value: value!,
          address: address!,
        };
        state.diagramState.nodeList = [
          state.diagramState.nodeList[0],
          node,
          ...state.diagramState.nodeList.slice(1),
        ];
        state.diagramActions.updateNodesX();
        return {
          ...state,
          diagramState: {
            ...state.diagramState,
            nodeList: [...state.diagramState.nodeList],
          },
        };
      });
    },
    removeNode() {
      set((state) => {
        // prettier-ignore
        const lastNodeKey = state.diagramState.nodeList[
          state.diagramState.nodeList.length - 2
        ].key;
        state.diagramState.nodeList.splice(
          state.diagramState.nodeList.length - 2,
          1
        );
        state.diagramActions.updateNodesX();
        return {
          ...state,
          diagramState: {
            ...state.diagramState,
            lastNodeKey,
            nodeList: [...state.diagramState.nodeList],
          },
        };
      });
    },
    moveNodeAfterHead() {
      set((state) => {
        const { key } = state.diagramState;
        const targetNodeIndex = state.diagramState.nodeList.findIndex(
          (node) => +node.key === key
        );
        const nodeToSwap = state.diagramState.nodeList[targetNodeIndex];
        state.diagramState.nodeList.splice(targetNodeIndex, 1);
        state.diagramState.nodeList.splice(1, 0, nodeToSwap);
        state.diagramActions.updateNodesX();
        return {
          ...state,
          diagramState: {
            ...state.diagramState,
            nodeList: [...state.diagramState.nodeList],
          },
        };
      });
    },
    updateValue() {
      set((state) => {
        const { key, value } = state.diagramState;
        const nodeIndex = state.diagramState.nodeList.findIndex(
          (node) => node.key === key
        );
        if (nodeIndex > -1) {
          state.diagramState.nodeList[nodeIndex].value = +value!;
        }
        return {
          ...state,
          diagramState: {
            ...state.diagramState,
            nodeList: [...state.diagramState.nodeList],
          },
        };
      });
    },
    setArrowState(flag) {
      set((state) => {
        return {
          ...state,
          diagramState: {
            ...state.diagramState,
            showArrows: flag,
          },
        };
      });
    },
  },
}));
