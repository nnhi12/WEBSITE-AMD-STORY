import React, { useEffect } from 'react';
import './AboutUs.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200, // Thời gian hiệu ứng (ms)
      once: true, // Hiệu ứng chỉ xảy ra một lần
    });
  }, []);

  return (
    <div className="about-container my-5">
      <h1 className="text-center mb-4" data-aos="fade-up">
        About Us
      </h1>

      <div className="row">
        <div className="col-md-8 mx-auto">
          <p data-aos="fade-up">
            Welcome to our platform, where we offer a wide range of comics, manga, and more for fans all over the world.
            Our mission is to provide an immersive experience and a diverse library that caters to readers' unique tastes.
          </p>

          <h2 data-aos="fade-right">Our Mission</h2>
          <p data-aos="fade-right">
            We aim to bring high-quality content and exciting stories from various creators to our readers worldwide.
            We believe in the power of stories and are dedicated to delivering authentic and engaging content.
          </p>

          <h2 data-aos="fade-left">Our Vision</h2>
          <p data-aos="fade-left">
            Our vision is to build a global community where readers and creators connect and inspire each other.
            By showcasing different perspectives and creative works, we hope to foster a deeper appreciation for the art of storytelling.
          </p>

          <div className="contact-section" data-aos="zoom-in">
            <h2>Contact Us</h2>
            <p>
              If you have any questions, feedback, or suggestions, feel free to reach out to us at: <a href="mailto:contact@example.com">contact@example.com</a>.
            </p>
          </div>

          <div className="join-section" data-aos="flip-up">
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
