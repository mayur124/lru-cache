import { SVGDiagram } from "../../components/svg-diagram";

export const MainPage = () => (
  <div>
    <SVGDiagram
      node={{
        address: "0x00a",
        value: 10,
        prev: { address: "", value: 0, prev: null, next: null },
        next: { address: "", value: 1, prev: null, next: null },
      }}
    />
  </div>
);
