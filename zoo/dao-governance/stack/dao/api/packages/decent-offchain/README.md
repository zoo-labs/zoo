# offchain

API to access DAO information, proposals, comments, temperature checks, and SIWE authentication.

## Prerequisites

- Install [bun](https://bun.sh/docs/installation)

  ```bash
  curl -fsSL https://bun.sh/install | bash
  ```

- Install PostgreSQL
  - [macOS (brew)](https://formulae.brew.sh/formula/postgresql@16)
    ```bash
    brew install postgresql@16
    ```
  - [Ubuntu](https://www.postgresql.org/download/linux/ubuntu/) `untested`
  - [Windows](https://www.postgresql.org/download/windows/) `untested`

## Setup

### Database

[macOS]
Start the database

```bash
brew services start postgresql@16
```

Configure postgresql in PATH (if you are using `zsh` shell)

```bash
echo 'export PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

Create a database

```bash
createdb dao
```

> The API depends on data from [ponder](../ponder). In order to speed up development, seed the database from the backup file in [data repo release](https://github.com/luxdao/data/releases/download/latest/db.sql). Download the file and save it to `packages/offchain/database/db.sql`.

Restore the database from the backup file

```bash
bash scripts/database/restore.sh
```

> OPTIONAL: See [ponder](../ponder/README.md) to run it locally. Not required to run the API if you use the restored database.

### Environment Variables

Add your RPC URLs and database URL to `.env`. Leave `DATABASE_URL` blank to use the local database.

```bash
cp example.env .env
```

### Install Dependencies

```bash
bun install
```

## Running

```bash
bun run dev
```

## API

see live [API docs](https://offchain.up.railway.app/docs)

## Websocket

Local testing: Connect to ws://localhost:81/ws
