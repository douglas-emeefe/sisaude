# SISAUDE
Este documento contém instruções passo-a-passo, estrutura de pastas, comandos e código inicial para criar o sistema sisaude com Node/Express + PostgreSQL + Prisma. 
## Estrutura das pastas:
```bash
/sisaude
    /backend
    /frontend
    /database
```
## Procedimento completo para rodar tudo localmente
1. Dentro da pasta /database executar o comando para subir o Postgres:
```bash
docker compose up -d
```
2. Configure .env do backend com DATABASE_URL apontando para o Postgres.

3. Dentro da pasta /backend executar os camandos:
```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```
4. Dentro da pasta /frontend executar os comandos:
```bash
npm install
npm run dev
```