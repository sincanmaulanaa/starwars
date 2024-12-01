import Link from 'next/link';
import { Planet } from '../../types';

interface PlanetCardProps {
  planet: Planet;
}

export default function PlanetCard({ planet }: PlanetCardProps) {
  return (
    <Link href={`/planets/${planet.id}`} passHref>
      <div className='bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-yellow-300/50 transition-shadow duration-300 cursor-pointer'>
        <h2 className='text-2xl font-bold mb-2'>{planet.name}</h2>
        <p>Diameter: {planet.diameter} km</p>
        <p>Gravity: {planet.gravity}</p>
      </div>
    </Link>
  );
}
