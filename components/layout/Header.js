import Link from "next/link";
import Button from "../UI/Button";
function Header() {
  return (
    <div className="sticky top-0 left-0 w-full h-14 flex justify-between items-center bg-white shadow-md px-10 z-50">
      <div>
        <Link href="/">
          <img src="/images/bookit_logo.png" className="cursor-pointer"></img>
        </Link>
      </div>
      <Button href="/login">Login</Button>
    </div>
  );
}

export default Header;
