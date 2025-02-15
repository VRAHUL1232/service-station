import { CircleCheckBig, CircleX } from "lucide-react";
import visual1 from "/disk.jpg";
import dummy from "/dummy.jpg";
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
  const [genuine, setGenuine] = useState("True");
  const [percent, setPercent] = useState(90);
  const [key,setKey] = useState(0);
  const [isImage,setIsImage] = useState(0)
  const [isImage2,setIsImage2] = useState(0)
  const dispatch = useDispatch();

  const { firebaseConfig } = useSelector((state) => state.isOpen);
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const setupRealtimeListeners = () => {
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

      const isImageRef = ref(database, "SensorData/image");
      const unsubscribeIsImage = onValue(
        isImageRef,
        (snapshot) => {
          setIsImage(snapshot.val());
        },
        (error) => {
          console.log(error);
        }
      );

      const isImage2Ref = ref(database, "SwitchStatus/Switch Status");
      const unsubscribeIsImage2 = onValue(
        isImage2Ref,
        (snapshot) => {
          setIsImage2(snapshot.val());
        },
        (error) => {
          console.log(error);
        }
      );

      return () => {
        unsubscribeGenuine();
        unsubscribePercentage();
        unsubscribeKeyFob();
        unsubscribeIsImage();
        unsubscribeIsImage2();
      };
    };
    setupRealtimeListeners();
  }, []);

  return (
    <div className="flex flex-col h-full w-full justify-center items-center gap-6 min-h-0">
      <div className="flex flex-row justify-center">
        <h1 className="text-xl text-black font-bold">
          <span className="text-black">{(key == 0 || key==1) ? "No object Placed" :product}</span>
        </h1>
        <div className="w-8" />
        <div className="" />
        <h1 className="flex flex-row text-xl text-black font-bold">
          {(key==0 || key==1) ? "" : 
          (genuine=="True") ? (
            <span className={`text-green-400`}>
              <CircleCheckBig />
            </span>
          ) : (
            <span className={`text-red-700`}>
              <CircleX />
            </span>
          )}
          {(key==0 || key==1) ? "" :  (genuine=="True") ? (
            <span className={`text-green-400`}>Genuine</span>
          ) : (
            <span className={`text-red-700`}>Not Genuine</span>
          )}
        </h1>
      </div>
      <img
        onClick={() => dispatch(toggleOpenVisual())}
        src={ (key==0) ? dummy : visual1}
        className="h-[50%] max-h-[40rem] object-scale-down rounded-lg cursor-pointer transition hover:opacity-60"
      />
      <div className="flex justify-center ">
        <h1 className="text-xl text-black font-bold">
          Rate of Wear: <span className="text-blue-800">{(key==0 || key==1 || isImage2==0) ? "--" : percent.toFixed(2)+'%'}</span>
        </h1>
      </div>
    </div>
  );
};
