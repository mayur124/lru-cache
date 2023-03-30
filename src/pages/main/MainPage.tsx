import {
  SVGDiagram,
  Header,
  Algorithm,
  Operations,
  Map,
} from "../../components";

export const MainPage = () => (
  <main className="max-w-7xl mx-auto px-2 py-3 flex flex-col h-full">
    <Header />
    <section className="grow h-full">
      <SVGDiagram />
      <div></div>
      <div className="mt-2 flex gap-2">
        <div className="grow shrink-0 basis-[calc(3/12*100%)] max-w-[calc(3/12*100%)]">
          <Algorithm />
        </div>
        <div className="flex gap-2 grow shrink-0 basis-[calc(9/12*100%)] max-w-[calc(9/12*100%)]">
          <div>
            <Operations />
          </div>
          <div>
            <Map />
          </div>
        </div>
      </div>
    </section>
    <footer>
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
