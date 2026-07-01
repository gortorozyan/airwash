import Image from "next/image";
import { AutoFlipCard } from "@/components/auto-flip-card";
import { PageTools } from "@/components/page-tools";
import { ScrollReveal } from "@/components/scroll-reveal";
import { HeroSection } from "@/components/hero-section";
import { SiteFooter } from "@/components/site-footer";
import { ServicesSection, ServicesVideoSection } from "@/components/services-section";
import { SiteHeader } from "@/components/site-header";
import { AccessIcon, BuildingsIcon, SpeedIcon, WaterDropIcon } from "@/components/ui-icons";
import { assetPath } from "@/components/asset-path";

const stats = [
  {
    id: "advantages",
    icon: BuildingsIcon,
    title: "2500m²+",
    subtitle: "Մաքրված մակերեսներ"
  },
  {
    id: "projects",
    icon: SpeedIcon,
    title: "70%",
    subtitle: "Ավելի արագ աշխատանք"
  },
  {
    id: "technology",
    icon: WaterDropIcon,
    title: "RO/DI",
    subtitle: "Բյուրեղյա մաքրում առանց հետքերի"
  },
  {
    id: "about",
    icon: AccessIcon,
    title: "High-Access",
    subtitle: "Օդային մաքրման համակարգեր"
  }
] as const;

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#FAFAFA]" id="top">
      <SiteHeader />
      <PageTools />

      <section className="relative min-h-[720px] overflow-hidden bg-[#08131e] sm:min-h-screen">
        <Image
          alt="AirWash drone cleaning background"
          className="object-cover object-center"
          fill
          priority
          sizes="100vw"
          src={assetPath("/images/hero-background.png")}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,10,18,0.22)_0%,rgba(2,10,18,0.08)_22%,rgba(2,10,18,0.1)_48%,rgba(2,10,18,0.34)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_34%),linear-gradient(90deg,rgba(6,14,24,0.08),rgba(6,14,24,0))]" />

        <div className="relative z-10 flex min-h-[720px] w-full flex-col px-5 pt-0 sm:min-h-screen sm:px-8 lg:px-10 xl:px-12">
          <div aria-hidden="true" className="h-[74px] sm:h-[88px] lg:h-[94px]" />
          <HeroSection />
        </div>
      </section>

      <section
        className="relative z-20 bg-[#FAFAFA] px-5 py-14 text-[#101A24] sm:px-8 sm:py-16 lg:px-10 lg:py-20 xl:px-12"
        id="why-airwash"
        style={{ fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Inter, system-ui, sans-serif" }}
      >
        <ScrollReveal className="mx-auto w-full max-w-[1240px]">
          <div className="mx-auto max-w-[860px] text-center">
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.03em] text-[#101A24] sm:text-4xl lg:text-[44px]">
              {"\u0544\u0565\u0580 \u0544\u0561\u057d\u056b\u0576"}
            </h2>
            <h2 className="sr-only">
              Ինչու ընտրել AirWash?
            </h2>
          </div>

          <div className="mx-auto mt-10 w-full sm:mt-12 xl:w-[92%]">
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
              {stats.map((stat, index) => (
                <article
                  key={stat.id}
                  className={`flex items-start gap-4 bg-transparent px-0 py-2 sm:px-3 xl:min-w-0 xl:gap-5 ${
                    index !== stats.length - 1 ? "xl:border-r xl:border-[#101A24]/14 xl:pr-6" : ""
                  }`}
                  id={stat.id}
                >
                  <div className="mt-1 text-[#101A24]">
                    <stat.icon className="h-8 w-8 opacity-90" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[19px] font-semibold tracking-[-0.03em] text-[#101A24] sm:text-[21px]">
                      {stat.title}
                    </p>
                    <p className="mt-2 max-w-[240px] text-[14px] leading-6 text-[#101A24]/66 sm:text-[15px] xl:max-w-[220px]">
                      {stat.subtitle}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
            <div className="mx-auto max-w-[640px] lg:mx-0">
              <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#101A24]/42">
                  Ինչու AirWash
                </p>
              </div>

              <div className="space-y-5 text-[15px] leading-8 text-[#101A24]/80 sm:space-y-7 sm:text-[17px] sm:leading-9">
                <p>
                  AirWash-ը ստեղծվել է այն բիզնեսների համար, որոնք ուզում են ստանալ ոչ միայն մաքուր արդյունք, այլ նաև
                  ժամանակակից, արագ և անվտանգ ծառայություն բարձր հասանելիության մակերեսների համար։
                </p>

                <p>
                  Մենք աշխատում ենք drone տեխնոլոգիայով, RO/DI մաքրված ջրով և վերահսկվող workflow-ով, որպեսզի ապակյա
                  ճակատները, կոմպոզիտ մակերեսները և դժվար հասանելի գոտիները մաքրվեն premium որակով` առանց ծանր
                  մեխանիկական լուծումների։
                </p>

                <p>
                  AirWash ընտրելով` դուք ստանում եք ավելի ներկայացուցչական արտաքին տեսք, ավելի քիչ ռիսկեր և ավելի
                  արդյունավետ սպասարկում այն օբյեկտների համար, որտեղ արդյունքը պետք է տեսանելի լինի հենց առաջին
                  հայացքից։
                </p>
              </div>
            </div>

            <AutoFlipCard className="mx-auto w-full max-w-[420px] sm:max-w-[520px]">
              <div className="flip-card-inner relative aspect-[1.12] w-full">
                <div className="flip-card-face absolute inset-0 overflow-hidden rounded-[28px]">
                  <Image
                    alt="AirWash drone cleaning showcase"
                    className="object-cover"
                    fill
                    sizes="(max-width: 1024px) 100vw, 520px"
                    src={assetPath("/images/drow.jpg")}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,17,29,0.06)_0%,rgba(5,17,29,0.2)_100%)]" />
                </div>

                <div className="flip-card-face flip-card-back absolute inset-0 flex flex-col justify-end overflow-hidden rounded-[28px] bg-[#101A24] p-8 text-white sm:p-10">
                  <div className="max-w-[300px]">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/56">
                      AirWash
                    </p>
                    <h3 className="mt-4 max-w-[260px] text-[28px] font-bold leading-[1.15] sm:text-[31px]">
                      <span className="block">Ցանկանո՞ւմ ես</span>
                      <span className="block whitespace-nowrap">օգտվել AirWash-ից?</span>
                    </h3>
                    <p className="mt-4 text-base leading-8 text-white/76">
                      Կապ հաստատիր մեզ հետ, և մենք կօգնենք ընտրել քո օբյեկտի համար ամենաարդյունավետ drone մաքրման
                      լուծումը։
                    </p>
                    <a
                      className="mt-8 inline-flex items-center justify-center rounded-[5px] border border-white px-6 py-3 text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
                      href="#contact"
                    >
                      Կապ մեզ հետ
                    </a>
                  </div>
                </div>
              </div>
            </AutoFlipCard>
          </div>
        </ScrollReveal>
      </section>

      <ServicesVideoSection />
      <ServicesSection />
      <SiteFooter />
    </main>
  );
}
