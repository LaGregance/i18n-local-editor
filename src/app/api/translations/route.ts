import type { NextRequest } from 'next/server';
import { getEditorConfig } from '@/shared/config';
import { I18nFileEditor } from '@/shared/i18n-file-editor';

export async function GET(request: NextRequest) {
  try {
    const editorConfig = getEditorConfig();

    const params = request.nextUrl.searchParams;
    const q = params.get('q')?.toLowerCase();
    const locales = params.get('locales')?.split(',');
    const ns = params.get('ns')?.split(',');

    const editor = new I18nFileEditor(
      locales || editorConfig.locales,
      ns || editorConfig.namespaces,
      editorConfig.defaultNamespace,
      editorConfig.pathToFiles,
      editorConfig.keyFile
    );
    let translations = editor.flatExport();

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
  } catch (e: any) {
    console.error(e);
    return Response.json({ success: false, message: e?.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const editor = I18nFileEditor.loadFromConfig();
    editor.setValues(data.key, data.translations, true);
    editor.save();
    await editor.buildKeyFile();
    return Response.json({ success: true });
  } catch (e: any) {
    console.error(e);
    return Response.json({ success: false, message: e?.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const data = await request.json();
    const editor = I18nFileEditor.loadFromConfig();

    if (data.oldKey && data.oldKey !== data.key) {
      editor.setValues(data.oldKey, undefined);
    }
    editor.setValues(data.key, data.translations);
    editor.save();
    await editor.buildKeyFile();
    return Response.json({ success: true });
  } catch (e: any) {
    console.error(e);
    return Response.json({ success: false, message: e?.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const key = params.get('key')!;

    const editor = I18nFileEditor.loadFromConfig();
    editor.setValues(key, undefined);
    editor.save();

    await editor.buildKeyFile();
    return Response.json({ success: true });
  } catch (e: any) {
    console.error(e);
    return Response.json({ success: false, message: e?.message }, { status: 500 });
  }
}
