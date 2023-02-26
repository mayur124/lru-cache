import { FC } from "react";
import { COLORS } from "./colors";
import {
  TConnector,
  TRectangle,
  TSvgDiagram,
  TSvgNode,
  TXPosition,
} from "./svg-diagram.type";

const RECTANGLE_SIZE = 50,
  ARROW_WIDTH = 70,
  CONNECTOR_SIZE = 3,
  TOP_CONNECTOR_Y = 15,
  BOTTOM_CONNECTOR_Y = 35,
  ANCHOR_BUFFER = 8,
  TOP_ANCHOR_Y = TOP_CONNECTOR_Y + ANCHOR_BUFFER,
  BOTTOM_ANCHOR_Y = BOTTOM_CONNECTOR_Y + ANCHOR_BUFFER;

export const SVGDiagram: FC<TSvgDiagram> = ({ nodes }) => {
  const zoomX =
    nodes.reduce(
      (prev, curr) =>
        curr.next != null || curr.prev != null
          ? (prev += RECTANGLE_SIZE + ARROW_WIDTH)
          : prev,
      0
    ) - 8;

  return (
    <div className="h-[calc(150/16*1rem)] my-2">
      {/* <svg viewBox={`42 0 ${zoomX} 80`} className="h-full m-auto"> */}
      <svg viewBox={`42 0 ${zoomX} 80`} className="h-full w-full m-auto">
        {nodes.map((node, index) => {
          return node.prev == null ? (
            <HeadNode key={node.address} />
          ) : node.next == null ? (
            <EndNode
              key={node.address}
              xPostion={index * (RECTANGLE_SIZE + ARROW_WIDTH)}
            />
          ) : (
            <Node
              key={node.address}
              address={node.address}
              value={node.value}
              xPostion={index * (RECTANGLE_SIZE + ARROW_WIDTH)}
            />
          );
        })}
      </svg>
    </div>
  );
};

const Rectangle: FC<TRectangle> = ({ xPostion, text, address }) => (
  <g>
    <rect
      width={RECTANGLE_SIZE}
      height={RECTANGLE_SIZE}
      rx={4}
      strokeWidth={0.5}
      stroke={COLORS.STROKE}
      fill={COLORS.RECTANGLE_BG}
      x={xPostion}
      y={1}
      style={{
        filter: `drop-shadow(0 2px 4px ${COLORS.RECTANGLE_SHADOW})`,
      }}
    />
    <Connector
      xPostion={xPostion + RECTANGLE_SIZE}
      yPosition={TOP_CONNECTOR_Y}
    />
    <Connector xPostion={xPostion} yPosition={BOTTOM_CONNECTOR_Y} />
    <text
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={20}
      fontWeight={400}
      x={xPostion + RECTANGLE_SIZE / 2}
      y={RECTANGLE_SIZE / 2}
    >
      {text}
    </text>
    {address ? (
      <text
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={8}
        fontFamily="consolas"
        x={xPostion + RECTANGLE_SIZE / 2}
        y={RECTANGLE_SIZE - 5}
      >
        {address}
      </text>
    ) : null}
  </g>
);

const NullText: FC<TXPosition> = ({ xPostion }) => (
  <text
    x={xPostion}
    y={RECTANGLE_SIZE + 30}
    fontSize={10}
    fontFamily="consolas"
  >
    null
  </text>
);

const HeadNode = () => (
  <g>
    <Rectangle text="H" xPostion={ARROW_WIDTH} />
    <path
      fill="none"
      stroke={COLORS.STROKE}
      d={`
        M45,${BOTTOM_CONNECTOR_Y + 30}
        C${ARROW_WIDTH},${BOTTOM_CONNECTOR_Y + 30} 45,${BOTTOM_CONNECTOR_Y}
        ${ARROW_WIDTH},${BOTTOM_CONNECTOR_Y}
      `}
    />
    <Connector xPostion={45} yPosition={BOTTOM_CONNECTOR_Y + 30} />
    <NullText xPostion={42} />
  </g>
);

const Arrows: FC<TXPosition> = ({ xPostion }) => (
  <>
    {/* NextArrow [top] */}
    <path
      fill="none"
      stroke={COLORS.STROKE}
      // prettier-ignore
      d={`
        M${xPostion},${TOP_CONNECTOR_Y}
        C${xPostion + 10},${TOP_ANCHOR_Y} ${xPostion + ARROW_WIDTH - 10},${TOP_ANCHOR_Y}
        ${xPostion + ARROW_WIDTH},${TOP_CONNECTOR_Y}
      `}
    />
    <polygon
      fill={COLORS.CONNECTOR_BG}
      stroke={COLORS.CONNECTOR_BG}
      points={`
        ${xPostion + ARROW_WIDTH - 1},${TOP_CONNECTOR_Y + 0.5} 
        ${xPostion + ARROW_WIDTH - 10},${TOP_CONNECTOR_Y} 
        ${xPostion + ARROW_WIDTH - 7.5},${TOP_CONNECTOR_Y + 7}
      `}
    />
    {/* PrevArrow [bottom] */}
    <path
      fill="none"
      stroke={COLORS.STROKE}
      // prettier-ignore
      d={`
        M${xPostion},${BOTTOM_CONNECTOR_Y}
        C${xPostion + 10},${BOTTOM_ANCHOR_Y} ${xPostion + ARROW_WIDTH - 10},${BOTTOM_ANCHOR_Y}
        ${xPostion + ARROW_WIDTH},${BOTTOM_CONNECTOR_Y}
      `}
    />
    <polygon
      fill={COLORS.CONNECTOR_BG}
      stroke={COLORS.CONNECTOR_BG}
      points={`
        ${xPostion + 1},${BOTTOM_CONNECTOR_Y + 0.5} 
        ${xPostion + 10},${BOTTOM_CONNECTOR_Y} 
        ${xPostion + 7.5},${BOTTOM_CONNECTOR_Y + 7}
      `}
    />
  </>
);

const Connector: FC<TConnector> = ({ xPostion, yPosition }) => (
  <circle
    height={CONNECTOR_SIZE}
    width={CONNECTOR_SIZE}
    r={CONNECTOR_SIZE}
    cx={xPostion}
    cy={yPosition}
    fill={COLORS.CONNECTOR_BG}
  />
);

const EndNode: FC<TXPosition> = ({ xPostion }) => (
  <g>
    <Arrows xPostion={xPostion} />
    <Rectangle text="E" xPostion={xPostion + ARROW_WIDTH} />
    <path
      fill="none"
      stroke={COLORS.STROKE}
      // prettier-ignore
      d={`
        M${xPostion + RECTANGLE_SIZE + ARROW_WIDTH},${TOP_CONNECTOR_Y}
        C${xPostion + RECTANGLE_SIZE + ARROW_WIDTH + 30},${TOP_CONNECTOR_Y} ${xPostion + RECTANGLE_SIZE + ARROW_WIDTH},${BOTTOM_CONNECTOR_Y + 30}
        ${xPostion + RECTANGLE_SIZE + ARROW_WIDTH + 30},${BOTTOM_CONNECTOR_Y + 30}
      `}
    />
    <Connector
      xPostion={xPostion + RECTANGLE_SIZE + ARROW_WIDTH + 30}
      yPosition={BOTTOM_CONNECTOR_Y + 30}
    />
    <NullText xPostion={xPostion + RECTANGLE_SIZE + ARROW_WIDTH + 12} />
  </g>
);

const Node: FC<TSvgNode> = ({ address, value, xPostion }) => (
  <g>
    <Rectangle
      text={value}
      address={address}
      xPostion={xPostion + ARROW_WIDTH}
    />
    <Arrows xPostion={xPostion} />
  </g>
);
