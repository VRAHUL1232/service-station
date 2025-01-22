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
  const [key,setKey] = useState(0)
  const [ecudata1, setEcu1] = useState(true);
  const [ecudata2, setEcu2] = useState(false);
  const [ecudata3, setEcu3] = useState(true);
  const [ecudata4, setEcu4] = useState(false);
  const [ecudata5, setEcu5] = useState(true);

  const { firebaseConfig } = useSelector(
    (state) => state.isOpen
  );
  useEffect(() => {

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    const setupRealtimeListeners = () => {
      // Users listener
      const keyRef = ref(database, 'KeyFob');
      const unsubscribeKeyFob = onValue(keyRef, (snapshot) => {
        setKey(snapshot.val());
      }, (error) => {
        console.log(error)
      });

      const ecuData1Ref = ref(database, 'SensorData/Coolant Temperature');
      const unsubscribeEcuData1 = onValue(ecuData1Ref, (snapshot) => {
        setEcu1(snapshot.val());
      }, (error) => {
        console.log(error)
      });

      const ecuData2Ref = ref(database, 'SensorData/Engine Load');
      const unsubscribeEcuData2 = onValue(ecuData2Ref, (snapshot) => {
        setEcu2(snapshot.val());
      }, (error) => {
        console.log(error)
      });

      const ecuData3Ref = ref(database, 'SensorData/Brake');
      const unsubscribeEcuData3 = onValue(ecuData3Ref, (snapshot) => {
        setEcu3(snapshot.val());
      }, (error) => {
        console.log(error)
      });

      const ecuData4Ref = ref(database, 'SensorData/Battery Level');
      const unsubscribeEcuData4 = onValue(ecuData4Ref, (snapshot) => {
        setEcu4(snapshot.val());
      }, (error) => {
        console.log(error)
      });

      const ecuData5Ref = ref(database, 'SensorData/RPM');
      const unsubscribeEcuData5 = onValue(ecuData5Ref, (snapshot) => {
        setEcu5(snapshot.val());
      }, (error) => {
        console.log(error)
      });

      return () => {
        unsubscribeKeyFob();
        unsubscribeEcuData1();
        unsubscribeEcuData2();
        unsubscribeEcuData3();
        unsubscribeEcuData4();
        unsubscribeEcuData5();
      };
    };
    return setupRealtimeListeners()
  }, []);

  const EcuDataset = [
    [],
    [true, false, false, false, true],
    [true, false, true, false, true],
    [],
    [false, false, true, true, false],
    [false, true, true, false, true],
  ];
  const ecuFinalData1 = (key==3) ? ((ecudata1 > 50) ? true : false) : EcuDataset[key][0]
  const ecuFinalData2 = (key==3) ? ((ecudata2 > 50) ? true : false) : EcuDataset[key][1] 
  const ecuFinalData3 = (key==3) ? ((ecudata3 > 50) ? true : false) : EcuDataset[key][2]
  const ecuFinalData4 = (key==3) ? ((ecudata4 > 50) ? true : false) : EcuDataset[key][3]
  const ecuFinalData5 = (key==3) ? ((ecudata5 > 50) ? true : false) : EcuDataset[key][4]
  const DynamicTable = () => {
    const data = [
      {
        id: 1,
        name: "Coolant",
        moduleNumber: "CRC-001",
        fault: "Abnormal Temperature",
        condition: (ecuFinalData1) ? "Good" : "Bad",
      },
      {
        id: 2,
        name: "Engine Load",
        moduleNumber: "CRC-701",
        fault: "Power Failure",
        condition: (ecuFinalData2) ? "Good" : "Bad",
      },
      {
        id: 3,
        name: "Brake",
        moduleNumber: "CRC-819",
        fault: "Sensor Error",
        condition: (ecuFinalData3) ? "Good" : "Bad",
      },
      {
        id: 4,
        name: "Battery",
        moduleNumber: "ERC-405",
        fault: "Battery Low",
        condition: (ecuFinalData4) ? "Good" : "Bad",
      },
      {
        id: 5,
        name: "RPM",
        moduleNumber: "CRC-506",
        fault: "Low Power",
        condition: (ecuFinalData5) ? "Good" : "Bad",
      },
    ];
  
    return (
      <div className="h-3/4 overflow-auto border border-gray-300 rounded-lg shadow-md ">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#e6deff]">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-[#460073] uppercase">
                ID
              </th>
              <th className="px-6 py-2 text-left text-sm font-medium text-[#460073] uppercase">
                Name
              </th>
              <th className="px-6 py-2 text-left text-sm font-medium text-[#460073] uppercase">
                Error Code
              </th>
              <th className="px-6 py-2 text-left text-sm font-medium text-[#460073] uppercase tracking-wider">
                Fault
              </th>
              <th className="px-6 py-2 text-left text-sm font-medium text-[#460073] uppercase tracking-wider">
                Condition
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-[#e6deff]">
                <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900 text-left">
                  {row.id}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900 text-left">
                  {row.name}
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900 text-left">
                  {row.moduleNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-left">
                  {row.fault}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm font-semibold text-left ${
                    row.condition}`}
                >
                  {row.condition}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col gap-6 p-6 bg-[#f3eded]">
      {/* Header */}
      

      {/* Main Content */}
      <div className="flex flex-row gap-6 justify-between">
        {/* <div className=""> */}
      
      <div className="w-3/4 flex flex-col gap-2">
      <h1 className="text-3xl text-black font-bold text-center">ECU Data</h1>
      <DynamicTable />
      {/* </div> */}
         </div>
   
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="flex flex-col lg:flex-row gap-6 justify-between">
            <div className="flex flex-col p-2 w-32 bg-white shadow-sm justify-center items-center gap-2">
              <img src={ecuFinalData1 ? ecu3 : ecu33} className="w-10 h-10" />
              <h1 className="text-xl font-bold">Coolant</h1>
            </div>
            <div className="flex flex-col p-2 w-32 bg-white shadow-sm justify-center items-center gap-2">
              <img src={ecuFinalData2 ? ecu2 : ecu22} className="w-10 h-10" />
              <h1 className="text-xl font-bold">Engine Load</h1>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 justify-between">
            <div className="flex flex-col p-2 w-32 bg-white shadow-sm justify-center items-center gap-2">
              <img src={ecuFinalData3 ? ecu1 : ecu11} className="w-10 h-10" />
              <h1 className="text-xl font-bold">Brake</h1>
            </div>
            <div className="flex flex-col p-2 w-32 bg-white shadow-sm justify-center items-center gap-2">
              <img src={ecuFinalData4 ? ecu4 : ecu44} className="w-10 h-10" />
              <h1 className="text-xl font-bold">RPM</h1>
            </div>
          </div>
          <div className="flex justify-center">
          <div className="flex flex-col p-2 w-32 bg-white shadow-sm justify-center items-center gap-2">
            <img src={ecuFinalData5 ? ecu5 : ecu55} className="w-10 h-10" />
            <h1 className="text-xl font-bold">Battery</h1>
          </div>
          </div>
        </div>

        {/* Right Side: Table */}
        
      </div>
    </div>
  );
}

export default EcuData;
