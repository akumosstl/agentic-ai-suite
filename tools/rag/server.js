import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import * as lancedb from "@lancedb/lancedb";
import { z } from "zod";

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || "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";

async function getEmbedding(text) {
  const response = await fetch("https://integrate.api.nvidia.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${NVIDIA_API_KEY}`
    },
    body: JSON.stringify({
      input: text,
      model: "nvidia/nv-embedqa-e5-v5",
      input_type: "query",
      encoding_format: "float"
    })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`NVIDIA API error: ${JSON.stringify(error)}`);
  }
  
  const data = await response.json();
  return data.data[0].embedding;
}

const server = new Server({
  name: "opencode-local-rag",
  version: "1.0.0",
}, {
  capabilities: {
    tools: {},
  },
});

// 1. Definição da Ferramenta de Busca
server.setRequestHandler(ListToolsRequestSchema, async () => {
  console.error("[MCP] ListToolsRequest recebido");
  return {
    tools: [{
      name: "search_documents",
      description: "USE ESTA FERRAMENTA OBRIGATORIAMENTE para perguntas sobre Java, controllers, padrões de projeto, clean code, boas práticas de código. Busca em documentos locais indexados. NUNCA responda sobre Java sem antes chamar esta ferramenta.",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Pergunta sobre Java, controllers, clean code, padrões de projeto" },
        },
        required: ["query"],
      },
    }],
  };
});

// 2. Lógica de Busca no LanceDB
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  console.error(`[MCP] CallToolRequest recebido: ${request.params.name}`);
  
  if (request.params.name === "search_documents") {
    const { query } = request.params.arguments;
    console.error(`[MCP] search_documents chamado com query: "${query}"`);

    try {
      // Conecta ao banco local na pasta './data/vector-store'
      console.error("[MCP] Conectando ao LanceDB...");
      const db = await lancedb.connect("./data/vector-store");
      const table = await db.openTable("documents");
      console.error("[MCP] Tabela 'documents' aberta com sucesso");

      // Gera o embedding da pergunta
      console.error("[MCP] Gerando embedding para a query...");
      const queryEmbedding = await getEmbedding(query);
      console.error("[MCP] Embedding gerado com sucesso");

      // Busca por similaridade
      console.error("[MCP] Executando busca por similaridade...");
      const results = await table
        .search(queryEmbedding)
        .limit(3)
        .toArray();

      console.error(`[MCP] ${results.length} resultados encontrados`);
      
      if (results.length > 0) {
        results.forEach((r, i) => {
          console.error(`[MCP] Resultado ${i+1}: ${r.filename} - ${r.text.substring(0, 50)}...`);
        });
      } else {
        console.error("[MCP] Nenhum resultado encontrado para a query");
      }

      const context = results.map(r => `Fonte: ${r.filename}\nConteúdo: ${r.text}`).join("\n\n---\n\n");

      const responseText = `[Query: "${query}"]\n\n${context}`;
      
      console.error("[MCP] Retornando contexto para o OpenCode");
      return {
        content: [{ type: "text", text: responseText }],
      };
    } catch (error) {
      console.error(`[MCP] Erro durante a busca: ${error.message}`);
      throw error;
    }
  }
});

// Inicialização do Servidor via STDIO (Padrão MCP)
console.error("[MCP] Iniciando servidor MCP...");
const transport = new StdioServerTransport();

transport.onclose = () => {
  console.error("[MCP] Conexão fechada");
};

transport.onerror = (error) => {
  console.error(`[MCP] Erro no transporte: ${error.message}`);
};

await server.connect(transport);
console.error("[MCP] Servidor MCP de RAG rodando e aguardando requisições!");
