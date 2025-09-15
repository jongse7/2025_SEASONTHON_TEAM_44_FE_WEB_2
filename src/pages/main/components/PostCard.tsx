import type { GetStampMainResponseSchema } from '@/schema/api/stamp';
import { useNavigate } from 'react-router-dom';

interface PostCardProps {
  post: GetStampMainResponseSchema['response']['storeList'][0];
}

export default function PostCard({ post }: PostCardProps) {
  const navigate = useNavigate();
  const handleCardClick = () => {
    try {
      const storeId = post.storeId;
      navigate(`/main/${storeId}`);
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
          alt={post.storeName}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full flex flex-col gap-[5px] px-[20px] py-[16px]">
        <h3 className="text-sub2 text-black">{post.storeName}</h3>
        <div className="text-gray-500 text-body4 bg-white w-full flex flex-row justify-between">
          <p>마지막 방문: {post.lastVisit}</p>
          <p>방문횟수: {post.availableStamp}회/10회</p>
        </div>
      </div>
      {post.hasNewNoti && (
        <div className="absolute rounded-[12px] bg-primary-700 text-white top-[15px] text-body3 p-[10px] justify-items-center flex right-[15px]">
          새로운공지
        </div>
      )}
    </div>
  );
}
