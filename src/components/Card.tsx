import React from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./Card.module.css";
import cls from "classnames";

type Props = {
  name: string;
  imgUrl: string;
  href: string;
};

const Card = (props: Props) => {
  return (
    <Link href={props.href} className={styles.cardLink}>
      <div className={cls("glass", styles.container)}>
        <div className={styles.cardHeaderWrapper}>
          <h2 className={styles.cardHeader}>{props.name}</h2>
        </div>
        <div className={styles.cardImageWrapper}>
          <Image src={props.imgUrl} alt={props.name} width={260} height={160} />
        </div>
      </div>
    </Link>
  );
};

export default Card;
