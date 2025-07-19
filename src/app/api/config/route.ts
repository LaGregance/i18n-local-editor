import { EDITOR_CONFIG } from '@/i18n/config';

export async function GET() {
  return Response.json(EDITOR_CONFIG);
}
