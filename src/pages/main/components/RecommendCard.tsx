import type { GetStampRecommendResponseSchema } from '@/schema/api/stamp';
import { useNavigate } from 'react-router-dom';

interface RecommendCardProps {
  post: GetStampRecommendResponseSchema['response'];
}

export default function RecommendCard({ post }: RecommendCardProps) {
  const navigate = useNavigate();
  if (post === null) return null;
  const handleCardClick = () => {
    try {
      const storeId = post.storeId;
      navigate(`/main/${storeId}`, { state: { from: 'main' } });
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };
  return (
    <div
      className="w-full border-2 cursor-pointer border-gray-50 rounded-[12px] relative overflow-hidden"
      onClick={handleCardClick}
    >
      <div className="w-full h-[110px] relative">
        <img
          src={post.imageUrl}
          alt={post.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full flex flex-col gap-[5px] px-[20px] py-[16px]">
        <h3 className="text-sub2 text-black">{post.name}</h3>
        <div className="text-gray-500 text-body4 bg-white w-full">
          <p>{post.address}</p>
        </div>
      </div>
    </div>
  );
}
