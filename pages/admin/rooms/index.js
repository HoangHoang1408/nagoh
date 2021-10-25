import { useEffect, useMemo, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  adminDeleteRoom,
  adminRooms,
} from '../../../redux/actions/adminAction';
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from 'react-table';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { ADMIN_DELETE_ROOM_RESET } from '../../../redux/constants/adminConstants';
import { getSession } from 'next-auth/client';

const c = [
  {
    Header: 'Id',
    accessor: '_id',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Price',
    accessor: 'pricePerNight',
  },
  {
    Header: 'Category',
    accessor: 'category',
  },
];
//
function AdminRoomsPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(adminRooms());
  }, []);
  const [deleteRoomId, setDeleteRoomId] = useState(null);
  const { rooms, loading, error } = useSelector((state) => state.adminRooms);
  const {
    error: deleteError,
    loading: deleteLoading,
    success: deleteSuccess,
  } = useSelector((state) => state.adminDeleteRoom);

  //
  const data = useMemo(() => rooms, [rooms]);
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
            Header: 'Actions',
            Cell: ({
              row: {
                original: { _id },
              },
            }) => {
              return (
                <div className="text-white flex justify-center items-center space-x-3">
                  <div
                    onClick={() => router.push(`/admin/rooms/${_id}`)}
                    className="hover:scale-110 transform w-6 cursor-pointer h-6 grid place-items-center bg-blue-600 rounded"
                  >
                    <FontAwesomeIcon
                      className="w-4 h-4"
                      icon={faPen}
                    ></FontAwesomeIcon>
                  </div>
                  <div
                    onClick={() => setDeleteRoomId(_id)}
                    className="hover:scale-110 transform w-6 cursor-pointer h-6 grid place-items-center bg-red-600 rounded"
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
  useEffect(() => {
    if (error) toast.error(error);
    if (deleteError) {
      toast.error(deleteError);
      dispatch({
        type: ADMIN_DELETE_ROOM_RESET,
      });
    }
    if (deleteSuccess) {
      dispatch({
        type: ADMIN_DELETE_ROOM_RESET,
      });
      setDeleteRoomId(null);
      dispatch(adminRooms());
      toast.success('Room deleted!');
    }
  }, [error, deleteError, deleteSuccess]);
  //
  const [searchField, setSearchField] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => {
      setGlobalFilter(searchField.trim());
    }, 500);
    return () => clearTimeout(timer);
  }, [searchField]);

  // return when not load data yet
  if (loading)
    return (
      <div className="mt-20 flex justify-center">
        <img className="w-40 h-40" src="/images/loading.svg"></img>
      </div>
    );
  //
  return (
    <Fragment>
      {deleteRoomId && (
        <Fragment>
          <div
            onClick={() => setDeleteRoomId(null)}
            className="fixed z-50 top-0 left-0 bg-gray-600 w-full h-screen opacity-20"
          ></div>
          <div className="select-none fixed z-50 top-10 rounded-md left-1/2 transform -translate-x-1/2 w-1/3 bg-white p-8 flex flex-col space-y-7 shadow-lg font-semibold text-primary ">
            <h3 className="w-full">
              Do you want to delete room: <span>{deleteRoomId}</span>
            </h3>
            <div className="flex justify-center space-x-8">
              <button
                disabled={deleteLoading ? true : false}
                onClick={() => {
                  dispatch(adminDeleteRoom(deleteRoomId));
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
                onClick={() => setDeleteRoomId(null)}
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
            <h3 className="text-2xl font-bold">All Rooms</h3>
          </div>
          <div className="flex space-x-3">
            <h3 className="text-2xl font-bold">Search</h3>
            <input
              onChange={(e) => setSearchField(e.target.value)}
              className="border-2 border-primary outline-none px-2 py-1 rounded"
            ></input>
          </div>
          <Link href="/admin/rooms/new">
            <button className="py-1 px-3 bg-primary rounded-md">
              <h3 className="font-bold text-white text-xl">
                Create new Room{' '}
                <FontAwesomeIcon
                  className="w-5 h-5 inline-block"
                  icon={faPlus}
                ></FontAwesomeIcon>
              </h3>
            </button>
          </Link>
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
                    className="select-none px-2"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
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
                      ? 'bg-primary bg-opacity-20 shadow-md'
                      : 'shadow-md'
                  }
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => (
                    <td className="px-3 py-2 text-sm" {...cell.getCellProps()}>
                      {cell.render('Cell')}
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

export default AdminRoomsPage;
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session || session.user.role !== 'admin')
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  return {
    props: {},
  };
}
