import { ACCESS } from '@/app/_consts/const';

export async function joinCalendar(inviteCode: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/calendars/join`,
    {
      method: 'POST',
      next: {
        tags: ['JoinCalendar'],
      },
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(ACCESS)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inviteCode: inviteCode,
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`[joinCalendar] ${res.body}`);
  }
}
