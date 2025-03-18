import "./index.css";
import dummy from "/dummy.jpg"
import KeyFobs from "./assets/pages/KeyFobs";
import ScratchCard from "./assets/pages/ScratchCard";
import Inspection from "./assets/pages/Inspection";
import EcuData from "./assets/pages/EcuData";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleOpenVisual,
  toggleOpenImage,
  toggleOpenTable,
} from "./isOpenSlice";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";

function App() {
  const { isOpenImage, isOpenVisual, isOpenTable, dentImageId } = useSelector(
    (state) => state.isOpen
  );
  const dispatch = useDispatch();

  const [key, setKey] = useState(0);
  const [leftToken,setLeftToken] = useState("")
  const [rightToken,setRightToken] = useState("")
  const [topToken,setTopToken] = useState("")
  const [diskToken,setDiskToken] = useState("")
  const leftUrl = `https://firebasestorage.googleapis.com/v0/b/chat-app-ae7f9.appspot.com/o/car-images%2Fprocessed_annotated_frame_0.jpg?alt=media&token=${leftToken}`;
  const topUrl = `https://firebasestorage.googleapis.com/v0/b/chat-app-ae7f9.appspot.com/o/car-images%2Fprocessed_annotated_frame_2.jpg?alt=media&token=${topToken}`;
  const rightUrl = `https://firebasestorage.googleapis.com/v0/b/chat-app-ae7f9.appspot.com/o/car-images%2Fprocessed_annotated_frame_1.jpg?alt=media&token=${rightToken}`;
  const diskUrl = `https://firebasestorage.googleapis.com/v0/b/chat-app-ae7f9.appspot.com/o/inspection-images%2Fprocessed_annotated_frame1.jpg?alt=media&token=${diskToken}`
    const { firebaseConfig } = useSelector((state) => state.isOpen);

    const fetchData = async () => {
      try {
        const leftResponse = await fetch(
          "https://firebasestorage.googleapis.com/v0/b/chat-app-ae7f9.appspot.com/o/car-images%2Fprocessed_annotated_frame_0.jpg"
        );
        if (!leftResponse.ok) {
          throw new Error("Network was not ok");
        }
        const resultLeft = await leftResponse.json();
    
        const topResponse = await fetch(
          "https://firebasestorage.googleapis.com/v0/b/chat-app-ae7f9.appspot.com/o/car-images%2Fprocessed_annotated_frame_2.jpg"
        );
        if (!topResponse.ok) {
          throw new Error("Network was not ok");
        }
        const resultTop = await topResponse.json();
    
        const rightResponse = await fetch(
          "https://firebasestorage.googleapis.com/v0/b/chat-app-ae7f9.appspot.com/o/car-images%2Fprocessed_annotated_frame_1.jpg"
        );
        if (!rightResponse.ok) {
          throw new Error("Network was not ok");
        }
        const resultRight = await rightResponse.json();
    
        const visualResponse = await fetch(
          "https://firebasestorage.googleapis.com/v0/b/chat-app-ae7f9.appspot.com/o/inspection-images%2Fprocessed_annotated_frame1.jpg"
        );
        if (!visualResponse.ok) {
          throw new Error("Network was not ok");
        }
        const resultVisual = await visualResponse.json();
    
        setLeftToken(resultLeft.downloadTokens);
        setTopToken(resultTop.downloadTokens);
        setRightToken(resultRight.downloadTokens);
        setDiskToken(resultVisual.downloadTokens);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        console.log("Fetch operation complete.");
      }
    };
    
    useEffect(()=>{
    },[leftToken])
    

    useEffect(() => {
      const app = initializeApp(firebaseConfig);
      const database = getDatabase(app);

      const setupRealtimeListeners = () => {
        // Users listener
        const keyRef = ref(database, "KeyFob");
        const unsubscribeKeyFob = onValue(
          keyRef,
          (snapshot) => {
            setKey(() => {
              return snapshot.val()
            });
          },
          (error) => {
            console.log(error);
          }
        );
       
        return () => {
          unsubscribeKeyFob();
        };

      };

      const interval = setInterval(() => {
        fetchData();
      }, 5000)

      setupRealtimeListeners();

      return () => {
        clearInterval(interval); 
        setupRealtimeListeners();
      };
    }, []);

  const invoices = [
    {
      id: "INV-001",
      name: dataSet[key]['name'],
      status: "Pending",
      invoiceDate: "2025-01-15",
      vehicle: dataSet[key]['model'],
      plate: dataSet[key]['number'],
      totalAmount: 1500.0,
      paidAmount: 1200.0,
    },
    {
      id: "INV-002",
      name: dataSet[key]['name'],
      status: "Paid",
      invoiceDate: "2024-11-18",
      vehicle: dataSet[key]['model'],
      plate: dataSet[key]['number'],
      totalAmount: 3000.0,
      paidAmount: 3000.0,
    },
    {
      id: "INV-003",
      name: dataSet[key]['name'],
      status: "Paid",
      invoiceDate: "2024-06-29",
      vehicle: dataSet[key]['model'],
      plate: dataSet[key]['number'],
      totalAmount: 10000.0,
      paidAmount: 10000.0,
    },
    {
      id: "INV-004",
      name: dataSet[key]['name'],
      status: "Paid",
      invoiceDate: "2024-01-15",
      vehicle: dataSet[key]['model'],
      plate: dataSet[key]['number'],
      totalAmount: 20000.0,
      paidAmount: 20000.0,
    },
    {
      id: "INV-005",
      name: dataSet[key]['name'],
      status: "Paid",
      invoiceDate: "2023-11-11",
      vehicle: dataSet[key]['model'],
      plate: dataSet[key]['number'],
      totalAmount: 17500.0,
      paidAmount: 17500.0,
    },
  ];

  const getStatusColor = (status) => {
    const statusColors = {
      Paid: "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Overdue: "bg-red-100 text-red-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const ServiceTable = () => {
    return (
      <div className="w-full">
        <div className="rounded-md border flex flex-col border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-lg text-black font-bold">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-lg text-black font-bold">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-lg text-black font-bold">
                  Invoice Date
                </th>
                <th className="px-4 py-3 text-left text-lg text-black font-bold">
                  Vehicle
                </th>
                <th className="px-4 py-3 text-left text-lg text-black font-bold">
                  Plate
                </th>
                <th className="px-4 py-3 text-left text-lg text-black font-bold">
                  Total Amount
                </th>
                <th className="px-4 py-3 text-left text-lg text-black font-bold">
                  Paid Amount
                </th>
                <th className="px-4 py-3 text-left text-lg text-black font-bold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 font-semibold text-gray-600">
                    {invoice.id}
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-600">
                    {invoice.name}
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-600">
                    {formatDate(invoice.invoiceDate)}
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-600">
                    {invoice.vehicle}
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-600">
                    {invoice.plate}
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-600">
                    &#8377;{invoice.totalAmount}.00
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-600">
                    &#8377;{invoice.paidAmount}.00
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(
                        invoice.status
                      )}`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <>
    <div className="flex flex-col bg-[#460073] h-screen w-full justify-center">
      {/* <div>
        <div className="absolute top-0 left-0 flex flex-col w-28 pl-2 pt-2 justify-center items-start rounded-full">
          <img src={logo} className="w-full h-8" />
        </div>
      </div>   */}

      {isOpenImage && (
        <>
          <div className="z-50 bg-black bg-opacity-50">
            <div className="absolute left-[12%] top-[12%] mt-2 bg-white rounded-lg shadow-lg p-8 border border-gray-200 w-3/4 h-3/4">
              <div className="flex flex-col gap-10 w-full h-full justify-between items-center">
                <h3 className="text-3xl justify-center font-bold mb-2">
                  {dentImageId == 1 && `Left View`}
                  {dentImageId == 2 && `Top View`}
                  {dentImageId == 3 && `Right View`}
                </h3>
                {dentImageId == 1 && (
                  <img src={(key==0 || key==1) ? dummy :leftUrl} className="w-3/5 h-3/5 rounded-lg" />
                )}
                {dentImageId == 2 && (
                  <img src={(key==0 || key==1) ? dummy :topUrl} className="w-3/5 h-3/5 rounded-lg " />
                )}
                {dentImageId == 3 && (
                  <img src={(key==0 || key==1) ? dummy :rightUrl} className="w-3/5 h-3/5 rounded-lg" />
                )}
                <button
                  onClick={() => dispatch(toggleOpenImage())}
                  className="mt-4 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {isOpenVisual && (
        <>
          <div className="z-50 bg-black bg-opacity-50">
            <div className="absolute left-[12%] top-[12%] mt-2 bg-white rounded-lg shadow-lg p-8 border border-gray-200 w-3/4 h-3/4">
              <div className="flex flex-col gap-10 w-full h-full justify-between items-center">
                <h3 className="text-3xl justify-center font-bold mb-2">
                  Visual Inspection Images
                </h3>
                <img src={(key==0 || key==1) ? dummy :diskUrl} className="w-2/5 h-3/5 rounded-lg " />

                <button
                  onClick={() => dispatch(toggleOpenVisual())}
                  className="mt-4 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {isOpenTable && (
        <>
          <div className="z-50 bg-black bg-opacity-50">
            <div className="absolute left-[12%] top-[12%] mt-2 bg-white rounded-lg shadow-lg p-8 border border-gray-200 w-3/4 h-3/4">
              <div className="flex flex-col gap-10 w-full h-full justify-between items-center">
                <div className="flex flex-col justify-center items-center gap-8 w-full">
                  <h1 className="text-3xl justify-center font-bold mb-2">
                    Service History
                  </h1>
                  {key==0 ? <h1>No Result</h1> : <ServiceTable />}
                </div>
                <button
                  onClick={() => dispatch(toggleOpenTable())}
                  className="mt-4 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="flex flex-col h-screen w-full p-6 gap-3">
        {/* First Row - KeyFobs and ScratchCard */}
        <div className="flex flex-row justify-center h-[55%] gap-3">
          {/* KeyFobs (takes 50% on small screens, 25% on larger screens) */}
          <div className="h-full w-[55%] justify-center">
            <KeyFobs />
          </div>

          {/* ScratchCard (takes 50% on small screens, 25% on larger screens) */}
          <div className="h-full items-center justify-center w-[45%]">
            <ScratchCard />
          </div>
        </div>

        <div className="flex flex-row justify-center h-[45%] gap-3">
          <div className="h-auto justify-center w-[65%]">
            <EcuData />
          </div>

          <div className="h-full justify-center w-[35%]">
            <Inspection />
          </div>
        </div>
      </div>
     
    </div>
     </>
  );
}

export default App;

const dataSet = [
  {},
  {
    name: "V RAHUL",
    model: "BMW",
    number: "TN 09 AD 7651",
    serviceDate: "2025-08-21",
    cno: "987349593794379",
    eno: "573975793793",
    services: 10,
    year: 1997,
    odometer: 10000,
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