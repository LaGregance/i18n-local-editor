import { getEditorConfig } from '@/i18n/config';

export async function GET() {
  return Response.json(getEditorConfig());
}
