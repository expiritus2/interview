import React, { FC } from 'react';
import { observer } from 'mobx-react';
import Entities from '../../../store';
import Genre from '../Genre';

import styles from './styles.module.css';

interface IContent {
  className?: string;
}

const Content: FC<IContent> = observer(() => {
  return (
    <div className={styles.container}>
      {Object.keys(Entities.genres.list).map((genreName) => (
        <Genre
          key={genreName}
          name={genreName}
        />
      ))}
    </div>
  );
});

export default Content;
