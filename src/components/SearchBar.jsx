import Input from './Input';

const SearchBar = ({ value, onChange }) => (
  <Input
    type="text"
    placeholder="Search by name or ID..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);
export default SearchBar;
