import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Card from '../components/home/Card';
import 'bootstrap/dist/css/bootstrap.css';
import styles from '../styles/pages/Home.module.css';

const Home = () => {
  const navigate = useNavigate();

  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const getDogs = async () => {
      const adoptionsCollectionRef = collection(db, 'adoptions');

      onSnapshot(adoptionsCollectionRef, (querySnapshot) => {
        const tempDogs = [];
        querySnapshot.forEach((doc) => {
          tempDogs.push({ ...doc.data(), id: doc.id });
        });
        setDogs(tempDogs);
      });
    };

    getDogs();
  }, []);

  return (
    <div className={styles.home}>
      <Carousel>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src="https://firebasestorage.googleapis.com/v0/b/pupfinder-13f78.appspot.com/o/images%2Fbanner%2Fbanner1.png?alt=media&token=a18d4ca0-35cd-4582-a73f-aa0abdc84961"
            alt="1"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/order-belt')}
          />
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <a href="#adopt">
            <img
              className="d-block w-100"
              src="https://firebasestorage.googleapis.com/v0/b/pupfinder-13f78.appspot.com/o/images%2Fbanner%2Fbanner2.png?alt=media&token=8e214ee1-a46d-488f-ba34-1db7e7e54925"
              alt="2"
              style={{ cursor: 'pointer' }}
            />
          </a>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src="https://firebasestorage.googleapis.com/v0/b/pupfinder-13f78.appspot.com/o/images%2Fbanner%2Fbanner3.png?alt=media&token=d3c7b003-113f-4883-aa91-f85107401787"
            alt="3"
            style={{ cursor: 'pointer' }}
          />
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <a href="#adopt">
            <img
              className="d-block w-100"
              src="https://firebasestorage.googleapis.com/v0/b/pupfinder-13f78.appspot.com/o/images%2Fbanner%2Fbanner4.png?alt=media&token=34fb56b2-7bea-4d60-a9e4-ccad17c7b0ec"
              alt="4"
              style={{ cursor: 'pointer' }}
            />
          </a>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src="https://firebasestorage.googleapis.com/v0/b/pupfinder-13f78.appspot.com/o/images%2Fbanner%2Fbanner5.png?alt=media&token=8c4702db-701b-4a3f-a872-d3b6a19c88a0"
            alt="5"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/donate')}
          />
        </Carousel.Item>
      </Carousel>

      <div className={styles.adoptionContainer}>
        <h1>Post dog for adoption</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla maiores
          voluptatibus delectus odit distinctio eveniet numquam illo, esse
          reprehenderit nesciunt magnam, incidunt mollitia tempora molestiae vel
          vero necessitatibus repudiandae aspernatur?
        </p>
        <button onClick={() => navigate('/post-dog')}>
          Click here to post<i className="fa-solid fa-hand-point-up"></i>
        </button>

        <button className={styles.donate} onClick={() => navigate('/donate')}>
          Donate now <i className="fa-solid fa-circle-dollar-to-slot"></i>
        </button>
      </div>

      <Carousel controls={false} indicators={false}>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src="https://firebasestorage.googleapis.com/v0/b/pupfinder-13f78.appspot.com/o/images%2Fbanner%2Fdonate-banner.png?alt=media&token=f10b24bb-1465-4b01-a576-edd1d6138bba"
            alt="5"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/donate')}
          />
        </Carousel.Item>
      </Carousel>

      <div className={styles.container}>
        <h2>Adopt Dogs</h2>
        <div className={styles.cardsContainer} id="adopt">
          {dogs.map((dog) => (
            <Card dog={dog} key={dog.id} />
          ))}
        </div>
      </div>

      <div className={styles.adoptionContainer}>
        <h1>
          Get QR for your puppy <span>FREE</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla maiores
          voluptatibus delectus odit distinctio eveniet numquam illo, esse
          reprehenderit nesciunt magnam, incidunt mollitia tempora molestiae vel
          vero necessitatibus repudiandae aspernatur?
        </p>
        <button onClick={() => navigate('/free-qr')}>
          Get QR for free<i className="fa-solid fa-qrcode"></i>
        </button>
        <button className={styles.donate} onClick={() => navigate('/donate')}>
          Donate now <i className="fa-solid fa-circle-dollar-to-slot"></i>
        </button>
      </div>
    </div>
  );
};

export default Home;
