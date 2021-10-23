import {
  faFastBackward,
  faFastForward,
  faStepBackward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";

function Pagination(props) {
  // style
  const btn =
    "w-8 h-8 grid place-items-center border rounded-md cursor-pointer transition hover:scale-110 font-bold text-lg";
  const normalBtn = btn + " border-gray-400";
  const activeBtn = btn + " border-primary";

  //
  const router = useRouter();
  const { itemsPerPage, totalItems, href, query } = props;
  const totalPage = Math.ceil(totalItems / itemsPerPage);
  const [current, setCurrent] = useState(+query.page || 1);
  if (current > totalPage)
    return <div className="text-center text-3xl font-bold text-gray-800"></div>;

  function push(page, returnHome = false) {
    const { location, numOfBeds, category } = router.query;
    let urlString = `${href}/?`;
    if (!returnHome) urlString += `page=${page}&`;
    if (location) urlString += `location=${location}&`;
    if (numOfBeds) urlString += `numOfBeds=${numOfBeds}&`;
    if (category) urlString += `category=${category}&`;
    router.push(urlString, null, { scroll: false });
  }
  //
  function next() {
    if (current === totalPage) return;
    setCurrent((pre) => pre + 1);
    push(current + 1);
  }
  function pre() {
    if (current === 1) return;
    if (current === 2) {
      setCurrent((pre) => pre - 1);
      push(null, true);
      return;
    }
    setCurrent((pre) => pre - 1);
    push(current - 1);
  }
  function fastForward() {
    if (current + 4 > totalPage) {
      setCurrent(totalPage);
      push(totalPage);
      return;
    }
    setCurrent((pre) => pre + 4);
    push(current + 4);
  }
  function fastBackward() {
    if (current - 4 <= 1) {
      setCurrent(1);
      push(null, true);
      return;
    }
    setCurrent((pre) => pre - 4);
    push(current - 4);
  }
  function handlePageClick(page) {
    setCurrent(page);
    if (page === 1) push(null, true);
    return push(page);
  }

  //
  let page = [1, 2, 3, 4];
  if (totalPage <= 4) {
    page = [];
    for (let i = 1; i <= totalPage; i++) page.push(i);
  }
  if (current > 4) {
    page = [current - 3, current - 2, current - 1, current];
  }
  const listPage = page.map((i) => {
    return (
      <div
        key={i}
        className={i === current ? activeBtn : normalBtn}
        onClick={() => handlePageClick(i)}
      >
        {i}
      </div>
    );
  });
  if (page[0] > 1) {
    listPage.unshift(
      <div key={"k"} className={btn}>
        ...
      </div>
    );
  }
  if (totalPage > page[page.length - 1]) {
    listPage.push(
      <div key={"h"} className={btn}>
        ...
      </div>
    );
  }
  //
  return (
    <div className="mt-8 w-full flex justify-center items-center select-none">
      <div className="flex space-x-1 text-primary">
        <div className={btn + normalBtn} onClick={fastBackward}>
          <FontAwesomeIcon
            className="w-4"
            icon={faFastBackward}
          ></FontAwesomeIcon>
        </div>

        <div className={btn + normalBtn} onClick={pre}>
          <FontAwesomeIcon
            className="w-4"
            icon={faStepBackward}
          ></FontAwesomeIcon>
        </div>
        {listPage}
        <div className={btn + normalBtn} onClick={next}>
          <FontAwesomeIcon
            className="w-4"
            icon={faStepForward}
          ></FontAwesomeIcon>
        </div>
        <div className={btn + normalBtn} onClick={fastForward}>
          <FontAwesomeIcon
            className="w-4"
            icon={faFastForward}
          ></FontAwesomeIcon>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
