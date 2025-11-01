# ponder

Ponder relies on a PostgreSQL database to store the indexed data

## Setup
### Database

See [offchain](../offchain/README.md#database)

### Environment Variables
Add your RPC URLs and database URL to `.env.local`
```bash
cp example.env.local .env.local
```

### Install Dependencies
```bash
npm install
```

### Running
To run in [ponder dev](https://ponder.sh/docs/api-reference/ponder-cli#dev) mode (hot reloading, more terminal ui, unlocked tables)
```bash
npm run dev
```

To run in [ponder start](https://ponder.sh/docs/api-reference/ponder-cli#start) mode (production, no hot reloading, less terminal ui, locked tables) 
```bash
npm run start
```
