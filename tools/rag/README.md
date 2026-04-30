# RAG with OpenCode - Java Clean Code & Patterns

Simple RAG (Retrieval-Augmented Generation) system using Node.js, LanceDB, NVIDIA embeddings, and MCP for OpenCode integration.

## Stack

- **Runtime**: Node.js (ES modules)
- **Vector Store**: LanceDB (`@lancedb/lancedb`)
- **Embeddings**: NVIDIA API (`nvidia/nv-embedqa-e5-v5`)
- **MCP Server**: `@modelcontextprotocol/sdk`
- **OpenCode**: CLI integration via MCP

## Prerequisites

- Node.js installed
- NVIDIA API key (get from [build.nvidia.com](https://build.nvidia.com))
- OpenCode CLI: `npm install -g opencode-ai`

---

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure OpenCode MCP Server

Create `opencode.json` in project root:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "rag-local": {
      "type": "local",
      "command": ["node", "C:\\Users\\USER\\projects\\lab\\rag\\server.js"],
      "enabled": true
    }
  }
}
```

### 3. Add Documents

Place your Java documents (`.md` or `.txt`) in the `docs/` folder. Sample files included:
- `docs/controller-patterns.md` - Java controller best practices
- `docs/clean-code-tips.md` - Clean code principles

### 4. Index Documents

```bash
cd C:\Users\USER\projects\lab\rag
set NVIDIA_API_KEY=your-api-key-here
node index-doc.js
```

This creates/updates the vector store at `./data/vector-store`.

---

## Usage with OpenCode

1. **Start OpenCode** in the project directory:
   ```bash
   cd C:\Users\USER\projects\lab\rag
   opencode
   ```

2. **Query your documents** - OpenCode automatically connects to the MCP server. Ask questions like:
   - "@rag-local What is the best way to build a controller in Java?"
   - Use a ferramenta search_documents para responder: What is the best way to build a controller in Java?
   - "How should I name variables in Java?"
   - "Show me an example of a good controller"

3. **How it works**:
   - Your question → MCP server (`server.js`)
   - Server generates embedding using NVIDIA API
   - Searches LanceDB for similar document chunks
   - Returns context to OpenCode
   - OpenCode generates answer using the retrieved context

---

## Project Structure

```
├── server.js          # MCP server (stdio transport)
├── index-doc.js       # Indexing script (docs → LanceDB)
├── nvidia.js          # Direct NVIDIA API queries
├── opencode.json      # OpenCode MCP config
├── docs/              # Document sources
│   ├── controller-patterns.md
│   └── clean-code-tips.md
└── data/
    └── vector-store/  # LanceDB storage
```

---

## Troubleshooting

**MCP server not connecting:**
- Verify `opencode.json` syntax
- Test: `node server.js` (should print "Servidor MCP de RAG rodando!")
- Check OpenCode logs

**No relevant search results:**
- Re-run `node index-doc.js` to re-index
- Check documents exist in `docs/`
- Try rephrasing your question

**NVIDIA API errors:**
- Verify `NVIDIA_API_KEY` is set correctly
- Check API key has access to `nvidia/nv-embedqa-e5-v5`

---

## Scripts

- `node server.js` - Start MCP server
- `node index-doc.js` - Index documents into LanceDB
- `node nvidia.js` - Direct NVIDIA model query (streaming)

---

## Notes

- Embeddings use `input_type: "passage"` for indexing, `"query"` for searching
- LanceDB table name: `documents`
- No test infrastructure configured yet
