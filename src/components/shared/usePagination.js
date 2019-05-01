import { useContext, useEffect, useState } from "react";
import AppContext from "../AppContext";
import { defaultPageSize } from "./pageSizes";
import { pageType } from "./resourceTypes";

export default function usePagination(request, props = []) {
  const { catchAppErrors, catchResourceErrors } = useContext(AppContext);

  const [isReady, setReady] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [numItemsPerPage, setNumItemsPerPage] = useState(defaultPageSize);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  async function makeInitialRequest() {
    const error = await catchAppErrors(async () => {
      const data = await request({
        page: currentPage,
        pageSize: numItemsPerPage,
      });
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
    });
    setReady(!error);
  }

  async function loadPage(page, pageSize = numItemsPerPage) {
    await catchResourceErrors(pageType, async () => {
      const data = await request({ page, pageSize });
      setCurrentPage(page);
      setNumItemsPerPage(pageSize);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
      return { status: 100 };
    });
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
    makeInitialRequest();
  }, props);

  return {
    isReady,
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
