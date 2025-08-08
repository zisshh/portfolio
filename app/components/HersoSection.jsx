"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Spline from '@splinetool/react-spline';
import { TypeAnimation } from 'react-type-animation';

const HersoSection = () => {
  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="col-span-7 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="text-white mb-4 text-4xl sm:text-5lxl lg:text-6xl font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8200] to-[#c48435]">
              Hello, I'm{' '}
            </span>
            <br />
            <TypeAnimation
              sequence={[
                'Div',
                2000,
                'Web Developer',
                2000,
                'iOS App Developer',
                2000,
                'AI Automation Expert',
                2000,
              ]}
              wrapper="span"
              speed={25}
              repeat={Infinity}
            />
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
            I'm a student pursuing my major in CompSci and a passionate learner. I love building
            things and solving
          </p>
          <div>
            <Link
              href="/#contact"
              className="px-6 inline-block py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-[#ff8200] via-[#d47e28] to-[#c48435] hover:bg-slate-200 text-white"
            >
              Hire Me
            </Link>
            <a
              href="/api/download-cv"
              className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-[#ff8200] via-[#d47e28] to-[#c48435] hover:bg-slate-800 text-white mt-3"
            >
              <div className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">Download CV</div>
            </a>
          </div>
        </motion.div>
        <motion.div className="col-span-5 place-self-center mt-4 lg:mt-0">
          <div className="bg-[#121212] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] items-center relative">
            <Spline
              scene="https://prod.spline.design/NAKamdQHLzdnXiog/scene.splinecode"
              style={{ width: '250%', height: '250%', position: 'absolute', top: '-60%', left: '-70%' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HersoSection;
