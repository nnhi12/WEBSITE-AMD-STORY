// src/AboutUs.jsx
import React from 'react';
import './AboutUs.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AboutUs = () => {
  return (
    <div className="about-container my-5">
      <h1 className="text-center mb-4">About Us</h1>
      
      <div className="row">
        <div className="col-md-8 mx-auto">
          <p>
            Welcome to our platform, where we offer a wide range of comics, manga, and more for fans all over the world. 
            Our mission is to provide an immersive experience and a diverse library that caters to readers' unique tastes.
          </p>
          
          <h2>Our Mission</h2>
          <p>
            We aim to bring high-quality content and exciting stories from various creators to our readers worldwide. 
            We believe in the power of stories and are dedicated to delivering authentic and engaging content.
          </p>
          
          <h2>Our Vision</h2>
          <p>
            Our vision is to build a global community where readers and creators connect and inspire each other. 
            By showcasing different perspectives and creative works, we hope to foster a deeper appreciation for the art of storytelling.
          </p>
          
          <div className="contact-section">
            <h2>Contact Us</h2>
            <p>
              If you have any questions, feedback, or suggestions, feel free to reach out to us at: <a href="mailto:contact@example.com">contact@example.com</a>.
            </p>
          </div>
          
          <div className="join-section">
            <h2>Join Us</h2>
            <p>
              We’re always on the lookout for passionate creators who want to share their work with the world. If you’re a storyteller, artist, or just have a love for comics, feel free to connect with us!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
