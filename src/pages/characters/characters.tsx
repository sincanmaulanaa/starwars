import BackToPreviousPage from '@/components/ui/BackToPreviousPage';
import Button from '@/components/ui/Button';
import CharacterCard from '@/components/ui/CharacterCard';
import SearchInput from '@/components/ui/SearchInput';
import { CharacterEdge } from '@/types/character';
import { PageInfo } from '@/types/pageInfo';

interface ComponentProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  filteredCharacters: CharacterEdge[];
  pageInfo: PageInfo;
  handleLoadMore: () => void;
  isNextPageLoading: boolean;
}

const Characters = ({
  searchTerm,
  setSearchTerm,
  filteredCharacters,
  pageInfo,
  handleLoadMore,
  isNextPageLoading,
}: ComponentProps) => {
  return (
    <div className='min-h-screen bg-black text-yellow-300 p-8'>
      <div className='mb-3 text-center'>
        <BackToPreviousPage href='/' title='Back to Homepage' />
      </div>
      <h1 className='text-4xl font-bold text-center mb-8'>
        Star Wars Characters
      </h1>
      <div className='max-w-4xl mx-auto'>
        <SearchInput
          placeholder='Search characters...'
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredCharacters.map((char: CharacterEdge) => (
            <CharacterCard key={char.node.id} person={char.node} />
          ))}
        </div>
        {pageInfo.hasNextPage && (
          <div className='mt-8 text-center'>
            <Button
              onClick={handleLoadMore}
              text={isNextPageLoading ? 'Loading...' : 'Load More'}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Characters;
