'use client';

import { useEffect } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { ACCESS, REDIRECT, REFRESH } from '@/app/_consts/const';

type loginResponse = {
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export default function Auth() {
  const params = useSearchParams();

  const authenticate = async () => {
    const token = params.get('token');
    const res: loginResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/web-login`,
      {
        exchangeToken: token,
      }
    );
    sessionStorage.setItem(ACCESS, res.data.accessToken);
    sessionStorage.setItem(REFRESH, res.data.refreshToken);
    const redirectUrl = sessionStorage.getItem(REDIRECT);
    sessionStorage.removeItem(REDIRECT);
    redirect(redirectUrl ?? '/');
  };

  useEffect(() => {
    authenticate();
  }, []);
}
