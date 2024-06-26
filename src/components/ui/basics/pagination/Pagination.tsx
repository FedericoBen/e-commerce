"use client";
import Link from "next/link";
import styles from "./Pagination.module.scss";
import { Url } from "next/dist/shared/lib/router/router";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, useMemo } from "react";

interface PaginationProps {
  totalPages: number;
}

type page = string | number;

const Pagination = ({ totalPages }: PaginationProps) => {
  const pageRoute = usePathname();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams?.get("page") ?? 1);

  const currentPage = isNaN(pageParam) ? 1 : pageParam;

  const pages = useMemo(() => {
    //*If the total pages es less or equal to 7 show all pages
    if (totalPages <= 7)
      return new Array(totalPages).fill(0).map((_, i) => i + 1);

    //*If the current page is between the first 3 pages
    if (currentPage < 3) return [1, 2, 3, "...", totalPages - 1, totalPages];

    //*If the current page is equal to 3
    if (currentPage == 3)
      return [1, 2, 3, 4, "...", totalPages - 1, totalPages];

    //*If the current page is between the last 3 pages
    if (currentPage > totalPages - 2)
      return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];

    //*If the current page is equal to total pages -2
    if (currentPage == totalPages - 2)
      return [
        1,
        2,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];

    //*If the current page is other place
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  }, [currentPage, totalPages]);

  if (totalPages == 1) return null;
  return (
    <div className={styles.container_pagination}>
      <div className={styles.button_and_pages}>
        {currentPage != 1 && (
          <Link
            className={styles.button}
            href={`${pageRoute}?page=${currentPage - 1}`}
          >
            <IoIosArrowBack size={30} />
          </Link>
        )}
        <div className={styles.container_pages}>
          {(pages as page[]).map((page, i) => (
            <Fragment key={`page-${page}-${i}`}>
              {page == "..." ? (
                <span className={`${styles.page} ${styles.three_dots}]`}>
                  {page}
                </span>
              ) : (
                <Link
                  className={`${styles.page} ${
                    currentPage == +page && styles.selected
                  }`}
                  href={`${pageRoute}?page=${page}`}
                >
                  {+page}
                </Link>
              )}
            </Fragment>
          ))}
        </div>
        {currentPage != totalPages && (
          <Link
            className={styles.button}
            href={`${pageRoute}?page=${currentPage + 1}`}
          >
            <IoIosArrowForward size={30} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;
