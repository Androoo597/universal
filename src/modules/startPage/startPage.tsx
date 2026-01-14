import Link from "next/link";
import styles from "./styles.module.css";

interface navItem {
  id: number;
  title: string;
  type: "btn" | "link";
  link: string;
}

const navList: navItem[] = [
  { id: 0, title: "Начать игру", type: "btn", link: "" },
  { id: 1, title: "Загрузить игру", type: "btn", link: "" },
  { id: 2, title: "Добавить друзей", type: "link", link: "#" },
  { id: 3, title: "Настройки", type: "link", link: "#" },
];

const btnSwitcher = (item: navItem) => {
  switch (item.type) {
    case "btn":
      return <button className={styles.listBtn}>{item.title}</button>;
    case "link":
      return (
        <Link className={styles.listLink} href={item.link}>
          {item.title}
        </Link>
      );
    default:
      return null;
  }
};

export const StartPageModule = () => {
  return (
    <div className={styles.root}>
      <nav className={styles.menuBox}>
        <ul className={styles.menuList}>
          {navList.map((item) => (
            <li className={styles.listItem} key={item.id}>
              {btnSwitcher(item)}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
