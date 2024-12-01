import React, { useState, useMemo } from 'react';
import { gql, useQuery } from '@apollo/client';
import { AllPlanetsData, Planet } from '../../../types';
import LoadingSpinner from '@/components/LoadingSpinner';
import PlanetCard from '@/components/PlanetCard';
import ErrorMessage from '@/components/ErrorMessage';
import Pagination from '@/components/Pagination';
import { ALL_PLANETS } from '../../../graphql/queries';

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!data) return <ErrorMessage message='No data available' />;

  return (
    <div className='min-h-screen bg-black text-yellow-300 p-8'>
      <h1 className='text-4xl font-bold text-center mb-8'>Star Wars Planets</h1>
      <div className='max-w-4xl mx-auto'>
        <input
          type='text'
          placeholder='Search planets...'
          className='w-full p-2 mb-6 bg-gray-800 text-yellow-300 border border-yellow-300 rounded'
          onChange={handleSearch}
          value={searchTerm}
        />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {paginatedPlanets.map((planet: Planet) => (
            <PlanetCard key={planet.name} planet={planet} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default PlanetsPage;
