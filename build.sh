#!/bin/sh
set -e
rm -rf .next
yarn next build
sed -i '' -E "s/const currentPort = parseInt\\(process\\.env\\.PORT, 10\\) \\|\\| 3000/const currentPort = parseInt(process.env.I18N_EDITOR_PORT, 10) || 25560/" .next/standalone/server.js
echo "#!/usr/bin/env node\n$(cat .next/standalone/server.js)" > .next/standalone/server.js
chmod +x .next/standalone/server.js
cp -a .next/static .next/standalone/.next/static
cp -a public .next/standalone/public
