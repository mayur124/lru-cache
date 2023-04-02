import { FC, PropsWithChildren } from "react";

export const CardHeader: FC<PropsWithChildren> = ({ children }) => (
  <h3 className="border-b p-1.5 text-base font-medium">{children}</h3>
);
