import type { NextRequest } from 'next/server';
import { I18nLoader } from '@/i18n/i18n-loader';
import { EDITOR_CONFIG } from '@/i18n/config';

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const q = params.get('q')?.toLowerCase();
  const locales = params.get('locales')?.split(',');
  const ns = params.get('ns')?.split(',');

  let translations = I18nLoader.loadTranslations(locales || EDITOR_CONFIG.locales, ns || EDITOR_CONFIG.namespaces);

  if (q) {
    const tmp: any = {};

    for (const key of Object.keys(translations)) {
      if (key.toLowerCase().includes(q)) {
        tmp[key] = translations[key];
      } else {
        for (const locale of Object.keys(translations[key])) {
          if (translations[key][locale].toLowerCase().includes(q)) {
            tmp[key] = translations[key];
          }
        }
      }
    }

    translations = tmp;
  }

  return Response.json(translations);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  if (data.oldKey && data.oldKey !== data.key) {
    I18nLoader.setValue(data.oldKey, undefined);
  }
  I18nLoader.setValue(data.key, data.translations);
  return Response.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const key = params.get('key')!;
  I18nLoader.setValue(key, undefined);
  return Response.json({ success: true });
}
