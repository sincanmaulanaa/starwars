const SearchInput = ({
  placeholder,
  searchTerm,
  setSearchTerm,
}: {
  placeholder: string;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <input
      type='text'
      placeholder={placeholder}
      className='w-full p-2 mb-6 bg-gray-800 text-yellow-300 border border-yellow-300 rounded'
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setSearchTerm(e.target.value)
      }
      value={searchTerm}
    />
  );
};

export default SearchInput;
