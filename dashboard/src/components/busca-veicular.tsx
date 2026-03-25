"use client";

import { useState, useCallback } from "react";
import { Search, Loader2, AlertCircle, Car, MapPin, Palette, Calendar, Shield, Hash, Fuel, Gauge, Zap, Settings } from "lucide-react";

interface VehicleResult {
  placa: string;
  modelo: string;
  marca: string;
  cor: string;
  ano: string;
  anoModelo: string;
  situacao: string;
  uf: string;
  municipio: string;
  chassi: string;
  combustivel: string;
  cilindradas: string;
  potencia: string;
  mensagem: string;
}

interface ApiResponse {
  success: boolean;
  data?: VehicleResult;
  error?: string;
  source?: string;
  configRequired?: boolean;
}

export function BuscaVeicular() {
  const [placa, setPlaca] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VehicleResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [configRequired, setConfigRequired] = useState(false);

  const formatPlaca = (value: string) => {
    const clean = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (clean.length <= 3) return clean;
    return clean.slice(0, 3) + "-" + clean.slice(3, 7);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPlaca(e.target.value);
    if (formatted.replace("-", "").length <= 7) {
      setPlaca(formatted);
    }
  };

  const handleSearch = useCallback(async () => {
    const cleanPlaca = placa.replace(/[^A-Z0-9]/gi, "");
    if (cleanPlaca.length !== 7) {
      setError("Digite uma placa válida com 7 caracteres (ex: ABC1234)");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setSource(null);

    try {
      const res = await fetch(
        `/api/veiculo?placa=${encodeURIComponent(cleanPlaca)}`
      );
      const data: ApiResponse = await res.json();

      if (data.success && data.data) {
        setResult(data.data);
        setSource(data.source || "api");
      } else if (data.configRequired) {
        setConfigRequired(true);
        setError(data.error || "API não configurada");
      } else {
        setError(data.error || "Veículo não encontrado");
      }
    } catch {
      setError("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [placa]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const infoItems = result
    ? [
        { icon: Car, label: "Modelo", value: result.modelo },
        { icon: Car, label: "Marca", value: result.marca },
        { icon: Palette, label: "Cor", value: result.cor },
        { icon: Calendar, label: "Ano", value: result.ano },
        { icon: Calendar, label: "Ano Modelo", value: result.anoModelo },
        { icon: Shield, label: "Situação", value: result.situacao },
        { icon: MapPin, label: "UF", value: result.uf },
        { icon: MapPin, label: "Município", value: result.municipio },
        { icon: Hash, label: "Chassi", value: result.chassi },
        { icon: Fuel, label: "Combustível", value: result.combustivel },
        { icon: Gauge, label: "Cilindradas", value: result.cilindradas },
        { icon: Zap, label: "Potência", value: result.potencia },
      ]
    : [];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <Car className="w-7 h-7 text-accent" />
          Busca Veicular
        </h2>
        <p className="text-muted text-sm mt-1">
          Consulte dados de veículos pela placa usando bases públicas
        </p>
      </div>

      {/* Search box */}
      <div className="bg-card border border-card-border rounded-xl p-6">
        <label className="block text-sm font-medium mb-2">
          Placa do Veículo
        </label>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={placa}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="ABC-1234"
              className="w-full bg-background border border-card-border rounded-lg px-4 py-3 text-lg font-mono tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              maxLength={8}
              disabled={loading}
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading || placa.replace("-", "").length !== 7}
            className="px-6 py-3 bg-accent hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </div>
        <p className="text-xs text-muted mt-2">
          Formatos aceitos: ABC1234 (antiga) ou ABC1D23 (Mercosul)
        </p>
      </div>

      {/* Config Required */}
      {configRequired && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 space-y-3">
          <div className="flex items-start gap-3">
            <Settings className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-300">API não configurada</p>
              <p className="text-xs text-muted mt-1">
                Para consultar placas, você precisa de um token gratuito. Configure no arquivo <code className="bg-background px-1 rounded">.env.local</code>:
              </p>
            </div>
          </div>
          <div className="bg-background rounded-lg p-3 text-xs font-mono space-y-1">
            <p className="text-muted"># Opção 1 — API Placas (mais simples)</p>
            <p>API_PLACAS_TOKEN=seu_token_aqui</p>
            <p className="text-muted mt-2"># Cadastro grátis em:</p>
            <p className="text-accent">https://apiplacas.com.br</p>
          </div>
        </div>
      )}

      {/* Error */}
      {error && !configRequired && (
        <div className="bg-error/10 border border-error/30 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-error shrink-0 mt-0.5" />
          <p className="text-sm text-error">{error}</p>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="bg-card border border-card-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-card-border flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold font-mono tracking-wider">
                {result.placa}
              </h3>
              {result.mensagem && (
                <p className="text-xs text-muted mt-0.5">{result.mensagem}</p>
              )}
            </div>
            {source && (
              <span className="text-xs px-2 py-1 rounded bg-accent/10 text-accent">
                Fonte: {source}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-card-border">
            {infoItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="bg-card px-5 py-4">
                  <div className="flex items-center gap-2 text-muted text-xs mb-1">
                    <Icon className="w-3.5 h-3.5" />
                    {item.label}
                  </div>
                  <p className="font-medium text-sm">
                    {item.value || "N/A"}
                  </p>
                </div>
              );
            })}
          </div>


        </div>
      )}
    </div>
  );
}
