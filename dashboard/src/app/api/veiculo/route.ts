import { NextRequest, NextResponse } from "next/server";

const PLATE_REGEX = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;

// API Placas (wdapi2.com.br) - registre-se grátis em https://apiplacas.com.br
const API_PLACAS_TOKEN = process.env.API_PLACAS_TOKEN || "";

// APIBrasil (gateway.apibrasil.io) - registre-se grátis em https://apibrasil.io
const APIBRASIL_BEARER = process.env.APIBRASIL_BEARER_TOKEN || "";
const APIBRASIL_DEVICE = process.env.APIBRASIL_DEVICE_TOKEN || "";

async function consultaApiPlacas(placa: string) {
  if (!API_PLACAS_TOKEN) throw new Error("API_PLACAS_TOKEN não configurado");

  const response = await fetch(
    `https://wdapi2.com.br/consulta/${encodeURIComponent(placa)}/${encodeURIComponent(API_PLACAS_TOKEN)}`,
    {
      headers: {
        Accept: "application/json",
        "User-Agent": "DashboardXandao/1.0",
      },
      signal: AbortSignal.timeout(10000),
    }
  );

  if (!response.ok) throw new Error(`apiplacas status ${response.status}`);
  const data = await response.json();
  if (data.error || data.message?.includes("TOKEN")) throw new Error("Token inválido");
  return data;
}

async function consultaApiBrasil(placa: string) {
  if (!APIBRASIL_BEARER) throw new Error("APIBRASIL_BEARER_TOKEN não configurado");

  const response = await fetch(
    "https://gateway.apibrasil.io/api/v2/vehicles/dados",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${APIBRASIL_BEARER}`,
        ...(APIBRASIL_DEVICE ? { DeviceToken: APIBRASIL_DEVICE } : {}),
      },
      body: JSON.stringify({ placa }),
      signal: AbortSignal.timeout(10000),
    }
  );

  if (!response.ok) throw new Error(`apibrasil status ${response.status}`);
  const json = await response.json();
  return json.response ?? json;
}

interface RawVehicle {
  placa?: string;
  modelo?: string;
  MODELO?: string;
  marca?: string;
  MARCA?: string;
  cor?: string;
  COR?: string;
  ano?: string;
  ANO?: string;
  anoFabricacao?: string;
  anoModelo?: string;
  ANO_MODELO?: string;
  situacao?: string;
  SITUACAO?: string;
  uf?: string;
  UF?: string;
  municipio?: string;
  MUNICIPIO?: string;
  chassi?: string;
  CHASSI?: string;
  combustivel?: string;
  cilindradas?: string;
  potencia?: string;
  extra?: Record<string, string>;
}

function normalizeResult(raw: RawVehicle, placa: string) {
  const extra = raw.extra ?? {};
  return {
    placa: raw.placa || placa,
    modelo: raw.modelo || raw.MODELO || "N/A",
    marca: raw.marca || raw.MARCA || "N/A",
    cor: raw.cor || raw.COR || "N/A",
    ano: raw.ano || raw.ANO || raw.anoFabricacao || "N/A",
    anoModelo: raw.anoModelo || raw.ANO_MODELO || "N/A",
    situacao: raw.situacao || raw.SITUACAO || extra.situacao_veiculo || "N/A",
    uf: raw.uf || raw.UF || extra.uf || "N/A",
    municipio: raw.municipio || raw.MUNICIPIO || extra.municipio || "N/A",
    chassi: raw.chassi || raw.CHASSI || "N/A",
    combustivel: raw.combustivel || extra.combustivel || "N/A",
    cilindradas: raw.cilindradas || extra.cilindradas || "N/A",
    potencia: raw.potencia || extra.potencia || "N/A",
    mensagem: "",
  };
}

export async function GET(request: NextRequest) {
  const plate = request.nextUrl.searchParams.get("placa");

  if (!plate) {
    return NextResponse.json(
      { error: "Parâmetro 'placa' é obrigatório" },
      { status: 400 }
    );
  }

  const normalizedPlate = plate.toUpperCase().replace(/[^A-Z0-9]/g, "");

  if (!PLATE_REGEX.test(normalizedPlate)) {
    return NextResponse.json(
      { error: "Formato de placa inválido. Use ABC1234 ou ABC1D23 (Mercosul)" },
      { status: 400 }
    );
  }

  // Verifica se algum token está configurado
  if (!API_PLACAS_TOKEN && !APIBRASIL_BEARER) {
    return NextResponse.json(
      {
        success: false,
        error: "API não configurada. Configure API_PLACAS_TOKEN ou APIBRASIL_BEARER_TOKEN no .env.local",
        configRequired: true,
      },
      { status: 503 }
    );
  }

  // Tenta múltiplas APIs em sequência
  const sources: { name: string; fn: () => Promise<RawVehicle> }[] = [];
  if (API_PLACAS_TOKEN) sources.push({ name: "apiplacas", fn: () => consultaApiPlacas(normalizedPlate) });
  if (APIBRASIL_BEARER) sources.push({ name: "apibrasil", fn: () => consultaApiBrasil(normalizedPlate) });

  for (const source of sources) {
    try {
      const raw = await source.fn();
      if (raw && (raw.modelo || raw.MODELO || raw.marca || raw.MARCA)) {
        return NextResponse.json({
          success: true,
          source: source.name,
          data: normalizeResult(raw, normalizedPlate),
        });
      }
    } catch (err) {
      console.error(`[${source.name}] falhou:`, err);
    }
  }

  return NextResponse.json(
    {
      success: false,
      error: "Não foi possível consultar esta placa. Verifique se o token está válido e se a placa existe.",
    },
    { status: 502 }
  );
}
