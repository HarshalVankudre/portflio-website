import { cookies } from 'next/headers';
import { LANGUAGE_COOKIE } from '@/lib/i18n';

export async function GET() {
  const cookieStore = cookies();
  cookieStore.delete(LANGUAGE_COOKIE);

  return new Response('Language cookie cleared', {
    status: 200,
    headers: {
      'Location': '/',
    },
  });
}
