import { TNode } from "../../types";

export type TSvgDiagram = {
  nodes: TNode[];
};

export type TXPosition = {
  xPostion: number;
};

type TYPosition = {
  yPosition: number;
};

export type TRectangle = TXPosition & {
  text: string | number;
  address?: string;
};

export type TSvgNode = Pick<TNode, "address" | "value"> & TXPosition;

export type TConnector = TXPosition & TYPosition;
