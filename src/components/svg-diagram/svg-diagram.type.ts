export type TSvgNodeItem = {
  id: string;
  isHeadNode?: boolean;
  isEndNode?: boolean;
  key: number;
  value: string | number;
  address: string;
  x: number;
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

export type TConnector = TXPosition & TYPosition;

export enum DIAGRAM_OPERATIONS {
  ADD = "add",
  MOVE_AFTER_HEAD = "move_after_head",
  REMOVE = "remove",
  UPDATE_VALUE = "update_value",
}
