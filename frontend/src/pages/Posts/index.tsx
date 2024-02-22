import React, { useEffect } from 'react';
import { loadPosts } from '../../Tasks/loadPosts';
import PostsView from '../../components/PostsView';

const Posts = () => {
  useEffect(() => {
    loadPosts();
  }, []);

  return <PostsView />;
};

export default Posts;
