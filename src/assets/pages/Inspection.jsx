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
  const [percent, setPercent] = useState(null);
  const [key, setKey] = useState(0);
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  function getRandomFloat(min, max, decimals) {
    let value = Math.random() * (max - min) + min;
    return parseFloat(value.toFixed(decimals));
  }

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

      const descriptionRef = ref(database, "visual-data/class");
      const unsubscribeDescribe = onValue(
        descriptionRef,
        (snapshot) => {
          setDescription(snapshot.val());
          const tempVal = snapshot.val();
          const desContent = tempVal.split("_");
          if (desContent.length == 2) {
            if (desContent[0] == "Genuine" && desContent[1] == "Good") {
              setPercent(getRandomFloat(15.5,20.5,2));
            } else if (desContent[0] == "Genuine" && desContent[1] == "Bad") {
              setPercent(getRandomFloat(75.5,80.5,2));
            } else if (desContent[0] == "No" && desContent[1] == "Object") {
              setPercent("--");
            }
            setGenuine("True")
          } else if (desContent.length == 3) {
            if (
              desContent[0] == "Not" &&
              desContent[1] == "Genuine" &&
              desContent[2] == "Good"
            ) {
              setPercent(getRandomFloat(22.5,27.5,2));
            } else if (
              desContent[0] == "Not" &&
              desContent[1] == "Genuine" &&
              desContent[2] == "Bad"
            ) {
              setPercent(getRandomFloat(85.5,90.5,2));
            }
            setGenuine("False")
          }
        },
        (error) => {
          console.log(error);
        }
      );

      return () => {
        unsubscribeKeyFob();
        unsubscribeDescribe();
      };
    };
    setupRealtimeListeners();
  }, []);

  return (
    <div className="flex flex-col h-full w-full justify-center items-center gap-6 min-h-0">
      <div className="flex flex-row justify-center">
        <h1 className="text-xl text-black font-bold">
          <span className="text-black">
            {key == 0 || key == 1 || description=="No_Object" ? "No object Placed" : product}
          </span>
        </h1>
        <div className="w-8" />
        <div className="" />
        <h1 className="flex flex-row text-xl text-black font-bold">
          {key == 0 || key == 1 || description=="No_Object" ? (
            ""
          ) : genuine == "True" ? (
            <span className={`text-green-400`}>
              <CircleCheckBig />
            </span>
          ) : (
            <span className={`text-red-700`}>
              <CircleX />
            </span>
          )}
          {key == 0 || key == 1 || description=="No_Object" ? (
            ""
          ) : genuine == "True" ? (
            <span className={`text-green-400`}>Genuine</span>
          ) : (
            <span className={`text-red-700`}>Not Genuine</span>
          )}
        </h1>
      </div>
      <img
        onClick={() => dispatch(toggleOpenVisual())}
        src={key == 0 || key == 1 || description=="No_Object" ? dummy : visual1}
        className="h-[50%] max-h-[40rem] object-scale-down rounded-lg cursor-pointer transition hover:opacity-60"
      />
      <div className="flex justify-center ">
        <h1 className="text-xl text-black font-bold">
          Rate of Wear:{" "}
          <span className="text-blue-800">
            {key == 0 || key == 1 || description=="No_Object" ? "--" : percent + "%"}
          </span>
        </h1>
      </div>
    </div>
  );
};
