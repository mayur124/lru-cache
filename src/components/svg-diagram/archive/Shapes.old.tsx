import { animated, useSpring } from "@react-spring/web";
import { FC, useEffect } from "react";

import { COLORS, SVG_CONSTANTS as C } from "../constants";
import {
  TArrowAnimations,
  TConnector,
  TEndNode,
  TNewNode,
  TRectangle,
  TSvgNode,
  TXPosition,
} from "./svg-diagram.old.type";

// prettier-ignore
const TOP_ANCHOR_Y = C.TOP_CONNECTOR_Y + C.ANCHOR_BUFFER,
  BOTTOM_ANCHOR_Y = C.BOTTOM_CONNECTOR_Y + C.ANCHOR_BUFFER;

export const Rectangle: FC<TRectangle> = ({
  text,
  address,
  xPostion,
  yPosition = 1,
}) => (
  <g>
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
  </g>
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

const Arrows: FC<TXPosition & Partial<TArrowAnimations>> = ({
  xPostion,
  hideArrowPointer,
  shiftArrowToBottom,
  shiftRightPathToRight,
}) => {
  const [arrowMovStyle, arrowMovApi] = useSpring(() => ({
    y: 0,
    delay: 550 * 2,
  }));

  const [arrowPtStyle, api] = useSpring(() => ({
    opacity: 1,
    delay: 550,
    config: {
      duration: 300,
    },
  }));

  useEffect(() => {
    if (shiftArrowToBottom) {
      arrowMovApi.start({
        y: 1,
        delay: 550 * 2,
      });
    }
  }, [shiftArrowToBottom]);

  useEffect(() => {
    if (shiftRightPathToRight) {
      arrowMovApi.start({
        y: 2,
        delay: 550 * 3,
        config: {
          duration: 500,
        },
        onResolve: () => {
          arrowMovApi.start({
            y: 3,
            config: {
              duration: 300,
            },
            onResolve: () => {
              arrowMovApi.start({
                y: 4,
                delay: 500,
                config: {
                  duration: 400,
                },
              });
            },
          });
        },
      });
    }
  }, [shiftRightPathToRight]);

  useEffect(() => {
    if (hideArrowPointer) {
      api.start({
        opacity: 0,
        delay: 550,
        config: {
          duration: 350,
        },
      });
    }
  }, [hideArrowPointer]);

  return (
    <>
      {/* NextArrow [top] */}
      <animated.path
        fill="none"
        stroke={COLORS.STROKE}
        // prettier-ignore
        d={arrowMovStyle.y.to({
          range: [0, 1, 2, 3, 4],
          output: [
            `
              M${xPostion},${C.TOP_CONNECTOR_Y}
              C${xPostion + 10},${TOP_ANCHOR_Y} ${xPostion + C.ARROW_WIDTH - 10},${TOP_ANCHOR_Y}
              ${xPostion + C.ARROW_WIDTH},${C.TOP_CONNECTOR_Y}
            `,
            // path moved down
            `
              M${xPostion},${C.TOP_CONNECTOR_Y}
              C${xPostion + 40},${C.TOP_CONNECTOR_Y} ${(C.RECTANGLE_SIZE + C.ARROW_WIDTH + C.ARROW_WIDTH / 5) - 40},${C.RECTANGLE_SIZE + C.ARROW_WIDTH / 2 + C.TOP_CONNECTOR_Y}
              ${C.RECTANGLE_SIZE + C.ARROW_WIDTH + C.ARROW_WIDTH / 5},${C.RECTANGLE_SIZE + C.ARROW_WIDTH / 2 + C.TOP_CONNECTOR_Y}
            `,
            // end node moved to right - need to keep the path as it is
            `
              M${xPostion},${C.TOP_CONNECTOR_Y}
              C${xPostion + 40},${C.TOP_CONNECTOR_Y} ${(C.RECTANGLE_SIZE + C.ARROW_WIDTH + C.ARROW_WIDTH / 5) - 40},${C.RECTANGLE_SIZE + C.ARROW_WIDTH / 2 + C.TOP_CONNECTOR_Y}
              ${C.RECTANGLE_SIZE + C.ARROW_WIDTH + C.ARROW_WIDTH / 5},${C.RECTANGLE_SIZE + C.ARROW_WIDTH / 2 + C.TOP_CONNECTOR_Y}
            `,
            // path moved right
            `
              M${xPostion},${C.TOP_CONNECTOR_Y}
              C${xPostion + 40},${C.TOP_CONNECTOR_Y} ${((C.RECTANGLE_SIZE * 2) + (C.CONNECTOR_SIZE * 2) + C.ARROW_WIDTH + C.ARROW_WIDTH / 5) - 40},${C.RECTANGLE_SIZE + C.ARROW_WIDTH / 2 + C.TOP_CONNECTOR_Y}
              ${(C.RECTANGLE_SIZE * 2) + (C.CONNECTOR_SIZE * 2) + C.ARROW_WIDTH + C.ARROW_WIDTH / 5},${C.RECTANGLE_SIZE + C.ARROW_WIDTH / 2 + C.TOP_CONNECTOR_Y}
            `,
            // move path up
            `
              M${xPostion},${C.TOP_CONNECTOR_Y}
              C${xPostion + 10},${TOP_ANCHOR_Y} ${xPostion + C.ARROW_WIDTH - 10},${TOP_ANCHOR_Y}
              ${xPostion + C.ARROW_WIDTH},${C.TOP_CONNECTOR_Y}
            `,
          ]
        })}
      />
      <animated.polygon
        style={arrowPtStyle}
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
        // stroke={COLORS.STROKE}
        stroke={"red"}
        // prettier-ignore
        d={arrowMovStyle.y.to({
          range: [0, 1, 2, 3, 4],
          output: [
            `
              M${xPostion},${C.BOTTOM_CONNECTOR_Y}
              C${xPostion + 10},${BOTTOM_ANCHOR_Y} ${xPostion + C.ARROW_WIDTH - 10},${BOTTOM_ANCHOR_Y}
              ${xPostion + C.ARROW_WIDTH},${C.BOTTOM_CONNECTOR_Y}
            `,
            // path moved down
            `
              M${C.RECTANGLE_SIZE * 2 + C.ARROW_WIDTH + C.ARROW_WIDTH / 5},${C.RECTANGLE_SIZE + C.ARROW_WIDTH / 2 + C.BOTTOM_CONNECTOR_Y}
              C${C.RECTANGLE_SIZE * 2 + C.ARROW_WIDTH + C.ARROW_WIDTH / 5 + 40},${C.RECTANGLE_SIZE + C.ARROW_WIDTH / 2 + C.BOTTOM_CONNECTOR_Y} ${xPostion + C.ARROW_WIDTH - 40},${BOTTOM_ANCHOR_Y}
              ${xPostion + C.ARROW_WIDTH},${C.BOTTOM_CONNECTOR_Y}
            `,
            // path stretched to right
            `
              M${C.RECTANGLE_SIZE * 2 + C.ARROW_WIDTH + C.ARROW_WIDTH / 5},${C.RECTANGLE_SIZE + C.ARROW_WIDTH / 2 + C.BOTTOM_CONNECTOR_Y}
              C${C.RECTANGLE_SIZE * 2 + C.ARROW_WIDTH + C.ARROW_WIDTH / 5 + 50},${C.RECTANGLE_SIZE + C.ARROW_WIDTH / 2 + C.BOTTOM_CONNECTOR_Y} ${xPostion + (C.RECTANGLE_SIZE * 2) + C.ARROW_WIDTH + (C.ARROW_WIDTH / 4) - 50},${BOTTOM_ANCHOR_Y}
              ${xPostion + (C.RECTANGLE_SIZE * 2) + C.ARROW_WIDTH + (C.ARROW_WIDTH / 4)},${C.BOTTOM_CONNECTOR_Y}
            `,
            // path moved to right
            `
              M${C.RECTANGLE_SIZE * 3 + C.ARROW_WIDTH + C.ARROW_WIDTH / 5},${C.RECTANGLE_SIZE + C.ARROW_WIDTH / 2 + C.BOTTOM_CONNECTOR_Y}
              C${C.RECTANGLE_SIZE * 3 + C.ARROW_WIDTH + C.ARROW_WIDTH / 5 + 40},${C.RECTANGLE_SIZE + C.ARROW_WIDTH / 2 + C.BOTTOM_CONNECTOR_Y} ${xPostion + (C.RECTANGLE_SIZE * 2) + C.ARROW_WIDTH + (C.ARROW_WIDTH / 4) - 40},${BOTTOM_ANCHOR_Y}
              ${xPostion + (C.RECTANGLE_SIZE * 2) + C.ARROW_WIDTH + (C.ARROW_WIDTH / 4)},${C.BOTTOM_CONNECTOR_Y}
            `,
            // path moved up
            `
              M${C.RECTANGLE_SIZE * 3 + C.ARROW_WIDTH + C.ARROW_WIDTH / 5},${C.BOTTOM_CONNECTOR_Y}
              C${C.RECTANGLE_SIZE * 3 + C.ARROW_WIDTH + C.ARROW_WIDTH / 5},${BOTTOM_ANCHOR_Y} ${xPostion + (C.RECTANGLE_SIZE * 2) + C.ARROW_WIDTH + (C.ARROW_WIDTH / 4)},${BOTTOM_ANCHOR_Y}
              ${xPostion + (C.RECTANGLE_SIZE * 2) + C.ARROW_WIDTH + (C.ARROW_WIDTH / 4)},${C.BOTTOM_CONNECTOR_Y}
            `,
          ]
        })}
      />
      <animated.polygon
        style={arrowPtStyle}
        fill={COLORS.CONNECTOR_BG}
        stroke={COLORS.CONNECTOR_BG}
        points={`
          ${xPostion + 1},${C.BOTTOM_CONNECTOR_Y + 0.5} 
          ${xPostion + 10},${C.BOTTOM_CONNECTOR_Y} 
          ${xPostion + 7.5},${C.BOTTOM_CONNECTOR_Y + 7}
        `}
      />
    </>
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
  <g>
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
  </g>
);

export const EndNode: FC<TEndNode> = ({
  xPostion,
  hideArrowPointer,
  shiftArrowToBottom,
  shiftRightPathToRight: shiftToRight,
  onEndNodeMoveComplete,
}) => {
  const [groupStyle, api] = useSpring(() => ({
    x: 0,
  }));

  useEffect(() => {
    if (shiftToRight) {
      api.start({
        x: C.RECTANGLE_SIZE + C.ARROW_WIDTH,
        delay: 550 * 3,
        config: {
          duration: 500,
        },
        onResolve: () => {
          api.start({
            x: 0,
            delay: 500 + 300 + 300,
          });
          onEndNodeMoveComplete();
        },
      });
    }
  }, [shiftToRight]);

  return (
    <g>
      <Arrows
        xPostion={xPostion}
        hideArrowPointer={hideArrowPointer}
        shiftArrowToBottom={shiftArrowToBottom}
        shiftRightPathToRight={shiftToRight}
      />
      <animated.g style={groupStyle}>
        <Rectangle text="E" xPostion={xPostion + C.ARROW_WIDTH} />
        <path
          fill="none"
          stroke={COLORS.STROKE}
          // prettier-ignore
          d={`
            M${xPostion + C.RECTANGLE_SIZE + C.ARROW_WIDTH},${C.TOP_CONNECTOR_Y}
            C${xPostion + C.RECTANGLE_SIZE + C.ARROW_WIDTH + 30},${C.TOP_CONNECTOR_Y} ${xPostion + C.RECTANGLE_SIZE + C.ARROW_WIDTH},${C.BOTTOM_CONNECTOR_Y + 30}
            ${xPostion + C.RECTANGLE_SIZE + C.ARROW_WIDTH + 30},${C.BOTTOM_CONNECTOR_Y + 30}
          `}
        />
        <Connector
          xPostion={xPostion + C.RECTANGLE_SIZE + C.ARROW_WIDTH + 30}
          yPosition={C.BOTTOM_CONNECTOR_Y + 30}
        />
        <NullText xPostion={xPostion + C.RECTANGLE_SIZE + C.ARROW_WIDTH + 12} />
      </animated.g>
    </g>
  );
};

export const Node: FC<TSvgNode> = ({ address, value, xPostion, yPosition }) => (
  <g>
    <Rectangle
      text={value}
      address={address}
      xPostion={xPostion + C.ARROW_WIDTH}
      yPosition={yPosition}
    />
    <Arrows xPostion={xPostion} />
  </g>
);

const Rectangle2: FC<TRectangle> = ({
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

export const NewNode: FC<TNewNode> = ({
  address,
  value,
  moveUp,
  onFirstAnimComplete,
  onMoveUpAnimComplete,
}) => {
  const xPos = C.RECTANGLE_SIZE + C.ARROW_WIDTH + C.ARROW_WIDTH / 5,
    yPos = C.RECTANGLE_SIZE + C.ARROW_WIDTH / 2;

  const [rectStyle, rectangleApi] = useSpring(() => ({
    opacity: 0,
    y: 20,
    x: 0,
    config: {
      mass: 1,
      tension: 100,
      friction: 10,
    },
  }));

  const [pathStyle, pathApi] = useSpring(() => ({
    y: 0,
    stroke: COLORS.DARK_STROKE,
  }));

  useEffect(() => {
    rectangleApi.start({
      opacity: 1,
      y: 0,
      config: { mass: 1, tension: 100, friction: 10 },
      onResolve: () => {
        onFirstAnimComplete();
        pathApi.start({
          y: 1,
          onResolve: () => {
            pathApi.start({
              y: 2,
              delay: 500 * 2,
              config: {
                duration: 450,
              },
              onResolve: () => {
                pathApi.start({
                  y: 3,
                  config: {
                    duration: 300,
                  },
                });
              },
            });
          },
        });
      },
    });
  }, []);

  useEffect(() => {
    if (moveUp) {
      rectangleApi.start({
        x: C.RECTANGLE_SIZE + C.ANCHOR_BUFFER - C.CONNECTOR_SIZE,
        config: { mass: 1, tension: 100, friction: 15 },
        onResolve: () => {
          pathApi.start({
            y: 4,
            stroke: COLORS.STROKE,
            config: {
              duration: 400,
            },
          });
          rectangleApi.start({
            y: (C.RECTANGLE_SIZE + C.ARROW_WIDTH / 2) * -1 + 1,
            config: { duration: 400 },
            onResolve: onMoveUpAnimComplete,
          });
        },
      });
    }
  }, [moveUp]);

  return (
    <g>
      <animated.path
        fill="none"
        stroke={pathStyle.stroke}
        // prettier-ignore
        d={pathStyle.y.to({
          range: [0, 1, 2, 3, 4],
          output: [
            `
              M${xPos},${yPos + C.BOTTOM_CONNECTOR_Y}
              C${xPos},${yPos + C.BOTTOM_CONNECTOR_Y} ${xPos},${yPos + C.BOTTOM_CONNECTOR_Y}
              ${xPos},${yPos + C.BOTTOM_CONNECTOR_Y}
            `,
            `
              M${xPos},${yPos + C.BOTTOM_CONNECTOR_Y}
              C${C.RECTANGLE_SIZE + C.ARROW_WIDTH - (C.ARROW_WIDTH / 2)},${yPos + C.BOTTOM_CONNECTOR_Y} ${C.RECTANGLE_SIZE + C.ARROW_WIDTH + (C.ARROW_WIDTH / 2)},${C.BOTTOM_CONNECTOR_Y}
              ${C.RECTANGLE_SIZE + C.ARROW_WIDTH},${C.BOTTOM_CONNECTOR_Y}
            `,
            `
              M${xPos},${yPos + C.BOTTOM_CONNECTOR_Y}
              C${C.RECTANGLE_SIZE + C.ARROW_WIDTH - (C.ARROW_WIDTH / 2)},${yPos + C.BOTTOM_CONNECTOR_Y} ${C.RECTANGLE_SIZE + C.ARROW_WIDTH + (C.ARROW_WIDTH / 2)},${C.BOTTOM_CONNECTOR_Y}
              ${C.RECTANGLE_SIZE + C.ARROW_WIDTH},${C.BOTTOM_CONNECTOR_Y}
            `,
            `
              M${xPos + C.RECTANGLE_SIZE + C.ANCHOR_BUFFER - (C.CONNECTOR_SIZE * 2)},${yPos + C.BOTTOM_CONNECTOR_Y}
              C${xPos + C.RECTANGLE_SIZE + C.ANCHOR_BUFFER - (C.CONNECTOR_SIZE * 2) - 40},${yPos + C.BOTTOM_CONNECTOR_Y} ${C.RECTANGLE_SIZE + C.ARROW_WIDTH + 40},${C.BOTTOM_CONNECTOR_Y}
              ${C.RECTANGLE_SIZE + C.ARROW_WIDTH},${C.BOTTOM_CONNECTOR_Y}
            `,
            `
              M${xPos + C.RECTANGLE_SIZE + C.ANCHOR_BUFFER},${C.BOTTOM_CONNECTOR_Y}
              C${xPos + C.RECTANGLE_SIZE + C.ANCHOR_BUFFER},${BOTTOM_ANCHOR_Y} ${C.RECTANGLE_SIZE + C.ARROW_WIDTH},${BOTTOM_ANCHOR_Y}
              ${C.RECTANGLE_SIZE + C.ARROW_WIDTH},${C.BOTTOM_CONNECTOR_Y}
            `,
          ]
        })}
      />
      <animated.path
        fill="none"
        stroke={pathStyle.stroke}
        // prettier-ignore
        d={pathStyle.y.to({
          range: [0, 1, 2, 3, 4],
          output: [
            `
              M${xPos + C.RECTANGLE_SIZE},${yPos + C.TOP_CONNECTOR_Y}
              C${xPos + C.RECTANGLE_SIZE},${yPos + C.TOP_CONNECTOR_Y} ${xPos + C.RECTANGLE_SIZE},${yPos + C.TOP_CONNECTOR_Y}
              ${xPos + C.RECTANGLE_SIZE},${yPos + C.TOP_CONNECTOR_Y}
            `,
            `
              M${xPos + C.RECTANGLE_SIZE},${yPos + C.TOP_CONNECTOR_Y}
              C${C.RECTANGLE_SIZE + (C.ARROW_WIDTH * 2.5)},${yPos + C.TOP_CONNECTOR_Y - C.ANCHOR_BUFFER} ${C.RECTANGLE_SIZE + (C.ARROW_WIDTH * 1.5)},${C.TOP_CONNECTOR_Y + C.ANCHOR_BUFFER}
              ${C.RECTANGLE_SIZE + (C.ARROW_WIDTH * 2)},${C.TOP_CONNECTOR_Y}
            `,
            `
              M${xPos + C.RECTANGLE_SIZE},${yPos + C.TOP_CONNECTOR_Y}
              C${xPos + C.RECTANGLE_SIZE + 40},${yPos + C.TOP_CONNECTOR_Y} ${xPos + (C.RECTANGLE_SIZE * 2) + C.ARROW_WIDTH + (C.CONNECTOR_SIZE * 2) - 40},${C.TOP_CONNECTOR_Y}
              ${xPos + (C.RECTANGLE_SIZE * 2) + C.ARROW_WIDTH + (C.CONNECTOR_SIZE * 2)},${C.TOP_CONNECTOR_Y}
            `,
            `
              M${xPos + (C.RECTANGLE_SIZE * 2) + C.ANCHOR_BUFFER - (C.CONNECTOR_SIZE * 2)},${yPos + C.TOP_CONNECTOR_Y}
              C${xPos + (C.RECTANGLE_SIZE * 2) + C.ANCHOR_BUFFER - (C.CONNECTOR_SIZE * 2) + 40},${yPos + C.TOP_CONNECTOR_Y} ${xPos + (C.RECTANGLE_SIZE * 2) + C.ARROW_WIDTH + (C.CONNECTOR_SIZE * 2) - 40},${C.TOP_CONNECTOR_Y}
              ${xPos + (C.RECTANGLE_SIZE * 2) + C.ARROW_WIDTH + (C.CONNECTOR_SIZE * 2)},${C.TOP_CONNECTOR_Y}
            `,
            `
              M${xPos + (C.RECTANGLE_SIZE * 2) + C.ANCHOR_BUFFER - (C.CONNECTOR_SIZE * 2)},${C.TOP_CONNECTOR_Y}
              C${xPos + (C.RECTANGLE_SIZE * 2) + C.ANCHOR_BUFFER - (C.CONNECTOR_SIZE * 2)},${TOP_ANCHOR_Y} ${xPos + (C.RECTANGLE_SIZE * 2) + C.ARROW_WIDTH + (C.CONNECTOR_SIZE * 2)},${TOP_ANCHOR_Y}
              ${xPos + (C.RECTANGLE_SIZE * 2) + C.ARROW_WIDTH + (C.CONNECTOR_SIZE * 2)},${C.TOP_CONNECTOR_Y}
            `
          ]
        })}
      />
      <animated.g style={rectStyle}>
        <Rectangle2
          address={address}
          text={value}
          xPostion={xPos}
          yPosition={yPos}
        />
      </animated.g>
    </g>
  );
};
