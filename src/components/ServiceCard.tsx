import Image from 'next/image';

interface ServiceCardProps {
  title: string;
  imageUrl: string;
  bgColor: string;
}

export default function ServiceCard({ title, imageUrl, bgColor }: ServiceCardProps) {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden shadow-lg border border-gray-100 transform transition hover:scale-105">
      <div className="relative h-48 w-full">
        <Image 
          src={imageUrl} 
          alt={title} 
          fill 
          className="object-cover"
        />
      </div>
      {/* Warna background dibuat lebih kontras */}
      <div className={`${bgColor} py-4 text-center`}>
        <h3 className="font-bold text-blue-900 uppercase text-sm tracking-widest">
          {title}
        </h3>
      </div>
    </div>
  );
}