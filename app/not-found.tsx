import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#08131e] px-6 text-white">
      <div className="max-w-md rounded-[24px] border border-white/12 bg-black/28 p-8 text-center backdrop-blur-md">
        <p className="text-sm uppercase tracking-[0.28em] text-white/55">
          AirWash
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">
          Էջը չի գտնվել
        </h1>
        <p className="mt-4 text-sm leading-7 text-white/72">
          Հղումը սխալ է կամ էջը այլևս հասանելի չէ։
        </p>
        <Link
          className="mt-6 inline-flex h-12 items-center justify-center rounded-[16px] border border-white/20 bg-white/8 px-5 text-sm font-medium text-white transition-colors duration-300 hover:bg-white/14"
          href="/"
        >
          Վերադառնալ գլխավոր
        </Link>
      </div>
    </main>
  );
}
