interface ActionButtonProps {
  onClick: () => void;
  label: string;
  size: "small" | "large";
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  onClick,
  size,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${size === "small" ? "p-8" : "p-24"}` + " bg-gray-700 w-max h-max rounded-[30px]"}
    >
      {label}
    </button>
  );
};
