import React from 'react';
import Link from 'next/link';
import { MovieProps } from '@/types/movie';

const MovieCard: React.FC<MovieProps> = ({ movie }) => {
  return (
    <Link href={`/movies/${movie.id}`} passHref>
      <div className='bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-yellow-300/50 transition-shadow duration-300 cursor-pointer'>
        <h2 className='text-2xl font-bold mb-2'>{movie.title}</h2>
        <p>
          <span className='font-bold'>Episode:</span> {movie.episodeID}
        </p>
        <p>
          <span className='font-bold'>Release Date:</span> {movie.releaseDate}
        </p>
        <p>
          <span className='font-bold'>Director:</span> {movie.director}
        </p>
        <p>
          <span className='font-bold'>Producers:</span>{' '}
          {movie.producers.join(', ')}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
