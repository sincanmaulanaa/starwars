import React, { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { AllPlanetsData, Planet } from '@/types/planet';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { ALL_PLANETS } from '../../../graphql/queries';
import Planets from './planets';

const ITEMS_PER_PAGE = 6;

const PlanetsPage: React.FC = () => {
  const { data, loading, error } = useQuery<AllPlanetsData>(ALL_PLANETS);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredPlanets = useMemo(() => {
    if (!data) return [];
    return data.allPlanets.planets.filter((planet: Planet) =>
      planet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const totalPages = Math.ceil(filteredPlanets.length / ITEMS_PER_PAGE);

  const paginatedPlanets = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPlanets.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPlanets, currentPage]);

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!data) return <ErrorMessage message='No data available' />;

  return (
    <Planets
      currentPage={currentPage}
      handlePageChange={handlePageChange}
      setSearchTerm={setSearchTerm}
      paginatedPlanets={paginatedPlanets}
      searchTerm={searchTerm}
      totalPages={totalPages}
    />
  );
};

export default PlanetsPage;
