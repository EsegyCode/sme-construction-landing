"use client";

import { useState, useMemo } from "react";

interface CalcModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CalcModal({ isOpen, onClose }: CalcModalProps) {
  const [fLength, setFLength] = useState(10);
  const [fWidth, setFWidth] = useState(10);
  const [floors, setFloors] = useState(1);
  const [wallMaterial, setWallMaterial] = useState("gasblock");
  const [includeWater, setIncludeWater] = useState(false);
  const [includeElectricity, setIncludeElectricity] = useState(false);

  // Розрахунок площі та ціни
  const totalArea = useMemo(() => fLength * fWidth * floors, [fLength, fWidth, floors]);
  
  const totalPrice = useMemo(() => {
    const basePricePerM2 = wallMaterial === "brick" ? 11500 : wallMaterial === "keramoblock" ? 13000 : 9000;
    const foundationCost = (fLength + fWidth) * 2 * 4500;
    const buildingCost = totalArea * basePricePerM2;
    return buildingCost + foundationCost + (includeWater ? 40000 : 0) + (includeElectricity ? 35000 : 0);
  }, [fLength, fWidth, floors, totalArea, wallMaterial, includeWater, includeElectricity]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#121212] border border-gray-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white text-2xl">×</button>
        
        <h2 className="text-2xl font-bold text-white mb-6">Калькулятор будівництва</h2>

        <div className="space-y-6">
          {/* Розміри та Площа */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-gray-500 uppercase">Довжина: {fLength}м</label>
              <input type="range" min="5" max="25" value={fLength} onChange={(e) => setFLength(Number(e.target.value))} className="w-full h-1 accent-orange-500" />
            </div>
            <div>
              <label className="text-[10px] text-gray-500 uppercase">Ширина: {fWidth}м</label>
              <input type="range" min="5" max="25" value={fWidth} onChange={(e) => setFWidth(Number(e.target.value))} className="w-full h-1 accent-orange-500" />
            </div>
          </div>
          
          <div className="bg-[#1A1A1A] p-3 rounded-xl flex justify-between items-center">
            <span className="text-gray-400 text-sm">Загальна площа:</span>
            <span className="text-orange-500 font-bold">{totalArea} м²</span>
          </div>

          {/* Поверхи */}
          <div>
            <label className="text-[10px] text-gray-500 uppercase mb-2 block">Поверховість</label>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((n) => (
                <button key={n} onClick={() => setFloors(n)} className={`py-2 rounded-lg text-sm transition ${floors === n ? "bg-orange-500 text-white" : "bg-[#1A1A1A] text-gray-400 hover:bg-gray-800"}`}>
                  {n} пов.
                </button>
              ))}
            </div>
          </div>

          {/* Матеріали та Комунікації */}
          <select value={wallMaterial} onChange={(e) => setWallMaterial(e.target.value)} className="w-full bg-[#1A1A1A] border-none p-3 rounded-xl text-white text-sm">
            <option value="gasblock">Газоблок</option>
            <option value="brick">Цегла</option>
            <option value="keramoblock">Керамоблок</option>
          </select>

          <div className="flex gap-4 text-sm text-gray-400">
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" onChange={(e) => setIncludeWater(e.target.checked)} className="accent-orange-500" /> Вода</label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" onChange={(e) => setIncludeElectricity(e.target.checked)} className="accent-orange-500" /> Електрика</label>
          </div>

          {/* Фінал */}
          <div className="border-t border-gray-800 pt-6">
            <div className="text-gray-500 text-xs uppercase">Орієнтовна вартість:</div>
            <div className="text-3xl font-black text-white mb-4">{totalPrice.toLocaleString("uk-UA")} <span className="text-orange-500">грн</span></div>
            <button className="w-full bg-gradient-to-r from-orange-600 to-orange-500 py-3 rounded-xl font-bold text-white hover:opacity-90 transition">
              Надіслати у WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}