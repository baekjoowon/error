
import { useState } from "react";

const useInput = () => {
  const [input, setInput] = useState("")
  const onChangehandler = (e) => {
    setInput(e.target.value);
  }
  return [input,setInput,onChangehandler]
};

export default useInput;