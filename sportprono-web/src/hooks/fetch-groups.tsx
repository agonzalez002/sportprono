import { useEffect, useState } from "react";
import { PaginateType } from "../interfaces";
import { getGroups } from "../services/groupServices";
import { useAuth } from "./useAuth";

export function useFetchGroups(page: number) {
  const { authData } = useAuth();
  const [data, setData] = useState<PaginateType>();
  const [nextPage, setNextPage] = useState<number | null>(null);
  const [previousPage, setPreviousPage] = useState<number | null>(null);

  useEffect(() => {
    const getData = async () => {
      if (authData) {
        const result = await getGroups(page, authData.token);
        setData(result.results);
        setNextPage(result.next);
        setPreviousPage(result.previous);
      }
    };
    getData();
  }, [authData, page]);

  return { data, nextPage, previousPage };
}
