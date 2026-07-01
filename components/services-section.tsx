"use client";

import { Icon } from "@iconify/react";
import boltLinear from "@iconify-icons/solar/bolt-linear";
import leafLinear from "@iconify-icons/solar/leaf-linear";
import lightbulbBoltLinear from "@iconify-icons/solar/lightbulb-bolt-linear";
import shieldCheckLinear from "@iconify-icons/solar/shield-check-linear";
import starsLineLinear from "@iconify-icons/solar/stars-line-linear";
import walletMoneyLinear from "@iconify-icons/solar/wallet-money-linear";
import Image from "next/image";
import type { FormEvent, KeyboardEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui-icons";

const services = [
  {
    title: "Ապակյա ճակատներ",
    description:
      "Drone տեխնոլոգիայով մաքրում բիզնես կենտրոնների, վիտրաժների և բարձր տեսանելի մակերեսների համար` premium վերջնական արդյունքով։",
    image: "/images/hero-background.png",
    imageAlt: "AirWash facade cleaning service"
  },
  {
    title: "Բարձր հասանելիություն",
    description:
      "RO/DI մաքրված ջուր, վերահսկվող workflow և արագ իրականացում այն օբյեկտների համար, որտեղ ավանդական լուծումները ավելի ռիսկային են։",
    image: "/images/drow.jpg",
    imageAlt: "AirWash high-access cleaning drone"
  },
  {
    title: "Բիզնես կենտրոններ",
    description:
      "Պարբերական մաքրում գրասենյակային և կոմերցիոն շենքերի համար, որպեսզի արտաքին տեսքը միշտ պահպանի ներկայացուցչական մակարդակը։",
    image: "/images/hero-background.png",
    imageAlt: "AirWash business center cleaning"
  },
  {
    title: "Վիտրաժների խնամք",
    description:
      "Ապակյա մակերեսների մանրակրկիտ մաքրում առանց հետքերի, երբ տեսանելիությունն ու փայլը առաջնահերթ են։",
    image: "/images/drow.jpg",
    imageAlt: "AirWash glass maintenance"
  },
  {
    title: "Անհատական լուծումներ",
    description:
      "Յուրաքանչյուր օբյեկտի համար կառուցում ենք առանձին մոտեցում` հաշվի առնելով բարձրությունը, ռիսկերը և սպասվող արդյունքը։",
    image: "/images/hero-background.png",
    imageAlt: "AirWash custom cleaning solution"
  },
  {
    title: "RO/DI վերջնական լվացում",
    description:
      "Մաքրված ջրով վերջնական անցում, որպեսզի ապակիների և premium մակերեսների վրա չմնան հետքեր կամ աղային նստվածքներ։",
    image: "/images/drow.jpg",
    imageAlt: "AirWash RO DI rinse"
  },
  {
    title: "Հյուրանոցային ճակատներ",
    description:
      "Բարձր տեսանելի հյուրանոցների և premium համալիրների ճակատների մաքրում` արագ սպասարկումով և ներկայացուցչական վերջնական տեսքով։",
    image: "/images/hero-background.png",
    imageAlt: "AirWash hotel facade cleaning"
  },
  {
    title: "Արդյունաբերական մակերեսներ",
    description:
      "Բարդ հասանելիության արտադրական և տեխնիկական մակերեսների մաքրում, երբ անվտանգությունն ու ժամանակի խնայողությունը առաջնահերթ են։",
    image: "/images/drow.jpg",
    imageAlt: "AirWash industrial cleaning"
  }
] as const;

const packageCards = [
  {
    title: "միանգամյա մաքրում",
    description: "Մեկանգամյա աշխատանք արագ արդյունքի համար, երբ պետք է շենքի արտաքին տեսքը արագ բերել մաքուր վիճակի:"
  },
  {
    title: "սեզոնային մաքրում",
    description: "Պլանավորված մաքրում սեզոնի սկզբում կամ ավարտին` ապակիները եւ ճակատը թարմ պահելու համար:"
  },
  {
    title: "եռամսակային մաքրում",
    description: "Կայուն սպասարկման փաթեթ բիզնես կենտրոնների եւ մեծ շենքերի համար` կանխատեսելի ժամանակացույցով:"
  },
  {
    title: "անհատական ժամանակացույց",
    description: "Ճկուն մոտեցում ձեր օբյեկտի ռիթմին, չափին եւ սպասարկման հաճախականությանը համապատասխան:"
  }
] as const;

const pricingFactors = [
  "Շենքի չափից",
  "Կեղտի մակարդակից",
  "Ծառայության տեսակից",
  "Օբյեկտի գտնվելու վայրից",
  "Կոմունալ ծառայությունների հասանելիությունից"
] as const;

const faqItems = [
  {
    question: "Ինչպե՞ս է կատարվում drone մաքրումը:",
    answer: "Մաքրումը կատարվում է հատուկ սարքավորված drone-ով, վերահսկվող ջրի մատակարարմամբ եւ անվտանգ աշխատանքային ընթացքով:"
  },
  {
    question: "Արդյո՞ք ծառայությունը անվտանգ է ապակե ճակատների համար:",
    answer: "Այո, մենք ընտրում ենք աշխատանքային ռեժիմը ըստ մակերեսի տեսակի, բարձրության եւ կեղտի մակարդակի:"
  },
  {
    question: "Որքա՞ն ժամանակ է տեւում մաքրումը:",
    answer: "Ժամկետը կախված է շենքի չափից, հասանելիությունից եւ ընտրված փաթեթից, բայց drone լուծումը սովորաբար զգալիորեն արագացնում է աշխատանքը:"
  },
  {
    question: "Կարո՞ղ ենք ունենալ պարբերական սպասարկում:",
    answer: "Այո, առաջարկում ենք սեզոնային, եռամսակային եւ անհատական ժամանակացույցով սպասարկման տարբերակներ:"
  },
  {
    question: "Ինչպե՞ս է ձեւավորվում արժեքը:",
    answer: "Արժեքը ձեւավորվում է շենքի չափից, կեղտի մակարդակից, ծառայության տեսակից, գտնվելու վայրից եւ կոմունալ հասանելիությունից:"
  }
] as const;

const sectionFont = {
  fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Inter, system-ui, sans-serif"
} as const;

const videoHighlights = [
  {
    label: "Անվտանգություն",
    icon: shieldCheckLinear,
    description: "Աշխատանքը կատարվում է վերահսկվող գործընթացով և օբյեկտի անվտանգությունն ամբողջ ընթացքում մնում է առաջնային։"
  },
  {
    label: "Արագություն",
    icon: boltLinear,
    description: "Մաքրման փուլերը կազմակերպվում են արագ մեկնարկով և նվազագույն դադարներով, որպեսզի խնայվի ժամանակը։"
  },
  {
    label: "Մատչելիություն",
    icon: walletMoneyLinear,
    description: "Յուրաքանչյուր նախագծի համար ընտրում ենք լուծում, որը պահպանում է որակը և մնում է գործնական բյուջեի մեջ։"
  },
  {
    label: "Խելացիություն",
    icon: lightbulbBoltLinear,
    description: "Աշխատում ենք խելացի պլանավորմամբ, ճշգրիտ երթուղիներով և օբյեկտին համապատասխան մոտեցմամբ։"
  },
  {
    label: "Մաքրություն",
    icon: leafLinear,
    description: "Արդյունքը ստացվում է մաքուր ավարտով, նուրբ վերաբերմունքով մակերեսին և ներկայացուցչական տեսքով։"
  },
  {
    label: "Ճշգրտություն",
    icon: starsLineLinear,
    description: "Մանրամասները վերահսկվում են նույն ուշադրությամբ, որպեսզի վերջնական արդյունքը լինի հավասարաչափ և վստահելի։"
  }
] as const;

const firstVideoHighlightRow = videoHighlights.slice(0, 3);
const secondVideoHighlightRow = videoHighlights.slice(3, 6);

type Service = (typeof services)[number];
type PackageCardItem = (typeof packageCards)[number];
const CARD_GAP = 24;
const EDGE_GUTTER_RATIO = 0.08;

function ServiceCard({
  service,
  onOpen,
  registerRef,
  width
}: {
  service: Service;
  onOpen: (service: Service) => void;
  registerRef?: (element: HTMLElement | null) => void;
  width: number;
}) {
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    onOpen(service);
  };

  return (
    <article
      aria-label={service.title}
      className="relative min-w-0 flex-none"
      onClick={() => onOpen(service)}
      onKeyDown={handleKeyDown}
      ref={registerRef}
      role="button"
      style={{ width: `${width}px` }}
      tabIndex={0}
    >
      <div
        className="relative h-full cursor-pointer overflow-hidden rounded-[5px] bg-[#101A24] shadow-[0_24px_52px_rgba(6,14,24,0.18)] transition-shadow duration-300 hover:shadow-[0_30px_70px_rgba(6,14,24,0.2)]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_28%,transparent_66%,rgba(7,16,26,0.18))] opacity-80"
        />
        <div className="grid h-full min-h-[330px] grid-cols-[1fr] md:min-h-[320px] md:grid-cols-[47%_53%]">
          <div
            className="relative min-h-[190px] min-w-0 sm:min-h-[220px] md:h-full md:min-h-0"
          >
            <Image
              alt={service.imageAlt}
              className="object-cover"
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1279px) 40vw, 28vw"
              src={service.image}
            />
          </div>

          <div
            className="relative z-30 flex h-full min-w-0 flex-col justify-between bg-[#101A24] px-5 py-6 text-white sm:px-8 sm:py-8"
          >
            <p
              className="min-w-0 text-[13px] leading-6 text-white/78 sm:text-[15px] sm:leading-8"
              style={{
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 5,
                display: "-webkit-box",
                overflow: "hidden"
              }}
            >
              {service.description}
            </p>

            <h3 className="mt-6 min-h-[56px] min-w-0 break-words text-[23px] font-bold leading-tight tracking-[-0.03em] text-white sm:mt-8 sm:min-h-[72px] sm:text-[30px]">
              {service.title}
            </h3>
          </div>
        </div>
      </div>
    </article>
  );
}

function PackageCard({
  card,
  onOpen
}: {
  card: PackageCardItem;
  onOpen: (card: PackageCardItem) => void;
}) {
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    onOpen(card);
  };

  return (
    <article
      aria-label={card.title}
      className="min-w-0 cursor-pointer overflow-hidden rounded-[5px] bg-[#101A24] shadow-[0_24px_52px_rgba(6,14,24,0.18)] transition-shadow duration-300 hover:shadow-[0_30px_70px_rgba(6,14,24,0.2)]"
      onClick={() => onOpen(card)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className="relative min-h-[190px] sm:min-h-[220px]">
        <Image
          alt={card.title}
          className="object-cover"
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw"
          src="/images/packages-drone-cleaning.webp"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,14,24,0.04),rgba(6,14,24,0.24))]" />
      </div>

      <div className="flex min-h-[210px] flex-col justify-between px-5 py-6 text-white sm:min-h-[240px] sm:px-8 sm:py-8">
        <p className="text-[13px] leading-6 text-white/76 sm:text-[15px] sm:leading-8">
          {card.description}
        </p>
        <h3 className="mt-6 min-h-[58px] break-words text-[23px] font-bold leading-tight tracking-[-0.03em] text-white sm:mt-8 sm:min-h-[68px] sm:text-[29px]">
          {card.title}
        </h3>
      </div>
    </article>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#101A24] px-5 py-14 text-white sm:px-8 sm:py-16 lg:px-10 lg:py-20 xl:px-12">
      <ScrollReveal className="mx-auto w-full max-w-[1240px]">
        <div className="mx-auto max-w-[940px] text-center">
          <h2 className="text-[30px] font-bold leading-tight tracking-[-0.03em] text-white sm:text-4xl lg:text-[52px]">
            Հաճախակի տրվող հարցեր
          </h2>
        </div>

        <div className="mx-auto mt-10 w-full max-w-[1160px] border-y border-white/14 sm:mt-14">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div className="border-b border-white/14 last:border-b-0" key={item.question}>
                <button
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-0 py-5 text-left text-white transition-opacity duration-300 hover:opacity-[0.86] sm:gap-6 sm:py-7"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  type="button"
                >
                  <span className="text-[16px] font-semibold leading-7 tracking-[-0.02em] sm:text-[22px]">
                    {item.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`relative inline-flex h-7 w-7 shrink-0 items-center justify-center transition-transform duration-300 sm:h-8 sm:w-8 ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    <span className="absolute h-[2px] w-7 rounded-full bg-white transition-transform duration-300" />
                    <span className="absolute h-7 w-[2px] rounded-full bg-white transition-transform duration-300" />
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[920px] pb-6 text-[14px] leading-7 text-white/72 sm:pb-7 sm:text-[17px] sm:leading-8">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
}

function ContactSection() {
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const form = event.currentTarget;

    setSubmitState("sending");

    try {
      const response = await fetch("/api/contact", {
        body: JSON.stringify({ email, message, name, phone }),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      });

      if (!response.ok) {
        throw new Error("Contact request failed");
      }

      form.reset();
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <section className="relative overflow-hidden px-5 py-14 text-white sm:px-8 sm:py-16 lg:px-10 lg:py-20 xl:px-12" id="contact">
      <Image
        alt="Glass buildings contact background"
        className="object-cover"
        fill
        sizes="100vw"
        src="/images/contact-buildings.jpg"
      />
      <div className="absolute inset-0 bg-[#06101A]/48" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,16,26,0.58),rgba(6,16,26,0.24)_54%,rgba(6,16,26,0.58))]" />

      <ScrollReveal className="relative z-10 mx-auto w-full max-w-[980px]">
        <div className="text-center">
          <h2 className="text-[34px] font-bold leading-tight tracking-[-0.03em] text-white sm:text-5xl lg:text-[64px]">
            Կապ մեզ հետ
          </h2>
          <p className="mx-auto mt-4 max-w-[720px] text-[14px] leading-7 text-white/76 sm:mt-5 sm:text-[18px] sm:leading-8">
            Գրեք մեզ, եւ մենք կկապվենք ձեզ հետ հարմար ժամանակում:
          </p>
        </div>

        <form className="mx-auto mt-8 grid w-full max-w-[560px] gap-4 sm:mt-10 sm:gap-5" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-[14px] font-medium text-white/72">
            Անուն
            <input
              className="h-14 rounded-[5px] border border-white/18 bg-white px-5 text-[15px] text-[#101A24] outline-none transition-shadow duration-300 placeholder:text-[#101A24]/38 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.24)]"
              name="name"
              placeholder="Անուն"
              required
              type="text"
            />
          </label>

          <label className="grid gap-2 text-[14px] font-medium text-white/72">
            Հեռախոս
            <input
              className="h-14 rounded-[5px] border border-white/18 bg-white px-5 text-[15px] text-[#101A24] outline-none transition-shadow duration-300 placeholder:text-[#101A24]/38 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.24)]"
              name="phone"
              placeholder="ձեր Հեռախոսահամարը"
              required
              type="tel"
            />
          </label>

          <label className="grid gap-2 text-[14px] font-medium text-white/72">
            էլ. փոստը
            <input
              className="h-14 rounded-[5px] border border-white/18 bg-white px-5 text-[15px] text-[#101A24] outline-none transition-shadow duration-300 placeholder:text-[#101A24]/38 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.24)]"
              name="email"
              placeholder="էլ. փոստը"
              required
              type="email"
            />
          </label>

          <label className="grid gap-2 text-[14px] font-medium text-white/72">
            Հաղորդագրություն
            <textarea
              className="min-h-[132px] resize-y rounded-[5px] border border-white/18 bg-white px-5 py-4 text-[15px] text-[#101A24] outline-none transition-shadow duration-300 placeholder:text-[#101A24]/38 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.24)]"
              name="message"
              required
              placeholder="Հաղորդագրություն"
            />
          </label>

          <button
            className="mt-2 inline-flex h-14 cursor-pointer items-center justify-center rounded-[5px] border border-[#101A24] bg-[#101A24] px-8 text-sm font-semibold text-white transition-opacity duration-300 hover:opacity-[0.86] disabled:cursor-not-allowed disabled:opacity-70"
            disabled={submitState === "sending"}
            type="submit"
          >
            ուղարկել
          </button>
          {submitState === "success" ? (
            <p className="text-center text-sm font-medium text-white">
              {"\u0540\u0561\u0572\u0578\u0580\u0564\u0561\u0563\u0580\u0578\u0582\u0569\u0575\u0578\u0582\u0576\u0568 \u0578\u0582\u0572\u0561\u0580\u056f\u057e\u0565\u0581:"}
            </p>
          ) : null}
          {submitState === "error" ? (
            <p className="text-center text-sm font-medium text-white">
              {"\u0549\u0570\u0561\u057b\u0578\u0572\u057e\u0565\u0581 \u0578\u0582\u0572\u0561\u0580\u056f\u0565\u056c: \u0553\u0578\u0580\u0571\u0565\u0584 \u056f\u0580\u056f\u056b\u0576:"}
            </p>
          ) : null}
        </form>
      </ScrollReveal>
    </section>
  );
}

export function ServicesSection() {
  const firstCardRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const modalCloseTimeoutRef = useRef<number | null>(null);
  const packageModalCloseTimeoutRef = useRef<number | null>(null);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [stepWidth, setStepWidth] = useState(0);
  const [edgeOffset, setEdgeOffset] = useState(0);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<PackageCardItem | null>(null);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [isPackageModalClosing, setIsPackageModalClosing] = useState(false);
  const [isModalImageExpanded, setIsModalImageExpanded] = useState(false);

  const openServiceModal = useCallback((service: Service) => {
    if (modalCloseTimeoutRef.current !== null) {
      window.clearTimeout(modalCloseTimeoutRef.current);
      modalCloseTimeoutRef.current = null;
    }

    setIsModalClosing(false);
    setIsModalImageExpanded(false);
    setSelectedService(service);
  }, []);

  const closeServiceModal = useCallback(() => {
    if (!selectedService || isModalClosing) {
      return;
    }

    setIsModalClosing(true);
    modalCloseTimeoutRef.current = window.setTimeout(() => {
      setSelectedService(null);
      setIsModalClosing(false);
      modalCloseTimeoutRef.current = null;
    }, 220);
  }, [isModalClosing, selectedService]);

  const openPackageModal = useCallback((card: PackageCardItem) => {
    if (packageModalCloseTimeoutRef.current !== null) {
      window.clearTimeout(packageModalCloseTimeoutRef.current);
      packageModalCloseTimeoutRef.current = null;
    }

    setIsPackageModalClosing(false);
    setSelectedPackage(card);
  }, []);

  const closePackageModal = useCallback(() => {
    if (!selectedPackage || isPackageModalClosing) {
      return;
    }

    setIsPackageModalClosing(true);
    packageModalCloseTimeoutRef.current = window.setTimeout(() => {
      setSelectedPackage(null);
      setIsPackageModalClosing(false);
      packageModalCloseTimeoutRef.current = null;
    }, 220);
  }, [isPackageModalClosing, selectedPackage]);

  useEffect(() => {
    return () => {
      if (modalCloseTimeoutRef.current !== null) {
        window.clearTimeout(modalCloseTimeoutRef.current);
      }

      if (packageModalCloseTimeoutRef.current !== null) {
        window.clearTimeout(packageModalCloseTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const syncLayout = () => {
      if (window.innerWidth >= 1280) {
        setCardsPerView(3);
        return;
      }

      if (window.innerWidth >= 768) {
        setCardsPerView(2);
        return;
      }

      setCardsPerView(1);
    };

    syncLayout();
    window.addEventListener("resize", syncLayout);

    return () => window.removeEventListener("resize", syncLayout);
  }, []);

  useEffect(() => {
    const measureCards = () => {
      const firstCard = firstCardRef.current;
      const viewport = viewportRef.current;

      if (!firstCard || !viewport) {
        return;
      }

      const viewportWidth = viewport.getBoundingClientRect().width;
      const nextEdgeOffset = viewportWidth * EDGE_GUTTER_RATIO;
      const nextCardWidth = (viewportWidth - nextEdgeOffset - (CARD_GAP * (cardsPerView - 1))) / cardsPerView;

      setCardWidth(nextCardWidth);
      setStepWidth(nextCardWidth + CARD_GAP);
      setEdgeOffset(nextEdgeOffset);
    };

    measureCards();

    const firstCard = firstCardRef.current;

    if (!firstCard || typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(() => {
      measureCards();
    });

    observer.observe(firstCard);

    return () => observer.disconnect();
  }, [cardsPerView]);

  const maxIndex = Math.max(services.length - cardsPerView, 0);
  const canScrollPrev = activeIndex > 0;
  const canScrollNext = activeIndex < maxIndex;

  useEffect(() => {
    setActiveIndex((currentIndex) => Math.min(currentIndex, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (maxIndex <= 0) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex >= maxIndex ? 0 : currentIndex + 1));
    }, 2000);

    return () => window.clearInterval(intervalId);
  }, [maxIndex]);

  useEffect(() => {
    if (!selectedService && !selectedPackage) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        if (selectedService) {
          closeServiceModal();
        }

        if (selectedPackage) {
          closePackageModal();
        }
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closePackageModal, closeServiceModal, selectedPackage, selectedService]);

  const currentTranslate =
    activeIndex === 0
      ? 0
      : edgeOffset + (activeIndex * stepWidth);

  const trackStyle = {
    transform: `translate3d(-${currentTranslate}px, 0, 0)`
  };

  return (
    <section
      className="relative overflow-hidden bg-white pb-0 pt-14 text-[#101A24] sm:pt-16 lg:pt-20"
      id="services"
      style={sectionFont}
    >
      <ScrollReveal className="w-full">
        <div className="mx-auto max-w-[920px] px-5 text-center sm:px-8 lg:px-10 xl:px-12">
          <h2 className="text-[30px] font-bold leading-tight tracking-[-0.03em] text-[#101A24] sm:text-4xl lg:text-[52px]">
            Մեր Ծառայությունները
          </h2>
          <p className="mx-auto mt-5 max-w-[860px] text-[14px] leading-7 text-[#101A24]/72 sm:mt-6 sm:text-[18px] sm:leading-8">
            AirWash-ը առաջարկում է drone մաքրման ծառայություններ այն օբյեկտների համար, որտեղ կարևոր են արագությունը,
            անվտանգությունն ու ներկայացուցչական վերջնական արդյունքը։
          </p>
        </div>

        <div className="relative mt-10 w-full sm:mt-14">
          <button
            aria-label="Previous services"
            className="absolute left-[5%] top-1/2 z-20 inline-flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#101A24]/18 bg-white text-[#101A24] shadow-[0_12px_26px_rgba(6,14,24,0.12)] transition-all duration-300 hover:-translate-x-[56%] hover:-translate-y-1/2 hover:scale-[1.04] hover:bg-white active:scale-[0.98] disabled:cursor-not-allowed disabled:border-[#101A24]/8 disabled:bg-white disabled:text-[#101A24]/30 disabled:shadow-none disabled:hover:-translate-x-1/2 disabled:hover:-translate-y-1/2 disabled:hover:scale-100 disabled:hover:bg-white sm:left-[3%] sm:h-12 sm:w-12"
            disabled={!canScrollPrev}
            onClick={() => setActiveIndex((currentIndex) => Math.max(currentIndex - 1, 0))}
            type="button"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>

          <button
            aria-label="Next services"
            className="absolute right-[5%] top-1/2 z-20 inline-flex h-10 w-10 translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#101A24]/18 bg-white text-[#101A24] shadow-[0_12px_26px_rgba(6,14,24,0.12)] transition-all duration-300 hover:translate-x-[56%] hover:-translate-y-1/2 hover:scale-[1.04] hover:bg-white active:scale-[0.98] disabled:cursor-not-allowed disabled:border-[#101A24]/8 disabled:bg-white disabled:text-[#101A24]/30 disabled:shadow-none disabled:hover:translate-x-1/2 disabled:hover:-translate-y-1/2 disabled:hover:scale-100 disabled:hover:bg-white sm:right-[3%] sm:h-12 sm:w-12"
            disabled={!canScrollNext}
            onClick={() => setActiveIndex((currentIndex) => Math.min(currentIndex + 1, maxIndex))}
            type="button"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>

          <div className="overflow-x-hidden bg-white" ref={viewportRef}>
            <div
              className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={trackStyle}
            >
              <div aria-hidden="true" className="shrink-0" style={{ width: `${edgeOffset}px` }} />
              <div className="flex gap-6">
                {services.map((service, index) => (
                  <ServiceCard
                    key={service.title}
                    onOpen={openServiceModal}
                    registerRef={index === 0 ? (element) => { firstCardRef.current = element; } : undefined}
                    service={service}
                    width={cardWidth}
                  />
                ))}
              </div>
              <div aria-hidden="true" className="shrink-0" style={{ width: `${edgeOffset}px` }} />
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center px-5 sm:mt-12 sm:px-8 lg:px-10 xl:px-12">
          <a
            className="inline-flex items-center justify-center gap-3 rounded-[5px] border border-[#101A24] bg-white px-8 py-4 text-sm font-medium text-[#101A24] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#F2F4F6]"
            href="#contact"
          >
            Կապ մեզ հետ
          </a>
        </div>
      </ScrollReveal>

      <div className="relative mt-14 h-[240px] w-full overflow-hidden sm:mt-20 sm:h-[360px] lg:h-[540px]">
        <Image
          alt="Drone cleaning glass facade"
          className="object-cover"
          fill
          sizes="100vw"
          src="/images/packages-drone-cleaning.webp"
        />
      </div>

      <section className="bg-white px-5 py-14 text-[#101A24] sm:px-8 sm:py-16 lg:px-10 lg:py-20 xl:px-12" id="packages">
        <ScrollReveal className="mx-auto w-full max-w-[1480px]">
          <div className="mx-auto max-w-[1180px] text-center">
            <h2 className="text-[30px] font-bold leading-tight tracking-[-0.03em] text-[#101A24] sm:text-4xl lg:text-[52px]">
              Փաթեթներ
            </h2>
            <p className="mx-auto mt-5 max-w-[1120px] text-[14px] leading-7 text-[#101A24]/72 sm:mt-6 sm:text-[18px] sm:leading-8">
              Մենք առաջարկում ենք խելացի փաթեթներ ձեզ համար, արժեքը գոյանում է{" "}
              {pricingFactors.map((factor, index) => (
                <span key={factor}>
                  <span className="font-medium text-[#101A24] underline decoration-[#101A24] decoration-2 underline-offset-4">
                    {factor}
                  </span>
                  {index < pricingFactors.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-2 md:gap-7 xl:grid-cols-4">
            {packageCards.map((card) => (
              <PackageCard card={card} key={card.title} onOpen={openPackageModal} />
            ))}
          </div>
        </ScrollReveal>
      </section>

      <FaqSection />
      <ContactSection />

      {selectedService ? (
        <div
          aria-modal="true"
          className={`airwash-modal-backdrop fixed inset-0 z-[70] flex items-center justify-center bg-[#06101A]/72 px-4 py-6 backdrop-blur-sm sm:px-6 ${
            isModalClosing ? "is-closing" : ""
          }`}
          onClick={closeServiceModal}
          role="dialog"
        >
          <div
            className={`airwash-modal-panel relative grid h-[88vh] max-h-[620px] w-full max-w-[1120px] grid-rows-[240px_1fr] overflow-hidden rounded-[5px] bg-[#101A24] text-white shadow-[0_34px_100px_rgba(6,14,24,0.34)] transition-[grid-template-columns] duration-300 lg:grid-rows-none lg:overflow-visible ${
              isModalImageExpanded ? "lg:grid-cols-[100%_0%]" : "lg:grid-cols-[30%_70%]"
            } ${
              isModalClosing ? "is-closing" : ""
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              aria-label="Close service details"
              className="absolute right-4 top-4 z-30 inline-flex cursor-pointer items-center justify-center p-0 text-white drop-shadow-[0_2px_10px_rgba(6,14,24,0.42)] transition-opacity duration-300 hover:opacity-[0.78]"
              onClick={closeServiceModal}
              type="button"
            >
              <Icon aria-hidden="true" icon="mdi:close" style={{ color: "#FFFFFF" }} width="32" />
            </button>

            <button
              aria-label={isModalImageExpanded ? "Show service details" : "Expand service image"}
              className={`absolute top-1/2 z-40 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-[#101A24] text-white shadow-[0_10px_28px_rgba(6,14,24,0.24)] transition-[left,opacity] duration-300 hover:opacity-[0.82] lg:inline-flex ${
                isModalImageExpanded ? "left-full" : "left-[30%]"
              }`}
              onClick={() => setIsModalImageExpanded((isExpanded) => !isExpanded)}
              type="button"
            >
              <Icon
                aria-hidden="true"
                icon={isModalImageExpanded ? "solar:alt-arrow-left-linear" : "solar:alt-arrow-right-linear"}
                width="22"
              />
            </button>

            <div
              className={`relative min-h-0 overflow-hidden rounded-t-[5px] lg:h-full lg:min-h-0 lg:rounded-l-[5px] lg:rounded-tr-none ${
                isModalImageExpanded ? "lg:rounded-r-[5px]" : "lg:rounded-r-none"
              }`}
            >
              <Image
                alt={selectedService.imageAlt}
                className="object-cover"
                fill
                sizes="(max-width: 1023px) 100vw, 336px"
                src={selectedService.image}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,14,24,0.02),rgba(6,14,24,0.18))]" />
            </div>

            <div
              className={`overflow-hidden rounded-b-[5px] px-5 py-6 sm:px-8 sm:py-8 lg:rounded-b-none lg:rounded-r-[5px] ${
                isModalImageExpanded
                  ? "lg:border-l-0 lg:px-0 lg:py-0"
                  : "lg:border-l lg:border-white/12 lg:px-10 lg:py-12"
              }`}
            >
              <div
                className={`h-full overflow-y-auto transition-opacity duration-200 ${
                  isModalImageExpanded ? "pointer-events-none opacity-0" : "opacity-100"
                }`}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/48">
                  AirWash
                </p>
                <h3 className="mt-4 max-w-[720px] text-[26px] font-bold leading-tight tracking-[-0.03em] text-white sm:text-[38px]">
                  {selectedService.title}
                </h3>
                <p className="mt-5 max-w-[760px] text-[14px] leading-7 text-white/76 sm:mt-7 sm:text-[18px] sm:leading-9">
                  {selectedService.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {selectedPackage ? (
        <div
          aria-modal="true"
          className={`airwash-modal-backdrop fixed inset-0 z-[70] flex items-center justify-center bg-[#06101A]/72 px-4 py-6 backdrop-blur-sm sm:px-6 ${
            isPackageModalClosing ? "is-closing" : ""
          }`}
          onClick={closePackageModal}
          role="dialog"
        >
          <div
            className={`airwash-modal-panel relative grid h-[88vh] max-h-[620px] w-full max-w-[1120px] grid-rows-[240px_1fr] overflow-hidden rounded-[5px] bg-[#101A24] text-white shadow-[0_34px_100px_rgba(6,14,24,0.34)] lg:grid-cols-[30%_70%] lg:grid-rows-none ${
              isPackageModalClosing ? "is-closing" : ""
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              aria-label="Close package details"
              className="absolute right-4 top-4 z-30 inline-flex cursor-pointer items-center justify-center p-0 text-white drop-shadow-[0_2px_10px_rgba(6,14,24,0.42)] transition-opacity duration-300 hover:opacity-[0.78]"
              onClick={closePackageModal}
              type="button"
            >
              <Icon aria-hidden="true" icon="mdi:close" style={{ color: "#FFFFFF" }} width="32" />
            </button>

            <div className="relative min-h-0 overflow-hidden rounded-t-[5px] lg:h-full lg:min-h-0 lg:rounded-l-[5px] lg:rounded-r-none lg:rounded-tr-none">
              <Image
                alt={selectedPackage.title}
                className="object-cover"
                fill
                sizes="(max-width: 1023px) 100vw, 336px"
                src="/images/packages-drone-cleaning.webp"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,14,24,0.02),rgba(6,14,24,0.18))]" />
            </div>

            <div className="overflow-hidden rounded-b-[5px] px-5 py-6 sm:px-8 sm:py-8 lg:rounded-b-none lg:rounded-r-[5px] lg:border-l lg:border-white/12 lg:px-10 lg:py-12">
              <div className="h-full overflow-y-auto">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/48">
                  Փաթեթներ
                </p>
                <h3 className="mt-4 max-w-[720px] text-[26px] font-bold leading-tight tracking-[-0.03em] text-white sm:text-[38px]">
                  {selectedPackage.title}
                </h3>
                <p className="mt-5 max-w-[760px] text-[14px] leading-7 text-white/76 sm:mt-7 sm:text-[18px] sm:leading-9">
                  {selectedPackage.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-x-4 gap-y-3 text-[15px] leading-7">
                  {pricingFactors.map((factor) => (
                    <span
                      className="font-medium text-white underline decoration-white/76 decoration-2 underline-offset-4"
                      key={factor}
                    >
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export function ServicesVideoSection() {
  return (
    <section className="relative h-[220px] w-full bg-[#0B141D] sm:h-[320px] lg:h-[430px]" style={sectionFont}>
      <ScrollReveal className="h-full w-full">
        <div className="relative h-full w-full overflow-hidden">
          <video
            autoPlay
            className="h-full w-full object-cover"
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source src="/videos/services-showcase.mp4" type="video/mp4" />
          </video>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(35,41,48,0.3),rgba(18,23,29,0.66))]"
          />
          <div className="hidden">
            <div className="mx-auto flex w-full max-w-[1240px] justify-center text-center">
              <h2 className="max-w-[1100px] text-[28px] font-bold leading-tight tracking-[-0.03em] text-white sm:text-[38px] lg:whitespace-nowrap lg:text-[52px]">
                Մեր ծառայությունը տրամադրում է
              </h2>
            </div>

            <div className="mx-auto mt-18 flex w-full max-w-[1180px] flex-col gap-8 sm:mt-20 sm:gap-10 lg:mt-24">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center lg:gap-4">
                  {firstVideoHighlightRow.map(({ label, icon, description }, index) => (
                    <div key={label} className="contents">
                      <div className="mx-auto flex w-full max-w-[320px] flex-col items-center text-center">
                        <Icon className="h-11 w-11 text-[#101A24] sm:h-12 sm:w-12" icon={icon} />
                        <span className="mt-3 max-w-[240px] text-[16px] font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[18px]">
                          {label}
                        </span>
                        <p className="mt-4 max-w-[300px] text-[13px] leading-7 text-white/76 sm:text-[14px] sm:leading-8">
                          {description}
                        </p>
                      </div>
                      {index < firstVideoHighlightRow.length - 1 ? (
                        <div className="hidden lg:block lg:w-14 lg:self-start lg:pt-6">
                          <div className="h-px w-full bg-white/34" />
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center lg:gap-4">
                  {secondVideoHighlightRow.map(({ label, icon, description }, index) => (
                    <div key={label} className="contents">
                      <div className="mx-auto flex w-full max-w-[320px] flex-col items-center text-center">
                        <Icon className="h-11 w-11 text-[#101A24] sm:h-12 sm:w-12" icon={icon} />
                        <span className="mt-3 max-w-[240px] text-[16px] font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[18px]">
                          {label}
                        </span>
                        <p className="mt-4 max-w-[300px] text-[13px] leading-7 text-white/76 sm:text-[14px] sm:leading-8">
                          {description}
                        </p>
                      </div>
                      {index < secondVideoHighlightRow.length - 1 ? (
                        <div className="hidden lg:block lg:w-14 lg:self-start lg:pt-6">
                          <div className="h-px w-full bg-white/34" />
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
