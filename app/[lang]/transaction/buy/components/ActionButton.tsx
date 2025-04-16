"use client";

import useListenSocket from "@/app/hooks/useListenSocket";
import { useWsOrder } from "@/app/store/order";
import { useForm } from "@/app/store/order-form";
import { useEffect } from "react";

export default function ActionButton({ symbol }: { symbol: string }) {
  const socket = useWsOrder((state) => state.socket);
  const reset = useForm((state) => state.reset);
  const price = useForm((state) => state.price);
  const lot = useForm((state) => state.lot);
  const expiry = useForm((state) => state.expiry);
  const data = useListenSocket({ socket });

  useEffect(() => {
    if (data) {
      alert(data);
    }
  }, [data]);

  return (
    <div className="fixed bottom-0 w-full px-4">
      <button
        className="mb-2 rounded text-center w-full p-2 bg-green-600 text-white"
        onClick={() => {
          if (socket) {
            const message = {
              price,
              lot,
              symbol,
              expiry: expiry.value,
            };
            socket.send(JSON.stringify(message));
            reset();
          }
        }}
      >
        Buy
      </button>
    </div>
  );
}
