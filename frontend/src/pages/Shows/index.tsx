import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { useRouteMatch } from 'react-router-dom';
import Entities from 'store';
import Show from './Show';
import { toJS } from 'mobx';

import styles from './styles.module.css';

interface IGenres {
  className?: string;
}

const Shows: FC<IGenres> = observer(() => {
  const match = useRouteMatch<{ genreName: string }>();

  const shows = Entities.genres.list[match.params.genreName] || [];

  console.log(toJS(shows));

  return (
    <div className={styles.container}>
      {shows.map((item) => (
        <Show
          key={item.show.id}
          id={item.show.id}
          image={item.show.image}
          name={item.show.name}
        />
      ))}
    </div>
  );
});

export default Shows;
