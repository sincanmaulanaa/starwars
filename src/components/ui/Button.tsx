import { MouseEventHandler } from 'react';

const Button = ({
  text,
  onClick,
}: {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      onClick={onClick}
      className='bg-yellow-300 text-black px-4 py-2 rounded hover:bg-yellow-400 transition-colors'
    >
      {text}
    </button>
  );
};

export default Button;
