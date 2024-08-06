import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

export const Checkbox = ({
  checked = false,
  onChange = () => {},
  children,
}: {
  checked?: boolean;
  onChange?: () => void;
  children?: React.ReactNode;
}) => {
  const Icon = checked ? MdCheckBox : MdCheckBoxOutlineBlank;
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex items-center justify-center"
    >
      <Icon
        size={24}
        className={`flex-shrink-0  ${checked ? "text-typography-purple" : ""}`}
      />
      <label htmlFor="default" className="ml-2">
        {children}
      </label>
    </button>
  );
};