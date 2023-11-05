import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { watchNetwork } from "@wagmi/core";
import { useDisconnect } from "wagmi";

function App() {
  const [count, setCount] = useState(0);
  const { disconnect } = useDisconnect();
  // 处理断开连接
  useEffect(() => {
    const unwatch = watchNetwork(({ chain, chains }) => {
      if (!chain || !chains) {
        console.log("aa");
      }
      // TODO   钱包内部切链以后，页面不刷新的话  重连钱包会出问题
      // 判断切的链是否合法   如果不合法的话  显示链错误  引导用户切链
      // 或者使用自己的链接套件 在链接前做一下切链的操作
      const isValidChain = chains.some((c) => c.id === chain?.id);
      if (!isValidChain) {
        disconnect();
      }
    });
    return () => unwatch();
  }, [disconnect]);

  return (
    <>
      <w3m-button />
    </>
  );
}

export default App;
