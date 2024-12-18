import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { GET_PLANET } from '../../../graphql/queries';
import { PlanetData } from '@/types/planet';
import BackToPreviousPage from '@/components/ui/BackToPreviousPage';

const PlanetDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery<PlanetData>(GET_PLANET, {
    variables: { id },
    skip: !id,
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!data || !data.planet)
    return <ErrorMessage message='No planet data available' />;

  const { planet } = data;

  return (
    <div className='min-h-screen bg-black text-yellow-300 p-8'>
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-4xl font-bold text-center mb-8'>{planet.name}</h1>
        <div className='bg-gray-800 p-6 rounded-lg shadow-lg'>
          <PlanetItem label='Diameter' value={`${planet.diameter} km`} />
          <PlanetItem label='Gravity' value={planet.gravity} />
          <PlanetItem label='Population' value={planet.population} />
          <PlanetItem label='Climate' value={planet.climate} />
          <PlanetItem label='Terrain' value={planet.terrain} />
          <PlanetItem label='Surface Water' value={planet.surfaceWater} />
          <PlanetItem
            label='Rotation Period'
            value={`${planet.rotationPeriod} hours`}
          />
          <PlanetItem
            label='Orbital Period'
            value={`${planet.orbitalPeriod} days`}
          />
        </div>
        <div className='mt-8 text-center'>
          <BackToPreviousPage href='/planets' title='Back to Planets List' />
        </div>
      </div>
    </div>
  );
};

function PlanetItem({ label, value }: { label: string; value: string }) {
  return (
    <p className='mb-2'>
      <span className='font-bold'>{label}:</span> {value}
    </p>
  );
}

export default PlanetDetail;
