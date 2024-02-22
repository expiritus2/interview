import React, { FC } from 'react';
import { observer, useLocalObservable } from 'mobx-react';
import Entities from 'store';
import styles from './styles.module.css';
import PostComponent from './Post';

interface IPostsView {
  className?: string;
}

const PostsView: FC<IPostsView> = observer(() => {
  const localState = useLocalObservable(() => ({
    get postsList() {
      return Entities.posts.list
    }
  }));

  return (
    <div className={styles.container}>
      {localState.postsList.map((post) => (
        <PostComponent
          key={post.id}
          id={post.id}
          userId={post.userId}
          title={post.title}
          body={post.body}
        />
      ))}
    </div>
  );
});

export default PostsView;
