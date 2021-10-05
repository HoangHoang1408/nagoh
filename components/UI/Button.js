import React from "react";
import Link from "next/dist/client/link";

function Button(props) {
  if (props.href)
    return (
      <button className="bg-[#e61e4d] px-5 py-2 text-white font-medium rounded-sm ">
        <Link href={props.href}>{props.children}</Link>
      </button>
    );
  return (
    <button className="">
      <div>{props.children}</div>
    </button>
  );
}

export default Button;
