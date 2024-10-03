import React from 'react';
import '../styles/AboutUs.css';

const AboutUs = () => {
  return (
    <section className="aboutUs">
      <h2>About Us:</h2>
      <div className="abtText">
        <p>
        This project aims to address the problem of unaffordable air quality sensors. This issue is especially problematic since air quality
         tends to be worse in low-income communities than in the higher-income communities that can afford them.

        </p>
        <p>
        This project will create an affordable, easily replicable, and open-source air quality monitoring system in Gettysburg,
        which will provide the town with accurate air quality monitoring, as well as develop and make available a set of instructions
        for the replication of this project. This project will deploy 10 air quality sensors in Gettysburg, store their data in a database,
        and make that data available on a user-friendly website. This website will also contain instructions for how to build and deploy
        the same kind of air quality monitors we will design and build.
        </p>
      </div>
    </section>
  );
}

export default AboutUs;
