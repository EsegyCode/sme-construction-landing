"use client";

import { useState } from "react";
import Image from "next/image";
import CalcModal from "./CalcModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    {
      title: "Modern Barnhouse",
      location: "Київська обл., с. Романівка",
      area: "145 м²",
      material: "Керамоблок",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
    },
    {
      title: "Hi-Tech Квадро",
      location: "Львівська обл., смт Брюховичі",
      area: "210 м²",
      material: "Моноліт + Цегла",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
    },
    {
      title: "Класичний котедж",
      location: "Одеська обл., м. Чорноморськ",
      area: "185 м²",
      material: "Газоблок",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
    }
  ];

  return (
    <main className="relative min-h-screen bg-[#111111] text-white selection:bg-orange-500 selection:text-white scroll-smooth">
      
      {/* ================= HERO SECTION ================= */}
      <div className="relative min-h-screen overflow-hidden bg-[#1a1a1a]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80"
            alt="Будівництво котеджу"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/95 via-[#1a1a1a]/80 to-[#1a1a1a]/40" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#111111] to-transparent" />
        </div>

        <div className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-orange-600 via-orange-400 to-orange-600 z-10" />

        <header className="relative z-10 flex items-center justify-between px-8 py-6 md:px-16">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-orange-500 text-white font-black text-lg tracking-tighter select-none">
              БК
            </div>
            <span className="text-white font-bold text-lg tracking-wide" style={{ fontFamily: "'Georgia', serif" }}>
              БудПроф
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300 font-medium tracking-wide">
            <a href="#services" className="hover:text-orange-400 transition-colors">Послуги</a>
            <a href="#projects" className="hover:text-orange-400 transition-colors">Проєкти</a>
            <a href="#contacts" className="hover:text-orange-400 transition-colors">Контакти</a>
          </nav>
        </header>

        <section className="relative z-10 flex min-h-[calc(100vh-88px)] flex-col justify-center px-8 md:px-16 pb-24">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2">
              <span className="h-px w-8 bg-orange-500" />
              <span className="text-orange-400 text-xs font-semibold uppercase tracking-[0.2em]">Котеджне будівництво</span>
            </div>

            <h1 className="mb-6 text-5xl font-black leading-[1.05] text-white md:text-7xl" style={{ fontFamily: "'Georgia', serif" }}>
              Будуємо <span className="relative inline-block text-orange-500">котеджі<span className="absolute -bottom-1 left-0 h-1 w-full bg-orange-600/60 rounded-full" /></span>,<br />що стають <span className="text-gray-300">домом</span>
            </h1>

            <p className="mb-10 max-w-lg text-base text-gray-400 leading-relaxed md:text-lg">
              Проєктуємо та зводимо приватні будинки під ключ — від фундаменту до оздоблення. Понад 12 років досвіду, 340+ зданих об'єктів.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="group relative overflow-hidden rounded-none bg-orange-500 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-orange-400 active:scale-95"
              >
                <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-full skew-x-12" />
                <span className="relative flex items-center gap-2">
                  Дізнатись вартість
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>

              <a href="#projects" className="group flex items-center gap-2 border border-gray-600 px-8 py-4 text-sm font-bold uppercase tracking-widest text-gray-300 transition-all duration-300 hover:border-orange-500 hover:text-orange-400 active:scale-95">
                Наші роботи
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Секції: Services, Projects, Contacts залишилися без змін (ви їх видалили для стислості) */}
      
      {/* Підключення калькулятора */}
      <CalcModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
    {/* ================= SERVICES SECTION ================= */}
      <section id="services" className="py-24 px-8 md:px-16 bg-[#121212]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black mb-16 text-white" style={{ fontFamily: "'Georgia', serif" }}>Наші послуги</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Проєктування", desc: "Створення індивідуальних архітектурних проєктів під ваш запит." },
              { title: "Будівництво", desc: "Зведення конструктиву будинку будь-якої складності." },
              { title: "Оздоблення", desc: "Фінішні роботи та облаштування прилеглої території." }
            ].map((service, i) => (
              <div key={i} className="p-8 border border-gray-800 hover:border-orange-500 transition-colors bg-[#1A1A1A]">
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROJECTS SECTION ================= */}
      <section id="projects" className="py-24 px-8 md:px-16 bg-[#111111]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black mb-16 text-white" style={{ fontFamily: "'Georgia', serif" }}>Наші проєкти</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative h-64 overflow-hidden mb-4">
                  <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="text-lg font-bold">{p.title}</h3>
                <p className="text-orange-500 text-sm">{p.location}</p>
                <p className="text-gray-500 text-sm">{p.area} • {p.material}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACTS SECTION ================= */}
      <section id="contacts" className="py-24 px-8 md:px-16 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-8 text-white" style={{ fontFamily: "'Georgia', serif" }}>Готові до початку?</h2>
          <p className="text-gray-400 mb-12">Зв'яжіться з нами для безкоштовної консультації та прорахунку вартості вашого майбутнього дому.</p>
          <div className="flex flex-col gap-4 items-center">
            <a href="tel:+380990000000" className="text-2xl font-bold hover:text-orange-500 transition-colors">+380 (99) 000-00-00</a>
            <p className="text-gray-500">м. Київ, вул. Будівельна, 1</p>
          </div>
        </div>
      </section>

    </main>
  );
}