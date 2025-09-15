import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import OnboardingIllustration from '@/components/svg/OnboardingIllustration';
import Space from '@/components/Space';

const onboardingData = [
  {
    title: '새로운 단골 등록!',
    description:
      '손님이 처음 QR을 찍으면 자동으로 단골로\n등록되며, 이후 방문을 기록할 수 있어요',
  },
  {
    title: '매 방문이 기록되는 스탬프',
    description: 'QR 스캔 한 번으로\n손님의 방문이 자동으로 적립돼요',
  },
  {
    title: '10번 채우면 단골 인증서',
    description:
      '스탬프가 가득 차면 단골 인증서\n발급되어 혜택을 제공할 수 있어요',
  },
  {
    title: '등록부터 인증까지 한 QR로',
    description: 'QR 하나만으로 신규·적립·인증을\n모두 관리할 수 있어요',
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < onboardingData.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/main');
    }
  };

  const currentData = onboardingData[currentStep];
  const isLastStep = currentStep === onboardingData.length - 1;

  return (
    <div className="min-h-screen w-full bg-white flex flex-col justify-end items-center">
      <div className="mb-8">
        <OnboardingIllustration step={currentStep} className="w-full" />
        <div className="flex justify-center space-x-2 px-6 py-4">
          {onboardingData.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentStep ? 'bg-primary-400' : 'bg-gray-100'
              }`}
            />
          ))}
        </div>
      </div>
      <Space className="h-40" />
      <h1 className="text-sub1 text-center text-black mb-5 font-semibold">
        {currentData.title}
      </h1>
      <p className="text-body1 text-center text-gray-800 leading-relaxed max-w-sm whitespace-pre-line">
        {currentData.description}
      </p>
      <Space className="h-25" />
      <Button
        onClick={handleNext}
        className="w-full max-w-sm bg-primary-500 hover:bg-primary-700 text-white rounded-[12px] py-4 text-button1 font-medium transition-colors duration-200"
      >
        {isLastStep ? '다시 온 시작!' : '다음'}
      </Button>
      <Space className="h-12" />
    </div>
  );
}
