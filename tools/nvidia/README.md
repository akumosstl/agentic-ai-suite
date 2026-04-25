# Description

**NVIDIA AI Chat** is a command-line tool that lets you chat with advanced AI models through NVIDIA's API. Simply type your question and get an intelligent response powered by GLM models.

## How to Use

1. Open your terminal (Command Prompt or Power Shell on Windows)
2. Run the tool by typing your message after `nvidia.exe`:

```
nvidia.exe "Your question here"
```

### Examples

Ask a simple question:
```
nvidia.exe "What is artificial intelligence?"
```

Get help with a coding problem:
```
nvidia.exe "How do I create a function in Python that calculates the average of numbers?"
```

Request a creative response:
```
nvidia.exe "Write a short poem about technology"
```

## Important Notes

- Keep your messages in quotes if they contain multiple words or special characters
- The tool will stream the AI response directly to your terminal in real-time
- Make sure you have an active internet connection to use the tool

## First Setup

Before using the tool for the first time, configure your API key by editing the `settings.json` file in the same directory as `nvidia.exe`. Replace the `apiKey` value with your NVIDIA API key.

# Compile

```bash
bun build --compile ./index.js --outfile ./dist/nvidia.exe
```

# Agentic Integration

Move the file `nvidia.exe` to:

```bash
<user_home>\.agentic\tools
```