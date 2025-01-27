import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDatabase, onValue, ref } from "firebase/database";
import { initializeApp } from "firebase/app";
import ecu1 from "/brake.png";
import ecu2 from "/pollution.png";
import ecu3 from "/exhaust-fan.png";
import ecu4 from "/combustion.png";
import ecu5 from "/car-battery.png";
import ecu11 from "/brake2.png";
import ecu22 from "/pollution2.png";
import ecu33 from "/exhaust-fan2.png";
import ecu44 from "/combustion2.png";
import ecu55 from "/car-battery2.png";
function EcuData() {
  const [key, setKey] = useState(2);
  const [ecudata1, setEcu1] = useState(true);
  const [ecudata2, setEcu2] = useState(false);
  const [ecudata3, setEcu3] = useState(true);
  const [ecudata4, setEcu4] = useState(false);
  const [ecudata5, setEcu5] = useState(true);

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

      const ecuData1Ref = ref(database, "SensorData/Coolant Temperature");
      const unsubscribeEcuData1 = onValue(
        ecuData1Ref,
        (snapshot) => {
          setEcu1(snapshot.val());
        },
        (error) => {
          console.log(error);
        }
      );

      const ecuData2Ref = ref(database, "SensorData/Engine Load");
      const unsubscribeEcuData2 = onValue(
        ecuData2Ref,
        (snapshot) => {
          setEcu2(snapshot.val());
        },
        (error) => {
          console.log(error);
        }
      );

      const ecuData3Ref = ref(database, "SensorData/Brake");
      const unsubscribeEcuData3 = onValue(
        ecuData3Ref,
        (snapshot) => {
          setEcu3(snapshot.val());
        },
        (error) => {
          console.log(error);
        }
      );

      const ecuData4Ref = ref(database, "SensorData/Battery Level");
      const unsubscribeEcuData4 = onValue(
        ecuData4Ref,
        (snapshot) => {
          setEcu4(snapshot.val());
        },
        (error) => {
          console.log(error);
        }
      );

      const ecuData5Ref = ref(database, "SensorData/RPM");
      const unsubscribeEcuData5 = onValue(
        ecuData5Ref,
        (snapshot) => {
          setEcu5(snapshot.val());
        },
        (error) => {
          console.log(error);
        }
      );

      return () => {
        unsubscribeKeyFob();
        unsubscribeEcuData1();
        unsubscribeEcuData2();
        unsubscribeEcuData3();
        unsubscribeEcuData4();
        unsubscribeEcuData5();
      };
    };
    return setupRealtimeListeners();
  }, []);

  const EcuDataset = [
    [true,true,true,true,true],
    [true, true, true, true, true],
    [true, false, true, false, true],
    [],
    [false, false, true, true, false],
    [false, true, true, false, true],
  ];
  const ecuFinalData1 =
    key == 3 ? (ecudata1 < 50 ? true : false) : EcuDataset[key][0];
  const ecuFinalData2 =
    key == 3 ? (ecudata2 < 50 ? true : false) : EcuDataset[key][1];
  const ecuFinalData3 =
    key == 3 ? (ecudata3 < 50 ? true : false) : EcuDataset[key][2];
  const ecuFinalData4 =
    key == 3 ? (ecudata4 < 50 ? true : false) : EcuDataset[key][3];
  const ecuFinalData5 =
    key == 3 ? (ecudata5 < 50 ? true : false) : EcuDataset[key][4];
  const DynamicTable = () => {
    const data = [
      {
        id: 1,
        name: "Coolant",
        moduleNumber: ecuFinalData1 ? "--" : "CRC-001",
        fault: ecuFinalData1 ? "No Fault" : "Abnormal Temperature",
        condition: ecuFinalData1 ? "Good" : "Bad",
      },
      {
        id: 2,
        name: "Engine Load",
        moduleNumber: ecuFinalData2 ? "--" : "CRC-701",
        fault: ecuFinalData2 ? "No Fault" : "Power Failure",
        condition: ecuFinalData2 ? "Good" : "Bad",
      },
      {
        id: 3,
        name: "Brake",
        moduleNumber: ecuFinalData3 ? "--" : "CRC-819",
        fault: ecuFinalData3 ? "No Fault" : "Sensor Error",
        condition: ecuFinalData3 ? "Good" : "Bad",
      },
      {
        id: 4,
        name: "Battery",
        moduleNumber: ecuFinalData4 ? "--" : "ERC-405",
        fault: ecuFinalData4 ? "No Fault" : "Battery Low",
        condition: ecuFinalData4 ? "Good" : "Bad",
      },
      {
        id: 5,
        name: "RPM",
        moduleNumber: ecuFinalData5 ? "--" :"CRC-506",
        fault: ecuFinalData5 ? "No Fault" : "Low Power",
        condition: ecuFinalData5 ? "Good" : "Bad",
      },
    ];

    return (
      <div className="h-auto w-full overflow-auto border-1 border-gray-300  rounded-lg ">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-[#e6deff]">
            <tr>
              <th className="px-4 py-4 w-[10%]  text-left text-md font-medium text-[#460073] uppercase">
                ID
              </th>
              <th className="px-4 py-4 w-[20%]  text-left text-md font-medium text-[#460073] uppercase">
                Name
              </th>
              <th className="px-4 py-4 w-[30%]  text-left text-md font-medium text-[#460073] uppercase">
                Error Code
              </th>
              <th className="px-4 py-4 w-[30%]  text-left text-md font-medium text-[#460073] uppercase tracking-wider">
                Fault
              </th>
              <th className="px-4 py-4 w-[10%]  text-left text-md font-medium text-[#460073] uppercase tracking-wider">
                Condition
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-[#e6deff]">
                <td className="px-4 py-4 whitespace-nowrap text-md text-gray-900 text-left">
                  {row.id}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-md text-gray-900 text-left">
                  {row.name}
                </td>
                <td className={`px-4 py-4 whitespace-nowrap text-md text-gray-900 text-center`}>
                  {( row.moduleNumber)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-md text-gray-900 text-left">
                  {row.fault}
                </td>
                <td
                  className={`px-4 py-4 whitespace-nowrap text-md font-semibold text-center ${row.condition=="Bad" ? `text-red-500` : `text-green-500` }`}
                >
                  {(row.condition)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // return (
  //   <div className="h-full w-full flex flex-col justify-between gap-2 p-6 bg-[#f3eded]">
  //     {/* Header */}
  //     <h1 className="text-3xl text-black font-bold text-center">ECU Data</h1>

  //     {/* Main Content */}
  //     <div className="w-full h-full flex flex-row justify-between bg-black">
  //       {/* <div className=""> */}

  //       <DynamicTable/>

  //       <div className="w-[30%] h-full flex flex-col justify-evenly items-center">
  //         <div className="flex flex-row w-full justify-evenly">
  //           <div className="h-full flex flex-col p-2 w-auto bg-white shadow-sm justify-center items-center gap-2">
  //             <img src={ecuFinalData1 ? ecu3 : ecu33} className="w-10 h-10" />
  //             {/* <h1 className="text-md font-bold">Coolant</h1> */}
  //           </div>
  //           <div className="h-full flex flex-col p-2 w-auto bg-white shadow-sm justify-center items-center gap-2">
  //             <img src={ecuFinalData2 ? ecu2 : ecu22} className="w-10 h-10" />
  //             {/* <h1 className="text-md font-bold">Engine Load</h1> */}
  //           </div>
  //         </div>

  //         <div className="flex flex-row w-full justify-evenly">
  //           <div className="h-full flex flex-col p-2 w-auto bg-white shadow-sm justify-center items-center gap-2">
  //             <img src={ecuFinalData3 ? ecu1 : ecu11} className="w-10 h-10" />
  //             {/* <h1 className="text-md font-bold">Brake</h1> */}
  //           </div>
  //           <div className="h-full flex flex-col p-2 w-auto bg-white shadow-sm justify-center items-center gap-2">
  //             <img src={ecuFinalData4 ? ecu4 : ecu44} className="w-10 h-10" />
  //             {/* <h1 className="text-md font-bold">RPM</h1> */}
  //           </div>
  //         </div>
  //         <div className="flex flex-row w-full justify-center">
  //           <div className="h-full flex flex-col p-2 w-auto bg-white shadow-sm justify-center items-center gap-2">
  //             <img src={ecuFinalData5 ? ecu5 : ecu55} className="w-10 h-10" />
  //             {/* <h1 className="text-md font-bold">Battery</h1> */}
  //           </div>
  //         </div>
  //       </div> 
  //     </div>
  //   </div>
  // );
  return (
    <div className="h-full w-full flex flex-col gap-2 p-6 bg-[#f3eded]">
      {/* Header */}
      <h1 className="text-3xl text-black font-bold text-center">ECU Data</h1>
  
      {/* Main Content */}
      <div className="flex-1 w-full flex flex-row justify-between  min-h-0">
        {/* Table Container */}
        <div className="flex-1 overflow-auto shadow-lg border  border-zinc-400 rounded-lg"> 
          <DynamicTable/>
        </div>
        <div className="w-[30%] flex flex-col justify-between items-center px-4">
          <div className="flex flex-row w-full h-[30%] justify-evenly">
            <div className="flex flex-col w-full h-full justify-center items-center">
              <img src={ecuFinalData1 ? ecu3 : ecu33} className="h-3/4" />
              <h1 className="text-sm" >Coolant</h1>
            </div>
            <div className="flex flex-col w-full h-full justify-center items-center">
              <img src={ecuFinalData2 ? ecu2 : ecu22} className="h-3/4" />
              <h1 className="text-sm" >Engine Load</h1>
            </div>
          </div>
  
          <div className="flex flex-row h-[30%] w-full justify-evenly">
            <div className="flex flex-col  w-full h-full justify-center items-center ">
              <img src={ecuFinalData3 ? ecu1 : ecu11} className="h-3/4" />
              <h1 className="text-sm" >Brake</h1>
            </div>
            <div className="flex flex-col  w-full h-full justify-center items-center">
              <img src={ecuFinalData5 ? ecu4 : ecu44} className="h-3/4" />
              <h1 className="text-sm" >RPM</h1>
            </div>
          </div>
          <div className="flex flex-row h-[30%] w-full justify-center">
            <div className="flex flex-col  w-full h-full justify-center items-center">
              <img src={ecuFinalData4 ? ecu5 : ecu55} className="h-3/4" />
              <h1 className="text-sm" >Battery</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EcuData;
