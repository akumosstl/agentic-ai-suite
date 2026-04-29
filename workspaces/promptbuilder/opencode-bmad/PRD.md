# Product Requirements Document (PRD)

## 1. Overview

### 1.1 Product Name
**agentic-ai-suite** (codinome: Prompt Builder)

### 1.2 Type
Enterprise AI-driven Development Platform + Web Application

### 1.3 Core Summary
Uma plataforma que combina uma aplicação web Spring Boot para construção de prompts com um framework de ~51 agentes de IA (BMAD - Breakthrough Method for Agile AI-Driven Development) que orchestram o desenvolvimento de software orientado a especificações.

### 1.4 Target Users
- Desenvolvedores de software que utilizam assistentes de IA
- Times de desenvolvimento agile adopting AI-assisted workflows
- Engenheiros de software trabalhando com Java/Spring Boot

---

## 2. Technologies Stack

### 2.1 Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Spring Boot** | 4.0.1 | Core application framework |
| **Java** | 17 (migration to 25 planned) | Programming language |
| **Maven** | - | Build automation tool |
| **Flexmark** | 0.64.0 | Markdown parsing and rendering |
| **Thymeleaf** | (from Spring Boot) | Server-side HTML templating |
| **GraalVM Native** | - | Native compilation support |
| **Spring Boot Maven Plugin** | - | Application packaging |

### 2.2 AI/Agent Framework Technologies

| Component | Technology |
|-----------|------------|
| **Agent Skills** | ~51 specialized AI skills |
| **Skill Management** | BMAD (custom framework) |
| **Module System** | BMB (BMAD Builder) |
| **Testing Modules** | TEA (Test Architecture) |

### 2.3 Infrastructure

| Layer | Technology |
|-------|------------|
| **Runtime** | JVM 17+ (target: 25) |
| **Build Output** | Executable JAR/Native binary |
| **Deployment** | Local (development), Docker-ready |

---

## 3. Functional Requirements

### 3.1 Core Application (Prompt Builder)

#### FR-001: Markdown Parser Service
- Parse markdown content using Flexmark library
- Render converted content for web display
- Support full CommonMark specification

#### FR-002: Folder Creation Service
- Create directory structures programmatically
- Support nested folder hierarchies
- Handle path validation and security

#### FR-003: Agent File Manager
- Manage agent-generated files
- Handle file CRUD operations
- Support multiple file formats

#### FR-004: REST API (AgentPromptController)
- Endpoint: `/api/prompts`
- Accept JSON payloads with prompt content
- Return processed/parsed results

#### FR-005: Web UI (PromptBuilderViewController)
- Thymeleaf-based server-side rendering
- Route: `/` (home)
- Interactive prompt builder interface

### 3.2 BMAD Framework

#### FR-006: Project Agents (6 agents)
The following specialized AI agents work collaboratively:

| Agent Code | Agent Name | Role |
|------------|------------|------|
| bmad-agent-pm | John | Product Manager - PRD creation, requirements discovery |
| bmad-agent-architect | Winston | System Architect - technical architecture, solution design |
| bmad-agent-dev | Amelia | Senior Software Engineer - implementation, code delivery |
| bmad-agent-analyst | Mary | Business Analyst - strategic analysis, evidence-based findings |
| bmad-agent-tech-writer | Paige | Technical Writer - documentation, knowledge curation |
| bmad-agent-ux-designer | Sally | UX Designer - interface design, user experience |

#### FR-007: Test Architecture Module (TEA) - 9 skills
Automated testing and quality assurance:

| Skill | Purpose |
|-------|---------|
| bmad-testarch-framework | Initialize Playwright/Cypress test framework |
| bmad-testarch-test-design | Create system-level test plans |
| bmad-testarch-test-review | Review test quality |
| bmad-testarch-atdd | Acceptance TDD test scaffolds |
| bmad-testarch-ci | CI/CD quality pipeline setup |
| bmad-testarch-automate | Expand test automation coverage |
| bmad-testarch-nfr | Non-functional requirements assessment |
| bmad-testarch-trace | Traceability matrix generation |
| bmad-qa-generate-e2e-tests | Generate end-to-end automated tests |

#### FR-008: Creation Skills - 9 skills
Content and artifact generation:

| Skill | Purpose |
|-------|---------|
| bmad-create-prd | Create Product Requirements Document |
| bmad-create-story | Create detailed user story |
| bmad-create-epics-and-stories | Decompose requirements into epics/stories |
| bmad-create-architecture | Create technical architecture design |
| bmad-create-ux-design | Plan UX patterns and specifications |
| bmad-product-brief | Create/update product briefs |
| bmad-prfaq | PRFAQ Working Backwards method |
| bmad-module-builder | Plan and create BMAD modules |
| bmad-dev-story | Execute story implementation |

#### FR-009: Review Skills - 5 skills
Quality assurance and validation:

| Skill | Purpose |
|-------|---------|
| bmad-code-review | Adversarial code review |
| bmad-review-adversarial-general | Critical review and findings |
| bmad-review-edge-case-hunter | Edge case analysis |
| bmad-validate-prd | PRD validation against standards |
| bmad-check-implementation-readiness | Validate PRD, UX, Architecture completeness |

#### FR-010: Planning Skills - 4 skills
Project management and sprint operations:

| Skill | Purpose |
|-------|---------|
| bmad-sprint-planning | Generate sprint status tracking |
| bmad-sprint-status | Summarize sprint status, surface risks |
| bmad-retrospective | Post-epic review and lessons learned |
| bmad-correct-course | Manage significant sprint changes |

#### FR-011: Utility Skills - 18 skills
Supporting tools and operations:

| Skill | Purpose |
|-------|---------|
| bmad-help | Help system and guidance |
| bmad-brainstorming | Ideation and brainstorming sessions |
| bmad-party-mode | Multi-agent group discussions |
| bmad-document-project | Project documentation for AI context |
| bmad-distillator | LLM-optimized document compression |
| bmad-shard-doc | Split large documents into smaller files |
| bmad-index-docs | Generate documentation index |
| bmad-technical-research | Technical research and reports |
| bmad-market-research | Market and competition research |
| bmad-domain-research | Domain and industry research |
| bmad-generate-project-context | Generate AI rules context |
| bmad-customize | Customize agent behavior |
| bmad-agent-builder | Build new AI agents |
| bmad-workflow-builder | Build/convert/analyze workflows |
| bmad-bmb-setup | Setup BMad Builder module |
| bmad-editorial-review-prose | Prose and copy editing |
| bmad-editorial-review-structure | Structural editing |
| bmad-advanced-elicitation | Advanced elicitation techniques |

---

## 4. Architecture Overview

### 4.1 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      agentic-ai-suite                           │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐ │
│  │              WEB LAYER (Spring Boot)                      │ │
│  │  ┌─────────────────────┐  ┌──────────────────────────┐   │ │
│  │  │ PromptBuilderView  │  │    AgentPromptController │   │ │
│  │  │  Controller        │  │    (REST API)            │   │ │
│  │  └──────────┬──────────┘  └────────────┬─────────────┘   │ │
│  │             │                           │                 │ │
│  │  ┌──────────┴──────────┐  ┌────────────┴─────────────┐   │ │
│  │  │     Thymeleaf       │  │   MarkdownParserService │   │ │
│  │  │   (UI Templates)    │  │   (Flexmark)            │   │ │
│  │  └─────────────────────┘  └─────────────────────────┘   │ │
│  └──────────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │              SERVICE LAYER                                │ │
│  │  ┌────────────────┐  ┌──────────────┐  ┌──────────────┐  │ │
│  │  │ FolderCreator │  │AgentFileMgr  │  │   (Core)     │  │ │
│  │  └────────────────┘  └──────────────┘  └──────────────┘  │ │
│  └──────────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │              BMAD FRAMEWORK (~51 Skills)                 │ │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌────────────────┐  │ │
│  │  │  BMM    │ │  BMB    │ │  TEA    │ │  Skill Assets │  │ │
│  │  │ Module  │ │ Module  │ │ Module  │ │  & Config     │  │ │
│  │  └─────────┘ └─────────┘ └─────────┘ └────────────────┘  │ │
│  └──────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Module Dependencies

| Module | Description | Dependencies |
|--------|-------------|--------------|
| **Bmm** | Base Method Module - core BMAD functionality | Java 17+, Spring Boot |
| **Bmb** | BMAD Builder - code generation and file creation | Bmm |
| **Tea** | Test Architecture - QA and testing | Bmm, optional: Playwright, Cypress |

### 4.3 Data Flow

```
User Input → Controller → Service Layer → BMAD Skills
                 ↓                              ↓
           Thymeleaf UI              Generated Output
           (HTML Response)            (Files, Docs, Code)
```

---

## 5. Non-Functional Requirements

### 5.1 Performance
- **Build Time**: Maven build should complete within 60 seconds
- **API Response**: REST endpoints respond within 500ms
- **Memory Usage**: JVM heap configuration optimized for development (default: 512MB)

### 5.2 Compatibility
- **Java Version**: Currently Java 17, target migration to Java 25
- **Spring Boot**: 4.0.1 (latest stable)
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)

### 5.3 Maintainability
- **Code Structure**: Follows Spring Boot conventions (package-by-feature)
- **Documentation**: Skill-based documentation in each .agents/skills/*/SKILL.md
- **Configuration**: TOML-based configuration with override support

### 5.4 Extensibility
- **Skill System**: New skills can be added to .agents/skills/
- **Customization**: Team and user-level overrides via custom/config.toml
- **Module System**: BMB allows creating new modules

### 5.5 Security
- **No External Dependencies**: Framework runs locally (except Maven repos)
- **File System**: Agent file operations scoped to project directory
- **API**: No authentication on local development endpoints

---

## 6. Current State & Roadmap

### 6.1 Completed Features
- [x] Spring Boot web application setup
- [x] Markdown parsing service (Flexmark)
- [x] Thymeleaf UI templates
- [x] REST API endpoints
- [x] BMAD framework installation (~51 skills)
- [x] Project context documentation (SYSTEM_CONTEXT.md)

### 6.2 In Progress
- [ ] Java 17 → 25 migration (per README.md)

### 6.3 Planned
- [ ] OpenRewrite recipe for Java 25 automation
- [ ] Native build optimization
- [ ] Extended skill coverage

---

## 7. Project Structure

```
agentic-ai-suite/
├── pom.xml                          # Maven build config
├── README.md                        # Project documentation (PT-BR)
├── SYSTEM_CONTEXT.md                # Architecture context
├── AGENTS.md                        # BMAD agents reference
│
├── src/main/java/io/github/akumosstl/agentic/
│   ├── AgenticApplication.java      # Entry point
│   ├── work/
│   │   ├── MarkdownParserService.java
│   │   ├── FolderCreator.java
│   │   └── AgentFileManager.java
│   └── web/
│       ├── PromptBuilderViewController.java
│       └── AgentPromptController.java
│
├── _bmad/                           # BMAD configuration
│   └── config.toml                  # Framework config
│
├── .agents/                         # BMAD skills (~51)
│   ├── skills/
│   │   ├── bmad-agent-pm/          # John - Product Manager
│   │   ├── bmad-agent-architect/    # Winston - Architect
│   │   ├── bmad-agent-dev/         # Amelia - Developer
│   │   ├── bmad-agent-analyst/      # Mary - Business Analyst
│   │   ├── bmad-agent-tech-writer/ # Paige - Tech Writer
│   │   ├── bmad-agent-ux-designer/ # Sally - UX Designer
│   │   ├── bmad-tea/               # Murat - Test Architect
│   │   └── ... (44 more skills)
│   └── ...
│
└── docs/                            # Additional documentation
    ├── agents-guide.md
    ├── config-guide.md
    ├── pipelines-guide.md
    └── ...
```

---

## 8. References

| Document | Location |
|----------|----------|
| Build Guide | `AGENTS.md` - "Running the Main Application" |
| BMAD Setup | `README.md` - Installation instructions |
| Skills Reference | `AGENTS.md` - Table of ~50 installed skills |
| Architecture | `SYSTEM_CONTEXT.md` |

---

## 9. Appendix: Technology Details

### A.1 Java Packages

| Package | Classes | Responsibility |
|---------|---------|----------------|
| `io.github.akumosstl.agentic` | AgenticApplication | Main Spring Boot application |
| `io.github.akumosstl.agentic.work` | 3 classes | Business logic services |
| `io.github.akumosstl.agentic.web` | 2 classes | HTTP controllers |

### A.2 Maven Dependencies

```xml
<!-- Web Framework -->
spring-boot-starter-webmvc

<!-- Markdown Processing -->
com.vladsch.flexmark:flexmark-all:0.64.0

<!-- Template Engine -->
spring-boot-starter-thymeleaf

<!-- Build Plugins -->
org.graalvm.buildtools:native-maven-plugin
org.springframework.boot:spring-boot-maven-plugin
```

---

*Document Version: 1.0*  
*Generated: 2026-04-27*  
*Based on: pom.xml, source code analysis, AGENTS.md, README.md*