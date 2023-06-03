import { FC, Fragment } from "react";
import { CardHeader } from "../common";
import { TAlgoComponent, TAlgoStep } from "./algorithm.type";
import { putAlgo } from "./algorithm-steps";

type TAlgoList = Pick<TAlgoComponent, "activeStep" | "activeAlgo"> & {
  algoSteps: TAlgoStep[];
  level?: number;
};

export const Algorithm = () => {
  return (
    <>
      <CardHeader>Algorithm</CardHeader>
      <ol className="pb-2 max-h-[max(100vh-16.875rem-8px,390px)] overflow-auto">
        <AlgoList
          activeStep={1}
          activeAlgo="put"
          // algoSteps={algo === "put" ? putAlgo : getAlgo}
          algoSteps={putAlgo}
        />
      </ol>
    </>
  );
};

const AlgoList: FC<TAlgoList> = ({
  algoSteps,
  activeStep,
  activeAlgo,
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
            {/* {step.isStepDecisionMaker && step.id === activeStep ? (
              <span className="ml-3">
                {isStepConditionFulfilled(activeAlgo, step.id, stepKey, map)
                  ? "✅"
                  : "❌"}
              </span>
            ) : null} */}
          </li>
          {step.subSteps?.length ? (
            <AlgoList
              activeStep={activeStep}
              algoSteps={step.subSteps}
              level={level + 1}
              activeAlgo={activeAlgo}
            />
          ) : null}
        </Fragment>
      ))}
    </>
  );
};
