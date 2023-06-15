import { FC, Fragment, useEffect } from "react";
import { shallow } from "zustand/shallow";
import { CACHE_SIZE } from "../../helpers/constants";
import { propCompareFunction } from "../../helpers/utils";
import { useAlgoStore } from "../../store/algo-store";
import { TMapState } from "../../store/algo-store.type";
import { isStepConditionFulfilled } from "../../store/helper";
import { CardHeader } from "../common";
import {
  DIAGRAM_OPERATIONS,
  TSvgNodeItem,
} from "../svg-diagram/svg-diagram.type";
import { getAlgo, putAlgo } from "./algorithm-steps";
import { TAlgoComponent, TAlgoStep } from "./algorithm.type";

type TAlgoList = Pick<TAlgoComponent, "activeStep" | "activeAlgo"> & {
  algoSteps: TAlgoStep[];
  level?: number;
  map: TMapState["map"];
  nodeKey: TSvgNodeItem["key"] | null;
};

export const Algorithm = () => {
  const { activeAlgo, activeStep, map, nodeKey } = useAlgoStore((state) => {
    return {
      activeStep: state.algoState.activeStep,
      activeAlgo: state.operationFormState.activeAlgo,
      map: state.mapState.map,
      nodeKey: state.diagramState.key,
      nodeValue: state.diagramState.value,
    };
  }, propCompareFunction);

  const {
    addNewNode,
    removeNode,
    moveNodeAfterHead,
    updateValue,
    changeStep,
    updateMap,
    setDiagramOperation,
    setArrowState,
  } = useAlgoStore((state) => {
    const {
      addNewNode,
      removeNode,
      moveNodeAfterHead,
      updateValue,
      setDiagramOperation,
      setArrowState,
    } = state.diagramActions;
    const { changeStep } = state.algoActions;
    const { updateMap } = state.mapActions;
    return {
      addNewNode,
      removeNode,
      moveNodeAfterHead,
      updateValue,
      changeStep,
      updateMap,
      setDiagramOperation,
      setArrowState,
    };
  }, shallow);

  useEffect(() => {
    if (activeAlgo === "put") {
      switch (activeStep) {
        case 1: {
          setTimeout(() => {
            changeStep(map.get(nodeKey!) ? 1.1 : 2);
          }, 1000);
          break;
        }
        case 1.1:
          setDiagramOperation(DIAGRAM_OPERATIONS.UPDATE_VALUE);
          setArrowState(false);
          updateValue();
          setTimeout(() => changeStep(1.2), 1000);
          break;
        case 1.2:
          setDiagramOperation(DIAGRAM_OPERATIONS.MOVE_AFTER_HEAD);
          setArrowState(false);
          moveNodeAfterHead();
          setTimeout(() => changeStep(1.3), 2000);
          break;
        case 1.3:
          updateMap();
          setTimeout(() => changeStep(0), 1000);
          break;
        case 2:
          setTimeout(() => {
            changeStep(map.size < CACHE_SIZE ? 2.1 : 3);
          }, 1000);
          break;
        case 2.1:
          setDiagramOperation(DIAGRAM_OPERATIONS.ADD);
          setArrowState(false);
          addNewNode();
          setTimeout(() => changeStep(2.2), 1000);
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
          removeNode();
          setTimeout(() => changeStep(3.2), 1000);
          break;
        case 3.2:
          updateMap();
          setTimeout(() => changeStep(3.3), 1000);
          break;
        case 3.3:
          setDiagramOperation(DIAGRAM_OPERATIONS.ADD);
          setArrowState(false);
          addNewNode();
          setTimeout(() => changeStep(3.4), 1000);
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
          break;
        case 1.1:
          break;
        case 1.2:
          break;
        case 2:
          break;
        case 2.1:
          break;
        default:
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeAlgo, activeStep]);

  return (
    <>
      <CardHeader>Algorithm</CardHeader>
      <ol className="pb-2 max-h-[max(100vh-16.875rem-8px,390px)] overflow-auto">
        <AlgoList
          activeStep={activeStep}
          activeAlgo="put"
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
