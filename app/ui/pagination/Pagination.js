"use client";

import "./Pagination.css";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { useSearchParams, useRouter } from "next/navigation";

const PAGE_SIZE = 10;

export default function Pagination({ count }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPageParam = searchParams.get("page");
  const currentPage = currentPageParam ? Number(currentPageParam) : 1;

  const pageCount = Math.ceil(count / PAGE_SIZE);

  const updatePage = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage);
    router.push(`?${params.toString()}`);
  };

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    updatePage(next);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    updatePage(prev);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="table-pagination">
      <div className="footer-txt">
        Showing{" "}
        <strong className="footer-txt-bold">
          {(currentPage - 1) * PAGE_SIZE + 1}
        </strong>{" "}
        to{" "}
        <strong className="footer-txt-bold">
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </strong>{" "}
        of
        <strong className="footer-txt-bold"> {count}</strong> results
      </div>
      <div className="footer-btns-container">
        <button
          className="footer-btns"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <GrFormPrevious />
          Previous
        </button>
        <button
          className="footer-btns"
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          Next <GrFormNext />
        </button>
      </div>
    </div>
  );
}
