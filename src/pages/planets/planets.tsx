import Pagination from '@/components/fragments/Pagination';
import BackToPreviousPage from '@/components/ui/BackToPreviousPage';
import PlanetCard from '@/components/ui/PlanetCard';
import SearchInput from '@/components/ui/SearchInput';
import { Planet } from '@/types/planet';

interface ComponentProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  paginatedPlanets: Planet[];
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const Planets = ({
  searchTerm,
  setSearchTerm,
  paginatedPlanets,
  currentPage,
  totalPages,
  handlePageChange,
}: ComponentProps) => {
  return (
    <div className='min-h-screen bg-black text-yellow-300 p-8'>
      <div className='mb-3 text-center'>
        <BackToPreviousPage href='/' title='Back to Homepage' />
      </div>
      <h1 className='text-4xl font-bold text-center mb-8'>Star Wars Planets</h1>
      <div className='max-w-4xl mx-auto'>
        <SearchInput
          placeholder='Search movies...'
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
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

export default Planets;
