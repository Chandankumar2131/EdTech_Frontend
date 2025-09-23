import React from 'react'
import Instructor from '../../../assets/Images/teacher3.png'
import HighlightText from './HighlightText'
import CTAButton from "../HomePage/Button"
import { FaArrowRight } from 'react-icons/fa'
import Img from './../../common/Img';

import { motion } from 'framer-motion'

// Subtle soft scale animation
const softScaleUp = {
  hidden: { scale: 0.95, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

// Soft fade-in for text (optional, smooth)
const softFadeIn = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

const InstructorSection = () => {
  return (
    <div>
      <div className='flex flex-col-reverse lg:flex-row gap-10 lg:gap-20 items-center'>

        {/* Instructor Image */}
        <motion.div
          variants={softScaleUp}
          initial='hidden'
          whileInView='show'
          viewport={{ once: false, amount: 0.1 }}
          className='lg:w-[50%]'
        >
          <Img
            src={Instructor}
            alt="Instructor"
            className='shadow-white rounded-3xl'
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          variants={softFadeIn}
          initial='hidden'
          whileInView='show'
          viewport={{ once: false, amount: 0.1 }}
          className='lg:w-[50%] flex flex-col'
        >
          <div className='text-3xl lg:text-4xl font-semobold w-[50%] mb-2'>
            Become an
            <HighlightText text={"Instructor"} />
          </div>

          <p className='font-medium text-[16px] w-[80%] text-gray-400 mb-12'>
            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
          </p>

          <div className='w-fit'>
            <CTAButton active={true} linkto={"/signup"}>
              <div className='flex flex-row gap-2 items-center'>
                Start Learning Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default InstructorSection
