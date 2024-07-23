import { IoSearchOutline } from "react-icons/io5";

export function SearchBar({
  onChange,
  searchTerm,
  onFocus,
  onSubmit,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onSubmit?: () => void;
  searchTerm: string;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) {
          onSubmit()
        }
      }}
      className="flex w-full h-fit items-center text-lg gap-2 bg-white px-3.5 py-2.5 rounded-full border-typography-primary border-[1.2px] text-typography-primary"
    >
      <IoSearchOutline size={24} />
      <input
        type="search"
        inputMode="search"
        enterKeyHint="go"
        onFocus={onFocus}
        value={searchTerm}
        onChange={onChange}
        placeholder="Buscar produtos..."
        className="w-full h-full bg-transparent outline-none font-light text-base"
      />
    </form>
  );
}
