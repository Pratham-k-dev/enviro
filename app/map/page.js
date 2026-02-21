"use client";
import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const CircleMarker = dynamic(() => import('react-leaflet').then(m => m.CircleMarker), { ssr: false });
const Tooltip = dynamic(() => import('react-leaflet').then(m => m.Tooltip), { ssr: false });

// ─── Realistic Delhi Mock Data ─────────────────────────────────────────────────
const HOTSPOT_DATA = {
  dust: [
    // High density corridors: GT Karnal Road, NH-8, industrial belts
    { lat: 28.7355, lng: 77.1220, intensity: 0.97, label: "Rohini Sector 3", value: "PM10: 412 μg/m³", note: "Industrial waste + road dust" },
    { lat: 28.7041, lng: 77.1025, intensity: 0.93, label: "Mangolpuri", value: "PM10: 389 μg/m³", note: "Construction activity" },
    { lat: 28.6810, lng: 77.0800, intensity: 0.88, label: "Punjabi Bagh", value: "PM10: 341 μg/m³", note: "Heavy traffic corridor" },
    { lat: 28.6502, lng: 77.3027, intensity: 0.90, label: "Noida Border", value: "PM10: 358 μg/m³", note: "Industrial zone" },
    { lat: 28.6280, lng: 77.3750, intensity: 0.85, label: "Sahibabad", value: "PM10: 310 μg/m³", note: "Brick kilns nearby" },
    { lat: 28.5672, lng: 77.3200, intensity: 0.78, label: "Okhla Phase II", value: "PM10: 276 μg/m³", note: "Factory cluster" },
    { lat: 28.5230, lng: 77.2780, intensity: 0.72, label: "Kalkaji", value: "PM10: 248 μg/m³", note: "Moderate vehicular dust" },
    { lat: 28.6920, lng: 77.2120, intensity: 0.82, label: "Azadpur Mandi", value: "PM10: 298 μg/m³", note: "Agri dust + transport" },
    { lat: 28.7200, lng: 77.2890, intensity: 0.76, label: "Bhajanpura", value: "PM10: 269 μg/m³", note: "Unmetalled roads" },
    { lat: 28.6139, lng: 77.2090, intensity: 0.60, label: "Connaught Place", value: "PM10: 198 μg/m³", note: "Urban dust load" },
    { lat: 28.5355, lng: 77.1910, intensity: 0.55, label: "Safdarjung", value: "PM10: 172 μg/m³", note: "Low-moderate zone" },
    { lat: 28.7600, lng: 77.1500, intensity: 0.95, label: "Bawana Industrial", value: "PM10: 428 μg/m³", note: "CRITICAL: Industrial cluster" },
    { lat: 28.5750, lng: 77.0550, intensity: 0.89, label: "Dwarka Sector 10", value: "PM10: 347 μg/m³", note: "Construction mega project" },
    { lat: 28.6450, lng: 77.1760, intensity: 0.65, label: "Patel Nagar", value: "PM10: 215 μg/m³", note: "Moderate residential" },
    { lat: 28.6600, lng: 77.3400, intensity: 0.80, label: "Preet Vihar", value: "PM10: 290 μg/m³", note: "Mixed zone" },
  ],

  water: [
    // Yamuna floodplain + old pipes + industrial discharge zones
    { lat: 28.6620, lng: 77.2320, intensity: 0.98, label: "Yamuna Bank", value: "TDS: 1840 ppm", note: "CRITICAL: Sewage discharge" },
    { lat: 28.7041, lng: 77.2713, intensity: 0.95, label: "Wazirabad", value: "TDS: 1620 ppm", note: "Untreated industrial effluent" },
    { lat: 28.6280, lng: 77.2450, intensity: 0.92, label: "ITO Yamuna", value: "TDS: 1510 ppm", note: "Heavy metal contamination" },
    { lat: 28.5300, lng: 77.3100, intensity: 0.87, label: "Shahdara Drain", value: "TDS: 1380 ppm", note: "Stormwater overflow" },
    { lat: 28.5823, lng: 77.0500, intensity: 0.82, label: "Najafgarh Lake", value: "TDS: 1240 ppm", note: "Agricultural runoff" },
    { lat: 28.5245, lng: 77.2666, intensity: 0.76, label: "Tughlaqabad", value: "TDS: 980 ppm", note: "Old pipeline leakage" },
    { lat: 28.7159, lng: 77.1610, intensity: 0.70, label: "Rohini Sec 7", value: "TDS: 820 ppm", note: "Groundwater hardness" },
    { lat: 28.6800, lng: 77.1200, intensity: 0.65, label: "Nangloi", value: "TDS: 740 ppm", note: "Moderate hardness" },
    { lat: 28.5960, lng: 77.3450, intensity: 0.88, label: "Kondli Drain", value: "TDS: 1410 ppm", note: "Textile dye effluent" },
    { lat: 28.6100, lng: 77.1500, intensity: 0.58, label: "Janakpuri", value: "TDS: 580 ppm", note: "Acceptable range" },
    { lat: 28.5500, lng: 77.2100, intensity: 0.55, label: "Saket", value: "TDS: 520 ppm", note: "Better groundwater quality" },
    { lat: 28.7300, lng: 77.3100, intensity: 0.80, label: "Ghazipur Drain", value: "TDS: 1190 ppm", note: "Slaughterhouse waste" },
    { lat: 28.6390, lng: 77.2950, intensity: 0.84, label: "Patparganj", value: "TDS: 1280 ppm", note: "Industrial discharge point" },
    { lat: 28.5100, lng: 77.4000, intensity: 0.74, label: "Kalindi Kunj", value: "TDS: 930 ppm", note: "Yamuna proximity" },
  ],

  flood: [
    // Low-lying areas, Yamuna floodplain, poor drainage basins
    { lat: 28.6620, lng: 77.2320, intensity: 1.0, label: "Yamuna Floodplain", value: "Depth: 2.4m (2023 peak)", note: "EXTREME: Yamuna breach zone" },
    { lat: 28.7041, lng: 77.2713, intensity: 0.97, label: "Usmanpur", value: "Depth: 1.9m (2023 peak)", note: "Confirmed flood 2023" },
    { lat: 28.6780, lng: 77.2900, intensity: 0.93, label: "Sonia Vihar", value: "Depth: 1.6m", note: "Low-lying colony" },
    { lat: 28.6900, lng: 77.3200, intensity: 0.90, label: "Welcome Colony", value: "Depth: 1.5m", note: "Drainage bottleneck" },
    { lat: 28.6500, lng: 77.2750, intensity: 0.88, label: "Geeta Colony", value: "Depth: 1.4m", note: "Storm drain overflow" },
    { lat: 28.6280, lng: 77.2450, intensity: 0.86, label: "Mayur Vihar Ext.", value: "Depth: 1.3m", note: "Flood-prone pocket" },
    { lat: 28.7200, lng: 77.2450, intensity: 0.84, label: "Mustafabad", value: "Depth: 1.2m", note: "Poor drainage basin" },
    { lat: 28.5300, lng: 77.3100, intensity: 0.80, label: "Badarpur", value: "Depth: 1.0m", note: "Yamuna catchment edge" },
    { lat: 28.5600, lng: 77.3400, intensity: 0.75, label: "Madanpur Khadar", value: "Risk: High", note: "Unplanned settlement" },
    { lat: 28.7450, lng: 77.2200, intensity: 0.78, label: "Brijpuri", value: "Depth: 1.1m", note: "Seasonal flooding" },
    { lat: 28.6100, lng: 77.2600, intensity: 0.60, label: "Shakarpur", value: "Risk: Moderate", note: "Partial flood barrier" },
    { lat: 28.6400, lng: 77.3500, intensity: 0.70, label: "Trilokpuri", value: "Risk: High", note: "Low ground level" },
    { lat: 28.5800, lng: 77.1900, intensity: 0.45, label: "Daryaganj", value: "Risk: Low", note: "Elevated terrain" },
    { lat: 28.6139, lng: 77.2090, intensity: 0.35, label: "Central Delhi", value: "Risk: Low", note: "Engineered drainage" },
    { lat: 28.7600, lng: 77.2100, intensity: 0.88, label: "Alipur", value: "Depth: 1.4m", note: "Rural floodplain" },
  ],

  aqi: [
    { lat: 28.7600, lng: 77.1500, intensity: 1.0, label: "Bawana", value: "AQI: 498 — Hazardous", note: "Industrial + biomass burning" },
    { lat: 28.7355, lng: 77.1220, intensity: 0.96, label: "Rohini", value: "AQI: 467 — Hazardous", note: "PM2.5: 312 μg/m³" },
    { lat: 28.6920, lng: 77.2120, intensity: 0.91, label: "Azadpur", value: "AQI: 421 — Very Unhealthy", note: "Traffic + Mandi emissions" },
    { lat: 28.7041, lng: 77.1025, intensity: 0.88, label: "Mangolpuri", value: "AQI: 398 — Very Unhealthy", note: "Industrial corridor" },
    { lat: 28.6502, lng: 77.3027, intensity: 0.85, label: "Anand Vihar", value: "AQI: 385 — Very Unhealthy", note: "Bus terminal hotspot" },
    { lat: 28.6280, lng: 77.3750, intensity: 0.80, label: "Vivek Vihar", value: "AQI: 356 — Very Unhealthy", note: "Trans-Yamuna zone" },
    { lat: 28.5672, lng: 77.3200, intensity: 0.75, label: "Okhla", value: "AQI: 312 — Unhealthy", note: "Industrial cluster" },
    { lat: 28.6139, lng: 77.2090, intensity: 0.58, label: "CP / Central", value: "AQI: 186 — Unhealthy", note: "Commercial zone" },
    { lat: 28.5355, lng: 77.1910, intensity: 0.50, label: "Safdarjung", value: "AQI: 154 — Unhealthy", note: "Near airport buffer" },
    { lat: 28.5500, lng: 77.2100, intensity: 0.45, label: "Lodhi Road", value: "AQI: 138 — Moderate", note: "Green belt area" },
    { lat: 28.5750, lng: 77.0550, intensity: 0.72, label: "Dwarka", value: "AQI: 278 — Unhealthy", note: "Metro construction dust" },
    { lat: 28.6450, lng: 77.1760, intensity: 0.62, label: "Patel Nagar", value: "AQI: 210 — Unhealthy", note: "Mixed use zone" },
    { lat: 28.7200, lng: 77.2890, intensity: 0.83, label: "Dilshad Garden", value: "AQI: 368 — Very Unhealthy", note: "Upwind from Ghaziabad" },
    { lat: 28.6600, lng: 77.3400, intensity: 0.77, label: "Preet Vihar", value: "AQI: 330 — Very Unhealthy", note: "Busy intersection" },
    { lat: 28.5100, lng: 77.2400, intensity: 0.48, label: "Vasant Kunj", value: "AQI: 148 — Moderate", note: "Green zone" },
  ],
};

const LAYERS = [
  { id: 'dust', label: 'Dust & PM10', emoji: '💨', color: '#f97316', activeColor: 'bg-orange-500', hoverColor: 'hover:bg-orange-500/20', borderColor: 'border-orange-500/30', badgeColor: 'bg-orange-500/20 text-orange-300', desc: 'Particulate Matter Hotspots', unit: 'PM10 μg/m³' },
  { id: 'water', label: 'Water Quality', emoji: '🚰', color: '#3b82f6', activeColor: 'bg-blue-500', hoverColor: 'hover:bg-blue-500/20', borderColor: 'border-blue-500/30', badgeColor: 'bg-blue-500/20 text-blue-300', desc: 'TDS & Contamination Zones', unit: 'TDS ppm' },
  { id: 'flood', label: 'Flood Risk', emoji: '🌊', color: '#6366f1', activeColor: 'bg-indigo-500', hoverColor: 'hover:bg-indigo-500/20', borderColor: 'border-indigo-500/30', badgeColor: 'bg-indigo-500/20 text-indigo-300', desc: 'Flood Vulnerability Index', unit: 'Flood depth m' },
  { id: 'aqi', label: 'Air Quality', emoji: '🌫️', color: '#ef4444', activeColor: 'bg-red-500', hoverColor: 'hover:bg-red-500/20', borderColor: 'border-red-500/30', badgeColor: 'bg-red-500/20 text-red-300', desc: 'AQI Composite Index', unit: 'AQI Score' },
];

function getRiskLevel(intensity) {
  if (intensity >= 0.9) return { label: 'Critical', color: '#ef4444', text: 'text-red-400' };
  if (intensity >= 0.75) return { label: 'High', color: '#f97316', text: 'text-orange-400' };
  if (intensity >= 0.55) return { label: 'Moderate', color: '#eab308', text: 'text-yellow-400' };
  return { label: 'Low', color: '#22c55e', text: 'text-green-400' };
}

function getCircleStyle(intensity, baseColor) {
  const alpha = 0.25 + intensity * 0.55;
  const radius = 8 + intensity * 22;
  return { radius, fillOpacity: alpha, weight: intensity > 0.85 ? 2 : 1 };
}

export default function EnvironmentalMap() {
  const [activeLayer, setActiveLayer] = useState('dust');
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [stats, setStats] = useState({ critical: 0, high: 0, moderate: 0, total: 0 });

  const currentLayer = LAYERS.find(l => l.id === activeLayer);
  const points = HOTSPOT_DATA[activeLayer];

  useEffect(() => {
    const counts = points.reduce((acc, p) => {
      if (p.intensity >= 0.9) acc.critical++;
      else if (p.intensity >= 0.75) acc.high++;
      else if (p.intensity >= 0.55) acc.moderate++;
      return acc;
    }, { critical: 0, high: 0, moderate: 0 });
    setStats({ ...counts, total: points.length });
    setSelectedPoint(null);
  }, [activeLayer]);

  return (
    <div className="relative h-screen w-full bg-slate-950 font-sans">

      {/* ── Map ─────────────────────────────────────────────────────────── */}
      <MapContainer
        center={[28.6139, 77.2090]}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />

        {points.map((point, i) => {
          const risk = getRiskLevel(point.intensity);
          const style = getCircleStyle(point.intensity, currentLayer.color);
          const isSelected = selectedPoint?.label === point.label;

          return (
            <CircleMarker
              key={`${activeLayer}-${i}`}
              center={[point.lat, point.lng]}
              radius={style.radius}
              pathOptions={{
                fillColor: isSelected ? '#ffffff' : currentLayer.color,
                fillOpacity: isSelected ? 0.9 : style.fillOpacity,
                color: isSelected ? '#ffffff' : currentLayer.color,
                weight: isSelected ? 2.5 : style.weight,
              }}
              eventHandlers={{ click: () => setSelectedPoint(isSelected ? null : point) }}
            >
              <Tooltip direction="top" offset={[0, -8]} opacity={1}>
                <div style={{ background: '#0f172a', border: `1px solid ${currentLayer.color}40`, borderRadius: 10, padding: '8px 12px', color: '#f8fafc', minWidth: 160 }}>
                  <p style={{ fontWeight: 800, fontSize: 11, color: currentLayer.color, marginBottom: 2, textTransform: 'uppercase', letterSpacing: 1 }}>{point.label}</p>
                  <p style={{ fontWeight: 700, fontSize: 12, color: '#fff', marginBottom: 2 }}>{point.value}</p>
                  <p style={{ fontSize: 10, color: '#94a3b8' }}>{point.note}</p>
                  <p style={{ fontSize: 9, color: risk.color, fontWeight: 800, marginTop: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>⬤ {risk.label} Risk</p>
                </div>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>

      {/* ── Left Panel — Layer Selector ─────────────────────────────────── */}
      <div className="absolute top-5 left-5 z-[1000] w-64 flex flex-col gap-3">
        {/* Branding */}
        <div className="bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-700/60 px-4 py-3 shadow-2xl">
          <div className="flex items-center gap-2 mb-0.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">Delhi Eco-Monitor</span>
          </div>
          <h1 className="text-white font-black text-base leading-tight">Risk Hotspot Map</h1>
          <p className="text-slate-500 text-[10px] mt-0.5">Realtime environmental intelligence</p>
        </div>

        {/* Layer Buttons */}
        <div className="bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-700/60 p-3 shadow-2xl flex flex-col gap-2">
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 px-1 mb-1">Select Layer</p>
          {LAYERS.map(layer => (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(layer.id)}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl border text-left transition-all duration-200
                ${activeLayer === layer.id
                  ? `${layer.activeColor} border-transparent text-white shadow-lg`
                  : `bg-slate-800/60 border-slate-700/40 text-slate-300 ${layer.hoverColor} hover:border-slate-600`
                }`}
            >
              <span className="text-base">{layer.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-xs leading-tight">{layer.label}</p>
                <p className={`text-[10px] leading-tight ${activeLayer === layer.id ? 'text-white/70' : 'text-slate-500'}`}>{layer.desc}</p>
              </div>
              {activeLayer === layer.id && (
                <div className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse shrink-0" />
              )}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-700/60 p-3 shadow-2xl">
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2">Zone Summary</p>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-2 text-center">
              <p className="text-red-400 font-black text-lg leading-none">{stats.critical}</p>
              <p className="text-[9px] text-red-400/70 font-bold uppercase mt-0.5">Critical</p>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-2 text-center">
              <p className="text-orange-400 font-black text-lg leading-none">{stats.high}</p>
              <p className="text-[9px] text-orange-400/70 font-bold uppercase mt-0.5">High</p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-2 text-center">
              <p className="text-yellow-400 font-black text-lg leading-none">{stats.moderate}</p>
              <p className="text-[9px] text-yellow-400/70 font-bold uppercase mt-0.5">Moderate</p>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between bg-slate-800/50 rounded-lg px-2.5 py-1.5">
            <span className="text-[10px] text-slate-400 font-medium">Total zones mapped</span>
            <span className="text-white font-black text-xs">{stats.total}</span>
          </div>
        </div>
      </div>

      {/* ── Right Panel — Selected Point Detail ─────────────────────────── */}
      <div className="absolute top-5 right-5 z-[1000] w-64 flex flex-col gap-3">

        {/* Status */}
        <div className="bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-700/60 px-4 py-3 shadow-2xl">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Sensor Status</p>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">Live</span>
            </div>
          </div>
          <p className="text-white text-xs font-bold">{currentLayer.label} — {currentLayer.unit}</p>
          <p className="text-slate-400 text-[10px] mt-0.5">Last sync: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>

        {/* Legend */}
        <div className="bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-700/60 p-4 shadow-2xl">
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-3">Risk Legend</p>
          <div className="space-y-2">
            {[
              { label: 'Critical', color: '#ef4444', sub: 'Intensity ≥ 90%', size: 'w-4 h-4' },
              { label: 'High', color: '#f97316', sub: 'Intensity 75–89%', size: 'w-3.5 h-3.5' },
              { label: 'Moderate', color: '#eab308', sub: 'Intensity 55–74%', size: 'w-3 h-3' },
              { label: 'Low', color: '#22c55e', sub: 'Intensity < 55%', size: 'w-2.5 h-2.5' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3">
                <div className={`${item.size} rounded-full shrink-0`} style={{ backgroundColor: item.color, opacity: 0.85 }} />
                <div>
                  <p className="text-white text-[11px] font-bold leading-none">{item.label}</p>
                  <p className="text-slate-500 text-[9px]">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[9px] text-slate-600 mt-3 pt-2 border-t border-slate-700/50">Tap any circle for zone details</p>
        </div>

        {/* Selected Point Card */}
        {selectedPoint && (() => {
          const risk = getRiskLevel(selectedPoint.intensity);
          return (
            <div
              className="bg-slate-900/97 backdrop-blur-md rounded-2xl border shadow-2xl p-4 animate-in fade-in slide-in-from-right-2 duration-200"
              style={{ borderColor: `${currentLayer.color}50` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest mb-1" style={{ color: currentLayer.color }}>Selected Zone</p>
                  <p className="text-white font-black text-sm leading-tight">{selectedPoint.label}</p>
                </div>
                <button onClick={() => setSelectedPoint(null)} className="text-slate-500 hover:text-white text-xs w-5 h-5 flex items-center justify-center rounded-lg hover:bg-slate-700 transition-colors">✕</button>
              </div>

              <div className="bg-slate-800/60 rounded-xl p-3 mb-3">
                <p className="text-white font-black text-base">{selectedPoint.value}</p>
                <p className="text-slate-400 text-[11px] mt-0.5">{selectedPoint.note}</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] text-slate-500 uppercase font-bold">Risk Level</p>
                  <p className={`text-sm font-black ${risk.text}`}>⬤ {risk.label}</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-500 uppercase font-bold text-right">Intensity</p>
                  <p className="text-sm font-black text-white text-right">{Math.round(selectedPoint.intensity * 100)}%</p>
                </div>
              </div>

              {/* Mini intensity bar */}
              <div className="mt-2.5 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${selectedPoint.intensity * 100}%`, backgroundColor: risk.color }}
                />
              </div>
            </div>
          );
        })()}
      </div>

      {/* ── Bottom — Source Tag ──────────────────────────────────────────── */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000]">
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/40 rounded-full px-4 py-1.5 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[10px] text-slate-400 font-medium">Mock sensor data — Delhi NCR environmental monitoring simulation</span>
        </div>
      </div>
    </div>
  );
}