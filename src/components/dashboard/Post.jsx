import React from 'react';
import { db } from '../../firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import styles from '../../styles/components/dashboard/ViewPosts.module.css';

const Post = ({ post }) => {
  const handleDeletePost = async (id) => {
    const productDoc = doc(db, 'adoptions', id);
    await deleteDoc(productDoc);
  };

  return (
    <div className={styles.container}>
      <img src={post?.image} alt={`${post?.id}_image`} />
      <div className={styles.information}>
        <h5>{post?.breed}</h5>
        <p>
          {post?.phoneNumber} <i className="fa-solid fa-phone"></i>
        </p>
        <p>{post?.address}</p>
        <p>{post?.city}</p>
      </div>
      <button onClick={() => handleDeletePost(post?.id)}>
        <i className="fa-solid fa-trash"></i>
      </button>
    </div>
  );
};

export default Post;
