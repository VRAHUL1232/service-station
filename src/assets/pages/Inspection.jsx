import { CircleCheckBig, CircleX } from "lucide-react";
import visual1 from "/disk.jpg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";
import { toggleOpenVisual } from "../../isOpenSlice";

function Inspection() {
  return (
    <div className="flex flex-col p-4 bg-[#f3eded] h-full justify-start items-center gap-4">
      <h1 className=" text-3xl justify-center font-bold ">Visual Inspection</h1>
      <TableComponent />
    </div>
  );
}

export default Inspection;

const TableComponent = () => {
  const product = "Disk Brake";
  const [genuine, setGenuine] = useState(true);
  const [percent, setPercent] = useState(90);
  const dispatch = useDispatch();
  const { firebaseConfig } = useSelector((state) => state.isOpen);
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const setupRealtimeListeners = () => {
      const genuineRef = ref(database, "visual-data/genuine");
      const unsubscribeGenuine = onValue(
        genuineRef,
        (snapshot) => {
          setGenuine(snapshot.val());
        },
        (error) => {
          console.log(error);
        }
      );

      const percentRef = ref(database, "visual-data/percentage");
      const unsubscribePercentage = onValue(
        percentRef,
        (snapshot) => {
          setPercent(snapshot.val());
        },
        (error) => {
          console.log(error);
        }
      );

      return () => {
        unsubscribeGenuine();
        unsubscribePercentage();
      };
    };
    setupRealtimeListeners();
  }, []);

  return (
    <div className="flex flex-col h-full w-full justify-start items-center gap-6">
      <div className="flex flex-row justify-center">
        <h1 className="text-xl text-black font-bold">
          <span className="text-black">{product}</span>
        </h1>
        <div className="w-8" />
        <div className="" />
        <h1 className="flex flex-row items-center text-xl text-black font-bold">
          {genuine ? (
            <span className={`text-green-400`}>
              <CircleCheckBig />
            </span>
          ) : (
            <span className={`text-red-700`}>
              <CircleX />
            </span>
          )}
          {genuine ? (
            <span className={`text-green-400`}>Genuine</span>
          ) : (
            <span className={`text-red-700`}>Not Genuine</span>
          )}
        </h1>
      </div>
      <img
        onClick={() => dispatch(toggleOpenVisual())}
        src={visual1}
        className="w-[40%] h-[50%] border-white cursor-pointer"
      />
      <div className="flex flex-col justify-center gap-4 items-center">
        <h1 className="text-xl text-black font-bold">
          Wear and Tear: <span className="text-blue-800">{percent}%</span>
        </h1>
      </div>
    </div>
  );
};
