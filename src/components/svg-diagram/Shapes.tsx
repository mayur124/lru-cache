import { animated, useSpring } from "@react-spring/web";
import { FC, useEffect } from "react";

import { COLORS, SVG_CONSTANTS as C } from "./constants";
import {
  TArrowAnimations,
  TConnector,
  TEndNode,
  TRectangle,
  TXPosition,
} from "./svg-diagram.type";

// prettier-ignore
const TOP_ANCHOR_Y = C.TOP_CONNECTOR_Y + C.ANCHOR_BUFFER,
  BOTTOM_ANCHOR_Y = C.BOTTOM_CONNECTOR_Y + C.ANCHOR_BUFFER;

export const Rectangle: FC<TRectangle> = ({
  text,
  address,
  xPostion,
  yPosition = 1,
}) => (
  <>
    <rect
      width={C.RECTANGLE_SIZE}
      height={C.RECTANGLE_SIZE}
      rx={4}
      strokeWidth={0.5}
      stroke={COLORS.STROKE}
      fill={COLORS.RECTANGLE_BG}
      x={xPostion}
      y={yPosition}
      style={{
        filter: `drop-shadow(0 2px 4px ${COLORS.RECTANGLE_SHADOW})`,
      }}
    />
    <Connector
      xPostion={xPostion + C.RECTANGLE_SIZE}
      yPosition={yPosition + C.TOP_CONNECTOR_Y}
    />
    <Connector
      xPostion={xPostion}
      yPosition={yPosition + C.BOTTOM_CONNECTOR_Y}
    />
    <text
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={20}
      fontWeight={400}
      x={xPostion + C.RECTANGLE_SIZE / 2}
      y={yPosition + C.RECTANGLE_SIZE / 2}
    >
      {text}
    </text>
    {address ? (
      <text
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={8}
        fontFamily="consolas"
        x={xPostion + C.RECTANGLE_SIZE / 2}
        y={yPosition + (C.RECTANGLE_SIZE - 5)}
      >
        {address}
      </text>
    ) : null}
  </>
);

const NullText: FC<TXPosition> = ({ xPostion }) => (
  <text
    x={xPostion}
    y={C.RECTANGLE_SIZE + 30}
    fontSize={10}
    fontFamily="consolas"
  >
    null
  </text>
);

export const Arrows: FC<TXPosition & Partial<TArrowAnimations>> = ({
  xPostion,
  showArrows,
  onArrowHidden,
}) => {
  const [arrowStyle, arrowApi] = useSpring(() => ({ y: 0, pOpacity: 0 }));

  useEffect(() => {
    if (showArrows) {
      arrowApi.start({
        y: 1,
        delay: 500,
        onResolve: () => {
          arrowApi.start({
            pOpacity: 1,
          });
        },
      });
    } else {
      arrowApi.start({
        pOpacity: 0,
        onResolve: () => {
          arrowApi.start({
            y: 0,
            onResolve: onArrowHidden,
          });
        },
      });
    }
  }, [showArrows]);

  return (
    <g>
      {/* NextArrow [top] */}
      <animated.path
        fill="none"
        stroke={COLORS.STROKE}
        // prettier-ignore
        d={arrowStyle.y.to({
          range: [0, 1],
          output: [
            // collapse
            `
              M${xPostion},${C.TOP_CONNECTOR_Y}
              C${xPostion},${C.TOP_CONNECTOR_Y} ${xPostion},${C.TOP_CONNECTOR_Y}
              ${xPostion},${C.TOP_CONNECTOR_Y}
            `,
            // expand
            `
              M${xPostion},${C.TOP_CONNECTOR_Y}
              C${xPostion + 10},${TOP_ANCHOR_Y} ${xPostion + C.ARROW_WIDTH - 10},${TOP_ANCHOR_Y}
              ${xPostion + C.ARROW_WIDTH},${C.TOP_CONNECTOR_Y}
            `,
          ],
        })}
      />
      <animated.polygon
        style={{
          opacity: arrowStyle.pOpacity,
        }}
        fill={COLORS.CONNECTOR_BG}
        stroke={COLORS.CONNECTOR_BG}
        points={`
          ${xPostion + C.ARROW_WIDTH - 1},${C.TOP_CONNECTOR_Y + 0.5} 
          ${xPostion + C.ARROW_WIDTH - 10},${C.TOP_CONNECTOR_Y} 
          ${xPostion + C.ARROW_WIDTH - 7.5},${C.TOP_CONNECTOR_Y + 7}
        `}
      />
      {/* PrevArrow [bottom] */}
      <animated.path
        fill="none"
        stroke={COLORS.STROKE}
        // prettier-ignore
        d={arrowStyle.y.to({
          range: [0, 1],
          output: [
            // collapse
            `
              M${xPostion + C.ARROW_WIDTH},${C.BOTTOM_CONNECTOR_Y}
              C${xPostion + C.ARROW_WIDTH},${C.BOTTOM_CONNECTOR_Y} ${xPostion + C.ARROW_WIDTH},${C.BOTTOM_CONNECTOR_Y}
              ${xPostion + C.ARROW_WIDTH},${C.BOTTOM_CONNECTOR_Y}
            `,
            // expand
            `
              M${xPostion},${C.BOTTOM_CONNECTOR_Y}
              C${xPostion + 10},${BOTTOM_ANCHOR_Y} ${xPostion + C.ARROW_WIDTH - 10},${BOTTOM_ANCHOR_Y}
              ${xPostion + C.ARROW_WIDTH},${C.BOTTOM_CONNECTOR_Y}
            `,
          ]
        })}
      />
      <animated.polygon
        style={{
          opacity: arrowStyle.pOpacity,
        }}
        fill={COLORS.CONNECTOR_BG}
        stroke={COLORS.CONNECTOR_BG}
        points={`
          ${xPostion + 1},${C.BOTTOM_CONNECTOR_Y + 0.5} 
          ${xPostion + 10},${C.BOTTOM_CONNECTOR_Y} 
          ${xPostion + 7.5},${C.BOTTOM_CONNECTOR_Y + 7}
        `}
      />
    </g>
  );
};

const Connector: FC<TConnector> = ({ xPostion, yPosition }) => (
  <circle
    height={C.CONNECTOR_SIZE}
    width={C.CONNECTOR_SIZE}
    r={C.CONNECTOR_SIZE}
    cx={xPostion}
    cy={yPosition}
    fill={COLORS.CONNECTOR_BG}
  />
);

export const HeadNode: FC = () => (
  <>
    <Rectangle text="H" xPostion={C.ARROW_WIDTH} />
    <path
      fill="none"
      stroke={COLORS.STROKE}
      // prettier-ignore
      d={`
        M45,${C.BOTTOM_CONNECTOR_Y + 30}
        C${C.ARROW_WIDTH},${C.BOTTOM_CONNECTOR_Y + 30} 45,${C.BOTTOM_CONNECTOR_Y}
        ${C.ARROW_WIDTH},${C.BOTTOM_CONNECTOR_Y}
      `}
    />
    <Connector xPostion={45} yPosition={C.BOTTOM_CONNECTOR_Y + 30} />
    <NullText xPostion={42} />
  </>
);

export const EndNode: FC<TEndNode> = ({ xPostion }) => {
  return (
    <>
      <Rectangle text="E" xPostion={xPostion} />
      <path
        fill="none"
        stroke={COLORS.STROKE}
        // prettier-ignore
        d={`
          M${xPostion + C.RECTANGLE_SIZE},${C.TOP_CONNECTOR_Y}
          C${xPostion + C.RECTANGLE_SIZE + 30},${C.TOP_CONNECTOR_Y} ${xPostion + C.RECTANGLE_SIZE},${C.BOTTOM_CONNECTOR_Y + 30}
          ${xPostion + C.RECTANGLE_SIZE + 30},${C.BOTTOM_CONNECTOR_Y + 30}
        `}
      />
      <Connector
        xPostion={xPostion + C.RECTANGLE_SIZE + 30}
        yPosition={C.BOTTOM_CONNECTOR_Y + 30}
      />
      <NullText xPostion={xPostion + C.RECTANGLE_SIZE + 12} />
    </>
  );
};
