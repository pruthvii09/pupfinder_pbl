import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import Post from './Post';

const ViewPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const postsCollectionRef = collection(db, 'adoptions');

      onSnapshot(postsCollectionRef, (querySnapshot) => {
        const tempPosts = [];
        querySnapshot.forEach((doc) => {
          tempPosts.push({ ...doc.data(), id: doc.id });
        });
        setPosts(tempPosts);
      });
    };

    getPosts();
  }, []);

  return (
    <div>
      {posts?.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default ViewPosts;
