import { getSession } from "next-auth/client";
import { wrapper } from "../../redux/store";
import { getAllBookings } from "../../redux/actions/bookingAction";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { toast } from "react-toastify";
import Link from "next/link";
import { downloadInvoice } from "../../utils/downloadInvoice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEye } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/dist/client/router";

function MyBookingPages() {
  const router = useRouter();
  const { bookings, error } = useSelector((state) => state.allBookings);
  useEffect(() => {
    if (error) toast.error("Something wrong happened. Please try again later!");
  }, []);
  const data = useMemo(() => bookings, [bookings]);
  const columns = useMemo(
    () => [
      {
        Header: "Booking ID",
        accessor: "_id",
      },
      {
        Header: "Check In Date",
        accessor: "checkInDate",
        Cell: ({ value }) => {
          return (
            <h3>
              {new Date(value).toLocaleString("en-US", {
                month: "2-digit",
                day: "numeric",
                year: "numeric",
              })}
            </h3>
          );
        },
      },
      {
        Header: "Check Out Date",
        accessor: "checkOutDate",
        Cell: ({ value }) => {
          return (
            <h3>
              {new Date(value).toLocaleString("en-US", {
                month: "2-digit",
                day: "numeric",
                year: "numeric",
              })}
            </h3>
          );
        },
      },
      {
        Header: "Amount Paid",
        accessor: "amountPaid",
        Cell: ({ value }) => `$${value}`,
      },
    ],
    [bookings]
  );
  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Action",
        Header: "Action",
        Cell: ({ row }) => {
          return (
            <div className="text-white flex justify-center items-center space-x-3">
              <div
                onClick={() => router.push(`/bookings/${row.original._id}`)}
                className="hover:scale-110 transform w-7 cursor-pointer h-7 grid place-items-center bg-blue-600 rounded"
              >
                <FontAwesomeIcon
                  className="w-4 h-4"
                  icon={faEye}
                ></FontAwesomeIcon>
              </div>
              <div className="hover:scale-110 transform w-7 cursor-pointer h-7 grid place-items-center bg-green-600 rounded">
                <FontAwesomeIcon
                  onClick={() => downloadInvoice(row.original)}
                  className="w-4 h-4"
                  icon={faDownload}
                ></FontAwesomeIcon>
              </div>
            </div>
          );
        },
      },
    ]);
  };
  const {
    page,
    nextPage,
    previousPage,
    getTableBodyProps,
    getTableProps,
    rows,
    setPageSize,
    prepareRow,
    headerGroups,
    state: { pageIndex },
    pageOptions,
    setGlobalFilter,
  } = useTable(
    {
      data,
      columns,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    tableHooks
  );
  const [searchField, setSearchField] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setGlobalFilter(searchField.trim());
    }, 500);
    return () => clearTimeout(timer);
  }, [searchField]);

  if (bookings && bookings.length === 0)
    return (
      <div className="mt-20 flex justify-center">
        <h3 className="font-bold text-3xl text-center text-primary">
          You don't have any bookings yet!
        </h3>
      </div>
    );

  return (
    <div className="w-3/4 mx-auto my-8 relative">
      <div className="mb-4 flex justify-between items-center space-x-3  text-primary">
        <h3 className="text-3xl font-bold">My bookings</h3>
        <div className="flex space-x-3">
          <h3 className="text-2xl font-bold">Search</h3>
          <input
            onChange={(e) => setSearchField(e.target.value)}
            className="border-2 border-primary outline-none px-2 py-1 rounded"
          ></input>
        </div>
      </div>
      <table className="w-full font-medium text-lg" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              className="bg-primary bg-opacity-80 font-bold text-white"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  className="select-none px-2 py-1 border-primary border-[1px] text-center"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                className={i % 2 === 1 ? "bg-primary bg-opacity-20" : ""}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => (
                  <td
                    className="px-3 py-2 border-primary border-[1px] text-center"
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-center items-center mt-5 space-x-2 text-primary font-semibold ">
        <div className="">
          <h3>
            Page {pageIndex + 1} of {pageOptions.length}
          </h3>
        </div>
        <button
          className="px-2 py-1 bg-primary text-white rounded-md  border-primary"
          onClick={() => previousPage()}
        >
          Prev
        </button>
        <button
          className="px-2 py-1 bg-primary text-white rounded-md   border-primary"
          onClick={() => nextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MyBookingPages;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const session = await getSession({ req: context.req });
    if (!session)
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    await store.dispatch(
      getAllBookings({
        cookie: context.req.headers.cookie,
        req: context.req,
      })
    );
    return {
      props: {},
    };
  }
);
