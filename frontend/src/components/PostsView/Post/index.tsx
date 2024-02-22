import React, { FC } from 'react';
import { observer } from 'mobx-react';
import styles from './styles.module.css';

interface IPostComponent {
  className?: string;
  userId: number;
  id: number;
  title: string;
  body: string;
}

const PostComponent: FC<IPostComponent> = observer((props) => {
  const { title, body } = props;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.body}>{body}</p>
    </div>
  );
});

export default PostComponent;
