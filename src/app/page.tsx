"use client";

import MapEmbed from "@/components/ui/maps.embed";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => Math.max(0, prev - 1));

  const { data, isLoading, error } = useQuery({
    queryKey: ["property", "1"],
    queryFn: async () => {
      const res = await fetch(`api/properties/${1}`);
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <div>
      <h1>Home</h1>

      {/* Counter Section */}
      <div className="my-6 flex items-center gap-4">
        <button
          onClick={decrement}
          className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          -
        </button>
        <span className="text-2xl font-bold">{count}</span>
        <button
          onClick={increment}
          className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          +
        </button>
      </div>

      {/* Rest of the existing content */}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Data fetched successfully. Check console for details.</p>}

      <div className="mx-auto grid grid-cols-4 gap-3 lg:grid-cols-3">
        {data && (
          <div>
            <Image
              src={data.images[0].url}
              alt={data.title}
              width={500}
              height={500}
            />
            <h2>{data.title}</h2>
            <p>{data.description}</p>
          </div>
        )}
      </div>

      <MapEmbed src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1764461057637!2d106.67272907475082!3d-6.240461493747818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fbf72fac4ae5%3A0x5574e2db8395e4f7!2sTransmart%20Graha%20Raya!5e0!3m2!1sid!2sid!4v1760257663728!5m2!1sid!2sid" />
    </div>
  );
}
