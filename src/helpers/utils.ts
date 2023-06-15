import isEqual from "lodash.isequal";

export function propCompareFunction(prevProps: any, currentProps: any) {
  return isEqual(prevProps, currentProps);
}
