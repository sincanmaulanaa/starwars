import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { ALL_CHARACTERS } from '../../../graphql/queries';
import { AllPeopleData, CharacterEdge } from '@/types/character';
import Characters from './characters';

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
    <Characters
      filteredCharacters={filteredCharacters}
      handleLoadMore={handleLoadMore}
      isNextPageLoading={isNextPageLoading}
      pageInfo={pageInfo}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    />
  );
};

export default CharactersPage;
