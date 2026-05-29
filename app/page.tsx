"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Стан для калькулятора
  const [fLength, setFLength] = useState(10); // Довжина фундаменту
  const [fWidth, setFWidth] = useState(10);   // Ширина фундаменту
  const [floors, setFloors] = useState(1);    // Поверховість
  const [area, setArea] = useState(100);      // Квадратні метри
  const [wallMaterial, setWallMaterial] = useState("gasblock"); // Матеріал стін
  const [includeWater, setIncludeWater] = useState(false);     // Вода
  const [includeElectricity, setIncludeElectricity] = useState(false); // Електрика
  const [totalPrice, setTotalPrice] = useState(0);

  // Розрахунок вартості при зміні будь-якого параметра
  useEffect(() => {
    // 1. Фундамент: периметр * ціну за пог. метр
    const perimeter = (Number(fLength) + Number(fWidth)) * 2;
    const foundationCost = perimeter * 4500;

    // 2. Базова вартість коробки та даху за кв.м
    let basePricePerM2 = 9000;

    // 3. Надбавка за матеріал стін
    if (wallMaterial === "brick") basePricePerM2 += 2500;
    if (wallMaterial === "keramoblock") basePricePerM2 += 4000;

    // 4. Коефіцієнт поверховості (2 поверхи збільшують складність конструкції)
    const floorCoefficient = floors === 2 ? 1.2 : 1;

    // 5. Розрахунок вартості самої будівлі
    const buildingCost = area * basePricePerM2 * floorCoefficient;

    // 6. Додаткові комунікації
    const waterCost = includeWater ? 40000 : 0;
    const electricityCost = includeElectricity ? 35000 : 0;

    // Фінальна сума
    setTotalPrice(foundationCost + buildingCost + waterCost + electricityCost);
  }, [fLength, fWidth, floors, area, wallMaterial, includeWater, includeElectricity]);

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

            <div className="mt-16 flex flex-wrap gap-10">
              {[
                { value: "340+", label: "Зданих об'єктів" },
                { value: "12", label: "Років досвіду" },
                { value: "98%", label: "Клієнтів задоволені" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-3xl font-black text-orange-500 md:text-4xl" style={{ fontFamily: "'Georgia', serif" }}>{stat.value}</span>
                  <span className="mt-0.5 text-xs uppercase tracking-widest text-gray-500">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ================= SERVICES SECTION ================= */}
      <section id="services" className="bg-[#111111] py-24 px-8 md:px-16 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-orange-500" />
              <span className="text-orange-400 text-xs font-semibold uppercase tracking-[0.2em]">Наші послуги</span>
            </div>
            <h2 className="text-4xl font-black md:text-5xl" style={{ fontFamily: "'Georgia', serif" }}>
              Комплексні рішення для <span className="text-orange-500">SME</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { t: "Проєктування", d: "Створення архітектурних рішень, 3D-візуалізація, розробка документації АР та КР.", p: "від 450 грн/м²" },
              { t: "Будівництво коробки", d: "Зведення фундаменту, капітальних стін, міжповерхових перекриттів та покрівлі.", p: "від 8 500 грн/м²" },
              { t: "Будинки під ключ", d: "Повний цикл від геодезії поля до фінішного оздоблення, електрики та комунікацій.", p: "від 16 000 грн/м²" }
            ].map((srv, i) => (
              <div key={i} className="border border-gray-800 bg-[#161616] p-8 hover:border-orange-500/40 transition-all group">
                <span className="text-xs font-mono text-gray-600 block mb-6">// 0{i+1}</span>
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-orange-400 transition-colors">{srv.t}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-8">{srv.d}</p>
                <div className="border-t border-gray-800 pt-4 mt-auto">
                  <span className="text-xs text-gray-500 block uppercase tracking-wider mb-1">Вартість робіт</span>
                  <span className="text-sm font-semibold text-orange-400">{srv.p}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PORTFOLIO SECTION ================= */}
      <section id="projects" className="bg-[#161616] py-24 px-8 md:px-16 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-orange-500" />
              <span className="text-orange-400 text-xs font-semibold uppercase tracking-[0.2em]">Портфоліо</span>
            </div>
            <h2 className="text-4xl font-black md:text-5xl" style={{ fontFamily: "'Georgia', serif" }}>
              Об'єкти, якими ми <span className="text-orange-500">пишаємось</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((proj, i) => (
              <div key={i} className="group relative overflow-hidden bg-[#111111] border border-gray-800">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image 
                    src={proj.image} 
                    alt={proj.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{proj.title}</h3>
                  <p className="text-xs text-orange-400 mb-4 font-medium">{proj.location}</p>
                  <div className="flex justify-between border-t border-gray-800 pt-4 text-xs text-gray-400">
                    <div>
                      <span className="block text-gray-500 mb-0.5">Площа</span>
                      <span className="font-semibold text-gray-200">{proj.area}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-gray-500 mb-0.5">Матеріал стін</span>
                      <span className="font-semibold text-gray-200">{proj.material}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACTS SECTION ================= */}
      <section id="contacts" className="bg-[#111111] py-24 px-8 md:px-16 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-px w-8 bg-orange-500" />
                <span className="text-orange-400 text-xs font-semibold uppercase tracking-[0.2em]">Зв'язок з нами</span>
              </div>
              <h2 className="text-4xl font-black md:text-5xl mb-8" style={{ fontFamily: "'Georgia', serif" }}>
                Обговоримо ваш <span className="text-orange-500">проєкт?</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-md">
                Завітайте до нашого офісу для безкоштовної консультації з архітектором або зателефонуйте нам прямо зараз.
              </p>

              <div className="space-y-6">
                <div>
                  <span className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Головний офіс</span>
                  <p className="text-base text-gray-200 font-medium">м. Київ, вул. Михайла Максимовича, 24</p>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Телефони</span>
                  <a href="tel:+380441234567" className="text-base text-gray-200 font-medium hover:text-orange-400 block transition-colors">+380 (44) 123-45-67</a>
                  <a href="tel:+380671234567" className="text-base text-gray-200 font-medium hover:text-orange-400 block transition-colors">+380 (67) 123-45-67</a>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <a href="#" className="bg-[#24A1DE] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:opacity-90 transition-opacity">Telegram</a>
                <a href="#" className="bg-[#7360F2] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:opacity-90 transition-opacity">Viber</a>
              </div>
            </div>

            <div className="relative h-96 w-full border border-gray-800 bg-[#161616] overflow-hidden group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!11m12!1m3!1d2543.8346083163773!2d30.4855581!3d50.3882773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1suk!2sua!4v1700000000000" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                loading="lazy"
                className="opacity-70 grayscale invert contrast-125 transition-opacity group-hover:opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#0b0b0b] py-8 px-8 md:px-16 border-t border-gray-900 text-xs text-gray-600">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p>© {new Date().getFullYear()} БК БудПроф. Усі права захищено.</p>
          </div>
        </div>
      </footer>

      {/* ================= МОДАЛЬНЕ ВІКНО-КАЛЬКУЛЯТОР ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#161616] border border-gray-800 p-6 md:p-8 text-white my-8">
            
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-orange-500 transition-colors text-2xl font-light"
            >
              &times;
            </button>

            <div className="mb-6">
              <span className="text-orange-500 text-xs font-mono uppercase tracking-wider block mb-1">// Інженерний калькулятор</span>
              <h3 className="text-2xl font-black tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>
                Точний розрахунок вартості
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* ЛІВА ЧАСТИНА: НАЛАШТУВАННЯ */}
              <div className="space-y-4">
                
                {/* Розмір фундаменту */}
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-1.5 font-bold">
                    Розмір фундаменту: {fLength}м × {fWidth}м
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-[#111111] border border-gray-800 p-2 flex flex-col">
                      <span className="text-[9px] text-gray-500 uppercase">Довжина</span>
                      <input 
                        type="range" min="5" max="25" value={fLength} 
                        onChange={(e) => setFLength(Number(e.target.value))}
                        className="w-full accent-orange-500 mt-1"
                      />
                    </div>
                    <div className="bg-[#111111] border border-gray-800 p-2 flex flex-col">
                      <span className="text-[9px] text-gray-500 uppercase">Ширина</span>
                      <input 
                        type="range" min="5" max="25" value={fWidth} 
                        onChange={(e) => setFWidth(Number(e.target.value))}
                        className="w-full accent-orange-500 mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Поверховість */}
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-1.5 font-bold">Поверховість</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[1, 2].map((num) => (
                      <button
                        key={num} type="button"
                        onClick={() => { setFloors(num); setArea(fLength * fWidth * num); }}
                        className={`py-2 text-xs font-bold uppercase border tracking-wider transition-colors ${floors === num ? 'bg-orange-500 border-orange-500 text-white' : 'bg-[#111111] border-gray-800 text-gray-400 hover:border-gray-700'}`}
                      >
                        {num} Поверх{num > 1 ? 'и' : ''}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Площа будинку */}
                <div>
                  <div className="flex justify-between text-[11px] uppercase tracking-widest text-gray-400 mb-1.5 font-bold">
                    <span>Загальна площа:</span>
                    <span className="text-orange-400">{area} м²</span>
                  </div>
                  <input 
                    type="range" min="40" max="400" value={area} 
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full accent-orange-500"
                  />
                </div>

                {/* Матеріал стін */}
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-1.5 font-bold">Матеріал капітальних стін</label>
                  <div className="space-y-1.5">
                    {[
                      { id: "gasblock", name: "Газоблок (Оптимально)" },
                      { id: "brick", name: "Цегла (Класика)" },
                      { id: "keramoblock", name: "Керамоблок (Преміум)" }
                    ].map((mat) => (
                      <label key={mat.id} className={`flex items-center gap-3 px-3 py-2 border cursor-pointer text-xs font-medium transition-colors ${wallMaterial === mat.id ? 'bg-[#1e1a15] border-orange-500/60 text-orange-400' : 'bg-[#111111] border-gray-800 text-gray-400 hover:border-gray-700'}`}>
                        <input 
                          type="radio" name="material" checked={wallMaterial === mat.id}
                          onChange={() => setWallMaterial(mat.id)}
                          className="accent-orange-500 h-4 w-4"
                        />
                        {mat.name}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Комунікації */}
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-1.5 font-bold">Додаткові мережі</label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className={`flex items-center gap-2 p-2 border text-xs cursor-pointer select-none ${includeWater ? 'border-orange-500 bg-[#1e1a15] text-orange-400' : 'border-gray-800 bg-[#111111] text-gray-400'}`}>
                      <input type="checkbox" checked={includeWater} onChange={(e) => setIncludeWater(e.target.checked)} className="accent-orange-500" />
                      Підведення води
                    </label>
                    <label className={`flex items-center gap-2 p-2 border text-xs cursor-pointer select-none ${includeElectricity ? 'border-orange-500 bg-[#1e1a15] text-orange-400' : 'border-gray-800 bg-[#111111] text-gray-400'}`}>
                      <input type="checkbox" checked={includeElectricity} onChange={(e) => setIncludeElectricity(e.target.checked)} className="accent-orange-500" />
                      Електрика
                    </label>
                  </div>
                </div>

              </div>

              {/* ПРАВА ЧАСТИНА: РЕЗУЛЬТАТ ТА ФОРМА */}
              <div className="bg-[#111111] border border-gray-800 p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase text-gray-500 font-mono tracking-wider block mb-1">// Орієнтовний бюджет</span>
                  <div className="text-3xl font-black text-orange-500 font-mono tracking-tight">
                    {totalPrice.toLocaleString("uk-UA")} <span className="text-lg font-normal text-white">грн</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
                    Розрахунок включає матеріали, логістику по області, роботу бригади та інженерний нагляд.
                  </p>

                  <div className="mt-6 pt-4 border-t border-gray-800 space-y-2 text-xs text-gray-400">
                    <div className="flex justify-between"><span>Периметр фундаменту:</span> <span className="text-white">{(fLength + fWidth) * 2} м</span></div>
                    <div className="flex justify-between"><span>Коефіцієнт поверху:</span> <span className="text-white">x{floors === 2 ? '1.2' : '1.0'}</span></div>
                    <div className="flex justify-between"><span>Матеріал стін:</span> <span className="text-white">{wallMaterial === 'gasblock' ? 'Газоблок' : wallMaterial === 'brick' ? 'Цегла' : 'Керамоблок'}</span></div>
                  </div>
                </div>

                {/* Фіксація розрахунку телефоном */}
                <form 
  onSubmit={(e) => { 
    e.preventDefault(); 
    
    // 1. Вкажіть тут свій номер телефону (тільки цифри, без +, починаючи з 380)
    const myWhatsAppNumber = "380997011256"; 

    // 2. Визначаємо назву матеріалу для тексту
    const materialName = wallMaterial === 'gasblock' ? 'Газоблок' : wallMaterial === 'brick' ? 'Цегла' : 'Керамоблок';

    // 3. Формуємо красивий текст повідомлення
    const messageText = `🔥 Нова заявка на розрахунок котеджу!\n\n` +
                        `📐 Розміри: ${fLength}м x ${fWidth}м\n` +
                        `🏢 Поверховість: ${floors} пов.\n` +
                        `🏡 Загальна площа: ${area} м²\n` +
                        `🧱 Матеріал стін: ${materialName}\n` +
                        `💧 Вода: ${includeWater ? 'Потрібно' : 'Ні'}\n` +
                        `⚡ Електрика: ${includeElectricity ? 'Потрібно' : 'Ні'}\n\n` +
                        `💰 Попередня вартість: ${totalPrice.toLocaleString("uk-UA")} грн\n\n` +
                        `📞 Мій номер для зв'язку (заявника): ${e.currentTarget.phoneInput.value}`;

    // 4. Кодуємо текст, щоб перетворити пробіли та смайли в безпечний для браузера формат (URL-encode)
    const encodedText = encodeURIComponent(messageText);

    // 5. Відкриваємо WhatsApp в новій вкладці
    window.open(`https://wa.me/${myWhatsAppNumber}?text=${encodedText}`, '_blank');
    
    setIsModalOpen(false); 
  }} 
  className="mt-6 space-y-3"
>
  <div>
    <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold">Ваш номер телефону</label>
    <input 
      required 
      name="phoneInput" // Додали ім'я, щоб зчитати значення
      type="tel" 
      placeholder="+380 (__) ___-__-__" 
      className="w-full bg-[#161616] border border-gray-800 px-3 py-2.5 text-sm text-white focus:border-orange-500 focus:outline-none rounded-none placeholder:text-gray-700"
    />
  </div>
  <button 
    type="submit"
    className="w-full bg-orange-500 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-orange-400 transition-colors duration-150"
  >
    Надіслати розрахунок у WhatsApp
  </button>
</form>

              </div>

            </div>

          </div>
        </div>
      )}
      {/* ================= FLOATING WHATSAPP BUTTON ================= */}
      
    </main>
  );
}