import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { forgotPassword } from "../../redux/actions/userActions";

function ForgotPasswordPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { forgotPasswordLoading, forgotPasswordError, forgotPasswordMessage } =
    useSelector((state) => state.forgotPassword);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (forgotPasswordError) toast.error(forgotPasswordError);
    if (forgotPasswordMessage) {
      toast.success(forgotPasswordMessage);
      router.push("/");
    }
  }, [forgotPasswordError, forgotPasswordMessage]);

  function handleFormSubmit(e) {
    e.preventDefault();
    if (email.length === 0) return toast.error("Please enter email!");
    dispatch(forgotPassword(email));
  }

  return (
    <div className="grid place-items-center h-[80vh]">
      <form
        onSubmit={handleFormSubmit}
        className="w-4/5 sm:w-3/5 lg:w-1/3 border flex flex-col items-center font-semibold text-gray-800 text-lg shadow-lg bg-white"
      >
        <h3 className="text-primary text-4xl font-bold mb-6 mt-6">
          Forgot Password
        </h3>
        <div className="space-y-5 w-4/5">
          <div className="flex flex-col space-y-1 text-primary">
            <label className="col-span-2 " htmlFor="Email">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="col-span-4 outline-none pl-3 py-[0.5rem] text-sm border-2 border-gray-400 rounded-sm focus:border-primary"
              id="Email"
              type="text"
            ></input>
          </div>
        </div>
        <button
          disabled={forgotPasswordLoading ? true : false}
          className="bg-primary w-4/5 h-14 grid place-items-center py-2 mt-6 cursor-pointer mb-6 hover:scale-105 transform transition"
        >
          {!forgotPasswordLoading && (
            <h3 className="text-white w-full font-bold">Send Email</h3>
          )}
          {forgotPasswordLoading && (
            <img className="w-10 h-10" src="/images/loading.svg"></img>
          )}
        </button>
      </form>
    </div>
  );
}

export default ForgotPasswordPage;
