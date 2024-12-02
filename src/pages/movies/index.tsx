import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { AllMoviesData, MovieEdge } from '@/types/movie';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { ALL_MOVIES } from '../../../graphql/queries';
import Movies from './movies';

const ITEMS_PER_PAGE = 6;

const MoviesPage: React.FC = () => {
  const { loading, error, data, fetchMore } = useQuery<AllMoviesData>(
    ALL_MOVIES,
    {
      variables: { first: ITEMS_PER_PAGE },
    }
  );
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false);

  const handleLoadMore = () => {
    setIsNextPageLoading(true);
    if (pageInfo.hasNextPage) {
      fetchMore({
        variables: { after: pageInfo.endCursor },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          setIsNextPageLoading(false);
          return {
            allFilms: {
              ...fetchMoreResult.allFilms,
              edges: [
                ...prev.allFilms.edges,
                ...fetchMoreResult.allFilms.edges,
              ],
            },
          };
        },
      });
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!data) return <ErrorMessage message='No movie data available' />;

  const movies = data.allFilms.edges;
  const pageInfo = data.allFilms.pageInfo;

  const filteredMovies = movies.filter((movie: MovieEdge) =>
    movie.node.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Movies
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      filteredMovies={filteredMovies}
      pageInfo={pageInfo}
      handleLoadMore={handleLoadMore}
      isNextPageLoading={isNextPageLoading}
    />
  );
};

export default MoviesPage;
