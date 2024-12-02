interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className='flex justify-center items-center h-screen bg-black text-red-500'>
      <p>Error: {message}</p>
    </div>
  );
}
