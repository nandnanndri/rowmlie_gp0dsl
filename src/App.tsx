import { useState } from "react";
import initialData from "./data/tables.json";
import type { TableData } from "./data/tabledata";
import { Room } from "./components/Room";
import { TableDetails } from "./components/TableDetails";
import { AddTableForm } from "./components/AddTableForm";

function App() {
  const [tables, setTables] = useState<TableData[]>(initialData as TableData[]);
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"new" | "details">("new");
  const [roomWidth, setRoomWidth] = useState(800);
  const [roomHeight, setRoomHeight] = useState(500);

  const selectedTable = tables.find((table) => table.id === selectedTableId);

  const handleApplySize = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newWidth = Number(formData.get("widthInput"));
    const newHeight = Number(formData.get("heightInput"));

    setRoomWidth(newWidth);
    setRoomHeight(newHeight);

    setTables([]);
    setSelectedTableId(null);
  };

  const handleReset = () => {
    setTables(initialData as TableData[]);
    setRoomWidth(800);
    setRoomHeight(500);
    setSelectedTableId(null);
  };

  const handleUpdateStatus = (id: number, newStatus: number) => {
    setTables(
      tables.map((table) =>
        table.id === id ? { ...table, status: newStatus } : table
      )
    );
  };

  const handleTableSelect = (id: number) => {
    setSelectedTableId(id);
    setActiveTab("details");
  };

  const handleToggleLock = (id: number, isLocked: boolean) => {
    setTables(
      tables.map((table) =>
        table.id === id ? { ...table, "is-locked": isLocked } : table
      )
    );
  };

  const handleAddTable = (newTable: TableData) => {
    setTables([...tables, newTable]);
  };

  const handleMoveTable = (id: number, newX: number, newY: number) => {
    setTables(
      tables.map((table) =>
        table.id === id ? { ...table, position: { x: newX, y: newY } } : table
      )
    );
  };

  const handleDeleteTable = (id: number) => {
    setTables(tables.filter((table) => table.id !== id));
    setSelectedTableId(null);
  };

  const getStatsForType = (tableType: TableData["type"]) => {
    const filteredTables = tables.filter((t) => t.type === tableType);
    const count = filteredTables.length;
    if (count === 0) return { count: 0, averageStatus: "0.0" };
    const totalStatus = filteredTables.reduce((sum, t) => sum + t.status, 0);
    return { count, averageStatus: (totalStatus / count).toFixed(1) };
  };

  const foosballStats = getStatsForType("foosball");
  const snookerStats = getStatsForType("snooker");
  const airHockeyStats = getStatsForType("air-hockey");

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-800 font-sans">
      {/* FEJLÉC */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold text-gray-900">Roomlie</h1>

          <form
            onSubmit={handleApplySize}
            className="flex items-center gap-2 text-sm text-gray-600"
          >
            <span>Terem mérete:</span>
            <input
              name="widthInput"
              type="number"
              defaultValue={roomWidth}
              className="border border-gray-300 rounded px-2 py-1 w-20 text-center"
            />
            <span>×</span>
            <input
              name="heightInput"
              type="number"
              defaultValue={roomHeight}
              className="border border-gray-300 rounded px-2 py-1 w-20 text-center"
            />
            <button
              type="submit"
              className="bg-gray-100 hover:bg-gray-200 px-4 py-1 border border-gray-300 rounded text-gray-700 transition"
            >
              Alkalmaz
            </button>
          </form>
        </div>

        <button
          onClick={handleReset}
          className="text-gray-500 hover:text-gray-800 text-sm flex items-center gap-1 font-medium"
        >
          ↺ Alaphelyzet
        </button>
      </header>

      {/* MAIN */}
      <main className="p-6 grid grid-cols-1 xl:grid-cols-12 gap-6 max-w-[1600px] mx-auto height-100vh">
        <div className="xl:col-span-8 flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 overflow-auto">
            <Room
              tables={tables}
              selectedTableId={selectedTableId}
              onSelectTable={handleTableSelect}
              onMoveTable={handleMoveTable}
              onToggleLock={handleToggleLock}
              width={roomWidth} // <-- ÚJ!
              height={roomHeight} // <-- ÚJ!
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">
              Összesítő
            </h3>
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex items-center gap-2 border-r border-gray-200 pr-6">
                <span className="text-3xl font-black text-gray-800">
                  {tables.length}
                </span>
                <span className="text-sm font-medium text-gray-500 leading-tight">
                  asztal
                  <br />
                  összesen
                </span>
              </div>

              {/* Csocsó */}
              <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                <div className="w-3 h-3 rounded-full bg-red-600"></div>
                <span className="font-bold text-gray-700">Csocsó</span>
                <span className="text-sm text-gray-500 bg-gray-200 px-2 py-0.5 rounded">
                  {foosballStats.count} db
                </span>
                <span className="text-sm text-gray-500 font-mono">
                  Ø {foosballStats.averageStatus}
                </span>
              </div>

              {/* Biliárd */}
              <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
                <span className="font-bold text-gray-700">Biliárd</span>
                <span className="text-sm text-gray-500 bg-gray-200 px-2 py-0.5 rounded">
                  {snookerStats.count} db
                </span>
                <span className="text-sm text-gray-500 font-mono">
                  Ø {snookerStats.averageStatus}
                </span>
              </div>

              {/* Léghoki */}
              <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <span className="font-bold text-gray-700">Léghoki</span>
                <span className="text-sm text-gray-500 bg-gray-200 px-2 py-0.5 rounded">
                  {airHockeyStats.count} db
                </span>
                <span className="text-sm text-gray-500 font-mono">
                  Ø {airHockeyStats.averageStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* JOBB OSZLOP */}
        <div className="xl:col-span-4">
          <div className="flex bg-gray-100 p-1 rounded-lg mb-4">
            <button
              onClick={() => setActiveTab("new")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "new"
                  ? "bg-white shadow-sm text-gray-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Új asztal
            </button>

            <button
              onClick={() => setActiveTab("details")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "details"
                  ? "bg-white shadow-sm text-gray-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Asztal adatai
            </button>
          </div>

          {activeTab === "new" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4">Új asztal hozzáadása</h2>
              <AddTableForm onAddTable={handleAddTable} />
            </div>
          )}

          {activeTab === "details" && (
            <>
              {selectedTable ? (
                <TableDetails
                  table={selectedTable}
                  onDelete={handleDeleteTable}
                  onToggleLock={handleToggleLock}
                  onUpdateStatus={handleUpdateStatus}
                />
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center text-gray-500">
                  Kattints egy asztalra a teremben a részletek megtekintéséhez!
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
export default App;
