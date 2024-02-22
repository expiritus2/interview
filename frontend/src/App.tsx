import React, { FC } from 'react';
import styles from './App.module.css';
import Entities from './store';
import { observer } from 'mobx-react';
import { loadMain } from './Tasks/main';

const App: FC = observer(() => {
  const onClick = () => {
    loadMain();
  };

  return (
    <div className={styles.container}>
      Hello {`${Entities.app.test}`}
      <button
        onClick={onClick}
        onError={() => {}}
      >
        Click me
      </button>
    </div>
  );
});

export default App;
