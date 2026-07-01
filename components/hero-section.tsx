import { ArrowUpRightIcon } from "@/components/ui-icons";

export function HeroSection() {
  return (
    <section className="relative flex flex-1 items-start justify-center overflow-hidden pb-8 pt-4 sm:pb-10 sm:pt-8 lg:pb-12 lg:pt-10">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(7,17,26,0.16)_100%)]" />

      <div className="relative mx-auto flex h-full w-full max-w-[920px] flex-col items-center justify-start pt-10 text-center sm:pt-14 lg:pt-20">
        <h1 className="hero-copy-shadow mt-4 max-w-[900px] text-[32px] font-bold leading-[1.1] tracking-[-0.015em] text-[#101A24] sm:text-[46px] lg:text-[60px] xl:text-[68px]">
          <span className="block">Հայաստանում առաջին</span>
          <span className="block lg:whitespace-nowrap">
            մասնագիտացված <span className="text-white">Drone</span>
          </span>
          <span className="block">մաքրման ընկերությունը</span>
        </h1>

        <div className="mt-6 h-[2px] w-24 rounded-full bg-[#101A24]" />

        <p className="mt-5 max-w-[720px] text-[14px] leading-7 text-[#101A24] sm:mt-6 sm:text-[16px] sm:leading-8 lg:text-[17px] lg:leading-[1.9]">
          AirWash-ը Հայաստանում Drone մաքրման միակ մասնագիտացված ընկերությունն է, որը համադրում է ժամանակակից
          տեխնոլոգիաները, անվտանգ աշխատանքային գործընթացներն ու RO/DI մաքրված ջրի համակարգերը` ապահովելով արագ,
          արդյունավետ և premium մակարդակի արդյունք։
        </p>

        <div className="mt-8 flex justify-center sm:mt-10">
          <a
            className="airwash-hero-primary inline-flex min-w-[200px] items-center justify-center gap-3 rounded-[5px] border-[1px] border-[#101A24] bg-[#101A24] px-6 py-4 text-sm font-medium text-white transition-opacity duration-300 hover:opacity-[0.82] sm:min-w-[220px]"
            href="#contact"
          >
            Ստանալ գնահատում
            <ArrowUpRightIcon className="h-5 w-5 text-white" />
          </a>
        </div>
      </div>
    </section>
  );
}
