import React from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { MovieProps } from '@/types/movie';
import { GET_MOVIE } from '../../../graphql/queries';

const MovieDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery<{ film: MovieProps['movie'] }>(
    GET_MOVIE,
    {
      variables: { id },
      skip: !id,
    }
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!data || !data.film)
    return <ErrorMessage message='No movie data available' />;

  const { film: movie } = data;

  return (
    <div className='min-h-screen bg-black text-yellow-300 p-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl font-bold text-center mb-8'>{movie.title}</h1>
        <div className='bg-gray-800 rounded-lg shadow-lg p-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <h2 className='text-2xl font-semibold mb-4'>Movie Information</h2>
              <p>
                <span className='font-bold'>Episode:</span> {movie.episodeID}
              </p>
              <p>
                <span className='font-bold'>Director:</span> {movie.director}
              </p>
              <p>
                <span className='font-bold'>Producers:</span>{' '}
                {movie.producers.join(', ')}
              </p>
              <p>
                <span className='font-bold'>Release Date:</span>{' '}
                {movie.releaseDate}
              </p>
            </div>
            <div>
              <h2 className='text-2xl font-semibold mb-4'>Opening Crawl</h2>
              <p className='italic'>{movie.openingCrawl}</p>
            </div>
          </div>
          <div className='mt-8'>
            <h2 className='text-2xl font-semibold mb-4'>Characters</h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
              {movie.characterConnection.characters.map((character) => (
                <Link key={character.id} href={`/characters/${character.id}`}>
                  <div className='bg-gray-700 p-3 rounded hover:bg-gray-600 transition-colors'>
                    {character.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className='mt-8'>
            <h2 className='text-2xl font-semibold mb-4'>Planets</h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
              {movie.planetConnection.planets.map((planet) => (
                <Link key={planet.id} href={`/planets/${planet.id}`}>
                  <div className='bg-gray-700 p-3 rounded hover:bg-gray-600 transition-colors'>
                    {planet.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className='mt-8 text-center'>
          <Link href='/movies' className='text-blue-400 hover:text-blue-300'>
            Back to Movies List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
