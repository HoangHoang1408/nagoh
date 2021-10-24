import Image from "next/dist/client/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
import {
  clearErrors,
  registerUser,
  resetState,
} from "../redux/actions/userActions";
import { REGISTER_USER_RESET } from "../redux/constants/userConstants";

function RegisterPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [image, setImage] = useState("/images/user.png");
  const [file, setFile] = useState(null);
  const { registerSuccess, error, loading } = useSelector(
    (state) => state.register
  );
  useEffect(() => {
    if (registerSuccess) {
      toast.success("Register successfully, login to continue!");
      router.push("/login");
      dispatch({
        type: REGISTER_USER_RESET,
      });
    }
    if (error) {
      toast.error(error);
      dispatch({
        type: REGISTER_USER_RESET,
      });
    }
  }, [registerSuccess, error]);

  async function handleSubmitForm(e) {
    e.preventDefault();
    if (user.password !== user.passwordConfirm)
      return toast.error("Confirm password does not match!");
    const userData = new FormData();
    userData.append("name", user.name);
    userData.append("email", user.email);
    userData.append("password", user.password);
    userData.append("image", file);
    dispatch(registerUser(userData));
  }
  const onChange = (e) => {
    if (e.target.name === "avatar") {
      setImage(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    } else {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
  };
  return (
    <div className="grid place-items-center h-[80vh] pt-5">
      <form
        onSubmit={handleSubmitForm}
        className="w-4/5 sm:w-3/5 lg:w-1/3 border flex flex-col items-center font-semibold text-gray-800 text-lg shadow-lg bg-white"
      >
        <h3 className="text-primary text-4xl font-bold mb-3 mt-4">Join Us</h3>
        <div className="space-y-2 w-4/5">
          <div className="flex flex-col text-primary">
            <label className="col-span-2 " htmlFor="Full Name">
              Full Name
            </label>
            <input
              className="col-span-4 outline-none pl-3 py-[0.5rem] text-sm border-2 border-gray-400 rounded-sm focus:border-primary"
              id="Full Name"
              type="text"
              name="name"
              value={user.name}
              onChange={onChange}
            ></input>
          </div>
          <div className="flex flex-col text-primary">
            <label className="col-span-2 " htmlFor="Email">
              Email
            </label>
            <input
              className="col-span-4 outline-none pl-3 py-[0.5rem] text-sm border-2 border-gray-400 rounded-sm focus:border-primary"
              id="Email"
              type="text"
              name="email"
              value={user.email}
              onChange={onChange}
            ></input>
          </div>
          <div className="flex flex-col text-primary">
            <label className="col-span-2 " htmlFor="Password">
              Password
            </label>
            <input
              className="col-span-4 outline-none pl-3 py-[0.5rem] text-sm font-extrabold tracking-wider border-2 border-gray-400 rounded-sm focus:border-primary "
              id="Password"
              type="password"
              name="password"
              value={user.password}
              onChange={onChange}
            ></input>
          </div>
          <div className="flex flex-col text-primary">
            <label className="col-span-2 " htmlFor="PasswordConfirm">
              Password Confirm
            </label>
            <input
              className="col-span-4 outline-none pl-3 py-[0.5rem] text-sm font-extrabold tracking-wider border-2 border-gray-400 rounded-sm focus:border-primary "
              id="PasswordConfirm"
              type="password"
              name="passwordConfirm"
              value={user.passwordConfirm}
              onChange={onChange}
            ></input>
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="ml-8 relative w-16 h-16">
              <Image
                src={image}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              ></Image>
            </div>
            <label
              className="text-primary cursor-pointer hover:underline mr-8"
              htmlFor="imageupload"
            >
              Choose your image
            </label>
            <input
              id="imageupload"
              type="file"
              accept="image/*"
              className="hidden"
              name="avatar"
              onChange={onChange}
            ></input>
          </div>
        </div>
        <button
          disabled={loading ? true : false}
          className="bg-primary w-4/5 py-2 mt-4 cursor-pointer mb-5 hover:scale-105 transform transition grid place-items-center"
        >
          {!loading && (
            <h3 className="text-white text-center w-full ">Register</h3>
          )}
          {loading && <img className="w-8 h-8" src="/images/loading.svg"></img>}
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
