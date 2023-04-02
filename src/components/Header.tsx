export const Header = () => (
  <header className="relative mb-2 pb-2 border-b flex">
    <h1 className="basis-[calc(9/12*100%)] max-w-[calc(9/12*100%)] relative font-bold tracking-wide text-2xl grow whitespace-nowrap">
      <span className="relative cursor-help after:absolute after:border-[2px] after:border-b-0 after:left-0 after:right-0 after:bottom-0 after:border-blue-800 after:border-dashed before:content-['Least_Recently_Used'] before:absolute before:origin-top-left before:scale-0 hover:before:scale-100 before:rounded before:font-normal before:whitespace-nowrap before:mt-1 before:px-2 before:py-0.5 before:bg-slate-100 before:border before:border-slate-300 before:left-0 before:top-full before:text-xs before:h-6 before:transition-transform before:duration-300 before:will-change-transform before:tracking-wide before:shadow-md">
        LRU
      </span>{" "}
      Cache Visualizer
    </h1>
    <div className="flex items-center basis-[calc(3/12*100%)] max-w-[calc(3/12*100%)] justify-end gap-6">
      <a
        href="https://youtu.be/xDEuM5qa0zg"
        className="h-6 w-h-6"
        target="_blank"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-full w-full"
        >
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
        </svg>
      </a>
      <a
        href="https://github.com/mayur124/lru-cache"
        className="h-6 w-h-6"
        target="_blank"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-full w-full"
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      </a>
    </div>
  </header>
);
