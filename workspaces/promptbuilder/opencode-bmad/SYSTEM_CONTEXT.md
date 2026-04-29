# System Context - agentic-ai-suite

## Visão Geral do Projeto

O **agentic-ai-suite** é um repositório que contém:
1. **Aplicação Java Spring Boot** (Prompt Builder) - Backend com API REST e interface web
2. **Framework BMAD** - ~50 habilidades de agentes de IA para desenvolvimento ágil

---

## Estrutura de Diretórios

```
agentic-ai-suite/
├── README.md                    # Guia principal da aplicação
├── AGENTS.md                    # Documentação dos agentes BMAD
├── docs/                        # Documentação adicional
│   ├── agents-guide.md
│   ├── config-guide.md
│   ├── pipelines-guide.md
│   ├── plugins-guide.md
│   ├── project-guide.md
│   └── ...
├── tools/
│   └── nvidia/                  # Ferramentas NVIDIA
└── workspaces/
    └── promptbuilder/
        └── opencode-bmad/       # Aplicação principal
            ├── pom.xml           # Maven build (Spring Boot 4.0.1, Java 17)
            ├── src/             # Código fonte Java
            ├── _bmad/           # Configuração BMAD
            ├── .agents/         # ~54 habilidades de agentes
            └── environment.bat  # Script de setup
```

---

## Módulo Principal: Prompt Builder (Java/Spring Boot)

### Tecnologias
- **Framework**: Spring Boot 4.0.1
- **Linguagem**: Java 17
- **Build**: Maven
- **Template Engine**: Thymeleaf
- **Parser Markdown**: Flexmark 0.64.0

### Dependências (pom.xml)
```xml
- spring-boot-starter-webmvc      # Web REST
- spring-boot-starter-thymeleaf  # Templates HTML
- flexmark-all                    # Processamento Markdown
- spring-boot-maven-plugin        # Build nativo
- native-maven-plugin             # Compilação GraalVM
```

### Pacotes Java (`src/main/java/io/github/akumosstl/agentic/`)
| Pacote | Responsabilidade |
|--------|------------------|
| `work/MarkdownParserService.java` | Parsing e processamento de Markdown |
| `work/FolderCreator.java` | Criação de estruturas de diretórios |
| `work/AgentFileManager.java` | Gerenciamento de arquivos de agentes |
| `web/PromptBuilderViewController.java` | Controller UI (Thymeleaf) |
| `web/AgentPromptController.java` | API REST para agentes |
| `AgenticApplication.java` | Entry point Spring Boot |

---

## Framework BMAD (Breakthrough Method for Agile AI-Driven Development)

### Estrutura de Habilidades (51 skills)

#### Agentes de Projeto (6)
| Habilidade | Descrição |
|------------|-----------|
| bmad-agent-pm | Product Manager (John) - PRD, Requirements |
| bmad-agent-architect | System Architect (Winston) - Arquitetura técnica |
| bmad-agent-dev | Senior Engineer (Amelia) - Implementação |
| bmad-agent-analyst | Business Analyst (Mary) - Análise estratégica |
| bmad-agent-tech-writer | Technical Writer (Paige) - Documentação |
| bmad-agent-ux-designer | UX Designer (Sally) - Design de interface |

#### Agentes de Teste (9 - TEA Module)
| Habilidade | Descrição |
|------------|-----------|
| bmad-tea | Master Test Architect (Murat) |
| bmad-testarch-framework | Setup framework (Playwright/Cypress) |
| bmad-testarch-test-design | Design de plano de testes |
| bmad-testarch-test-review | Revisão de qualidade |
| bmad-testarch-atdd | Testes aceitação ATDD |
| bmad-testarch-ci | Pipeline CI/CD |
| bmad-testarch-automate | Automação de testes |
| bmad-testarch-nfr | Requisitos não-funcionais |
| bmad-testarch-trace | Matriz de rastreabilidade |

#### Agentes de Criação (9)
| Habilidade | Descrição |
|------------|-----------|
| bmad-create-prd | Criar Product Requirements Document |
| bmad-create-story | Criar user story |
| bmad-create-epics-and-stories | Decompor em epics/stories |
| bmad-create-architecture | Arquitetura técnica |
| bmad-create-ux-design | Especificações UX |
| bmad-product-brief | Product Brief |
| bmad-prfaq | PRFAQ Working Backwards |
| bmad-module-builder | Planejar/criar módulos |
| bmad-dev-story | Executar implementação |

#### Agentes de Revisão (5)
| Habilidade | Descrição |
|------------|-----------|
| bmad-code-review | Revisão adversarial |
| bmad-review-adversarial-general | Crítica geral |
| bmad-review-edge-case-hunter | Análise de edge cases |
| bmad-validate-prd | Validação PRD |
| bmad-check-implementation-readiness | Verificar prontidão |

#### Agentes de Planejamento (4)
| Habilidade | Descrição |
|------------|-----------|
| bmad-sprint-planning | Planejamento de sprint |
| bmad-sprint-status | Status do sprint |
| bmad-retrospective | Retrospectiva |
| bmad-correct-course | Correção de rota |

#### Utilitários (18)
| Habilidade | Descrição |
|------------|-----------|
| bmad-help | Ajuda geral |
| bmad-brainstorming | Sessões de ideação |
| bmad-party-mode | Discussão multi-agente |
| bmad-document-project | Documentar projetos |
| bmad-distillator | Compressão de documentos |
| bmad-shard-doc | Divisão de documentos |
| bmad-index-docs | Criar índice |
| bmad-technical-research | Pesquisa técnica |
| bmad-market-research | Pesquisa de mercado |
| bmad-domain-research | Pesquisa de domínio |
| bmad-generate-project-context | Gerar contexto |
| bmad-customize | Personalização |
| bmad-agent-builder | Criar agentes |
| bmad-workflow-builder | Construir workflows |
| bmad-bmb-setup | Setup BMB |
| bmad-editorial-review-prose | Revisão editorial |
| bmad-editorial-review-structure | Revisão estrutural |
| bmad-advanced-elicitation | Elicitação avançada |

---

## Configuração BMAD

### Arquivos de Configuração
| Arquivo | Propósito |
|---------|-----------|
| `_bmad/config.toml` | Configuração principal (gerado pelo instalador) |
| `_bmad/custom/config.toml` | Overrides de equipe |
| `_bmad/custom/config.user.toml` | Overrides pessoais |

### Configurações Principais
```toml
[core]
document_output_language = "English"
output_folder = "{project-root}/_bmad-output"

[modules.bmm]
planning_artifacts = "_bmad-output/planning-artifacts"
implementation_artifacts = "_bmad-output/implementation-artifacts"
project_knowledge = "docs"

[modules.tea]
test_artifacts = "_bmad-output/test-artifacts"
tea_use_playwright_utils = true
```

---

## Fluxo de Execução

### Iniciar Aplicação
```powershell
cd workspaces/promptbuilder/opencode-bmad
mvn clean package
mvn spring-boot:run
# Acesse: http://localhost:4200
```

### Usar Habilidades BMAD
```bash
# No OpenCode, use o comando /skill
/skill bmad-agent-pm
/skill bmad-create-prd
```

---

## Observações Técnicas

1. **Persistência**: Habilidades BMAD usam `super memory` para contexto
2. **Customização**: Cada habilidade pode ter `customize.toml` para comportamento
3. **Output**: Artefatos vão para `_bmad-output/` (planejamento, implementação, testes)
4. **Idiomas**: Suporta múltiplas línguas para documentos e comunicação

---

*Documento gerado automaticamente via análise de estrutura do projeto.*