// Test script to verify MCP server search
import { spawn } from "child_process";

const server = spawn("node", ["server.js"]);

let buffer = "";

// Read stderr for logs
server.stderr.on("data", (data) => {
  console.log(`[LOG]: ${data.toString().trim()}`);
});

// Read stdout for responses
server.stdout.on("data", (data) => {
  buffer += data.toString();
  const lines = buffer.split("\n");
  buffer = lines.pop(); // Keep incomplete line in buffer
  
  for (const line of lines) {
    if (!line.trim()) continue;
    try {
      const response = JSON.parse(line);
      console.log("\n[RESULT]: Received response from MCP server");
      if (response.result?.content) {
        console.log("Content:", response.result.content[0].text.substring(0, 500));
      }
    } catch (e) {
      // Might be partial JSON
    }
  }
});

// Wait for server to start, then send tool call
setTimeout(() => {
  console.log("[TEST] Sending search_documents call...\n");
  
  const toolCall = JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "tools/call",
    params: {
      name: "search_documents",
      arguments: {
        query: "What is the best way to build a controller in Java?"
      }
    }
  });
  
  server.stdin.write(toolCall + "\n");
}, 3000);

// Kill after timeout
setTimeout(() => {
  console.log("\n[TEST] Test complete, killing server...");
  server.kill();
  process.exit(0);
}, 15000);
