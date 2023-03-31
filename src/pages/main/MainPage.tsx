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
  const [buttonState, setButtonState] = useState(false); // true - play, false - pause

  return (
    <main className="max-w-7xl mx-auto px-2 py-3 flex flex-col h-full">
      <Header />
      <section className="grow h-full flex flex-col">
        <SVGDiagram />
        <div className="flex flex-col grow">
          <div>
            <button
              type="button"
              onClick={() => setButtonState((state) => !state)}
              className="p-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {buttonState ? "Pause" : "Play"}
            </button>
          </div>
          <div className="-mx-2 mt-2 flex grow [&>div]:grow [&>div]:shrink-0">
            <div className="mx-2 basis-[calc(3/12*100%)] max-w-[calc(3/12*100%)]">
              <Card>
                <Algorithm />
              </Card>
            </div>
            <div className="mx-2 flex">
              <Card>
                <div>
                  <Operations />
                </div>
                <div>
                  <Map />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <footer className="mt-2">
        <p className="text-center text-xs">
          Made by{" "}
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
