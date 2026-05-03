import type { TableData } from "../data/tabledata";

interface TableDetailsProps {
  table: TableData;
  onDelete: (id: number) => void;
  onUpdateStatus: (id: number, newStatus: number) => void;
  onToggleLock: (id: number, isLocked: boolean) => void;
}

export function TableDetails({ table, onDelete }: TableDetailsProps) {
  const displayName =
    table.name ||
    (table.type === "foosball"
      ? "Csocsó"
      : table.type === "snooker"
      ? "Biliárd"
      : "Léghoki");
  const typeName =
    table.type === "foosball"
      ? "Csocsó"
      : table.type === "snooker"
      ? "Biliárd"
      : "Léghoki";
  const categoryName =
    table.category === "kids"
      ? "Gyerek"
      : table.category === "normal"
      ? "Normál"
      : "Verseny";

  const colorMap: Record<string, string> = {
    red: "Piros",
    green: "Zöld",
    blue: "Kék",
    black: "Fekete",
  };
  const colorName = colorMap[table.color] || table.color;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-900">{displayName}</h2>

      <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-lg p-4 mb-6">
        <div
          className="w-16 h-10 rounded shadow-sm border border-black/10"
          style={{ backgroundColor: table.color, opacity: table.status / 10 }}
        ></div>
        <div>
          <div className="font-bold text-gray-800">{typeName}</div>
          <div className="text-sm text-gray-500">
            {categoryName} | {colorName} | {table.status}/10
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-6 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Típus</span>
          <span className="font-medium">{typeName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Kategória</span>
          <span className="font-medium">{categoryName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Szín</span>
          <span className="font-medium">{colorName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Pozíció</span>
          <span className="font-medium">
            {Math.round(table.position.x)}, {Math.round(table.position.y)}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-bold text-gray-700">Állapot</span>
          <span className="font-bold text-gray-900">{table.status} / 10</span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={table.status}
          className="w-full accent-gray-800 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>Rossz</span>
          <span>Kiváló</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <input
          type="checkbox"
          id="isLockedCheckbox"
          checked={table["is-locked"]}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
        />
        <label
          htmlFor="isLockedCheckbox"
          className="text-sm font-medium text-gray-700"
        >
          Rögzített{" "}
          <span className="text-gray-400 font-normal">(nem mozgatható)</span>
        </label>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => onDelete(table.id)}
          className="w-full bg-red-50 text-red-500 font-medium py-2.5 rounded-lg hover:bg-red-100 transition text-sm"
        >
          Asztal törlése
        </button>
      </div>
    </div>
  );
}
