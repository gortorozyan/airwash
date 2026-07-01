"use client";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#08131e] px-6 text-white">
      <div className="max-w-md rounded-[24px] border border-white/12 bg-black/28 p-8 text-center backdrop-blur-md">
        <p className="text-sm uppercase tracking-[0.28em] text-white/55">
          AirWash
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">
          Ինչ-որ բան սխալ ընթացավ
        </h1>
        <p className="mt-4 text-sm leading-7 text-white/72">
          {error.message || "Փորձեք կրկին բեռնել էջը։"}
        </p>
        <button
          className="mt-6 inline-flex h-12 items-center justify-center rounded-[16px] border border-white/20 bg-white/8 px-5 text-sm font-medium text-white transition-colors duration-300 hover:bg-white/14"
          onClick={reset}
          type="button"
        >
          Կրկին փորձել
        </button>
      </div>
    </main>
  );
}

