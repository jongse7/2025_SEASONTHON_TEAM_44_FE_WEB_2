interface OnboardingIllustrationProps {
  step: number;
  className?: string;
}

const onboardingImages = [
  "/images/onboarding/onboadring1.png", // 0번째 (오타가 있는 파일명)
  "/images/onboarding/onboarding2.png", // 1번째
  "/images/onboarding/onboarding3.png", // 2번째
  "/images/onboarding/onboarding4.png", // 3번째
];

export default function OnboardingIllustration({
  step,
  className = "",
}: OnboardingIllustrationProps) {
  return (
    <div className={`flex items-center px-[50px] justify-center ${className}`}>
      <img
        src={onboardingImages[step]}
        alt={`온보딩 ${step + 1}`}
        className="object-contain"
      />
    </div>
  );
}
