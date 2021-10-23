import { getSession, signIn } from "next-auth/client";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/dist/client/link";
import { useDispatch } from "react-redux";
import { loadUser } from "../redux/actions/userActions";
import { useRouter } from "next/dist/client/router";

function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
    if (result.error) {
      toast.error(result.error);
    } else {
      router.push("/");
    }
    setLoading(false);
  }
  return (
    <div className="grid place-items-center h-[80vh] ">
      <form
        onSubmit={submitHandler}
        className="w-4/5 sm:w-3/5 lg:w-1/3 border flex flex-col items-center font-semibold text-gray-800 text-lg shadow-lg bg-white"
      >
        <h3 className="text-primary text-4xl font-bold mb-6 mt-6">Login</h3>
        <div className="space-y-5 w-4/5">
          <div className="flex flex-col space-y-1 text-primary">
            <label className="col-span-2 " htmlFor="Email">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-4 outline-none pl-3 py-[0.5rem] text-sm border-2 border-gray-400 rounded-sm focus:border-primary"
              id="Email"
              type="text"
            ></input>
          </div>
          <div className="flex flex-col space-y-1 text-primary">
            <label className="col-span-2 " htmlFor="Password">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="col-span-4 outline-none pl-3 py-[0.5rem] text-sm font-extrabold tracking-wider border-2 border-gray-400 rounded-sm focus:border-primary "
              id="Password"
              type="password"
            ></input>
          </div>
        </div>
        <div className="text-sm w-full text-right pr-8 mt-4 ">
          <Link href="/password/forgot">
            <span className="underline inline-block cursor-pointer hover:text-primary">
              Forgot Password?
            </span>
          </Link>{" "}
          or{" "}
          <Link href="/register">
            <span className="underline inline-block cursor-pointer hover:text-primary">
              New User?
            </span>
          </Link>
        </div>
        <button
          disabled={loading ? true : false}
          className="bg-primary w-4/5 h-14 grid place-items-center py-2 mt-6 cursor-pointer mb-6 hover:scale-105 transform transition"
        >
          {!loading && <h3 className="text-white w-full font-bold">Login</h3>}
          {loading && (
            <img className="w-10 h-10" src="/images/loading.svg"></img>
          )}
        </button>
      </form>
    </div>
  );
}

export default Login;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  return {
    props: {},
  };
}
