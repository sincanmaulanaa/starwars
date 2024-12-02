import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { ALL_CHARACTERS } from '../../../graphql/queries';
import CharacterCard from '@/components/CharacterCard';
import { AllPeopleData, CharacterEdge } from '../../../types';

const ITEMS_PER_PAGE = 9;

const CharactersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false);

  const { loading, error, data, fetchMore } = useQuery<AllPeopleData>(
    ALL_CHARACTERS,
    {
      variables: { first: ITEMS_PER_PAGE },
    }
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!data) return <ErrorMessage message='No data available' />;

  const characters = data.allPeople.edges;
  const pageInfo = data.allPeople.pageInfo;

  const filteredCharacters = characters.filter((char: CharacterEdge) =>
    char.node.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLoadMore = () => {
    setIsNextPageLoading(true);
    if (pageInfo.hasNextPage) {
      fetchMore<AllPeopleData>({
        variables: { after: pageInfo.endCursor },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          setIsNextPageLoading(false);
          return {
            allPeople: {
              ...fetchMoreResult.allPeople,
              edges: [
                ...prev.allPeople.edges,
                ...fetchMoreResult.allPeople.edges,
              ],
            },
          };
        },
      });
    }
  };

  return (
    <div className='min-h-screen bg-black text-yellow-300 p-8'>
      <h1 className='text-4xl font-bold text-center mb-8'>
        Star Wars Characters
      </h1>
      <div className='max-w-4xl mx-auto'>
        <input
          type='text'
          placeholder='Search characters...'
          className='w-full p-2 mb-6 bg-gray-800 text-yellow-300 border border-yellow-300 rounded'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
          value={searchTerm}
        />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredCharacters.map((char: CharacterEdge) => (
            <CharacterCard key={char.node.id} character={char.node} />
          ))}
        </div>
        {pageInfo.hasNextPage && (
          <div className='mt-8 text-center'>
            <button
              onClick={handleLoadMore}
              className='bg-yellow-300 text-black px-4 py-2 rounded hover:bg-yellow-400 transition-colors'
            >
              {isNextPageLoading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharactersPage;
