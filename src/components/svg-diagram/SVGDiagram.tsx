import { animated, useSpringRef, useTransition } from "@react-spring/web";
import isEqual from "lodash.isequal";
import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import { SVG_CONSTANTS as C } from "../../helpers/constants";
import { useAlgoStore } from "../../store/algo-store";
import { Arrows, EndNode, HeadNode, Rectangle } from "./Shapes";
import { DIAGRAM_OPERATIONS } from "./svg-diagram.type";

export const SVGDiagram = () => {
  const [zoomX, setZoomX] = useState((C.RECTANGLE_SIZE + C.ARROW_WIDTH) * 2);

  const { operation, showArrows, svgNodes, targetNodeIndex } = useAlgoStore(
    (state) => {
      const { diagramState } = state;
      return {
        operation: diagramState.diagramOperation,
        key: diagramState.key,
        value: diagramState.value,
        address: diagramState.address,
        showArrows: diagramState.showArrows,
        svgNodes: diagramState.nodeList,
        targetNodeIndex: diagramState.moveNodeMeta?.targetIndex,
      };
    },
    isEqual
  );

  const { setArrowState } = useAlgoStore((state) => {
    return {
      setArrowState: state.diagramActions.setArrowState,
    };
  }, shallow);

  const transRef = useSpringRef();
  const transitions = useTransition(svgNodes, {
    ref: transRef,
    from: { y: C.RECTANGLE_SIZE + C.RECTANGLE_SIZE / 4, opacity: 0 },
    enter: {
      y: 0,
      opacity: 1,
    },
    leave: { y: C.RECTANGLE_SIZE + C.RECTANGLE_SIZE / 4, opacity: 0 },
    config: {
      mass: 0.25,
      tension: 100,
      friction: 15,
    },
  });

  useEffect(() => {
    setZoomX(
      svgNodes.reduce(
        (prev, curr) =>
          !curr.isHeadNode || !curr.isTailNode
            ? (prev += C.RECTANGLE_SIZE + C.ARROW_WIDTH)
            : prev,
        0
      ) - 8
    );
    transRef.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [svgNodes]);

  return (
    <div className="h-[calc(100/16*1rem)] mt-3 mb-2">
      <svg viewBox={`42 0 ${zoomX} 80`} className="h-full w-full m-auto">
        <>
          {transitions((style, node, _) => {
            return node.isHeadNode ? (
              <animated.g style={style}>
                <HeadNode />
              </animated.g>
            ) : node.isTailNode ? (
              <animated.g style={style}>
                <EndNode xPostion={node.x} />
              </animated.g>
            ) : (
              <animated.g style={style}>
                <Rectangle
                  address={node.address}
                  text={node.value}
                  xPostion={node.x}
                />
              </animated.g>
            );
          })}
          {svgNodes.map((node, index) =>
            node.isHeadNode ? null : (
              <Arrows
                key={node.id}
                // prettier-ignore
                showArrows={
                  (operation === DIAGRAM_OPERATIONS.ADD && index === 1) ||
                  (
                    operation === DIAGRAM_OPERATIONS.REMOVE &&
                    (index === svgNodes.length - 1 || index === svgNodes.length - 2)
                  ) ||
                  (
                    operation === DIAGRAM_OPERATIONS.REMOVE_TARGET_NODE &&
                    (index === targetNodeIndex! + 1 || index === targetNodeIndex)
                  )
                  ? showArrows : true
                }
                xPostion={index * (C.RECTANGLE_SIZE + C.ARROW_WIDTH)}
                onArrowHidden={() => setArrowState(true)}
              />
            )
          )}
        </>
      </svg>
    </div>
  );
};
