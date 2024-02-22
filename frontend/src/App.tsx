import React, { FC } from 'react';
import styles from './App.module.css';
import Entities from './store';
import { observer } from 'mobx-react';


const App: FC = observer(() => {
    console.log(Entities.app.test);

    return (
        <div className={styles.container}>
            Hello {`${Entities.app.test}`}
        </div>
    );
})

export default App;
