import { getEditorConfig } from '@/shared/config';

export async function GET() {
  return Response.json(getEditorConfig());
}
