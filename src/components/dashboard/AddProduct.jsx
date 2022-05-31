import React, { useState } from 'react';
import { db, storage } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Snackbar from '../Snackbar';
import styles from '../../styles/components/Form.module.css';

const AddProduct = () => {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('');

  const handleAddProduct = () => {
    if (
      name.length <= 0 ||
      price.length <= 0 ||
      quantity.length <= 0 ||
      description.length <= 0
    ) {
      setMessage('Please enter all the details');
      setColor('#e19a00');
      setOpenSnackbar(true);
    } else if (image.length <= 0) {
      setMessage('Please upload image of product.');
      setColor('#e19a00');
      setOpenSnackbar(true);
    } else {
      //upload image
      const imageRef = ref(storage, 'images/products/' + image.name);
      uploadBytesResumable(imageRef, image)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            // store data
            const adoptionsCollectionRef = collection(db, 'products');
            addDoc(adoptionsCollectionRef, {
              image: url,
              name: name,
              price: price,
              quantity: parseInt(quantity),
              description: description,
            });
          });
          setMessage('Product added successfully.');
          setColor('#1fcf0a');
          setOpenSnackbar(true);

          setImage('');
          setName('');
          setPrice('');
          setQuantity('');
          setDescription('');
        })
        .catch((error) => {
          setMessage('Opps. Something went wrong, Please try again. :(');
          setColor('#d7082b');
          setOpenSnackbar(true);
        });
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>
        <h1>Add product</h1>

        <div className={styles.profilePicker}>
          <label htmlFor="picker">
            <img src="/images/profile_picker.svg" alt="profile_picker" />
            {image ? `${image.name} uploaded.` : `Upload Product Photo`}
          </label>
          <input
            type="file"
            name="image-picker"
            id="picker"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="name">Product name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="text"
            id="quantity"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="desc">Description</label>
          <input
            type="text"
            id="desc"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button onClick={handleAddProduct}>Submit</button>
      </div>

      <Snackbar
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        message={message}
        color={color}
      />
    </div>
  );
};

export default AddProduct;
