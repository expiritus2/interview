import React, { FC, useCallback, useRef } from 'react';
import { debounce } from 'lodash';

import styles from './styles.module.css';
import { loadGenres } from 'tasks/loadGenres';
import { useHistory, useLocation } from 'react-router-dom';
import Content from './Content';

const Main: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const searchValRef = useRef('');
  const preRequestRef = useRef<AbortController>();

  const onSearch = useCallback(
    debounce((event) => {
      const value = event.target.value;
      if (!value) {
        history.replace(location.pathname);
      } else {
        history.replace(`${location.pathname}?search=${value}`);
      }

      if (value !== searchValRef.current) {
        preRequestRef.current?.abort();

        const controller = new AbortController();
        preRequestRef.current = controller;
        loadGenres(value, controller);
      }
      searchValRef.current = value;
    }, 1000),
    []
  );

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <input
          className={styles.search}
          onChange={onSearch}
          type="text"
        />
      </div>
      <Content />
    </div>
  );
};

export default Main;
