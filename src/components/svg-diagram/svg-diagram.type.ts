import { TNode } from "../../types";

export type TSvgNodeItem = {
  isHeadNode?: boolean;
  isEndNode?: boolean;
  value: string | number;
  address: string;
  x: number;
};

export type TSvgDiagram = {
  node?: TNode;
};

export type TXPosition = {
  xPostion: number;
};

export type TArrowAnimations = {
  showArrows: boolean;
  onArrowHidden: () => void;
};

export type TEndNode = TXPosition;

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

export enum OPERATIONS {
  ADD = "add",
  SWAP = "swap",
  REMOVE = "remove",
}
