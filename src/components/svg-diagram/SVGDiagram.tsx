import { useSpringRef, useTransition, animated } from "@react-spring/web";
import { FC, useEffect, useRef, useState } from "react";
import { SVG_CONSTANTS as C } from "./constants";
import { Arrows, EndNode, HeadNode, Rectangle } from "./Shapes";
import { OPERATIONS, TSvgDiagram, TSvgNodeItem } from "./svg-diagram.type";

const nodeList: TSvgNodeItem[] = [
  { isHeadNode: true, value: "H", address: "H", x: 70 },
  { isEndNode: true, value: "E", address: "E", x: 190 },
];

export const SVGDiagram: FC<TSvgDiagram> = ({ node }) => {
  const [zoomX, setZoomX] = useState((C.RECTANGLE_SIZE + C.ARROW_WIDTH) * 2);
  const [svgNodes, setSvgNodes] = useState<TSvgNodeItem[]>(nodeList);
  const [showArrows, setShowArrows] = useState(true);
  const operation = useRef<OPERATIONS | null>(null);
  const targetValue = useRef<number | null>(null);
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

  const addNewNode = (node: TSvgNodeItem) => {
    setSvgNodes((nodes) => {
      nodes = [nodes[0], node, ...nodes.slice(1)];
      for (let index = 1; index < nodes.length; index++) {
        nodes[index].x = nodes[index - 1].x + C.RECTANGLE_SIZE + C.ARROW_WIDTH;
      }
      return nodes;
    });
  };

  const removeNode = () => {
    setSvgNodes((nodes) => {
      nodes.splice(nodes.length - 2, 1);
      for (let index = 1; index < nodes.length; index++) {
        nodes[index].x = nodes[index - 1].x + C.RECTANGLE_SIZE + C.ARROW_WIDTH;
      }
      return [...nodes];
    });
  };

  const swapNode = () => {
    setSvgNodes((nodes) => {
      const targetNodeIndex = nodes.findIndex(
        (node) => +node.value === targetValue.current
      );
      const tempNode = { ...nodes[1] };
      nodes[1] = { ...nodes[targetNodeIndex] };
      nodes[targetNodeIndex] = tempNode;
      for (let index = 1; index < nodes.length; index++) {
        nodes[index].x = nodes[index - 1].x + C.RECTANGLE_SIZE + C.ARROW_WIDTH;
      }
      return [...nodes];
    });
  };

  const replaceValue = () => {
    setSvgNodes((nodes) => {
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
      switch (operation.current) {
        case OPERATIONS.ADD:
          addNewNode({
            address: "0x00a",
            value: newValueRef.current++,
            x: 0,
          });
          break;
        case OPERATIONS.REMOVE:
          removeNode();
          break;
        case OPERATIONS.SWAP:
          swapNode();
          break;
        case OPERATIONS.REPLACE:
          replaceValue();
          break;
      }
    }
  }, [showArrows]);

  return (
    <div>
      <p className="text-center font-medium">
        <span className="relative cursor-help after:absolute after:border-[2px] after:border-b-0 after:left-0 after:right-0 after:-bottom-1 after:border-blue-800 after:border-dashed before:content-['Capacity_of_Caching_Items'] before:absolute before:opacity-0 hover:before:opacity-100 before:rounded before:font-normal before:whitespace-nowrap before:mt-2 before:px-2 before:py-0.5 before:bg-slate-100 before:border before:border-slate-300 before:left-0 before:top-full before:text-xs before:h-6 before:transition-opacity before:tracking-wide before:shadow-md">Cache Size</span>: 2
      </p>
      <div className="h-[calc(150/16*1rem)] mt-3 mb-2">
        <svg viewBox={`42 0 ${zoomX} 100`} className="h-full w-full m-auto">
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
                    (operation.current === OPERATIONS.ADD && index === 1) ||
                    (
                      operation.current === OPERATIONS.REMOVE &&
                      (index === svgNodes.length - 2 || index === svgNodes.length - 1)
                    ) ||
                    (
                      operation.current === OPERATIONS.SWAP &&
                      (
                        node.value === targetValue.current || 
                        index === 1 || index === 2 || index === (svgNodes.findIndex(n => n.value === targetValue.current) + 1)
                      )
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
      </div>
      {/* <button
        type="button"
        className="mt-4"
        onClick={() => {
          operation.current = OPERATIONS.ADD;
          setShowArrows(false);
        }}
      >
        Add Node
      </button>
      <button
        type="button"
        className="mt-4 ml-2"
        onClick={() => {
          operation.current = OPERATIONS.REMOVE;
          setShowArrows(false);
        }}
      >
        Remove Node
      </button>
      <button
        type="button"
        className="mt-4 ml-2"
        onClick={() => {
          operation.current = OPERATIONS.SWAP;
          targetValue.current = 11;
          setShowArrows(false);
        }}
      >
        Swap Node
      </button> */}
    </div>
  );
};
