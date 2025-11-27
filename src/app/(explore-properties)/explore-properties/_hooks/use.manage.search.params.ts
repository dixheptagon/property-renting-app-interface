import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

type UpdateValue = string | string[] | number | null | undefined;

export interface SearchParamsConfig<T extends Record<string, any>> {
  defaults: Partial<T>;
  parse: (params: URLSearchParams) => Partial<T>;
  serialize: (key: string, value: any) => UpdateValue;
}

export const useSearchParamsManager = <T extends Record<string, any>>(
  config: SearchParamsConfig<T>
) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ current sekarang STABLE dengan useMemo
  const current = useMemo(() => {
    return config.parse(new URLSearchParams(searchParams.toString()));
  }, [searchParams, config]);

  const update = useCallback(
    (updates: Partial<T>, options?: { resetPage?: boolean }) => {
      const prevParams = new URLSearchParams(searchParams.toString());
      const newParams = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        const serialized = config.serialize(key, value);

        if (
          serialized === null ||
          serialized === undefined ||
          serialized === ""
        ) {
          newParams.delete(key);
          newParams.delete(`${key}[]`);
        } else if (Array.isArray(serialized)) {
          newParams.delete(key);
          serialized.forEach((item) => newParams.append(key, item));
        } else {
          newParams.set(key, serialized.toString());
        }
      });

      if (options?.resetPage) {
        newParams.set("page", "1");
      }

      if (newParams.toString() === prevParams.toString()) {
        return;
      }

      router.push(`?${newParams.toString()}`, { scroll: false });
    },
    [router, searchParams, config]
  );

  const reset = () => {
    update(config.defaults as Partial<T>, { resetPage: true });
  };

  return { current, update, reset, raw: searchParams };
};
