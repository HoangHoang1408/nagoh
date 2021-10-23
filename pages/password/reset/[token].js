import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { resetPassword } from "../../../redux/actions/userActions";

function ResetPasswordPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { resetPasswordLoading, resetPasswordError, resetPasswordSuccess } =
    useSelector((state) => state.resetPassword);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  useEffect(() => {
    if (resetPasswordError) toast.error(resetPasswordError);
    if (resetPasswordSuccess) toast.success("Password reset successfully!");
  }, [resetPasswordError, resetPasswordSuccess]);

  function handleFormSubmit(e) {
    e.preventDefault();
    dispatch(
      resetPassword({ token: router.query.token, newPassword: password })
    );
    router.push("/login");
  }

  return (
    <div className="grid place-items-center h-[80vh]">
      <form
        onSubmit={handleFormSubmit}
        className="w-4/5 sm:w-3/5 lg:w-1/3 border flex flex-col items-center font-semibold text-gray-800 text-lg shadow-lg bg-white"
      >
        <h3 className="text-primary text-4xl font-bold mb-6 mt-6">
          Reset Password
        </h3>
        <div className="space-y-5 w-4/5">
          <div className="flex flex-col space-y-1 text-primary">
            <label className="col-span-2 " htmlFor="Email">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="col-span-4 outline-none pl-3 py-[0.5rem] text-sm border-2 border-gray-400 rounded-sm focus:border-primary  tracking-widest font-extrabold"
              id="Email"
            ></input>
          </div>
          <div className="flex flex-col space-y-1 text-primary">
            <label className="col-span-2 " htmlFor="Email">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              className="col-span-4 outline-none pl-3 py-[0.5rem] text-sm border-2 border-gray-400 rounded-sm focus:border-primary tracking-widest font-extrabold"
              id="Email"
            ></input>
          </div>
        </div>
        <button
          disabled={resetPasswordLoading ? true : false}
          className="bg-primary w-4/5 h-14 grid place-items-center py-2 mt-6 cursor-pointer mb-6 hover:scale-105 transform transition"
        >
          {!resetPasswordLoading && (
            <h3 className="text-white w-full font-bold">Reset Password</h3>
          )}
          {resetPasswordLoading && (
            <img className="w-10 h-10" src="/images/loading.svg"></img>
          )}
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
