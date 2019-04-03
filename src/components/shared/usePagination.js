import { useContext, useEffect, useState } from "react";
import AppContext from "../AppContext";
import { defaultPageSize } from "./pageSizes";

export default function usePagination(loadData, props = []) {
  const { errorBoundary } = useContext(AppContext);

  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [numItemsPerPage, setNumItemsPerPage] = useState(defaultPageSize);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  async function loadPage(page, pageSize = numItemsPerPage) {
    const error = await errorBoundary(async () => {
      const data = await loadData({ page, pageSize });
      setCurrentPage(page);
      setNumItemsPerPage(pageSize);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
    });
    if (!error) {
      setLoading(false);
    }
  }

  function loadFirstPage() {
    return loadPage(1);
  }

  function loadPreviousPage() {
    return loadPage(currentPage - 1);
  }

  function loadNextPage() {
    return loadPage(currentPage + 1);
  }

  function loadLastPage() {
    return loadPage(totalPages);
  }

  function reloadWithPageSize(pageSize) {
    return loadPage(1, pageSize);
  }

  useEffect(() => {
    loadFirstPage();
  }, props);

  return {
    isLoading,
    currentPage,
    numItemsPerPage,
    totalItems,
    totalPages,
    loadPage,
    loadFirstPage,
    loadPreviousPage,
    loadNextPage,
    loadLastPage,
    reloadWithPageSize,
    get hasItems() {
      return totalItems > 0;
    },
    get isAtStart() {
      return currentPage === 1;
    },
    get isAtEnd() {
      return currentPage === totalPages;
    },
    get currentRange() {
      const min = 1 + (currentPage - 1) * numItemsPerPage;
      const max = Math.min(currentPage * numItemsPerPage, totalItems);
      return `${min} - ${max} of ${totalItems}`;
    },
  };
}
