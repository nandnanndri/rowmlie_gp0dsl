import type { TableData } from "../data/tabledata";
import { Table } from "./Table";
import { useState } from "react";

interface RoomProps {
  tables: TableData[];
  selectedTableId: number | null;
  onSelectTable: (id: number) => void;
  onMoveTable: (id: number, x: number, y: number) => void;
  onToggleLock: (id: number, isLocked: boolean) => void;
  width: number;
  height: number;
}

const TABLE_METADATA = {
  foosball: { width: 120, height: 60, space: 30 },
  snooker: { width: 190, height: 100, space: 50 },
  "air-hockey": { width: 140, height: 60, space: 40 },
};

export function Room({
  tables,
  selectedTableId,
  onSelectTable,
  onMoveTable,
  width,
  height,
}: RoomProps) {
  const [dragInfo, setDragInfo] = useState<{
    id: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  const handlePointerDown = (id: number, e: React.PointerEvent) => {
    onSelectTable(id);

    const table = tables.find((t) => t.id === id);

    if (table && table["is-locked"]) {
      return;
    }

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    setDragInfo({ id, offsetX, offsetY });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragInfo) return;

    const roomRect = e.currentTarget.getBoundingClientRect();

    const newX = e.clientX - roomRect.left - dragInfo.offsetX;
    const newY = e.clientY - roomRect.top - dragInfo.offsetY;

    onMoveTable(dragInfo.id, newX, newY);
  };

  const handlePointerUp = () => {
    setDragInfo(null);
  };

  const checkCollision = (currentTable: TableData) => {
    const meta = TABLE_METADATA[currentTable.type];
    const { x, y } = currentTable.position;

    const roomWidth = 800;
    const roomHeight = 500;

    if (
      x - meta.space < 0 ||
      y - meta.space < 0 ||
      x + meta.width + meta.space > roomWidth ||
      y + meta.height + meta.space > roomHeight
    ) {
      return true;
    }

    for (const otherTable of tables) {
      if (otherTable.id === currentTable.id) continue;

      const otherMeta = TABLE_METADATA[otherTable.type];
      const ox = otherTable.position.x;
      const oy = otherTable.position.y;

      const isOverlapping = !(
        x + meta.width + meta.space <= ox - otherMeta.space ||
        x - meta.space >= ox + otherMeta.width + otherMeta.space ||
        y + meta.height + meta.space <= oy - otherMeta.space ||
        y - meta.space >= oy + otherMeta.height + otherMeta.space
      );

      if (isOverlapping) return true;
    }

    return false;
  };

  return (
    <div
      className="relative bg-gray-50 border-4 border-gray-300 mx-auto overflow-hidden touch-none"
      style={{ width: `${width}px`, height: `${height}px` }}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {tables.map((singleTable) => {
        const isColliding = checkCollision(singleTable);

        return (
          <Table
            key={singleTable.id}
            table={singleTable}
            isSelected={selectedTableId === singleTable.id}
            hasCollision={isColliding}
            onPointerDown={(e) => handlePointerDown(singleTable.id, e)}
          />
        );
      })}
    </div>
  );
}
