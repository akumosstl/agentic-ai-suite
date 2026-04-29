---
name: ingest
description: Lê um arquivo bruto e o compila para a wiki.
model: opencode/big-pickle
---
# Instruções
1. Leia o arquivo `@.agentic/brain/raw/$1` completamente.
2. Liste todos os pontos principais (takeaways)
3. Discuta comigo os 3 pontos principais (takeaways) mais importantes.
4. Assim que eu confirmar, crie um resumo em `@.agentic/brain/wiki/summaries/`.
5. Verifique se novas páginas são necessárias em `@.agentic/brain/wiki/entities/` ou `@.agentic/brain/wiki/concepts/`.
   - Para cada novo conceito, use o modelo em `@.agentic/templates/concept-template.md`.
6. Atualize o `.agentic/brain/wiki/index.md` e o `@.agentic/brain/wiki/log.md`.
