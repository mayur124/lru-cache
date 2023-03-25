import { animated, useSpring } from "@react-spring/web";
import { FC, useEffect, useState } from "react";
import { TNode } from "../../types";
import { SVG_CONSTANTS as C } from "./constants";
import { EndNode, HeadNode, NewNode, Node, Rectangle } from "./Shapes.old";
import { TSvgDiagram, TSvgNodeItem } from "./svg-diagram.type";

const nodeList: TSvgNodeItem[] = [
  { isHeadNode: true, value: "H", address: "H" },
  { isEndNode: true, value: "E", address: "E" },
];

export const SVGDiagram: FC<TSvgDiagram> = ({ node }) => {
  const [zoomX, setZoomX] = useState((C.RECTANGLE_SIZE + C.ARROW_WIDTH) * 2);
  const [zoomY, setZoomY] = useState(80);
  const [svgNodes, setSvgNodes] = useState<TSvgNodeItem[]>(nodeList);
  const [movePathDownAnimDone, setMovePathDownAnimDone] = useState(false);
  const [moveNodesAnimDone, setMoveNodesAnimDone] = useState(false);
  const [isNewNodeAdded, setNewNodeAdded] = useState(false);

  const addNewNode = (node: TNode) => {
    setSvgNodes((nodes) => {
      const nodesCopy = structuredClone(nodes);
      nodesCopy.splice(1, 0, {
        value: node.value,
        address: node.address,
      });
      return nodesCopy;
    });
    setNewNodeAdded(true);
  };

  useEffect(() => {
    if (node != null) {
      setNewNodeAdded(false);
    }
  }, [node]);

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
  }, [svgNodes]);

  return <></>

  // return (
  //   <div className="h-[calc(300/16*1rem)] my-2">
  //     {/* <svg viewBox={`42 0 ${zoomX} ${zoomY}`} className="h-full w-full m-auto"> */}
  //     <svg viewBox={`42 0 ${zoomX} 150`} className="h-full w-full m-auto">
  //       <>
  //         {svgNodes.map((node, index) => {
  //           return node.isHeadNode ? (
  //             <HeadNode key={node.value} />
  //           ) : node.isEndNode ? (
  //             <EndNode
  //               key={node.value}
  //               xPostion={index * (C.RECTANGLE_SIZE + C.ARROW_WIDTH)}
  //               hideArrowPointer={index === 1 && movePathDownAnimDone}
  //               shiftArrowToBottom={index === 1 && movePathDownAnimDone}
  //               shiftRightPathToRight={index === 1 && movePathDownAnimDone}
  //               onEndNodeMoveComplete={() => {
  //                 if (index === 1) {
  //                   setMoveNodesAnimDone(true);
  //                 }
  //               }}
  //             />
  //           ) : (
  //             <Node
  //               key={node.address}
  //               address={node.address!}
  //               value={node.value as number}
  //               xPostion={index * (C.RECTANGLE_SIZE + C.ARROW_WIDTH)}
  //             />
  //           );
  //         })}
  //       </>
  //     </svg>
  //   </div>
  // );
};
