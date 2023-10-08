#!/bin/bash
sleep 20
# Run Prisma migration without prompting for user input
npx prisma migrate dev --name init --skip-generate


npm run start:dev