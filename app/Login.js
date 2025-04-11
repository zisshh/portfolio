"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Login() {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [shiftClass, setShiftClass] = useState("translate-x-0 translate-y-0");
  const btnRef = useRef(null);
  const shiftPositions = [
    "translate-x-[-6rem]",
    "translate-y-[-3rem]",
    "translate-x-[6rem]",
    "translate-y-[2.5rem]",
  ];
  const [shiftIndex, setShiftIndex] = useState(0);

  const isEmpty =  password.trim().toLowerCase() !== "yes";
  const buttonDisabled = isEmpty;

  const handleShift = () => {
    if (!isEmpty) return;

    setMsg("Please Type Yes to Continue to My Portfolio Wesbite");
    const nextIndex = (shiftIndex + 1) % shiftPositions.length;
    setShiftClass(shiftPositions[nextIndex]);
    setShiftIndex(nextIndex);
  };

  useEffect(() => {
    if (!isEmpty) {
      setShiftClass("translate-x-0 translate-y-0");
      setMsg("Great! Now you can proceed");
    }
  }, [password, isEmpty]);

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="relative grid w-[400px] h-[480px]">

        <form
          className="absolute bottom-0 flex flex-col p-6 pt-10 h-[440px] w-full rounded-[30px] bg-[rgba(19,19,19,0.736)] border border-[rgba(255,255,255,0.097)]"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="text-white font-bold text-lg my-10 text-center">
            Hi, Welcome <br/>
            Are you here for my Porfolio?
          </div>
          <div className="msg text-center mb-2 text-sm" style={{ color: isEmpty ? "#da3131" : "#92ff92" }}>
            {msg}
          </div>

          <div className="relative mb-5">
            <input
              type="text"
              id="pass"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full bg-transparent text-[#d2d2d2] border-b border-[#404040] p-2 pr-8 outline-none"
            />
            <i className="fa fa-lock absolute right-2 bottom-2 text-sm text-[#a2a2a2]"></i>
          </div>

          <div
            className="relative h-[130px] overflow-hidden mb-4"
            onMouseOver={handleShift}
            onTouchStart={handleShift}
          >
          <Link href="/home">
          <button
          ref={btnRef}
          type="submit"
          disabled={buttonDisabled}
            className={`absolute px-6 py-2 bg-[rgb(25,62,97)] text-white font-semibold text-[16px] rounded-[15px] transition-transform duration-300 ease-in-out ${
            buttonDisabled ? "cursor-not-allowed" : "cursor-pointer"} ${shiftClass}`}
            style={{
              left: "50%",
              top: "55%", // Slightly below center
              transform: "translate(-50%, -50%)",
            }}
          >
            Login
          </button>
          </Link>
        </div>
        </form>
      </div>
    </div>
  );
}

