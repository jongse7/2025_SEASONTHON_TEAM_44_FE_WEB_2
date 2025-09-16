import Button from '@/components/Button';
import Space from '@/components/Space';
import LogoText from '@/components/svg/LogoText';
import { useModal } from '@/hooks/useModal';
import { OwnerModal } from '@/pages/login/components/OwnerModal';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  kakaoLoginOptions,
  getUserLocationOptions,
} from '@/query/options/user';
import { useEffect } from 'react';

export const LoginPage = () => {
  const { openModal } = useModal();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const code = searchParams.get('code');

  const { data, isLoading, error } = useQuery(kakaoLoginOptions(code || ''));
  const { data: locationData } = useQuery({
    ...getUserLocationOptions(),
    enabled: !!data?.response?.accessToken,
  });

  useEffect(() => {
    if (data && code) {
      localStorage.setItem('accessToken', data.response.accessToken);
      localStorage.setItem('refreshToken', data.response.refreshToken);

      if (locationData?.response) {
        navigate('/main', { replace: true });
      } else {
        navigate('/location', { replace: true });
      }
    }
  }, [data, code, navigate, locationData]);

  useEffect(() => {
    if (error && code) {
      console.error('카카오 로그인 실패:', error);
      navigate('/', { replace: true });
    }
  }, [error, code, navigate]);

  const handleKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
      import.meta.env.VITE_KAKAO_ID
    }&redirect_uri=${encodeURIComponent(window.location.origin + '/')}`;
  };

  const handleOwnerLogin = () => {
    openModal(({ isOpen, onClose }) => (
      <OwnerModal isOpen={isOpen} onClose={onClose} />
    ));
  };

  if (isLoading && code) {
    return (
      <main className="flex flex-col h-screen w-full items-center justify-center bg-gradient-to-b from-[#FFECE9] to-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </main>
    );
  }

  return (
    <main className="flex flex-col h-screen w-full items-center justify-end bg-gradient-to-b from-[#FFECE9] to-white">
      <h2 className="text-body2 text-center text-gray-600">
        오늘도 다시 찾아온 손님
        <br />
        단골을 만드는 가장 따뜻한 방법
      </h2>
      <Space className="h-[15px]" />
      <LogoText className="text-[#FF645B]" />
      <Space className="h-[120px]" />
      <div className="relative flex w-full justify-center items-center">
        <img
          src="/images/user.png"
          alt="user"
          className="w-[240px] h-[240px]"
        />
        <img
          src="/images/login-article.png"
          alt="login-article"
          className="absolute z-0 -bottom-50 left-1/2 transform max-w-[380px] -translate-x-1/2 pointer-events-none"
        />
      </div>
      <div className="px-5 w-full gap-[5px] flex flex-col">
        <Button
          onClick={handleKakaoLogin}
          className="w-full text-button1 text-[#181600] py-[17px] bg-[#FEE500] rounded-[12px]"
        >
          카카오 로그인
        </Button>
        <Button
          onClick={handleOwnerLogin}
          className="w-full text-button1 text-gray-800 py-[17px] bg-primary-50 rounded-[12px]"
        >
          사장님 로그인
        </Button>
      </div>
      <Space className="h-16" />
    </main>
  );
};

export default LoginPage;
