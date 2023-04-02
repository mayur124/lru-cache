import { useState } from "react";
import {
  SVGDiagram,
  Header,
  Algorithm,
  Operations,
  Map,
  Card,
} from "../../components";

export const MainPage = () => {
  return (
    <main className="max-w-2xl mx-auto px-2 py-3 flex flex-col h-full">
      <Header />
      <section className="grow flex flex-col">
        <SVGDiagram />
        <div className="-mx-1.5 flex grow [&>div]:grow [&>div]:mx-1.5 [&>div]:basis-1/2 [&>div]:max-w-[50%]">
          <div className="flex flex-col gap-3">
            {/* <div className="grow"> */}
            <div>
              <Operations />
            </div>
            {/* <div className="grow-[2]"> */}
            <div>
              <Map />
            </div>
          </div>
          <div>
            <Card>
              <Algorithm />
            </Card>
          </div>
        </div>
      </section>
      <footer className="mt-2">
        <p className="text-center text-xs">
          Crafted by{" "}
          <a
            href="https://www.linkedin.com/in/mayur-chawda/"
            target="_blank"
            className="relative after:absolute after:border-[2px] after:border-b-0 after:left-0 after:right-0 after:-bottom-1 after:border-blue-800 after:border-dashed"
          >
            Mayur Chawda
          </a>
        </p>
      </footer>
    </main>
  );
};
