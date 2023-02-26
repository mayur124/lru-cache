import { SVGDiagram } from "../../components/svg-diagram";
import { nodeList } from "./model";

export const MainPage = () => (
  <div>
    <SVGDiagram nodes={nodeList} />
  </div>
);
