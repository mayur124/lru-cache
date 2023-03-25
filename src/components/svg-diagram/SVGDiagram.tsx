import { useSpringRef, useTransition, animated } from "@react-spring/web";
import { FC, useEffect, useRef, useState } from "react";
import { TNode } from "../../types";
import { SVG_CONSTANTS as C } from "./constants";
import { Arrows, EndNode, HeadNode, Rectangle } from "./Shapes";
import { OPERATIONS, TSvgDiagram, TSvgNodeItem } from "./svg-diagram.type";

const nodeList: TSvgNodeItem[] = [
  { isHeadNode: true, value: "H", address: "H", x: 70 },
  { isEndNode: true, value: "E", address: "E", x: 190 },
];

export const SVGDiagram: FC<TSvgDiagram> = ({ node }) => {
  const [zoomX, setZoomX] = useState((C.RECTANGLE_SIZE + C.ARROW_WIDTH) * 2);
  const [zoomY, setZoomY] = useState(80);
  const [svgNodes, setSvgNodes] = useState<TSvgNodeItem[]>(nodeList);
  const [showArrows, setShowArrows] = useState(true);
  const [operation, setOperation] = useState<OPERATIONS | null>(null);
  const newValueRef = useRef(10);

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

  const addNewNode = (node: TNode) => {
    setSvgNodes((nodes) => {
      const newNode = {
        value: node.value,
        address: node.address,
        x: 0,
      };
      nodes = [nodes[0], newNode, ...nodes.slice(1)];
      // prettier-ignore
      for (let index = 1; index < nodes.length; index++) {
        nodes[index].x = nodes[index - 1].x + C.RECTANGLE_SIZE + C.ARROW_WIDTH;
      }
      return nodes;
    });
  };

  const removeNode = () => {
    setSvgNodes((nodes) => {
      nodes.splice(nodes.length - 2, 1);
      // prettier-ignore
      for (let index = 1; index < nodes.length; index++) {
        nodes[index].x = nodes[index - 1].x + C.RECTANGLE_SIZE + C.ARROW_WIDTH;
      }
      return [...nodes];
    });
  };

  useEffect(() => {
    setZoomX(
      svgNodes.reduce(
        (prev, curr) =>
          !curr.isHeadNode || !curr.isEndNode
            ? (prev += C.RECTANGLE_SIZE + C.ARROW_WIDTH)
            : prev,
        0
      ) - 8
    );
    transRef.start();
  }, [svgNodes]);

  useEffect(() => {
    if (showArrows) {
      switch (operation) {
        case OPERATIONS.ADD:
          addNewNode({
            address: "0x00a",
            value: newValueRef.current++,
            prev: { address: "", value: 0, prev: null, next: null },
            next: { address: "", value: 1, prev: null, next: null },
          });
          break;
        case OPERATIONS.REMOVE:
          removeNode();
          break;
        case OPERATIONS.SWAP:
          break;
      }
    }
  }, [showArrows, operation]);

  return (
    <div className="h-[calc(300/16*1rem)] my-2">
      {/* <svg viewBox={`42 0 ${zoomX} ${zoomY}`} className="h-full w-full m-auto"> */}
      <svg viewBox={`42 0 ${zoomX} 150`} className="h-full w-full m-auto">
        <>
          {transitions((style, node, _) => {
            return node.isHeadNode ? (
              <animated.g style={style}>
                <HeadNode />
              </animated.g>
            ) : node.isEndNode ? (
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
                key={node.value}
                // prettier-ignore
                showArrows={
                  (index === 1 && operation === OPERATIONS.ADD) ||
                  (
                    (index === svgNodes.length - 2 || index === svgNodes.length - 1) && 
                    operation === OPERATIONS.REMOVE
                  ) ? showArrows
                    : true
                }
                xPostion={index * (C.RECTANGLE_SIZE + C.ARROW_WIDTH)}
                onArrowHidden={() => setShowArrows(true)}
              />
            )
          )}
        </>
      </svg>
      <button
        type="button"
        className="mt-4"
        onClick={() => {
          setShowArrows(false);
          setOperation(OPERATIONS.ADD);
        }}
      >
        Add Node
      </button>
      <button
        type="button"
        className="mt-4 ml-2"
        onClick={() => {
          setShowArrows(false);
          setOperation(OPERATIONS.REMOVE);
        }}
      >
        Remove Node
      </button>
    </div>
  );
};
