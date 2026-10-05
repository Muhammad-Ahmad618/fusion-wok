"use client";
import { useEffect, useState } from "react";
import { Deal } from "@/types";

interface HeroProps {
  deals: Deal[];
}

export default function Hero({ deals }: HeroProps) {
  const [i, setI] = useState<number>(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % deals.length), 5000);
    return () => clearInterval(t);
  }, [i, deals.length]); // restarting on i resets the timer after a manual click

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand to-brand-dark text-white">
      <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${i * 100}%)` }}>
        {deals.map((d) => (
          <div key={d.title} className="min-w-full pb-16 pt-12">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5">
              <div>
                <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-extrabold text-brand">{d.tag}</span>
                <h1 className="my-3 max-w-xl text-4xl font-extrabold leading-tight md:text-5xl">{d.title}</h1>
                <p className="mb-5 max-w-md opacity-95">{d.text}</p>
                <a href={d.href} className="inline-block rounded-xl bg-white px-6 py-3 font-bold text-brand">{d.cta}</a>
                <span className="ml-3 inline-block rounded-xl border-2 border-dashed border-white px-3.5 py-2 text-sm">Code: {d.code}</span>
              </div>
              <div className="hidden text-[170px] leading-none drop-shadow-2xl sm:block">{d.emoji}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-5 flex justify-center gap-2">
        {deals.map((d, n) => (
          <button key={d.title} onClick={() => setI(n)} aria-label={`Slide ${n + 1}`}
            className={`h-2.5 rounded-full transition-all ${n === i ? "w-6 bg-white" : "w-2.5 bg-white/50"}`} />
        ))}
      </div>
    </section>
  );
}
