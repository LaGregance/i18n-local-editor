import type { NextRequest } from 'next/server';
import { I18nManager } from '@/i18n/i18n-manager';
import { getEditorConfig } from '@/i18n/config';

export async function GET(request: NextRequest) {
  const editorConfig = getEditorConfig();

  const params = request.nextUrl.searchParams;
  const q = params.get('q')?.toLowerCase();
  const locales = params.get('locales')?.split(',');
  const ns = params.get('ns')?.split(',');

  let translations = I18nManager.loadTranslations(locales || editorConfig.locales, ns || editorConfig.namespaces);

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
  try {
    const data = await request.json();
    if (data.oldKey && data.oldKey !== data.key) {
      I18nManager.setValue(data.oldKey, undefined);
    }
    I18nManager.setValue(data.key, data.translations);
    await I18nManager.buildKeyFile();
    return Response.json({ success: true });
  } catch (e: any) {
    return Response.json({ success: false, message: e?.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const key = params.get('key')!;
    I18nManager.setValue(key, undefined);
    await I18nManager.buildKeyFile();
    return Response.json({ success: true });
  } catch (e: any) {
    return Response.json({ success: false, message: e?.message }, { status: 500 });
  }
}
