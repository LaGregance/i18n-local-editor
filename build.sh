#!/bin/sh
rm -rf .next
yarn next build
sed -i '' -E "s/const currentPort = parseInt\\(process\\.env\\.PORT, 10\\) \\|\\| 3000/const currentPort = parseInt(process.env.I18N_EDITOR_PORT, 10) || 25560/" .next/standalone/server.js
