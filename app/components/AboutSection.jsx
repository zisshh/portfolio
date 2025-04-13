"use client";
import React, {useTransition, useState}from 'react'
import Image from 'next/image'
import TabButton from './TabButton';

const TAB_DATA = [
  {
    title: 'Skills',
    id: 'skills',
    content: (
      <ul className='list-disc pl-2 grid grid-cols-2 gap-1 '>
        <div className="grid grid-cols-2 justify-evenly sm:gap-4">
          <div>
            <li>Node.js</li>
          </div>
          <div>
            <Image src="/images/logos/nodejs.png" alt='nodejs' width={25} height={25} className='relative left-[-5px]'/>
          </div>
        </div>
        <div className="grid grid-cols-2 justify-evenly">
          <li>Express.js</li>
          <Image src="/images/logos/express.png" alt='expressjs' width={25} height={25} className='relative right-[-10px]'/>
        </div>
        <div className="grid grid-cols-2 justify-evenly">
          <li>MongoDB</li>
          <Image src="/images/logos/mongoDB.png" alt='mongoDB' width={10} height={10} className='relative right-[-10px]'/>
        </div>
        <div className="grid grid-cols-2 justify-evenly">
          <li>Tailwind</li>
          <Image src="/images/logos/tailwindCSS.png" alt='tailwind' width={25} height={25} className='relative right-[-10px]'/>
        </div>
        <div className="grid grid-cols-2 justify-evenly">
          <li>Docker</li>
          <Image src="/images/logos/docker.png" alt='docker' width={25} height={25} className='relative right-[-10px]'/>
        </div>
        <div className="grid grid-cols-2 justify-evenly">
          <li>JavaScript</li>
          <Image src="/images/logos/javascript.png" alt='js' width={25} height={25} className='relative right-[-10px]'/>
        </div>
        <div className="grid grid-cols-2 justify-evenly">
          <li>Git</li>
          <Image src="/images/logos/git.png" alt='git' width={25} height={25} className='relative right-[-10px]'/>
        </div>
        <div className="grid grid-cols-2 justify-evenly">
          <li>GitHub</li>
          <Image src="/images/logos/github.png" alt='github' width={25} height={25} className='relative right-[-10px]'/>
        </div>
        <div className="grid grid-cols-2 justify-evenly">
          <li>TypeScript</li>
          <Image src="/images/logos/typescript.png" alt='ts' width={25} height={25} className='relative right-[-10px]'/>
        </div>
        <div className="grid grid-cols-2 justify-evenly">
          <li>Postman</li>
          <Image src="/images/logos/postman.png" alt='postman' width={25} height={25} className='relative right-[-10px]'/>
        </div>
      </ul>
    )
  },
  {
    title: 'Education',
    id: 'education',
    content: (
      <ul className='list-disc pl-2'>
        <li>B.Tech in Computer Science and Engineering</li>
        <li>VIT University, 2022 - Present</li>
      </ul>
    )
  },
  {
    title: 'Experience',
    id: 'experience',
    content: (
      <ul className='list-disc pl-5'>
        <li>
          <h1 className='font-bold'>FreeLancing</h1>
          <h2 className='italic mb-2'> Website Developer</h2>
          <p className='text-sm'>Developed a 3-D interactive website for an Social Media Marketing Agency(Ascendrow Media Agency) using Framer and Spline</p>
        </li>
      </ul>
    )
  },
  {
    title: 'Certifications',
    id: 'certifications',
    content: (
      <ul className='list-disc pl-2'>
        <li>
          Microsoft Azure AI Fundamentals
        </li>
      </ul>
    )
  }
]

const AboutSection = () => {
  const [tab, setTab] = useState('skills');
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  }
  return (
    <section className='text-white'>
      <div className='md:grid grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16'>
        <Image src="/images/static/about-image.png" alt='about'  width={500} height={500} className='rounded-lg shadow-lg' />
        <div className='mt-4 md:mt-0 text-left flex flex-col h-full'>
          <h2 className='text-4xl font-bold text-white mb-4'>About Me</h2>
          <p className='text-base lg;text-lg'>
            I’m 22 years old, currently in my pre-final semester of B.Tech in CSE. I enjoy outdoor sports and am always up for a good challenge. I love meeting smart people, learning from them, and sharing my knowledge to grow together.
          </p>
          <div className='flex flex-row justify-start mt-8'>
            <TabButton selectTab={() => handleTabChange('skills')} active={tab=="skills"} >
              {" "}
              Skills{" "}
            </TabButton>
            <TabButton selectTab={() => handleTabChange('education')} active={tab=="education"} >
              {" "}
              Education{" "}
            </TabButton>
            <TabButton selectTab={() => handleTabChange('experience')} active={tab=="experience"} >
              {" "}
              Experience{" "}
            </TabButton>
            <TabButton selectTab={() => handleTabChange('certifications')} active={tab=="certifications"} >
              {" "}
              Certifications{" "}
            </TabButton>
          </div>
          <div className='mt-8 '>{TAB_DATA.find((t) => t.id ===tab).content}</div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection