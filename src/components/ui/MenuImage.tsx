import Image from 'next/image';

interface MenuImageProps {
  alt: string;
  src: string;
}

export default function MenuImage({ alt, src }: MenuImageProps) {
  return (
    <Image
      alt={alt}
      src={src}
      className='rounded-full hover:shadow-sm hover:shadow-red-700 transition-all duration-200'
      width={150}
      height={150}
    />
  );
}
