const { existsSync } = require('fs');
const { execSync } = require('child_process');

const schemaPath = '../backend/prisma/schema.prisma';

if (existsSync(schemaPath)) {
  console.log(`Prisma schema found at ${schemaPath}, generating client...`);
  try {
    execSync(`npx prisma generate --schema ${schemaPath} --generator client_frontend`, { stdio: 'inherit' });
  } catch (err) {
    console.error('Prisma generate failed:', err);
    process.exit(1);
  }
} else {
  console.log(`No Prisma schema found at ${schemaPath}. Skipping prisma generate.`);
}
