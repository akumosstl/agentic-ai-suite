import OpenAI from 'openai';
import { readFileSync } from 'fs';
import { join } from 'path';
import os from 'os';

const settingsPath = join(os.homedir(), '.agentic', 'tools', 'nvidia', 'settings.json');
const settings = JSON.parse(readFileSync(settingsPath, 'utf8'));

const openai = new OpenAI({
  apiKey: settings.apiKey,
  baseURL: settings.baseURL,
});

async function main() {
  // Captura a string passada por parâmetro no terminal
  const prompt = process.argv.slice(2).join(' ');

  if (!prompt) {
    console.log('Uso: node app.js "your message here"');
    process.exit(1);
  }

  const completion = await openai.chat.completions.create({
    model: settings.model,
    messages: [
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: settings.temperature,
    top_p: settings.top_p,
    max_tokens: settings.max_tokens,
    chat_template_kwargs: settings.chat_template_kwargs,
    stream: true
  });

  for await (const chunk of completion) {
    const reasoning = chunk.choices[0]?.delta?.reasoning_content;

    if (reasoning) process.stdout.write(reasoning);

    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}

main();