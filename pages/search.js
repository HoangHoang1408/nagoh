import { useRouter } from "next/dist/client/router";
import { useRef } from "react";

export default function SearchPage() {
  const locationRef = useRef();
  const numberOfGuestsRef = useRef();
  const roomTypeRef = useRef();
  const router = useRouter();
  function handleSubmit(e) {
    e.preventDefault();
    const location = locationRef.current.value;
    const numberOfGuests = numberOfGuestsRef.current.value;
    const roomType = roomTypeRef.current.value;
    let urlString = "/?";
    urlString +=
      (location ? `location=${location}&` : "") +
      (numberOfGuests ? `numOfBeds=${numberOfGuests}&` : "") +
      (roomType ? `category=${roomType}` : "");
    router.push(urlString);
  }
  return (
    <div className="grid place-items-center mt-10">
      <div className="bg-white w-2/5 text-primary font-semibold rounded shadow-lg px-14 py-8">
        <h3 className="text-3xl font-bold mb-4">Search Rooms</h3>
        <form onSubmit={handleSubmit} className="space-y-4 mb-2">
          <div className="flex flex-col">
            <label
              className="text-lg font-bold text-primary"
              htmlFor="Location"
            >
              Location:
            </label>
            <input
              ref={locationRef}
              className="px-3 py-1 outline-none border-2 border-gray-400 focus:border-primary rounded-sm"
              id="Location"
              type="text"
            ></input>
          </div>
          <div className="flex flex-col">
            <label
              className="text-lg font-bold text-primary"
              htmlFor="Location"
            >
              Number Of Guests:
            </label>
            <select
              ref={numberOfGuestsRef}
              className="px-2 py-1 outline-none border-2 border-gray-400 focus:border-primary rounded-sm"
              id="Location"
              type="text"
            >
              {[1, 2, 3, 4, 5, 6].map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label
              className="text-lg font-bold text-primary"
              htmlFor="Location"
            >
              Room Type:
            </label>
            <select
              ref={roomTypeRef}
              className="px-2 py-1 outline-none border-2 border-gray-400 focus:border-primary rounded-sm"
              id="Location"
              type="text"
            >
              {["King", "Single", "Twins"].map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-primary p-1 rounded cursor-pointer">
            <button className="text-white h-full w-full font-bold text-2xl text-center hover:scale-110 transform transition">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
