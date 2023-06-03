import { useState } from "react";
import { Card, CardHeader } from "../common";
import { getNodeAddress } from "../../helpers/address-generator";

export const Operations = () => {
  const [operation, setOperation] = useState<"put" | "get">("put");
  return (
    <Card>
      <CardHeader>Operations</CardHeader>
      <form
        className="p-1.5 [&_label]:inline-block [&_label]:text-xs [&_label]:text-gray-600 [&_input]:px-1.5 [&_input]:outline-gray-300 [&_input]:outline-offset-3 [&_input]:border [&_input]:w-full [&_input]:rounded [&_select]:outline-gray-300 [&_select]:outline-offset-3"
        onSubmit={(e) => {
          e.preventDefault();
          // const formData = {
          //   algo: (e.currentTarget.elements as any)["operation"].value,
          //   key: (e.currentTarget.elements as any)["key"].value,
          //   value: (e.currentTarget.elements as any)["value"].value,
          //   address: getNodeAddress(),
          // };
          // onFormSubmit(formData);
          e.currentTarget.reset();
        }}
      >
        <label htmlFor="operation">Select Operation</label>
        <div className="relative after:absolute after:right-1.5 after:top-1/2 after:-translate-y-1/2 after:h-2 after:w-2 after:bg-gray-400 after:[clip-path:polygon(50%_100%,_0_0,_100%_0)]">
          <select
            id="operation"
            name="operation"
            className="w-full appearance-none cursor-pointer pl-1.5 border capitalize rounded"
            value={operation}
            onChange={(e) => setOperation(e.target.value as "put" | "get")}
          >
            <option value="put">put</option>
            <option value="get">get</option>
          </select>
        </div>
        <div className="flex flex-wrap -mx-1 [&>div]:mx-1 [&>div]:mt-0.5 [&>div]:flex-[1_1_calc((132_-_6_-_8)/16*1rem)]">
          <div>
            <label htmlFor="key">Key</label>
            <input type="number" id="key" name="key" required />
          </div>
          {operation === "put" ? (
            <div>
              <label htmlFor="value">Value</label>
              <input
                name="value"
                type="number"
                id="value"
                min={1}
                max={99}
                required
              />
            </div>
          ) : null}
        </div>
        <div className="mt-2 text-center">
          <button className="text-sm tracking-wide px-3 py-0.5 rounded bg-[hsl(211deg,70%,36%)] text-white">
            Go
          </button>
        </div>
      </form>
    </Card>
  );
};
