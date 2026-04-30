# sql-runner — MCP Server

MCP server that connects to SQL databases and executes queries from natural language prompts via OpenCode CLI.

## How It Works

When you ask a question in OpenCode referencing `@sql-runner`, the LLM translates your question into a SQL query and calls the appropriate tool on the MCP server. The server connects to the configured database, executes the query, and returns the results.

Example: `@sql-runner Quantos empregados temos na empresa de nome XX?` → the LLM calls `execute_query` with `SELECT COUNT(*) FROM employees WHERE company_name = 'XX'`.

## Supported Databases

| Type | Driver | Notes |
|------|--------|-------|
| **PostgreSQL** | `pg` | Full support |
| **MySQL** | `mysql2` | Full support |
| **MariaDB** | `mysql2` | Same wire protocol as MySQL |
| **H2** | `pg` (PG compat mode) | H2 must be started with PostgreSQL wire protocol enabled |

## MCP Tools

| Tool | Description |
|------|-------------|
| `execute_query` | Execute any SQL statement (SELECT, INSERT, UPDATE, DELETE, DDL) |
| `list_tables` | List all tables in the database |
| `describe_table` | Get column definitions for a table (name, type, nullable, default) |
| `get_db_config` | Return current database config (passwords masked) |

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Database Connection

Copy the example config and edit with your database credentials:

```bash
copy db-config.example.json db-config.json
```

`db-config.json`:

```json
{
  "type": "postgres",
  "user": "postgres",
  "password": "your-password",
  "address": "localhost",
  "port": 5432,
  "database": "mydb",
  "ssl": false
}
```

For MySQL:

```json
{
  "type": "mysql",
  "user": "root",
  "password": "your-password",
  "address": "localhost",
  "port": 3306,
  "database": "mydb",
  "ssl": false
}
```

For MariaDB:

```json
{
  "type": "mariadb",
  "user": "root",
  "password": "your-password",
  "address": "localhost",
  "port": 3306,
  "database": "mydb",
  "ssl": false
}
```

For H2 (PostgreSQL compatibility mode):

```json
{
  "type": "h2",
  "user": "sa",
  "password": "",
  "address": "localhost",
  "port": 5435,
  "database": "test",
  "ssl": false
}
```

> **Important**: Never commit `db-config.json` with real credentials. It is already excluded via `.gitignore`.

### 3. Configure OpenCode

`opencode.json` (already included):

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "sql-runner": {
      "type": "local",
      "command": ["node", "C:\\Users\\USER\\projects\\lab\\rag\\server.js"],
      "enabled": true
    }
  }
}
```

### 4. Start the Server

```bash
node server.js
```

You should see: `[sql-runner] Servidor MCP sql-runner rodando e aguardando requisições!`

### 5. Use with OpenCode

```bash
opencode
```

Then ask questions:

- `@sql-runner Quantos empregados temos na empresa de nome Acme?`
- `@sql-runner Liste todas as tabelas do banco`
- `@sql-runner Descreva a estrutura da tabela employees`
- `@sql-runner Qual a configuração atual do banco?`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `SQL_RUNNER_CONFIG` | Path to database config JSON file | `./db-config.json` |

## Project Structure

```
├── server.js              # MCP server (stdio transport)
├── h2-connection.js       # H2 database connection (PG compat mode)
├── db-config.json         # Database connection config (DO NOT COMMIT)
├── db-config.example.json # Config template
├── opencode.json          # OpenCode MCP integration config
├── package.json           # Node.js project definition
└── AGENTS.md              # Agent instructions
```

## Troubleshooting

**MCP server not starting:**
- Run `node server.js` directly and check for errors
- Verify `db-config.json` exists and is valid JSON

**Database connection errors:**
- Verify credentials in `db-config.json`
- Ensure the database server is running and accessible
- For H2: ensure H2 is started with PG mode (`-pg` flag)

**Tool not found in OpenCode:**
- Verify `opencode.json` points to the correct `server.js` path
- Restart OpenCode after config changes


## Docker

```bash
docker compose up -d
```