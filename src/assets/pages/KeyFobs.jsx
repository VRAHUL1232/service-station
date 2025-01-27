import { CircleUser } from "lucide-react";
import car from "/car.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleOpenTable } from "../../isOpenSlice";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";

function KeyFobs() {
  const dispatch = useDispatch();
  const [key, setKey] = useState(0);

  const { firebaseConfig } = useSelector((state) => state.isOpen);
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    const setupRealtimeListeners = () => {
      // Users listener
      const keyRef = ref(database, "KeyFob");
      const unsubscribeKeyFob = onValue(
        keyRef,
        (snapshot) => {
          setKey(snapshot.val());
        },
        (error) => {
          console.log(error);
        }
      );

      return () => {
        unsubscribeKeyFob();
      };
    };
    return setupRealtimeListeners();
  }, []);

  const dataSet = [
    {
      name: "-",
      model: "-",
      number: "-- -- -- --",
      serviceDate: "-",
      cno: "-",
      eno: "-",
      services: 0,
      year: 0,
      odometer: 0,
    },
    {
      name: "-",
      model: "-",
      number: "-- -- -- --",
      serviceDate: "-",
      cno: "-",
      eno: "-",
      services: 0,
      year: 0,
      odometer: 0,
    },
    {
      name: "JITESH",
      model: "AUDI",
      number: "TN 05 CD 9682",
      serviceDate: "2025-03-11",
      cno: "530958038038",
      eno: "830850938938",
      services: 12,
      year: 2001,
      odometer: 9967,
    },
    {
      name: "V KISHORE",
      model: "TATA",
      number: "TN 22 AM 2032",
      serviceDate: "2025-10-29",
      cno: "987349593794379",
      eno: "573975793793",
      services: 16,
      year: 1980,
      odometer: 74567,
    },
    {
      name: "DIWAKAR",
      model: "BENZ",
      number: "TN 03 NX 7321",
      serviceDate: "2025-09-01",
      cno: "098535893484",
      eno: "340580480380",
      services: 14,
      year: 1987,
      odometer: 23456,
    },
    {
      name: "MADHAN",
      model: "FERRARI",
      number: "TN 19 MO 9989",
      serviceDate: "2025-04-22",
      cno: "8308340805003",
      eno: "3850803580343",
      services: 13,
      year: 1999,
      odometer: 34543,
    },
  ];

  function getDateDifference(date1) {
    const d1 = new Date(date1);
    const d2 = Date.now();
    const diffInMs = Math.abs(d2 - d1);
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    return diffInDays;
  }

  return (
    <div className="w-full h-full bg-[#f3eded] flex flex-col gap-3 justify-between p-4">
      {/* Header Section */}
      <div className="relative flex items-center justify-between">
        {/* Key Fobs Header */}
        <h1 className="text-3xl w-full flex-1 text-black font-bold text-center ">
          Vehicle Data
        </h1>

        {/* Next Service Alert */}
        <div className="rounded-md bg-[#dcafff] shadow-md text-black flex p-2">
          <div className="flex flex-col gap-0">
            <div className="flex flex-row gap-1 items-center">
              <img src="./image.png" className="w-7 h-7" />
              <h1 className="text-md font-semibold">
                {getDateDifference(dataSet[key]["serviceDate"])} Days left!
              </h1>
            </div>
            <div className="flex flex-row gap-1">
              <h1 className="text-md font-semibold">Next Service:</h1>
              <h1 className="text-md">{dataSet[key]["serviceDate"]}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-row justify-between items-center">
        {/* Left-aligned Section: Engine Number, Car Number Plate, Chassis Number */}
        <div className="h-full flex flex-col justify-evenly items-start">
          {/* Car Number Plate */}
          <div className="flex flex-row gap-3 items-center">
            <div className="w-auto h-auto py-1 px-3 flex items-center justify-center bg-gradient-to-b from-green-300 to-green-200 text-black font-bold rounded-full">
              N
            </div>
            <h1 className="text-xl font-semibold text-black">
              <span className="font-bold">Number Plate:</span>{" "}
              <span className="border-2 px-2 py-0.5 border-gray-500">
                {dataSet[key]["number"]}
              </span>
            </h1>
          </div>

          {/* Chassis Number */}
          <div className="flex flex-row gap-3 items-center">
            <div className="flex items-center py-1 px-3 justify-center bg-gradient-to-r from-purple-300 to-purple-200 text-black font-bold rounded-full">
              C
            </div>
            <h1 className="text-xl font-semibold text-black">
              <span className="font-bold">Chassis Number:</span>{" "}
              {dataSet[key]["cno"]}
            </h1>
          </div>

          {/* Engine Number */}
          <div className="flex flex-row gap-3 items-center ">
            <div className="flex  py-1 px-3 items-center justify-center bg-gradient-to-r from-blue-300 to-blue-200 text-black font-bold rounded-full">
              E
            </div>
            <h1 className="text-xl font-semibold text-black">
              <span className="font-bold">Engine Number:</span>{" "}
              {dataSet[key]["eno"]}
            </h1>
          </div>
        </div>

        {/* Right-aligned Section: Car Owner, Car Name, Service History Button */}
        <div className="h-full w-1/3 justify-evenly flex flex-col items-end">
          {/* Car Owner */}
          <div className="flex items-center justify-end">
            <CircleUser className="w-7 h-7 text-black border-2 border-black rounded-full" />
            <div className="w-2"></div>
            <h1 className="text-xl font-semibold text-black">
              <span className="font-bold">Owner:</span> {dataSet[key]["name"]}
            </h1>
          </div>

          {/* Car Name */}
          <div className="flex items-center justify-end">
            <img
              src={car}
              alt="Car"
              className="w-7 h-7 bg-white border-2 border-black rounded-lg"
            />
            <div className="w-2"></div>
            <h1 className="text-xl font-semibold text-black">
              <span className="font-bold">Model:</span> {dataSet[key]["model"]}
            </h1>
          </div>

          {/* Service History Button */}
          <div
            className="flex flex-row justify-center w-2/3 py-1 rounded-md bg-[#7500c0] text-white text-center cursor-pointer hover:bg-[#dcafff] hover:text-black transition shadow-md shadow-stone-700"
            onClick={() => {
              dispatch(toggleOpenTable());
            }}
          >
            <h1 className="text-md font-semibold ">Service History</h1>
          </div>
        </div>
      </div>

      {/* Key Info Boxes */}
      <div className="flex flex-row h-[30%] justify-center gap-5">
        <div className="bg-gradient-to-b from-pink-200 via-white to-pink-50 shadow-lg rounded-lg w-full text-center flex flex-col justify-center items-center">
          <img
            src="./machine.png"
            alt="Manufacture Year"
            className="w-atuto h-1/4"
          />
          <h1 className="text-lg font-bold text-gray-600">Manufacture Year</h1>
          <h1 className="text-xl font-bold text-black">
            {dataSet[key]["year"]}
          </h1>
        </div>
        <div className="bg-gradient-to-b from-blue-200 via-white to-blue-50 shadow-lg rounded-lg w-full text-center flex flex-col justify-center items-center">
          <img src="./odometer.png" alt="Total KM" className="w-auto h-1/4" />
          <h1 className="text-lg font-bold text-gray-600">Total KM</h1>
          <h1 className="text-xl font-bold text-black">
            {dataSet[key]["odometer"]}
          </h1>
        </div>
        <div className="bg-gradient-to-b from-green-200 via-white to-green-50 shadow-lg rounded-lg  w-full text-center flex flex-col justify-center items-center">
          <img
            src="./service.png"
            alt="Total Services"
            className="w-auto h-1/4 "
          />
          <h1 className="text-lg font-bold text-gray-600">Total Services</h1>
          <h1 className="text-xl font-bold text-black">
            {dataSet[key]["services"]}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default KeyFobs;
