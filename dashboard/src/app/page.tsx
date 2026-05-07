"use client";

import { useState } from "react";
import {
  Wrench,
  Car,
  LayoutDashboard,
  FileText,
} from "lucide-react";
import { BuscaVeicular } from "@/components/busca-veicular";
import { RelatorioProfissional } from "@/components/relatorio-profissional";

const tabs = [
  {
    id: "ferramentas",
    label: "Ferramentas do Xandão",
    icon: Wrench,
  },
  {
    id: "relatorio",
    label: "Relatório Profissional",
    icon: FileText,
  },
] as const;

const ferramentas = [
  {
    id: "busca-veicular",
    label: "Busca Veicular",
    icon: Car,
  },
] as const;

type TabId = (typeof tabs)[number]["id"];
type FerramentaId = (typeof ferramentas)[number]["id"];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("ferramentas");
  const [activeFerramenta, setActiveFerramenta] =
    useState<FerramentaId>("busca-veicular");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-card-border flex flex-col">
        <div className="p-6 border-b border-card-border">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-6 h-6 text-accent" />
            <h1 className="text-lg font-bold">Dashboard do Xandão</h1>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "text-muted hover:text-foreground hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-card-border">
          <p className="text-xs text-muted">v1.0.0 — xandão tools</p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Sub-navigation */}
        {activeTab === "ferramentas" && (
          <div className="border-b border-card-border bg-card">
            <div className="flex gap-1 p-2">
              {ferramentas.map((f) => {
                const Icon = f.icon;
                const isActive = activeFerramenta === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setActiveFerramenta(f.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      isActive
                        ? "bg-accent/10 text-accent"
                        : "text-muted hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Content area */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === "ferramentas" &&
            activeFerramenta === "busca-veicular" && <BuscaVeicular />}
          {activeTab === "relatorio" && <RelatorioProfissional />}
        </div>
      </main>
    </div>
  );
}
