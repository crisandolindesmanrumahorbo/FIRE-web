"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PRODUCTS } from "@/app/constants/product";
import ProductHeader from "../../transaction/buy/components/ProductHeader";
import { Trans } from "@lingui/react/macro";

const productsName = PRODUCTS.map((product) => product.symbol);

export default function Wathclist() {
  const [items, setItems] = useState(productsName);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="mt-4 border rounded-xl sm:mx-4 mx-2 sm:p-4 p-4 border-gray-800 ">
            <div className="flex flex-col gap-2">
              <Trans>Watchlist</Trans>
              {items.map((id, i) => (
                <SortableItem key={i} symbol={id} />
              ))}
            </div>
          </div>
        </SortableContext>
      </DndContext>
    </>
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}

export function SortableItem(props: { symbol: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.symbol });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="flex items-center w-full">
        <button {...listeners} className="drag-handle cursor-move">
          ☰
        </button>
        <div className="w-full">
          <ProductHeader symbol={props.symbol} clickable />
        </div>
      </div>
    </div>
  );
}
