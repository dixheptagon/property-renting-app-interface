"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
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
    </div>
  );
}
