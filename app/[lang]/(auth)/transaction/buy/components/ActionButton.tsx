"use client";

import Modal from "@/app/components/Modal";
import useListenSocket from "@/app/hooks/useListenSocket";
import { useWsOrder } from "@/app/store/order";
import { useForm } from "@/app/store/order-form";
import { useEffect, useState } from "react";

type Modal = "succeed" | "confirmation" | "failed" | "";

export default function ActionButton({ symbol }: { symbol: string }) {
  const socket = useWsOrder((state) => state.socket);
  const reset = useForm((state) => state.reset);
  const price = useForm((state) => state.price);
  const lot = useForm((state) => state.lot);
  const expiry = useForm((state) => state.expiry);
  const data = useListenSocket({ socket });
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState<Modal>("");

  useEffect(() => {
    if (data?.status === "ok") {
      setModal("succeed");
    }
    if (data?.status === "error") {
      setModal("failed");
    }
  }, [data]);

  return (
    <>
      <Modal
        open={open}
        onCloseAction={() => {
          setModal("");
          setOpen(false);
        }}
        title="Order"
      >
        <>
          {modal === "confirmation" && (
            <>
              <div className="flex flex-col gap-2 text-black px-2 py-6">
                <div className="flex justify-between">
                  <p>symbol</p>
                  <p>{symbol}</p>
                </div>
                <div className="flex justify-between">
                  <p>price</p>
                  <p>{price}</p>
                </div>
                <div className="flex justify-between">
                  <p>lot</p>
                  <p>{lot}</p>
                </div>
                <div className="flex justify-between">
                  <p>expiry</p>
                  <p>{`${expiry.value} - ${expiry.label}`}</p>
                </div>
              </div>
              <Button
                onClick={() => {
                  if (socket) {
                    const message = {
                      price,
                      lot,
                      symbol,
                      expiry: expiry.value,
                      side: "B",
                    };
                    socket.send(JSON.stringify(message));
                    reset();
                  }
                }}
                label="Submit"
              />
            </>
          )}
          {(modal === "succeed" || modal === "failed") && (
            <div className="flex flex-col justify-center items-center text-black">
              <p className="py-4">
                {modal === "succeed"
                  ? `Order Created with id ${data?.message}`
                  : "Failed create order"}
              </p>
              <Button
                label="Ok"
                onClick={() => {
                  setOpen(false);
                  setModal("");
                }}
              ></Button>
            </div>
          )}
        </>
      </Modal>
      <div className="fixed bottom-0 w-[calc(100%-3rem)] px-4 mb-2">
        <Button
          disabled={lot === 0 || price === 0}
          onClick={() => {
            setOpen(true);
            setModal("confirmation");
          }}
          label="Buy"
        />
      </div>
    </>
  );
}

const Button = ({
  onClick,
  label,
  className,
  disabled,
}: {
  onClick: () => void;
  label: string;
  className?: string;
  disabled?: boolean;
}) => {
  return (
    <button
      disabled={disabled}
      className={`disabled:bg-gray-300 rounded text-center w-full p-2 bg-green-600 text-white cursor-pointer ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
