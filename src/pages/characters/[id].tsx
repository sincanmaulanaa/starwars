import React from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_CHARACTER } from '../../../graphql/queries';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { CharacterProps } from '@/types/character';
import BackToPreviousPage from '@/components/ui/BackToPreviousPage';

const CharacterDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery<{
    person: CharacterProps['person'];
  }>(GET_CHARACTER, {
    variables: { id },
    skip: !id,
  });

  if (loading) return <LoadingSpinner />;
  console.log(data);
  if (error) return <ErrorMessage message={error.message} />;
  if (!data || !data.person)
    return <ErrorMessage message='No character data available' />;

  const { person } = data;

  return (
    <div className='min-h-screen bg-black text-yellow-300 p-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl font-bold text-center mb-8'>{person.name}</h1>
        <div className='bg-gray-800 rounded-lg shadow-lg p-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <h2 className='text-2xl font-semibold mb-4'>
                Personal Information
              </h2>
              <PersonalInformationItem
                label='Birth Year'
                value={person.birthYear}
              />
              <PersonalInformationItem label='Gender' value={person.gender} />
              <PersonalInformationItem
                label='Height'
                value={`${person.height} cm`}
              />
              <PersonalInformationItem
                label='Mass'
                value={`${person.mass} kg`}
              />
              <PersonalInformationItem
                label='Eye Color'
                value={person.eyeColor}
              />
              <PersonalInformationItem
                label='Skin Color'
                value={person.skinColor}
              />
              <PersonalInformationItem
                label='Hair Color'
                value={person.hairColor}
              />
            </div>
            <div>
              <h2 className='text-xl font-semibold mb-2'>Homeworld</h2>
              <p>{person.homeworld?.name || 'Unknown'}</p>
              <div className='mt-4'>
                <h2 className='text-xl font-semibold mb-2'>Species</h2>
                <p>{person.species?.name || 'Unknown'}</p>
              </div>
            </div>
          </div>
          <div className='mt-8'>
            <h2 className='text-2xl font-semibold mb-4'>Movies</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
              {person.filmConnection?.films.map((film, index) => (
                <div key={index} className='bg-gray-700 p-3 rounded'>
                  {film.title}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='mt-8 text-center'>
          <BackToPreviousPage
            href='/characters'
            title='Back to Characters List'
          />
        </div>
      </div>
    </div>
  );
};

const PersonalInformationItem = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <p>
      <span className='font-bold'>{label}:</span> {value}
    </p>
  );
};

export default CharacterDetail;
