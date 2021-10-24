import { faDownload, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { toast } from "react-toastify";
import {
  adminDeleteBooking,
  adminGetBookings,
} from "../../../redux/actions/adminAction";
import { ADMIN_DELETE_BOOKING_RESET } from "../../../redux/constants/adminConstants";
import { downloadInvoice } from "../../../utils/downloadInvoice";

const c = [
  {
    Header: "Booking Id",
    accessor: "_id",
  },
  {
    Header: "Check In",
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
    Header: "Check Out",
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
  },
];
function AdminBookingsPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(adminGetBookings());
  }, []);
  const { bookings, loading, error } = useSelector(
    (state) => state.adminGetBookings
  );
  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = useSelector((state) => state.adminDeleteBooking);

  const data = useMemo(() => bookings, [bookings]);
  const columns = useMemo(() => c, [c]);
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
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          ...columns,
          {
            Header: "Actions",
            Cell: ({ row }) => {
              return (
                <div className="text-white flex justify-center items-center space-x-3">
                  <div
                    onClick={() =>
                      router.push(`/admin/bookings/${row.original._id}`)
                    }
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
                  <div
                    onClick={() => setDeleteBookingId(row.original._id)}
                    className="hover:scale-110 transform w-7 cursor-pointer h-7 grid place-items-center bg-red-600 rounded"
                  >
                    <FontAwesomeIcon
                      className="w-4 h-4"
                      icon={faTrash}
                    ></FontAwesomeIcon>
                  </div>
                </div>
              );
            },
          },
        ];
      });
    }
  );
  const [deleteBookingId, setDeleteBookingId] = useState(null);
  useEffect(() => {
    if (error) toast.error("Can't load bookings right now try later!");
    if (deleteError) {
      toast.error(deleteError);
      dispatch({
        type: ADMIN_DELETE_BOOKING_RESET,
      });
    }
    if (deleteSuccess) {
      dispatch({
        type: ADMIN_DELETE_BOOKING_RESET,
      });
      setDeleteBookingId(null);
      dispatch(adminGetBookings());
      toast.success("Room deleted!");
    }
  }, [error, deleteError, deleteSuccess]);
  const [searchField, setSearchField] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setGlobalFilter(searchField.trim());
    }, 500);
    return () => clearTimeout(timer);
  }, [searchField]);

  if (loading)
    return (
      <div className="mt-28 flex justify-center">
        <img className="w-40 h-40" src="/images/loading.svg"></img>
      </div>
    );
  if (bookings && bookings.length === 0)
    return (
      <div className="mt-20 flex justify-center">
        <h3 className="font-bold text-3xl text-center text-primary">
          No bookings right now!
        </h3>
      </div>
    );
  return (
    <Fragment>
      {deleteBookingId && (
        <Fragment>
          <div
            onClick={() => setDeleteBookingId(null)}
            className="fixed z-50 top-0 left-0 bg-gray-600 w-full h-screen opacity-20"
          ></div>
          <div className="select-none fixed z-50 top-10 rounded-md left-1/2 transform -translate-x-1/2 w-1/3 bg-white p-8 flex flex-col space-y-7 shadow-lg font-semibold text-primary ">
            <h3 className="w-full">
              Do you want to delete booking: <span>{deleteBookingId}</span>
            </h3>
            <div className="flex justify-center space-x-8">
              <button
                disabled={deleteLoading ? true : false}
                onClick={() => {
                  dispatch(adminDeleteBooking(deleteBookingId));
                }}
                className="font-bold px-6 py-2 bg-primary rounded text-white transform transition-all hover:scale-105"
              >
                {deleteLoading && (
                  <img className="w-10" src="/images/loading.svg"></img>
                )}
                {!deleteLoading && <h3>Delete</h3>}
              </button>
              <button
                disabled={deleteLoading ? true : false}
                onClick={() => setDeleteBookingId(null)}
                className="font-bold px-6 py-2 bg-primary rounded text-white transform transition-all hover:scale-105"
              >
                <h3>Cancel</h3>
              </button>
            </div>
          </div>
        </Fragment>
      )}
      <div className="w-3/4 mx-auto my-8 relative">
        <div className="mb-4 flex justify-between items-center space-x-3  text-primary">
          <div>
            <h3 className="text-2xl font-bold">All Bookings</h3>
          </div>
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
                    className="select-none px-2 py-1 text-center shadow-md"
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
                  className={
                    i % 2 === 1
                      ? "bg-primary bg-opacity-20 shadow-md"
                      : "shadow-md"
                  }
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => (
                    <td
                      className="px-3 py-2 text-center text-sm"
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
    </Fragment>
  );
}

export default AdminBookingsPage;
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session || session.user.role !== "admin")
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  return {
    props: {},
  };
}
