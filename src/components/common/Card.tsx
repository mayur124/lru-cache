import { FC, PropsWithChildren } from "react";

export const Card: FC<PropsWithChildren> = ({ children }) => (
  // <div className="rounded-md border border-gray-200 shadow h-full">
  <div className="rounded-md border border-gray-200 shadow">
    {children}
  </div>
);
