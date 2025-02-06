import { ACCESS } from '@/app/_consts/const';

type member = {
  name: string;
  job: string;
  profileImageUrl: string;
};

export async function getMember() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/members/me`,
    {
      next: {
        tags: ['me'],
      },
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem(ACCESS)}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error('[getMember] Failed to fetch data');
  }

  return res.json();
}
