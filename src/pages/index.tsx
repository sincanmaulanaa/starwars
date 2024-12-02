import Image from 'next/image';
import localFont from 'next/font/local';
import Navbar from '@/components/fragments/Navbar';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} relative min-h-screen flex justify-center items-center`}
    >
      <div className='absolute inset-0 z-0'>
        <Image
          src='/hero-image.webp'
          alt='Hero image of starwars'
          fill
          className='object-cover'
          priority
        />
      </div>
      <div className='z-10 relative'>
        <div className='max-w-2xl'>
          <Image
            className='mx-auto'
            src='/starwars.svg'
            alt='Logo of Starwars'
            width={300}
            height={300}
          />
        </div>
        <div className='p-0 font-[family-name:var(--font-geist-sans)]'>
          <p className='text-white text-center font-bold text-3xl underline underline-offset-4'>
            DISCOVERY
          </p>
        </div>

        <Navbar />
      </div>
    </div>
  );
}
