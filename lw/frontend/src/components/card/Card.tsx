'use client'

import Image from "next/image";

export interface CardProps {
  title: string;
  startDateTime: string;
  venue: string;
  images?: string[];
}

const Card: React.FC<CardProps> = ({
  title,
  startDateTime,
  venue,
  images = [],
}) => {
  return (
    <div className="w-full max-w-sm rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-all duration-300">
      
      {/* Image */}
      <div className="relative h-48 w-full bg-gray-100">
        {images.length > 0 ? (
          <Image
            src={images[0]}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={false}
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-sm text-gray-500">
            No Image Available
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {title}
        </h3>

        <p className="text-sm text-gray-600 flex items-center gap-1">
          📅 <span>{startDateTime}</span>
        </p>

        <p className="text-sm text-gray-600 flex items-center gap-1 line-clamp-2">
          📍 <span>{venue}</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
