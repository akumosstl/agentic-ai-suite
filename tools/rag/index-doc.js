import * as lancedb from "@lancedb/lancedb";
import fs from "fs/promises";
import path from "path";

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || "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";

async function getEmbeddings(texts) {
  const response = await fetch("https://integrate.api.nvidia.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${NVIDIA_API_KEY}`
    },
    body: JSON.stringify({
      input: texts,
      model: "nvidia/nv-embedqa-e5-v5",
      input_type: "passage",
      encoding_format: "float"
    })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`NVIDIA API error: ${JSON.stringify(error)}`);
  }
  
  const data = await response.json();
  return data.data.map(item => item.embedding);
}

async function indexDocuments() {
  const db = await lancedb.connect("./data/vector-store");
  
  // Read all documents from docs folder
  const docsDir = "./docs";
  const files = await fs.readdir(docsDir);
  
  const documents = [];
  
  for (const file of files) {
    if (file.endsWith(".md") || file.endsWith(".txt")) {
      const content = await fs.readFile(path.join(docsDir, file), "utf-8");
      
      // Split into chunks (simple approach - by paragraphs)
      const chunks = content.split("\n\n").filter(c => c.trim().length > 50);
      
      for (const chunk of chunks) {
        documents.push({
          text: chunk,
          filename: file,
        });
      }
    }
  }
  
  // Generate embeddings for all chunks
  const texts = documents.map(d => d.text);
  const vectors = await getEmbeddings(texts);
  
  // Add vectors to documents
  for (let i = 0; i < documents.length; i++) {
    documents[i].vector = vectors[i];
  }
  
  // Check if table exists and drop it, then recreate
  const tableNames = await db.tableNames();
  if (tableNames.includes("documents")) {
    await db.dropTable("documents");
  }
  
  // Create table
  const table = await db.createTable("documents", documents);
  
  console.log(`Indexed ${documents.length} document chunks from ${files.length} files`);
}

indexDocuments().catch(console.error);