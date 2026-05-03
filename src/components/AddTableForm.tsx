import type { TableData } from "../data/tabledata";
import { useState } from "react";

interface TableFormProps {
  onAddTable: (newTable: TableData) => void;
}
export function AddTableForm({ onAddTable }: TableFormProps) {
  const [type, setType] = useState<TableData["type"]>("foosball");
  const [category, setCategory] = useState<TableData["category"]>("normal");
  const [color, setColor] = useState("#ff0000");
  const [status, setStatus] = useState(10);
  const [name, setName] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTable: TableData = {
      id: Date.now(),
      type: type,
      category: category,
      color: color,
      status: status,
      position: { x: 50, y: 50 },
      name: name.trim() === "" ? undefined : name.trim(),
      "is-locked": false,
    };
    onAddTable(newTable);
    setName("");
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          Név
        </label>
        <input
          type="text"
          placeholder="Asztal neve (opcionális)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          Típus
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as TableData["type"])}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="foosball">Csocsó</option>
          <option value="air-hockey">Léghoki</option>
          <option value="snooker">Biliárd</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          Kategória
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as TableData["category"])}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="kids">Gyerek</option>
          <option value="normal">Normál</option>
          <option value="competition">Verseny</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          Szín
        </label>
        <select
          value={color}
          onChange={(e) => setColor(e.target.value as TableData["color"])}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="green">Zöld</option>
          <option value="red">Piros</option>
          <option value="blue">Kék</option>
          <option value="black">Fekete</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">
          Állapot ({status}/10)
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={status}
          onChange={(e) => setStatus(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div>
        <input
          type="checkbox"
          checked={isLocked}
          onChange={(e) => setIsLocked(e.target.checked)}
          className="mr-2 leading-tight"
        />
        <span className="text-sm text-gray-700">Rögzített helyzet</span>
      </div>

      <button
        type="submit"
        className="w-full bg-[#111827] text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Lehelyezés a teremben
      </button>
    </form>
  );
}
