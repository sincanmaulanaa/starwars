import React from 'react';
import Link from 'next/link';
import { CharacterProps } from '../../types';

const CharacterCard: React.FC<CharacterProps> = ({ character }) => {
  return (
    <Link href={`/characters/${character.id}`} passHref>
      <div className='bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-yellow-300/50 transition-shadow duration-300 cursor-pointer'>
        <h2 className='text-2xl font-bold mb-2'>{character.name}</h2>
        <p>
          <span className='font-bold'>Birth Year:</span> {character.birthYear}
        </p>
        <p>
          <span className='font-bold'>Gender:</span> {character.gender}
        </p>
        <p>
          <span className='font-bold'>Height:</span> {character.height} cm
        </p>
        <p>
          <span className='font-bold'>Mass:</span> {character.mass} kg
        </p>
        <p>
          <span className='font-bold'>Eye Color:</span> {character.eyeColor}
        </p>
        <p>
          <span className='font-bold'>Hair Color:</span> {character.hairColor}
        </p>
      </div>
    </Link>
  );
};

export default CharacterCard;
