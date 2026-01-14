import { MutableRefObject, UIEvent, useId, useRef, useState } from "react";
import styles from "./styles.module.css";

const symb = ["a", "б", "в", "г", "д", "е", "ж", "з", "и", "к"];
const numb = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const ceils = new Array(100).fill(0);

const cloneElem = (elem: MutableRefObject<HTMLDivElement | null>) => {
  const clone = elem.current?.cloneNode(true) as HTMLDivElement;
  clone.style.position = "absolute";
  clone.style.opacity = "0.7";
  console.dir(clone);
  return clone;
};

const Board = ({ length }: { length: number }) => {
  const boardCeil = new Array(length).fill(0);
  const [boardCount, setBoardCount] = useState(5 - length);

  const boardRef = useRef<HTMLDivElement | null>(null);
  const movingRef = useRef<boolean>(false);

  const takeBoard = (e: UIEvent, clone: HTMLDivElement) => {
    if (boardCount <= 0) return;
    setBoardCount((prev) => prev - 1);
    const changePos = (e: MouseEvent) => {
      if (!clone) return;
      clone.style.left = e.clientX - 25 + "px";
      clone.style.top = e.clientY - 25 + "px";
    };

    document.body.append(clone);
    changePos(e as unknown as MouseEvent);
    document.addEventListener("mousemove", changePos);
    movingRef.current = true;

    clone.onclick = (e) => {
      if (movingRef.current) {
        console.log(e);
        document.removeEventListener("mousemove", changePos);
        movingRef.current = false;
      } else {
        document.addEventListener("mousemove", changePos);
        movingRef.current = true;
      }
    };

    clone.ondblclick = () => {
      clone.remove();
      setBoardCount((prev) => prev + 1);
    };
  };

  return (
    <div className={styles.shipBox} key={"boards" + length}>
      <div
        className={styles.shipBox}
        onClick={(e) => takeBoard(e, cloneElem(boardRef))}
        ref={boardRef}
      >
        {boardCeil.map(() => (
          <div className={styles.boardCeil}></div>
        ))}
      </div>
      <p>- {boardCount}</p>
    </div>
  );
};

export const GamePageModule = () => {
  return (
    <div className={styles.root}>
      <div className={styles.boardsBox}>
        {[4, 3, 2, 1].map((val) => (
          <Board length={val} />
        ))}
      </div>
      <div className={styles.field}>
        <div className={styles.numbers}>
          {numb.map((val) => (
            <div key={val + "left"}>{val}</div>
          ))}
        </div>
        <div className={styles.box}>
          <div className={styles.symbols}>
            {symb.map((val) => (
              <div key={val}>{val.toUpperCase()}</div>
            ))}
          </div>
          <div className={styles.seaField}>
            {ceils.map((_val, index) => (
              <div key={index + 1}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
