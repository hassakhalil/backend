#!/bin/bash
# sleep 10
# Run Prisma migration without prompting for user input
npx prisma generate
# sleep 10
npx prisma migrate dev --name init
# sleep 5
npm run start:dev