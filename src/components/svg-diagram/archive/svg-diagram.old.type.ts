import { CSSProperties } from "react";
import { TNode } from "../../../types";

export type TSvgNodeItem = {
  isHeadNode?: boolean;
  isEndNode?: boolean;
  value: string | number;
  address?: string;
  styles?: CSSProperties;
};

export type TSvgDiagram = {
  node?: TNode;
};

export type TXPosition = {
  xPostion: number;
};

export type TArrowAnimations = {
  hideArrowPointer: boolean;
  shiftArrowToBottom: boolean;
  shiftRightPathToRight: boolean;
};

export type TEndNode = TXPosition &
  Partial<TArrowAnimations> & {
    onEndNodeMoveComplete: () => void;
  };

type TYPosition = {
  yPosition: number;
};

export type TRectangle = TXPosition &
  Partial<TYPosition> & {
    text: string | number;
    address?: string;
  };

export type TSvgNode = Pick<TNode, "address" | "value"> &
  TXPosition &
  Partial<TYPosition>;

export type TNewNode = Pick<TSvgNode, "address" | "value"> & {
  moveUp: boolean;
  onFirstAnimComplete: () => void;
  onMoveUpAnimComplete: () => void;
};

export type TConnector = TXPosition & TYPosition;
