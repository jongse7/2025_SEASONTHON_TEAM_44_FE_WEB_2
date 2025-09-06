import { useNavigate } from "react-router-dom";

export interface PostCardProps {
  id: number;
  imageUrl: string;
  title: string;
  date: string;
  visitCount: number;
  isNotice: boolean;
}

export default function PostCard({
  imageUrl,
  title,
  date,
  visitCount,
  isNotice,
  id,
}: PostCardProps) {
  const navigate = useNavigate();
  const handleCardClick = () => {
    try {
      navigate(`/main/${id}`);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };
  return (
    <div
      className="w-full border-2 cursor-pointer border-gray-50 rounded-[12px] relative overflow-hidden"
      onClick={handleCardClick}
    >
      <div className="w-full h-[110px] relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full flex flex-col gap-[5px] px-[20px] py-[16px]">
        <h3 className="text-sub2 text-black">{title}</h3>
        <div className="text-gray-500 text-body4 bg-white w-full flex flex-row justify-between">
          <p>{date}</p>
          <p>방문횟수: {visitCount}회/10회</p>
        </div>
      </div>
      {isNotice && (
        <div className="absolute rounded-[12px] bg-primary-700 text-white top-[15px] text-body3 p-[10px] justify-items-center flex right-[15px]">
          새로운공지
        </div>
      )}
    </div>
  );
}
