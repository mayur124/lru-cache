import { TNode } from "../../types";

export const nodeList: TNode[] = [
  {
    value: 0,
    next: { value: 10, next: null, prev: null, address: "0x010" },
    prev: null,
    address: "head",
  },
  {
    value: 10,
    next: { value: 20, next: null, prev: null, address: "0x020" },
    prev: { value: 0, next: null, prev: null, address: "head" },
    address: "0x010",
  },
  {
    value: 20,
    next: { value: 0, next: null, prev: null, address: "end" },
    prev: { value: 10, next: null, prev: null, address: "0x010" },
    address: "0x020",
  },
  // {
  //   value: 30,
  //   next: { value: 0, next: null, prev: null, address: "end" },
  //   prev: { value: 20, next: null, prev: null, address: "0x020" },
  //   address: "0x030",
  // },
  {
    value: 0,
    next: null,
    prev: { value: 20, next: null, prev: null, address: "0x020" },
    address: "end",
  },
];
