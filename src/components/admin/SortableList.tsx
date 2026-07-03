"use client";

import { Reorder, useDragControls } from "framer-motion";
import { GripVertical } from "lucide-react";

interface SortableListProps<T> {
  items: T[];
  onReorder: (items: T[]) => void;
  onDragEnd: () => void;
  getKey: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
  className?: string;
}

export default function SortableList<T>({
  items,
  onReorder,
  onDragEnd,
  getKey,
  renderItem,
  className,
}: SortableListProps<T>) {
  return (
    <Reorder.Group
      as="div"
      axis="y"
      values={items}
      onReorder={onReorder}
      className={className}
    >
      {items.map((item) => (
        <SortableItem key={getKey(item)} item={item} onDragEnd={onDragEnd}>
          {renderItem(item)}
        </SortableItem>
      ))}
    </Reorder.Group>
  );
}

function SortableItem<T>({
  item,
  onDragEnd,
  children,
}: {
  item: T;
  onDragEnd: () => void;
  children: React.ReactNode;
}) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      as="div"
      value={item}
      dragListener={false}
      dragControls={controls}
      onDragEnd={onDragEnd}
      className="flex items-center gap-1"
    >
      <button
        type="button"
        aria-label="Drag to reorder"
        onPointerDown={(e) => {
          e.preventDefault();
          controls.start(e);
        }}
        className="cursor-grab active:cursor-grabbing touch-none p-1.5 rounded-md text-ink-faint hover:text-ink-muted transition-colors flex-shrink-0"
      >
        <GripVertical size={15} />
      </button>
      <div className="flex-1 min-w-0">{children}</div>
    </Reorder.Item>
  );
}
