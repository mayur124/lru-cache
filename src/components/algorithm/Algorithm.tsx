import isEqual from "lodash.isequal";
import { FC, Fragment, useEffect, useRef } from "react";
import { shallow } from "zustand/shallow";
import { CACHE_SIZE } from "../../helpers/constants";
import { useAlgoStore } from "../../store/algo-store";
import { TAlgoStoreState, TMapState } from "../../store/algo-store.type";
import { isStepConditionFulfilled } from "../../store/helper";
import { CardHeader } from "../common";
import {
  DIAGRAM_OPERATIONS,
  TSvgNodeItem,
} from "../svg-diagram/svg-diagram.type";
import { getAlgo, putAlgo } from "./algorithm-steps";
import { TAlgoComponent, TAlgoStep } from "./algorithm.type";

type TAlgoList = TAlgoComponent & {
  algoSteps: TAlgoStep[];
  algoStatus: TAlgoStoreState["algoState"]["status"];
  level?: number;
  map: TMapState["map"];
  nodeKey: TSvgNodeItem["key"] | null;
};

const getStepId = (activeStep: number) =>
  `step-${activeStep}`.replace(/\./g, "-");

export const Algorithm = () => {
  const { activeAlgo, activeStep, algoStatus, map, nodeKey } = useAlgoStore(
    (state) => {
      return {
        activeStep: state.algoState.activeStep,
        activeAlgo: state.operationFormState.activeAlgo,
        algoStatus: state.algoState.status,
        map: state.mapState.map,
        nodeKey: state.diagramState.key,
        nodeValue: state.diagramState.value,
      };
    },
    isEqual
  );

  const {
    addNewNode,
    removeNodeBeforeEnd,
    removeTargetNode,
    updateValue,
    changeStep,
    updateMap,
    setDiagramOperation,
    setArrowState,
  } = useAlgoStore((state) => {
    // prettier-ignore
    const { addNewNode, removeNodeBeforeEnd, removeTargetNode, updateValue, setDiagramOperation, setArrowState, } = state.diagramActions;
    const { changeStep } = state.algoActions;
    const { updateMap } = state.mapActions;
    return {
      addNewNode,
      removeNodeBeforeEnd,
      removeTargetNode,
      updateValue,
      changeStep,
      updateMap,
      setDiagramOperation,
      setArrowState,
    };
  }, shallow);

  const olRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (activeAlgo === "put") {
      switch (activeStep) {
        case 1: {
          setTimeout(() => changeStep(map.get(nodeKey!) ? 1.1 : 2), 1000);
          break;
        }
        case 1.1:
          setDiagramOperation(DIAGRAM_OPERATIONS.UPDATE_VALUE);
          updateValue();
          setTimeout(() => changeStep(1.2), 1000);
          break;
        case 1.2:
          setDiagramOperation(DIAGRAM_OPERATIONS.REMOVE_TARGET_NODE);
          setArrowState(false);
          setTimeout(() => {
            removeTargetNode();
            setTimeout(() => {
              setArrowState(false);
              setDiagramOperation(DIAGRAM_OPERATIONS.ADD);
              addNewNode();
              changeStep(1.3);
            }, 1000);
          }, 1000);
          break;
        case 1.3:
          updateMap();
          setTimeout(() => changeStep(0), 1000);
          break;
        case 2:
          setTimeout(() => changeStep(map.size < CACHE_SIZE ? 2.1 : 3), 1000);
          break;
        case 2.1:
          setArrowState(false);
          setDiagramOperation(DIAGRAM_OPERATIONS.ADD);
          setTimeout(() => {
            addNewNode();
            changeStep(2.2);
          }, 1000);
          break;
        case 2.2:
          updateMap();
          setTimeout(() => changeStep(0), 1000);
          break;
        case 3:
          setTimeout(() => changeStep(3.1), 1000);
          break;
        case 3.1:
          setDiagramOperation(DIAGRAM_OPERATIONS.REMOVE);
          setArrowState(false);
          setTimeout(() => {
            removeNodeBeforeEnd();
            changeStep(3.2);
          }, 1000);
          break;
        case 3.2:
          updateMap();
          setTimeout(() => changeStep(3.3), 1000);
          break;
        case 3.3:
          setDiagramOperation(DIAGRAM_OPERATIONS.ADD);
          setArrowState(false);
          addNewNode();
          setTimeout(() => {
            changeStep(3.4);
          }, 1000);
          break;
        case 3.4:
          updateMap();
          setTimeout(() => changeStep(0), 1000);
          break;
        default:
          break;
      }
    } else {
      switch (activeStep) {
        case 1:
          setTimeout(() => changeStep(map.get(nodeKey!) ? 1.1 : 2), 1000);
          break;
        case 1.1:
          setDiagramOperation(DIAGRAM_OPERATIONS.REMOVE_TARGET_NODE);
          setArrowState(false);
          setTimeout(() => {
            removeTargetNode();
            setTimeout(() => {
              setArrowState(false);
              setDiagramOperation(DIAGRAM_OPERATIONS.ADD);
              addNewNode();
              changeStep(1.2);
            }, 1000);
          }, 1000);
          break;
        case 1.2:
          updateMap();
          setTimeout(() => changeStep(1.3), 1000);
          break;
        case 1.3:
          setTimeout(() => changeStep(0), 1000);
          break;
        case 2:
          setTimeout(() => changeStep(2.1), 1000);
          break;
        case 2.1:
          setTimeout(() => changeStep(0), 1000);
          break;
        default:
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeAlgo, activeStep]);

  useEffect(() => {
    if (olRef.current) {
      document.querySelector("html")!.scrollTo(0, 0);
      if (activeStep === 0) {
        olRef.current.scrollTo(0, 0);
      } else {
        const targetLi = olRef.current.querySelector(
          "#" + getStepId(activeStep)
        );
        if (targetLi) {
          const top = targetLi.getBoundingClientRect().top;
          if (activeStep === 1) {
            setTimeout(() => {
              olRef.current!.scrollTo(0, top);
            }, 1000);
          } else {
            olRef.current!.scrollTo(0, top);
          }
        }
      }
    }
  }, [activeStep]);

  return (
    <>
      <CardHeader>Algorithm</CardHeader>
      <ol
        ref={olRef}
        className="pb-2 max-h-[calc(100vh-12px-41px-8px-1px-8px-100px-12px-8px-16px-8px-33px)] overflow-auto scroll-smooth"
      >
        <AlgoList
          activeStep={activeStep}
          activeAlgo="put"
          algoStatus={algoStatus}
          algoSteps={activeAlgo === "put" ? putAlgo : getAlgo}
          map={map}
          nodeKey={nodeKey}
        />
      </ol>
    </>
  );
};

const AlgoList: FC<TAlgoList> = ({
  algoSteps,
  algoStatus,
  activeStep,
  activeAlgo,
  map,
  nodeKey,
  level = 1,
}) => {
  return (
    <>
      {algoSteps.map((step) => (
        <Fragment key={step.id}>
          <li
            id={getStepId(step.id)}
            className={`list-inside text-sm transition-colors duration-500 ${
              level === 1
                ? "font-medium py-2 list-[square]"
                : "py-1 list-[circle]"
            } ${activeStep === step.id ? "bg-slate-100" : ""}`}
            style={{
              paddingLeft: `${level}rem`,
              paddingRight: `${level}rem`,
            }}
          >
            <span>{step.text}</span>
            {step.isStepDecisionMaker && step.id === activeStep ? (
              <span className="ml-3 opacity-0 animate-fade-in">
                {isStepConditionFulfilled(activeAlgo, step.id, nodeKey, map)
                  ? "✅"
                  : "❌"}
              </span>
            ) : null}
          </li>
          {step.subSteps?.length ? (
            <AlgoList
              activeStep={activeStep}
              algoSteps={step.subSteps}
              algoStatus={algoStatus}
              level={level + 1}
              activeAlgo={activeAlgo}
              map={map}
              nodeKey={nodeKey}
            />
          ) : null}
        </Fragment>
      ))}
    </>
  );
};
