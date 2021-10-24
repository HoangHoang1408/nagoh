import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  adminGetRoom,
  adminUpdateRoom,
} from "../../../redux/actions/adminAction";
import Image from "next/image";
import { getSession } from "next-auth/client";

const initFieldsState = {
  name: "",
  pricePerNight: "",
  description: "",
  address: "",
  category: "King",
  guestCapacity: 1,
  numOfBeds: 1,
  internet: false,
  breakfast: false,
  petsAllowed: false,
  roomCleaning: false,
  airConditioned: false,
};

function AdminRoomPage() {
  const router = useRouter();

  const dispatch = useDispatch();
  const { loading, room, error } = useSelector((state) => state.adminGetRoom);
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = useSelector((state) => state.adminUpdateRoom);
  const [formFields, setFormFields] = useState(initFieldsState);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  useEffect(() => {
    if (router.query.id) dispatch(adminGetRoom(router.query.id));
  }, [router.query]);
  useEffect(() => {
    if (error) toast.error(error);
    if (updateError) toast.error(updateError);
    if (updateSuccess) toast.success("Room updated!");
  }, [error, updateSuccess, updateError]);
  useEffect(() => {
    if (room) {
      setPreviewImages(room.images.map((image) => image.url));
      const tempRoom = { ...room };
      [
        "images",
        "__v",
        "_id",
        "createAt",
        "id",
        "ratings",
        "numOfReviews",
      ].forEach((e) => delete tempRoom[e]);
      setFormFields(tempRoom);
    }
  }, [room]);
  useEffect(() => {
    if (images)
      setPreviewImages(Array.from(images).map((e) => URL.createObjectURL(e)));
  }, [images]);
  if (loading)
    return (
      <div className="mt-20 flex justify-center">
        <img className="w-10 h-10" src="/images/loading.svg"></img>
      </div>
    );
  function submitForm(e) {
    e.preventDefault();
    const invalidFields = Object.keys(formFields).filter(
      (key) => !formFields[key] && formFields[key] !== false
    );
    if (invalidFields.length > 0) {
      return toast.error(invalidFields.join(" ") + " is invalid!");
    }
    const formData = new FormData();
    Object.entries(formFields).forEach(([key, value]) =>
      formData.append(key, value)
    );
    const imagesArray = Array.from(images);
    if (imagesArray.length > 0)
      imagesArray.forEach((file) => formData.append("images", file));
    dispatch(adminUpdateRoom(router.query.id, formData));
  }
  function onChangeHandler(e) {
    if (
      [
        "internet",
        "breakfast",
        "petsAllowed",
        "roomCleaning",
        "airConditioned",
      ].includes(e.target.name)
    )
      return setFormFields((pre) => ({
        ...pre,
        [e.target.name]: e.target.checked,
      }));
    setFormFields((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  }
  return (
    <div className="my-6 mx-auto w-11/12 sm:w-5/6 md:w-3/4 lg:w-1/2 bg-white shadow-lg px-8 py-6 text-primary font-semibold text-lg">
      <h3 className="text-3xl font-bold mb-2">Room Info</h3>
      <form onSubmit={submitForm} className="flex flex-col space-y-2">
        <div className="flex flex-col">
          <label>Name</label>
          <input
            name="name"
            onChange={(e) => onChangeHandler(e)}
            className="bg-gray-100 px-3 py-[0.2rem] rounded border-primary border-2 outline-none text-base"
            type="text"
            value={formFields.name}
          ></input>
        </div>
        <div className="flex flex-col">
          <label>Price</label>
          <input
            name="pricePerNight"
            onChange={(e) => onChangeHandler(e)}
            className="bg-gray-100 px-3 py-[0.2rem] rounded border-primary border-2 outline-none text-base"
            type="number"
            value={formFields.pricePerNight}
          ></input>
        </div>
        <div className="flex flex-col">
          <label>Description</label>
          <textarea
            name="description"
            onChange={(e) => onChangeHandler(e)}
            className="bg-gray-100 px-3 py-[0.2rem] rounded border-primary border-2 outline-none text-base resize-none no-scrollbar h-32"
            value={formFields.description}
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label>Address</label>
          <input
            name="address"
            onChange={(e) => onChangeHandler(e)}
            className="bg-gray-100 px-3 py-[0.2rem] rounded border-primary border-2 outline-none text-base"
            type="text"
            value={formFields.address}
          ></input>
        </div>
        <div className="flex flex-col">
          <label>Category</label>
          <select
            name="category"
            onChange={(e) => onChangeHandler(e)}
            className="bg-gray-100 px-2 py-[0.2rem] rounded border-primary border-2 outline-none text-base"
            type="text"
            value={formFields.category}
          >
            <option value="King">King</option>
            <option value="Single">Single</option>
            <option value="Twins">Twins</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label>Guest Capacity</label>
          <select
            name="guestCapacity"
            onChange={(e) => onChangeHandler(e)}
            className="bg-gray-100 px-2 py-[0.2rem] rounded border-primary border-2 outline-none text-base"
            type="text"
            value={formFields.guestCapacity}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label>Number of Beds</label>
          <select
            name="numOfBeds"
            onChange={(e) => onChangeHandler(e)}
            className="bg-gray-100 px-2 py-[0.2rem] rounded border-primary border-2 outline-none text-base"
            type="text"
            value={formFields.numOfBeds}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>
        <div className="flex flex-col pt-3">
          <h3 className="font-extrabold">Room Features</h3>
          <div className="flex space-x-2 items-center">
            <input
              name="internet"
              onChange={(e) => onChangeHandler(e)}
              id="Internet"
              type="checkbox"
              className="inline-block w-4 h-4"
              checked={formFields.internet}
            ></input>
            <label htmlFor="Internet">Interner</label>
          </div>
          <div className="flex space-x-2 items-center">
            <input
              name="breakfast"
              onChange={(e) => onChangeHandler(e)}
              id="Breakfast"
              type="checkbox"
              className="inline-block w-4 h-4"
              checked={formFields.breakfast}
            ></input>
            <label htmlFor="Breakfast">Breakfast</label>
          </div>
          <div className="flex space-x-2 items-center">
            <input
              name="airConditioned"
              onChange={(e) => onChangeHandler(e)}
              id="Airconditioned"
              type="checkbox"
              className="inline-block w-4 h-4"
              checked={formFields.airConditioned}
            ></input>
            <label htmlFor="Airconditioned">Air Conditioner</label>
          </div>
          <div className="flex space-x-2 items-center">
            <input
              name="petsAllowed"
              onChange={(e) => onChangeHandler(e)}
              id="Pet allowed"
              type="checkbox"
              className="inline-block w-4 h-4"
              checked={formFields.petsAllowed}
            ></input>
            <label htmlFor="Pet allowed">Pet allowed</label>
          </div>
          <div className="flex space-x-2 items-center">
            <input
              name="roomCleaning"
              onChange={(e) => onChangeHandler(e)}
              id="Room Cleaning"
              type="checkbox"
              className="inline-block w-4 h-4"
              checked={formFields.roomCleaning}
            ></input>
            <label htmlFor="Room Cleaning">Room Cleaning</label>
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="font-extrabold">Images</h3>
          <div className="flex space-x-2">
            {previewImages.map((image, i) => (
              <div key={i} className="relative w-24 h-20">
                <Image
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  src={image}
                  quality={25}
                ></Image>
              </div>
            ))}
          </div>
          <div className="pt-2">
            <label
              className="p-2 rounded cursor-pointer bg-primary text-white"
              htmlFor="images"
            >
              Choose Images
            </label>
            <input
              onChange={(e) => setImages(e.target.files)}
              type="file"
              id="images"
              className="hidden"
              multiple
            ></input>
          </div>
        </div>
        <div className="pt-6">
          <button className="bg-primary rounded font-bold text-white py-2 w-full transform transition-all hover:scale-105 grid place-items-center">
            {!updateLoading && <h3>Update Room</h3>}
            {updateLoading && (
              <img className="w-8 h-8" src="/images/loading.svg"></img>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminRoomPage;
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session || session.user.role !== "admin")
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