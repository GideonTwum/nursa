'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { FaArrowLeft, FaCheckCircle, FaBookOpen, FaCalendarAlt, FaMapMarkerAlt, FaUserMd, FaQuestionCircle, FaChevronDown, FaChevronUp, FaDownload, FaPhoneAlt } from "react-icons/fa"
import { MdSchool, MdHealthAndSafety, MdGroups, MdTipsAndUpdates } from "react-icons/md"

const checklistItems = [
  { id: 1, title: "Complete Registration", desc: "Ensure all academic registration forms are submitted to the admissions office." },
  { id: 2, title: "Get Student ID Card", desc: "Visit the student affairs office to collect your official student identification card." },
  { id: 3, title: "Purchase Required Textbooks", desc: "Get your nursing fundamentals textbooks from the NURSA shop or university bookstore." },
  { id: 4, title: "Obtain Scrubs & Lab Coat", desc: "Purchase official NURSA scrubs and lab coat required for clinical sessions." },
  { id: 5, title: "Complete Health Screening", desc: "Visit the university health center for mandatory health screening and vaccinations." },
  { id: 6, title: "Attend Orientation Program", desc: "Don't miss the NURSA orientation week activities and campus tour." },
  { id: 7, title: "Join NURSA WhatsApp Group", desc: "Connect with fellow students and stay updated on announcements." },
  { id: 8, title: "Meet Your Academic Advisor", desc: "Schedule a meeting with your assigned academic advisor for guidance." }
]

const importantDates = [
  { date: "May 20, 2026", event: "Freshers Orientation Week Begins", type: "orientation" },
  { date: "May 25, 2026", event: "NURSA Welcome Ceremony", type: "event" },
  { date: "June 1, 2026", event: "First Semester Classes Begin", type: "academic" },
  { date: "June 5, 2026", event: "Clinical Skills Lab Introduction", type: "academic" },
  { date: "June 15, 2026", event: "Last Day for Course Registration", type: "deadline" },
  { date: "July 10, 2026", event: "NURSA Sports Gala", type: "event" }
]

const campusResources = [
  { icon: MdSchool, title: "School of Nursing Building", desc: "Main lecture halls, faculty offices, and student resources center.", location: "Block A, Main Campus" },
  { icon: MdHealthAndSafety, title: "Nursing Skills Laboratory", desc: "Practice clinical procedures with simulation mannequins and equipment.", location: "Block A, Ground Floor" },
  { icon: FaBookOpen, title: "Medical Library", desc: "Access nursing journals, textbooks, and online databases for research.", location: "Central Library, 2nd Floor" },
  { icon: FaUserMd, title: "University Health Center", desc: "Healthcare services, counseling, and health screenings for students.", location: "Block D, Main Campus" }
]

const academicTips = [
  { title: "Attend All Classes", desc: "Nursing education requires consistent attendance. Missing classes can lead to gaps in critical knowledge." },
  { title: "Practice Clinical Skills Regularly", desc: "Book time in the skills lab to practice procedures. Muscle memory is essential for clinical competence." },
  { title: "Form Study Groups", desc: "Collaborative learning helps reinforce concepts. Join or create study groups with classmates." },
  { title: "Use Mnemonics", desc: "Nursing involves memorizing many facts. Create mnemonics to remember drug names, procedures, and anatomy." },
  { title: "Stay Organized", desc: "Use a planner to track assignments, clinical rotations, and exam dates. Nursing programs are demanding." },
  { title: "Take Care of Yourself", desc: "Practice self-care. Get enough sleep, eat well, and manage stress. You can't care for others if you're burnt out." }
]

const faqs = [
  { 
    question: "What should I bring to clinical rotations?", 
    answer: "Bring your student ID, clinical handbook, stethoscope, penlight, nursing scissors, watch with second hand, notepad, and black pens. Wear your complete uniform including scrubs, lab coat, and closed-toe shoes." 
  },
  { 
    question: "How do I join NURSA officially?", 
    answer: "All nursing students are automatically members of NURSA. To participate actively, attend orientation and join the WhatsApp group. You can also run for executive positions during elections." 
  },
  { 
    question: "Where can I get my nursing textbooks?", 
    answer: "Textbooks are available at the NURSA Shop, university bookstore, or you can purchase second-hand copies from senior students. Check the NURSA WhatsApp group for deals." 
  },
  { 
    question: "What vaccinations are required?", 
    answer: "Required vaccinations include Hepatitis B (3 doses), Tetanus, MMR, and annual flu shots. Visit the university health center to complete your immunization records." 
  },
  { 
    question: "How do I contact my academic advisor?", 
    answer: "Academic advisors are assigned during orientation. You can find their contact information on the School of Nursing notice board or ask at the faculty office." 
  },
  { 
    question: "Are there scholarships available for nursing students?", 
    answer: "Yes! NURSA offers merit-based scholarships and financial assistance. Contact the NURSA executive or visit the financial aid office for more information." 
  }
]

const Page = () => {
  const [checkedItems, setCheckedItems] = useState([])
  const [openFaq, setOpenFaq] = useState(null)

  const toggleCheck = (id) => {
    setCheckedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const goHome = () => {
    window.location.href = '/'
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-green-900 pt-8 pb-20 px-4'>
        <div className='max-w-6xl mx-auto'>
          <button 
            onClick={goHome}
            className='flex items-center gap-2 text-white/80 hover:text-white mb-6 cursor-pointer transition-colors'
          >
            <FaArrowLeft />
            <span>Back to Home</span>
          </button>
          <div className='flex flex-col md:flex-row md:items-center gap-6'>
            <div className='flex-1'>
              <p className='text-yellow-500 text-sm font-semibold mb-2'>WELCOME CLASS OF 2026</p>
              <h1 className='text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4'>
                Freshmen Guide
              </h1>
              <p className='text-white/80 text-sm md:text-base max-w-2xl'>
                Everything you need to know to start your nursing journey at Valley View University. 
                This guide will help you navigate your first year with confidence.
              </p>
            </div>
            <div className='hidden md:block'>
              <div className='bg-yellow-500 text-green-900 px-6 py-4 rounded-xl text-center'>
                <p className='text-4xl font-bold'>{checkedItems.length}/{checklistItems.length}</p>
                <p className='text-sm font-medium'>Tasks Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Mobile */}
      <div className='md:hidden max-w-6xl mx-auto px-4 -mt-6'>
        <div className='bg-yellow-500 text-green-900 px-6 py-4 rounded-xl text-center shadow-lg'>
          <p className='text-3xl font-bold'>{checkedItems.length}/{checklistItems.length}</p>
          <p className='text-sm font-medium'>Checklist Tasks Completed</p>
        </div>
      </div>

      {/* Getting Started Checklist */}
      <div className='max-w-6xl mx-auto px-4 py-10 md:-mt-8'>
        <div className='bg-white rounded-xl shadow-lg p-6 md:p-8'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='bg-green-100 p-3 rounded-full'>
              <FaCheckCircle className='text-green-700 text-xl' />
            </div>
            <div>
              <h2 className='text-xl md:text-2xl font-bold text-green-900'>Getting Started Checklist</h2>
              <p className='text-gray-600 text-sm'>Complete these tasks before classes begin</p>
            </div>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {checklistItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  checkedItems.includes(item.id) 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className='flex items-start gap-3'>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    checkedItems.includes(item.id) 
                      ? 'border-green-500 bg-green-500' 
                      : 'border-gray-300'
                  }`}>
                    {checkedItems.includes(item.id) && (
                      <FaCheckCircle className='text-white text-sm' />
                    )}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${checkedItems.includes(item.id) ? 'text-green-700 line-through' : 'text-green-900'}`}>
                      {item.title}
                    </h3>
                    <p className='text-gray-600 text-sm mt-1'>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Important Dates */}
      <div className='max-w-6xl mx-auto px-4 pb-10'>
        <div className='bg-white rounded-xl shadow-lg p-6 md:p-8'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='bg-yellow-100 p-3 rounded-full'>
              <FaCalendarAlt className='text-yellow-600 text-xl' />
            </div>
            <div>
              <h2 className='text-xl md:text-2xl font-bold text-green-900'>Important Dates</h2>
              <p className='text-gray-600 text-sm'>Mark these dates on your calendar</p>
            </div>
          </div>

          <div className='space-y-3'>
            {importantDates.map((item, index) => (
              <div key={index} className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg'>
                <div className='text-center min-w-[80px]'>
                  <p className='text-green-900 font-bold text-sm'>{item.date.split(',')[0]}</p>
                  <p className='text-gray-500 text-xs'>{item.date.split(',')[1]}</p>
                </div>
                <div className='flex-1'>
                  <p className='text-green-900 font-medium'>{item.event}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  item.type === 'orientation' ? 'bg-purple-100 text-purple-700' :
                  item.type === 'event' ? 'bg-yellow-100 text-yellow-700' :
                  item.type === 'academic' ? 'bg-green-100 text-green-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campus Resources */}
      <div className='bg-green-900 py-12 px-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-8'>
            <h2 className='text-2xl md:text-3xl font-bold text-white mb-2'>Campus Resources</h2>
            <p className='text-white/70'>Key locations you'll need to know</p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {campusResources.map((resource, index) => (
              <div key={index} className='bg-green-800/50 rounded-xl p-6'>
                <div className='flex items-start gap-4'>
                  <div className='bg-yellow-500 p-3 rounded-lg'>
                    <resource.icon className='text-green-900 text-2xl' />
                  </div>
                  <div>
                    <h3 className='text-white font-bold text-lg'>{resource.title}</h3>
                    <p className='text-white/70 text-sm mt-1'>{resource.desc}</p>
                    <div className='flex items-center gap-2 mt-3 text-yellow-500'>
                      <FaMapMarkerAlt className='text-sm' />
                      <span className='text-sm'>{resource.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Academic Tips */}
      <div className='max-w-6xl mx-auto px-4 py-10'>
        <div className='bg-white rounded-xl shadow-lg p-6 md:p-8'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='bg-blue-100 p-3 rounded-full'>
              <MdTipsAndUpdates className='text-blue-600 text-xl' />
            </div>
            <div>
              <h2 className='text-xl md:text-2xl font-bold text-green-900'>Academic Success Tips</h2>
              <p className='text-gray-600 text-sm'>Advice from senior nursing students</p>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {academicTips.map((tip, index) => (
              <div key={index} className='bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-5 border border-green-100'>
                <div className='bg-green-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-3'>
                  {index + 1}
                </div>
                <h3 className='text-green-900 font-bold mb-2'>{tip.title}</h3>
                <p className='text-gray-600 text-sm'>{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className='max-w-6xl mx-auto px-4 pb-10'>
        <div className='bg-white rounded-xl shadow-lg p-6 md:p-8'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='bg-purple-100 p-3 rounded-full'>
              <FaQuestionCircle className='text-purple-600 text-xl' />
            </div>
            <div>
              <h2 className='text-xl md:text-2xl font-bold text-green-900'>Frequently Asked Questions</h2>
              <p className='text-gray-600 text-sm'>Common questions from freshmen</p>
            </div>
          </div>

          <div className='space-y-3'>
            {faqs.map((faq, index) => (
              <div key={index} className='border border-gray-200 rounded-lg overflow-hidden'>
                <button 
                  onClick={() => toggleFaq(index)}
                  className='w-full px-5 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors'
                >
                  <span className='text-green-900 font-medium text-left'>{faq.question}</span>
                  {openFaq === index ? (
                    <FaChevronUp className='text-green-700 flex-shrink-0' />
                  ) : (
                    <FaChevronDown className='text-green-700 flex-shrink-0' />
                  )}
                </button>
                {openFaq === index && (
                  <div className='px-5 py-4 bg-white border-t'>
                    <p className='text-gray-600 text-sm leading-relaxed'>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className='max-w-6xl mx-auto px-4 pb-10'>
        <div className='bg-gradient-to-r from-green-700 to-green-900 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6'>
          <div className='text-center md:text-left'>
            <h3 className='text-white text-xl md:text-2xl font-bold mb-2'>Download Freshmen Handbook</h3>
            <p className='text-white/80 text-sm'>Get the complete PDF guide with all the information you need</p>
          </div>
          <button className='bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold px-6 py-3 rounded-lg flex items-center gap-2 cursor-pointer transition-colors'>
            <FaDownload />
            Download PDF
          </button>
        </div>
      </div>

      {/* Contact Section */}
      <div className='bg-green-900 py-12 px-4'>
        <div className='max-w-4xl mx-auto text-center'>
          <MdGroups className='text-yellow-500 text-5xl mx-auto mb-4' />
          <h3 className='text-white text-2xl md:text-3xl font-bold mb-4'>
            Need More Help?
          </h3>
          <p className='text-white/80 mb-6 max-w-lg mx-auto'>
            The NURSA executive team is here to support you. Don't hesitate to reach out if you have questions or need guidance.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button 
              onClick={() => window.location.href = '/#contacts'}
              className='bg-yellow-500 hover:bg-yellow-600 text-green-900 font-medium px-8 py-3 rounded-lg transition-colors cursor-pointer'
            >
              Contact NURSA
            </button>
            <button 
              onClick={() => window.location.href = '/events'}
              className='bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-900 font-medium px-8 py-3 rounded-lg transition-colors cursor-pointer'
            >
              View Upcoming Events
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
