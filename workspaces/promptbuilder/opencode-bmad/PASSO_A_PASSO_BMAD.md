# Método BMAD (Agentes de IA para Programação)

Este é o framework para organizar agentes de IA (como PM, Arquiteto e Desenvolvedor) no seu editor de código.
Requisitos Prévios:

* Node.js instalado (versão LTS recomendada).
* OpenCode 

# Instalação

Para instalar o BMAD (Breakthrough Method for Agile AI-Driven Development) no Windows, o processo é feito através do terminal, geralmente utilizando o Node.js.

Passos para Instalação:

   1. Abra o seu terminal (PowerShell ou Prompt de Comando).
   2. Navegue até a pasta do seu projeto.
   3. Execute o comando de instalação guiada:

   ```bash
   npx bmad-method install
   ```
   4. Siga as instruções na tela para escolher a IDE, o diretório e o perfil do projeto. [1, 4] 

Para suporte adicional, você pode consultar a [Documentação Oficial do BMAD](https://docs.bmad-method.org/how-to/install-bmad/) ou o guia do [CrazyStack](https://www.crazystack.com.br/2025-3/ola-pessoal-meu-nome-e-brian-e).
------------------------------

# Passo a passo

Como é a sua primeira vez rodando o BMAD nesse projeto, o segredo do sucesso não está apenas no código, mas em como você "apresenta" o projeto para a IA. O BMAD funciona melhor quando ele tem um mapa mental do que já existe.
Aqui está o roteiro ideal de primeiros passos:

## 1. O Comando de Inicialização (Init)
Antes de falar de Java 25, você precisa que o BMAD entenda a estrutura atual.

* Comando: /init (ou o comando equivalente na sua implementação de CLI).


## 2. "Indexação" do Contexto (Crucial)
A IA precisa "ler" seu código antes de sugerir mudanças.

* Recomendação: Peça um resumo do estado atual.

```bash

/bmad-agent-architect analise a estrutura atual do projeto e crie um arquivo SYSTEM_CONTEXT.md descrevendo os principais módulos e dependências.

```

***resultado***
tokens de entrada: 27.306
tokens de saída: 180

modelo: MiniMax M2.5 Free
uso: 14%


## Próximo Passo Sugerido:

Rode:

```bash
/bmad-agent-architect, analise se as dependências atuais no pom.xml são compatíveis com o Java 25 e liste o que precisa ser atualizado.
```
***resultado***
tokens de entrada: 2.342
tokens de saída: 733

modelo: MiniMax M2.5 Free
uso: 13%


```bash
/bmad-agent-architect analise se as dependências atuais no pom.xml são compatíveis com o Java 25 e liste o que precisa ser atualizado.

```

***resultado***
tokens de entrada: 972
tokens de saída: 256

modelo: MiniMax M2.5 Free
uso: 31%


### Super memory plugin

_bmad\config.user.toml

```md
[plugins]
enabled = ["opencode-supermemory@latest"]

[supermemory]
# Caso o plugin peça configurações extras como chave ou banco de dados
active = true
```

Então rode:

```bash
@architect, use o **supermemory** para recuperar nossas discussões anteriores sobre a arquitetura e analise se o pom.xml atual é compatível com Java 25.

```

### Memória agnóstica

Edite o arquivo: config.user.toml

```bash

[agents.custom_instructions]
all = "Sempre consulte os arquivos .opencode_context e Memory.md na raiz para obter o contexto do projeto e decisões arquiteturais antes de responder."

[context]
files = [".opencode_context", "Memory.md"]

```

Uso:

```bash
/bmad-agent-architect com base no Memory.md e .opencode_context, analise se o pom.xml é compatível com Java 25. Se houver mudanças, peça ao @developer para atualizar o arquivo.
```

## 3. Implementação

Rode na mesma janela de context do architect:

```bash
/bmad-agent-dev implemente a migração

```


## 4. Sincronização de Documentação
O BMAD é "driven" (dirigido) por documentos. Se você não tem um PRD.md (Product Requirements Document) ou um TECH_DESIGN.md, peça para ele gerar com base no código existente.

```bash
/bmad-agent-pm com base no código atual, gere o nosso PRD.md destacando as tecnologias utilizadas.
```

## 3. Validação com o Agente de QA
O BMAD foca em ciclos de feedback. Peça ao agente de QA ou ao próprio *dev (em modo de teste) para validar a compilação.

* Prompt Sugerido:

```bash
/bmad-agent-dev execute o build do projeto usando o JDK 25. Corrija qualquer erro de compilação relacionado a módulos ou remoção de APIs antigas (como as relacionadas a SecurityManager ou finalizadores)."
```
