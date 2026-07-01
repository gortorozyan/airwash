"use client";

type GlobalErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalErrorPage({
  error,
  reset
}: GlobalErrorPageProps) {
  return (
    <html lang="hy">
      <body className="m-0 bg-[#08131e] text-white">
        <main className="flex min-h-screen items-center justify-center px-6">
          <div className="max-w-md rounded-[24px] border border-white/12 bg-black/28 p-8 text-center backdrop-blur-md">
            <p className="text-sm uppercase tracking-[0.28em] text-white/55">
              AirWash
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">
              Սերվերի սխալ
            </h1>
            <p className="mt-4 text-sm leading-7 text-white/72">
              {error.message || "Համակարգը ժամանակավորապես հասանելի չէ։"}
            </p>
            <button
              className="mt-6 inline-flex h-12 items-center justify-center rounded-[16px] border border-white/20 bg-white/8 px-5 text-sm font-medium text-white transition-colors duration-300 hover:bg-white/14"
              onClick={reset}
              type="button"
            >
              Վերաբեռնել
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}

