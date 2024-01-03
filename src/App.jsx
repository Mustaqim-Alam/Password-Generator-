import { useState, useEffect, useCallback, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowes, setnumAllowes] = useState(false);
  const [charAllowes, setCharAllowes] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowes) {
      str += "123456789";
    }
    if (charAllowes) {
      str += "`~!@#$%^&*()";
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowes, charAllowes]);

  const passwordRef = useRef(null);

  let copyClipbord = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    setPassword("");
  }, [length, numAllowes, charAllowes, passwordGenerator]);

  const generateNewPassword = () => {
    passwordGenerator();
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto  text-navy-700 rounded bg-gray-300 center pb-10 pt-5 px-10 my-8">
        <h1 className="text-4xl text-center mb-6">Password Generator </h1>
        <div className="flex rounded-lg shadow overflow-hidden mb-4">
          <input
            type="text"
            className="w-full outline-none px-3 py-2 "
            placeholder="Password"
            value={password}
            ref={passwordRef}
            readOnly
          />
          <button
            className=" bg-blue-800 text-white px-4 py-0.5 outline-none shrink-0 hover:bg-blue-600  "
            onClick={() => {
              copyClipbord();
            }}
          >
            Copy
          </button>
        </div>
        <div className="w-full flex items-center justify-center mb-2">
          <button
            className=" text-white  px-6 py-2 rounded-xl outline-none mt-3 shrink-0 bg-orange-950 hover:bg-orange-900 self-center "
            onClick={() => generateNewPassword()}
          >
            Generator New Password
          </button>
        </div>
        <div className="flex text-sm gap-2 flex-wrap my-8 ">
          <div
            className="flex items-center gap-x-1  
           "
          >
            <input
              type="range"
              value={length}
              min={6}
              max={100}
              className=" cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label >Length: {length}</label>
          </div>
          <div className=" flex items-center gap-x-1">
            <input
              type="checkbox"
              id="num"
              defaultChecked={numAllowes}
              onChange={() => {
                setnumAllowes((prev) => !prev);
              }}
            />
            <label htmlFor="num" className=" cursor-pointer" >Number</label>
          </div>
          <div className=" flex items-center gap-x-1">
            <input
              type="checkbox"
              id="char"
              defaultChecked={charAllowes}
              onChange={() => {
                setCharAllowes((prev) => !prev);
              }}
            />
            <label htmlFor="char" className=" cursor-pointer">Charecter</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
