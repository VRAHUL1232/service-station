import img1 from "/second2.png";
import img3 from "/third2.png";
import img5 from "/fourth2.png";
import { FaRegImage } from "react-icons/fa";
import { setDentImageId, toggleOpenImage } from "../../isOpenSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

function ScratchCard() {
  const dispatch = useDispatch();
  const [leftScratch, setLeftScratch] = useState(null);
  const [leftDent, setLeftDent] = useState(null);
  const [rightScratch, setRightScratch] = useState(null);
  const [rightDent, setRightDent] = useState(null);
  const [topScratch, setTopScratch] = useState(null);
  const [topDent, setTopDent] = useState(null);
  const { firebaseConfig } = useSelector((state) => state.isOpen);

  const [key, setKey] = useState(0);
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const setupRealtimeListeners = () => {
      // Users listener
      const leftScratchRef = ref(database, "scratch-dent/left-scratch");
      const unsubscribeLeftScratch = onValue(
        leftScratchRef,
        (snapshot) => {
          setLeftScratch(snapshot.val());
        },
        (error) => {
          console.log(error);
        }
      );

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

      const leftDentRef = ref(database, "scratch-dent/left-dent");
      const unsubscribeLeftDent = onValue(
        leftDentRef,
        (snapshot) => {
          setLeftDent(snapshot.val());
        },
        (error) => {
          console.log(error);
        }
      );

      const rightScratchRef = ref(database, "scratch-dent/right-scratch");
      const unsubscribeRigthScratch = onValue(
        rightScratchRef,
        (snapshot) => {
          setRightScratch(snapshot.val());
        },
        (error) => {
          console.log(error);
        }
      );

      const rightDentRef = ref(database, "scratch-dent/right-dent");
      const unsubscribeRightDent = onValue(
        rightDentRef,
        (snapshot) => {
          setRightDent(snapshot.val());
        },
        (error) => {
          console.log(error);
        }
      );

      const topDentRef = ref(database, "scratch-dent/top-dent");
      const unsubscribeTopDent = onValue(
        topDentRef,
        (snapshot) => {
          setTopDent(snapshot.val());
        },
        (error) => {
          console.log(error);
        }
      );

      const topScratchRef = ref(database, "scratch-dent/top-scratch");
      const unsubscribeTopScratch = onValue(
        topScratchRef,
        (snapshot) => {
          setTopScratch(snapshot.val());
        },
        (error) => {
          console.log(error);
        }
      );

      return () => {
        // Cleanup listeners
        unsubscribeKeyFob();
        unsubscribeLeftScratch();
        unsubscribeTopDent();
        unsubscribeTopScratch();
        unsubscribeRightDent();
        unsubscribeRigthScratch();
        unsubscribeLeftDent();
      };
    };
    return setupRealtimeListeners();
  }, []);

  const PopupButton = ({ id }) => {
    return (
      <div className="relative">
        <button
          onClick={() => {
            dispatch(toggleOpenImage());
            dispatch(setDentImageId(id));
          }}
          className="p-2 bg-gray-600 rounded-full transition text-white hover:text-white shadow-md shadow-zinc-700 hover:bg-gray-400"
        >
           <FaRegImage size={25} />
        </button>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col justify-between items-center p-6 bg-[#f3eded]">
      <h1 className="flex text-3xl text-black justify-center font-bold">
        Scratch & Dent Analysis
      </h1>
      <div className="w-full h-auto flex flex-row items-center justify-between">
        <div className="flex flex-col justify-start items-center w-full h-full">
          <PopupButton id={1} />
          <div className="flex flex-row w-full h-full">
            <div className="flex flex-col items-center justify-center w-auto">
              <div className="flex flex-col">
                <h4>
                  <span className="text-[#a100ff] font-bold">{(key==0 || key==1) ? 0 :leftDent}D</span>{" "}
                  <span className="text-[#0041f0] font-bold">
                    {(key==0 || key==1) ? 0 :leftScratch}S
                  </span>
                </h4>
              </div>
            </div>
            <ArrowLineLeft />
          </div>
        </div>

        <div className="flex flex-col w-2/4 h-auto">
          <img src={img1} className="w-full h-auto" alt="Image 1" />
        </div>

        <div className="flex flex-col justify-center items-center w-2/3 h-auto">
          <div className="flex flex-row justify-center w-full h-auto">
            <div className="flex flex-row justify-between">
              <h4>
                <span className="text-[#a100ff] font-bold">{(key==0 || key==1) ? 0 :  rightDent}D</span>{" "}
                <span className="text-[#0041f0] font-bold">{(key==0 || key==1) ? 0 :rightScratch}S</span>
              </h4>
            </div>
          </div>

          <img src={img3} className="w-2/3 h-full" alt="Image 3" />
          <div className="h-2" />
          <PopupButton id={2} />
        </div>

        <div className="flex flex-col w-2/4 h-auto">
          <img src={img5} className="w-full h-auto" alt="Image 5" />
        </div>

        <div className="flex flex-col justify-between items-center w-full h-full">
          <PopupButton id={3} />
          <div className="flex flex-row  w-full h-full">
            <ArrowLine />
            <div className="flex flex-col justify-center">
              <h4>
                <span className="text-[#a100ff] font-bold">{(key==0 || key==1) ? 0 :topDent}D</span>{" "}
                <span className="text-[#0041f0] font-bold">
                  {topScratch}S
                </span>
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between w-full font-bold text-xl">
        <div className="flex flex-row gap-3 justify-center">
          <h4 className="text-black text-xl font-bold">Total:-</h4>
          <h4 className="text-[#a100ff] text-xl">
            <span className="text-[#460073]">
              {(key==0 || key==1) ? 0 :leftDent + rightDent + topDent}
            </span>{" "}
            Dent
          </h4>
          <h4 className="text-[#0041f0] text-xl">
            <span className="text-[#460073]">
              {(key==0 || key==1) ? 0 :leftScratch + rightScratch + topScratch}
            </span>{" "}
            Scratch
          </h4>
        </div>
        <div className="flex flex-col">
          <h4 className="text-[#a100ff] text-sm">D - Dent</h4>
          <div className="w-5" />
          <h4 className="text-[#0041f0] text-sm">S - Scratch</h4>
        </div>
      </div>
    </div>
  );
}

export default ScratchCard;

const ArrowLine = ({
  startX = 10,
  startY = 50,
  endX = 190,
  endY = 50,
  color = "black",
  strokeWidth = 2,
  arrowSize = 6,
}) => {
  // Calculate angle for arrow head
  const angle = Math.atan2(endY - startY, endX - startX);

  // Calculate arrow head points
  const arrowPoint1X = endX - arrowSize * Math.cos(angle - Math.PI / 6);
  const arrowPoint1Y = endY - arrowSize * Math.sin(angle - Math.PI / 6);
  const arrowPoint2X = endX - arrowSize * Math.cos(angle + Math.PI / 6);
  const arrowPoint2Y = endY - arrowSize * Math.sin(angle + Math.PI / 6);

  return (
    <svg className="w-auto h-auto" viewBox="0 0 200 100">
      <path
        d={`M ${startX} ${startY} L ${endX} ${endY} M ${endX} ${endY} L ${arrowPoint1X} ${arrowPoint1Y} M ${endX} ${endY} L ${arrowPoint2X} ${arrowPoint2Y}`}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
    </svg>
  );
};

const ArrowLineLeft = ({
  startX = 190, // Swapped from 10
  startY = 50,
  endX = 10, // Swapped from 190
  endY = 50,
  color = "black",
  strokeWidth = 2,
  arrowSize = 6,
}) => {
  const angle = Math.atan2(endY - startY, endX - startX);

  const arrowPoint1X = endX - arrowSize * Math.cos(angle - Math.PI / 6);
  const arrowPoint1Y = endY - arrowSize * Math.sin(angle - Math.PI / 6);
  const arrowPoint2X = endX - arrowSize * Math.cos(angle + Math.PI / 6);
  const arrowPoint2Y = endY - arrowSize * Math.sin(angle + Math.PI / 6);

  return (
    <svg className="w-auto h-auto" viewBox="0 0 200 100">
      <path
        d={`M ${startX} ${startY} L ${endX} ${endY} M ${endX} ${endY} L ${arrowPoint1X} ${arrowPoint1Y} M ${endX} ${endY} L ${arrowPoint2X} ${arrowPoint2Y}`}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
    </svg>
  );
};

const ArrowLineUp = ({
  startX = 100,
  startY = 190,
  endX = 100,
  endY = 10,
  color = "black",
  strokeWidth = 3,
  arrowSize = 8,
}) => {
  const angle = Math.atan2(endY - startY, endX - startX);

  const arrowPoint1X = endX - arrowSize * Math.cos(angle - Math.PI / 6);
  const arrowPoint1Y = endY - arrowSize * Math.sin(angle - Math.PI / 6);
  const arrowPoint2X = endX - arrowSize * Math.cos(angle + Math.PI / 6);
  const arrowPoint2Y = endY - arrowSize * Math.sin(angle + Math.PI / 6);

  return (
    <svg className="w-auto h-auto" viewBox="0 0 200 100">
      <path
        d={`M ${startX} ${startY} L ${endX} ${endY} M ${endX} ${endY} L ${arrowPoint1X} ${arrowPoint1Y} M ${endX} ${endY} L ${arrowPoint2X} ${arrowPoint2Y}`}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
    </svg>
  );
};
