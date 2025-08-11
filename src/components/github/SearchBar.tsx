import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
};

const SearchBar = ({ value, onChange, onSubmit, loading }: SearchBarProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!loading) onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl gap-2 items-center">
      <div className="flex-1">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search GitHub username..."
          aria-label="GitHub username"
          autoComplete="off"
        />
      </div>
      <Button type="submit" aria-label="Search" disabled={loading}>
        <Search className="mr-2 h-4 w-4" />
        {loading ? "Searching..." : "Search"}
      </Button>
    </form>
  );
};

export default SearchBar;
