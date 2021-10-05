import {
  faArrowLeft,
  faStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <div className="pt-10 min-h-screen bg-gray-50">
      <div className="w-full px-28">
        <div>
          <h2 className="font-bold text-3xl mb-3">Stays in New York</h2>
          <div className="flex w-max items-center text-primary cursor-pointer transform hover:scale-110">
            <FontAwesomeIcon
              className="w-4 inline-block mr-2"
              icon={faArrowLeft}
            ></FontAwesomeIcon>
            <Link href="/">
              <h3 className="text-lg font-bold ">Back to Search</h3>
            </Link>
          </div>
        </div>

        {/* Cards container */}
        <div className="grid gap-x-5 grid-cols-12 mt-8">
          {/* Hotel card */}
          <div className="rounded-sm overflow-hidden col-span-3 flex flex-col space-y-2 shadow-2xl">
            <div className="overflow-hidden">
              <Image
                className="object-cover object-center"
                layout="responsive"
                width={400}
                height={300}
                src="/images/test.jpg"
              ></Image>
            </div>
            <h2 className="px-3 text-gray-800 text-lg font-bold">
              Charming Studio Miles to Wells' Beaches!
            </h2>
            <div className="px-3">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {"12$"}/night
              </h3>
              <div className="flex space-x-1 mb-2">
                <FontAwesomeIcon
                  className="w-4 text-primary"
                  icon={faStar}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                  className="w-4 text-primary"
                  icon={faStar}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                  className="w-4 text-primary"
                  icon={faStar}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                  className="w-4 text-primary"
                  icon={faStarHalfAlt}
                ></FontAwesomeIcon>
              </div>
            </div>
            <div className="w-full py-2  text-center text-white text-lg font-medium bg-primary">
              <Link href="/">View Details</Link>
            </div>
          </div>
          <div className="rounded-sm overflow-hidden col-span-3 flex flex-col space-y-2 shadow-2xl">
            <div className="overflow-hidden">
              <Image
                className="object-cover object-center"
                layout="responsive"
                width={400}
                height={300}
                src="/images/test.jpg"
              ></Image>
            </div>
            <h2 className="px-3 text-gray-800 text-lg font-bold">
              Charming Studio Miles to Wells' Beaches!
            </h2>
            <div className="px-3">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {"12$"}/night
              </h3>
              <div className="flex space-x-1 mb-2">
                <FontAwesomeIcon
                  className="w-4 text-primary"
                  icon={faStar}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                  className="w-4 text-primary"
                  icon={faStar}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                  className="w-4 text-primary"
                  icon={faStar}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                  className="w-4 text-primary"
                  icon={faStarHalfAlt}
                ></FontAwesomeIcon>
              </div>
            </div>
            <div className="w-full py-2  text-center text-white text-lg font-medium bg-primary">
              <Link href="/">View Details</Link>
            </div>
          </div>
          <div className="rounded-sm overflow-hidden col-span-3 flex flex-col space-y-2 shadow-2xl">
            <div className="overflow-hidden">
              <Image
                className="object-cover object-center"
                layout="responsive"
                width={400}
                height={300}
                src="/images/test.jpg"
              ></Image>
            </div>
            <h2 className="px-3 text-gray-800 text-lg font-bold">
              Charming Studio Miles to Wells' Beaches!
            </h2>
            <div className="px-3">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {"12$"}/night
              </h3>
              <div className="flex space-x-1 mb-2">
                <FontAwesomeIcon
                  className="w-4 text-primary"
                  icon={faStar}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                  className="w-4 text-primary"
                  icon={faStar}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                  className="w-4 text-primary"
                  icon={faStar}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                  className="w-4 text-primary"
                  icon={faStarHalfAlt}
                ></FontAwesomeIcon>
              </div>
            </div>
            <div className="w-full py-2  text-center text-white text-lg font-medium bg-primary">
              <Link href="/">View Details</Link>
            </div>
          </div>
          <div className="rounded-sm overflow-hidden col-span-3 flex flex-col space-y-2 shadow-2xl">
            <div className="overflow-hidden">
              <Image
                className="object-cover object-center"
                layout="responsive"
                width={400}
                height={300}
                src="/images/test.jpg"
              ></Image>
            </div>
            <h2 className="px-3 text-gray-800 text-lg font-bold">
              Charming Studio Miles to Wells' Beaches!
            </h2>
            <div className="px-3">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {"12$"}/night
              </h3>
              <div className="flex space-x-1 mb-2">
                <FontAwesomeIcon
                  className="w-4 text-primary"
                  icon={faStar}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                  className="w-4 text-primary"
                  icon={faStar}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                  className="w-4 text-primary"
                  icon={faStar}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                  className="w-4 text-primary"
                  icon={faStarHalfAlt}
                ></FontAwesomeIcon>
              </div>
            </div>
            <div className="w-full py-2  text-center text-white text-lg font-medium bg-primary">
              <Link href="/">View Details</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
