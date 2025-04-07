"use client";
import React, {useState, useRef} from 'react'
import ProjectCard from './ProjectCard'
import ProjectTag from './ProjectTag'
import { motion, useInView } from 'framer-motion';

const projectsData = [
    {
        id: 1,
        title: 'Portfolio Website',
        description: 'Description of project 1',
        image: '/images/projects/project1.png',
        tag: ["All", "Web"],
        gitUrl: '/',
        previewUrl: '/',
    },
    {
        id: 2,
        title: 'CodeTribute',
        description: 'Description of project 2',
        image: '/images/projects/project2.png',
        tag: ["All", "Web"],
        gitUrl: '/',
        previewUrl: '/',
    },
    {
        id: 3,
        title: 'Proudct Market',
        description: 'Description of project 3',
        image: '/images/projects/project3.png',
        tag: ["All", "Web"],
        gitUrl: '/',
        previewUrl: '/',
    },
    {
        id: 4,
        title: 'Project 4',
        description: 'Description of project 4',
        image: '/images/projects/comingsoon.png',
        tag: ["All", "Mobile"],
        gitUrl: '/',
        previewUrl: '/',
    },
    {
        id: 5,
        title: 'Project 5',
        description: 'Description of project 5',
        image: '/images/projects/comingsoon.png',
        tag: ["All", "Web"],
        gitUrl: '/',
        previewUrl: '/',
    },
    {
        id: 6,
        title: 'Project 6',
        description: 'Description of project 6',
        image: '/images/projects/comingsoon.png',
        tag: ["All", "Web"],
        gitUrl: '/',
        previewUrl: '/',

    }
]

const ProjectsSection = () => {
    const [tag, setTag] = useState("All");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const handleTagChange = (newTag) => {
        setTag(newTag);
    };

    const filteredProjects = projectsData.filter((project) => 
    project.tag.includes(tag)
    );

    const cardVariants ={
        initial: {y: 50, opacity: 0},
        animate: {y: 0, opacity: 1},
    };

  return (
    <section id='projects'>
        <h2 className='text-center text-4xl font-bold text-white mt-4 mb-8'>My Projects</h2>
        <div className='text-white flex flex-row justify-center items-center gap-4 mb-8'>
          <ProjectTag 
          onClick={handleTagChange} 
          name="All"
          isSelected={tag === 'All'}/>
           <ProjectTag 
          onClick={handleTagChange} 
          name="Web"
          isSelected={tag === 'Web'}/>
           <ProjectTag 
          onClick={handleTagChange} 
          name="Mobile"
          isSelected={tag === 'Mobile'}/>

        </div>
        <ul ref={ref} className='grid md:grid-cols-3 gap-8 md:gap-12'>
            {filteredProjects.map((project, index) => 
            <motion.li 
            key={index} 
            variants={cardVariants} 
            initial="initial" 
            animate={isInView ? "animate" : "initial"} 
            transition={{ duration: 0.3, delay: index * 0.4 }}>
            <ProjectCard 
            key={project.id}  
            title={project.title} 
            description={project.description} 
            imgUrl={project.image} 
            gitUrl={project.gitUrl}
            previewUrl={project.previewUrl}
            />
            </motion.li>
            )}
        </ul>
    </section>
  )
}

export default ProjectsSection