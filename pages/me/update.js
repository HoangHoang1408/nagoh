import { getSession } from "next-auth/client";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/dist/client/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { updatePassword, updateProfile } from "../../redux/actions/userActions";

function UpdatePasswordForm() {
  const dispatch = useDispatch();

  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  const { updatePasswordLoading, updatePasswordError, isUpdatedPassword } =
    useSelector((state) => state.user);

  useEffect(() => {
    if (isUpdatedPassword) {
      toast.success("Password Updated!");
      currentPasswordRef.current.value = "";
      newPasswordRef.current.value = "";
      confirmPasswordRef.current.value = "";
    }
    if (updatePasswordError) toast.error(updatePasswordError);
  }, [isUpdatedPassword, updatePasswordError]);

  function handleUpdatePassword(e) {
    e.preventDefault();
    const currentPassword = currentPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (newPassword !== confirmPassword)
      toast.error("Confirm Password and New Password are not the same!");
    dispatch(updatePassword({ currentPassword, newPassword }));
  }

  return (
    <div className="grid w-full justify-items-center ">
      <form
        onSubmit={handleUpdatePassword}
        className="w-4/5 border flex flex-col items-center font-semibold text-gray-800 text-lg shadow-lg bg-white"
      >
        <h3 className="text-primary text-2xl md:text-4xl font-bold mb-3 mt-4">
          Change Password
        </h3>
        <div className="space-y-2 w-4/5">
          <div className="flex flex-col text-primary">
            <label className="col-span-2 " htmlFor="currentPassword">
              Current Password
            </label>
            <input
              className="col-span-4 outline-none pl-3 py-[0.5rem] text-sm font-extrabold tracking-wider border-2 border-gray-400 rounded-sm focus:border-primary "
              id="currentPassword"
              type="password"
              name="password"
              ref={currentPasswordRef}
            ></input>
          </div>
          <div className="flex flex-col text-primary">
            <label className="col-span-2 " htmlFor="newPassword">
              New Password
            </label>
            <input
              className="col-span-4 outline-none pl-3 py-[0.5rem] text-sm font-extrabold tracking-wider border-2 border-gray-400 rounded-sm focus:border-primary "
              id="newPassword"
              type="password"
              name="password"
              ref={newPasswordRef}
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
              ref={confirmPasswordRef}
            ></input>
          </div>
        </div>
        <button
          // disabled={loading ? true : false}
          className="bg-primary w-4/5 py-2 mt-6 cursor-pointer mb-5 hover:scale-105 transform transition grid place-items-center"
        >
          {!updatePasswordLoading && (
            <h3 className="text-white text-center w-full font-bold ">Update</h3>
          )}
          {updatePasswordLoading && (
            <img className="w-8 h-8" src="/images/loading.svg"></img>
          )}
        </button>
      </form>
    </div>
  );
}
function UpdateProfileForm() {
  const dispatch = useDispatch();
  const { user, loading: loadingUser } = useSelector((state) => state.auth);
  const {
    loading: loadingUpdate,
    isUpdated,
    error,
  } = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    avatar: {
      avatarUrl: "/images/user.png",
    },
  });
  const [newAvatarFile, setNewAvatarFile] = useState(null);

  useEffect(() => {
    if (user) setUserInfo(user);
    if (error) toast.error(error);
    if (isUpdated) toast.success("Updated!");
  }, [user, isUpdated, error]);

  if (!user)
    return (
      <div className="relative w-full h-[50vh] grid place-items-center">
        <Image src="/images/loading.svg" layout="fill"></Image>
      </div>
    );

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      setNewAvatarFile(e.target.files[0]);
      setUserInfo((pre) => ({
        ...pre,
        avatar: {
          avatarUrl: URL.createObjectURL(e.target.files[0]),
        },
      }));
    } else {
      setUserInfo((pre) => ({
        ...pre,
        [e.target.name]: e.target.value,
      }));
    }
  };
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const userData = new FormData();
    userData.append("name", userInfo.name);
    userData.append("email", userInfo.email);
    if (newAvatarFile) {
      userData.append("image", newAvatarFile);
      userData.append("avatarFullPath", user.avatar.fullPath);
      userData.append("avatarUrl", user.avatar.avatarUrl);
    }
    dispatch(updateProfile(userData));
  };
  return (
    <div className="grid w-full place-items-center ">
      <form
        onSubmit={handleUpdateProfile}
        className="w-4/5 border flex flex-col items-center font-semibold text-gray-800 text-lg shadow-lg bg-white"
      >
        <h3 className="text-primary text-2xl md:text-4xl font-bold mb-3 mt-4">
          User Profile
        </h3>
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
              value={userInfo.name}
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
              value={userInfo.email}
              onChange={onChange}
            ></input>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="ml-2 md:ml-8 relative w-16 h-16">
              <Image
                src={userInfo.avatar.avatarUrl}
                blurDataURL={userInfo.avatar.avatarUrl}
                placeholder="blur"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                quality={25}
              ></Image>
            </div>
            <label
              className="text-primary cursor-pointer hover:underline mr-2 md:mr-8"
              htmlFor="imageupload"
            >
              Change Your Image
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
          // disabled={loading ? true : false}
          className="bg-primary w-4/5 py-2 mt-4 cursor-pointer mb-5 hover:scale-105 transform transition grid place-items-center"
        >
          {!loadingUpdate && !loadingUser && (
            <h3 className="text-white text-center w-full font-bold">Update</h3>
          )}
          {(loadingUpdate || loadingUser) && (
            <img className="w-8 h-8" src="/images/loading.svg"></img>
          )}
        </button>
      </form>
    </div>
  );
}

// Main function
function UpdateProfilePage() {
  return (
    <div className="flex flex-col w-11/12 lg:w-3/5 m-auto mt-10 space-y-6">
      <UpdateProfileForm></UpdateProfileForm>
      <UpdatePasswordForm></UpdatePasswordForm>
    </div>
  );
}

export default UpdateProfilePage;
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session)
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
