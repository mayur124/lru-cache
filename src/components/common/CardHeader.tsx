import { FC, PropsWithChildren } from "react";

export const CardHeader: FC<PropsWithChildren> = ({ children }) => (
  <h3 className="border-b p-1.5 text-sm font-medium capitalize flex items-center flex-wrap gap-1 bg-[hsl(220deg,14.29%,95.88%)]">
    {children}
  </h3>
);
