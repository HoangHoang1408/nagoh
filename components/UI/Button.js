import React from "react";
import Link from "next/dist/client/link";

function Button(props) {
  if (props.href)
    return (
      <Link href={props.href}>
        <button className="bg-[#e61e4d] px-5 py-2 text-white font-medium rounded-sm ">
          {props.children}
        </button>
      </Link>
    );
  return (
    <button className="bg-[#e61e4d] px-5 py-2 text-white font-medium rounded-sm ">
      <div>{props.children}</div>
    </button>
  );
}

export default Button;
