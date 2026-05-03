import type { TableData } from "../data/tabledata";

const TABLE_SIZES = {
  foosball: { width: 120, height: 60, space: 30 },
  snooker: { width: 190, height: 100, space: 50 },
  "air-hockey": { width: 140, height: 60, space: 40 },
};

interface TableProps {
  table: TableData;
  isSelected: boolean;
  hasCollision: boolean;
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
}

export function Table({
  table,
  isSelected,
  hasCollision,
  onPointerDown,
}: TableProps) {
  const dimensions = TABLE_SIZES[table.type];
  const opacityValue = table.status / 10;

  const dynamicStyles = {
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
    backgroundColor: table.color,
    left: `${table.position.x}px`,
    top: `${table.position.y}px`,
    opacity: opacityValue,
  };

  let baseClasses =
    "absolute flex items-center justify-center rounded-md cursor-pointer ";

  if (hasCollision) {
    baseClasses +=
      "border-4 border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.8)] z-20 ";
  } else if (isSelected) {
    baseClasses +=
      "border-4 border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.8)] z-10 ";
  } else {
    baseClasses += table["is-locked"]
      ? "border-4 border-gray-600 "
      : "border border-black shadow-md ";
  }

  return (
    <div
      className={baseClasses}
      style={dynamicStyles}
      onPointerDown={onPointerDown}
    >
      <span className="text-white font-bold mix-blend-difference">
        {table.name ? table.name : table.type.toUpperCase()}
      </span>
    </div>
  );
}
