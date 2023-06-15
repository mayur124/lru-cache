import { CACHE_SIZE } from "../helpers/constants";
import { TAlgo, TMapState } from "./algo-store.type";

const ADDRESS_LENGTH = 5;
let count = 0;

export function getNodeAddress() {
  count++;
  const countLength = count.toString().length;
  let address = "x";
  const remainingLength = ADDRESS_LENGTH - countLength;
  for (let index = 0; index < remainingLength; index++) {
    address += "0";
  }
  address += count;
  return address;
}

export function isStepConditionFulfilled(
  algo: TAlgo,
  step: number,
  nodeKey: number | null,
  map: TMapState["map"]
) {
  if (nodeKey == null) return false;
  if (algo === "put") {
    switch (step) {
      case 1:
        return map.has(nodeKey);
      case 2:
        return map.size < CACHE_SIZE;
      default:
        break;
    }
  } else {
    switch (step) {
      case 1:
        return map.has(nodeKey);
      default:
        break;
    }
  }
}
