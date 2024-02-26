import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.css';

interface IGenreProps {
  name: string;
  className?: string;
}

const Genre: FC<IGenreProps> = (props) => {
  const { name } = props;

  return (
    <Link to={`/genres/${name}`} className={styles.container}>
      {name}
    </Link>
  );
};

export default Genre;
