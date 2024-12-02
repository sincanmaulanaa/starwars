import Link from 'next/link';

const BackToPreviousPage = ({
  href,
  title,
}: {
  href: string;
  title: string;
}) => {
  return (
    <div className='mb-3 text-center'>
      <Link
        href={href}
        className='text-blue-400 hover:text-blue-300 underline underline-offset-4'
      >
        {title}
      </Link>
    </div>
  );
};

export default BackToPreviousPage;
