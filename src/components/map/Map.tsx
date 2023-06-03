import { Card, CardHeader } from "../common";

export const Map = () => (
  <Card>
    <CardHeader>
      Map{" "}
      <span className="text-end text-sm ml-1 !font-normal">
        [{" "}
        <span className="relative cursor-help after:absolute after:border-[2px] after:border-b-0 after:left-0 after:right-0 after:-bottom-0.5 after:border-blue-800 after:border-dashed before:content-['Capacity_of_Caching_Items'] before:absolute before:origin-top-left before:scale-0 hover:before:scale-100 before:rounded before:font-normal before:whitespace-nowrap before:mt-1 before:px-2 before:py-0.5 before:bg-slate-100 before:border before:border-slate-300 before:left-0 before:top-full before:text-xs before:h-6 before:transition-transform before:duration-300 before:will-change-transform before:tracking-wide before:shadow-md">
          Cache Size
        </span>
        : 2 ]
      </span>
    </CardHeader>
    <div className="p-1.5">
      <table className="w-full [&_th]:font-semibold [&_th]:text-sm [&_td]:text-xs [&_th]:border [&_td]:border [&_th]:p-1.5 [&_td]:p-1 [&_td]:text-center">
        <thead>
          <tr>
            <th>&lt;Key, Value&gt;</th>
            <th>Node Address</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>&lt;1, 10&gt;</td>
            <td>0x0100</td>
          </tr>
          <tr>
            <td>&lt;2, 20&gt;</td>
            <td>0x0200</td>
          </tr>
          <tr>
            <td>&lt;3, 30&gt;</td>
            <td>0x0300</td>
          </tr>
          <tr>
            <td colSpan={2}>Map is empty.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </Card>
);
