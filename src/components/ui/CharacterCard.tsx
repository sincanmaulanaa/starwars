import React from 'react';
import Link from 'next/link';
import { CharacterProps } from '../../types/character';

const CharacterCard: React.FC<CharacterProps> = ({ person }) => {
  return (
    <Link href={`/characters/${person.id}`} passHref>
      <div className='bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-yellow-300/50 transition-shadow duration-300 cursor-pointer'>
        <h2 className='text-2xl font-bold mb-2'>{person.name}</h2>
        <CardItem label='Birth Year' value={person.birthYear} />
        <CardItem label='Gender' value={person.gender} />
        <CardItem
          label='Height'
          value={person.height !== null ? `${person.height} cm` : '-'}
        />
        <CardItem
          label='Mass'
          value={person.mass !== null ? `${person.mass} kg` : '-'}
        />
        <CardItem label='Eye Color' value={person.eyeColor} />
        <CardItem
          label='Hair Color'
          value={person.hairColor === 'none' ? '-' : person.hairColor}
        />
      </div>
    </Link>
  );
};

const CardItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <p>
      <span className='font-bold'>{label}:</span> {value}
    </p>
  );
};

export default CharacterCard;
