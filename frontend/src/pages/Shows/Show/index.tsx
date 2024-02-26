import React, { FC } from 'react';
import { IShow } from 'store/genres';

import styles from './styles.module.css';

interface IShowProps extends IShow {
  className?: string;
}

const Show: FC<IShowProps> = (props) => {
  const { image, name } = props;

  return (
    <div className={styles.container}>
      <img src={image.medium} alt="" />
      <p>{name}</p>
    </div>
  );
};

export default Show;
