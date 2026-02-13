require('dotenv').config()

const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const { Pool } = require('pg')

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  console.error('DATABASE_URL is not set. Make sure .env exists and contains DATABASE_URL.')
  process.exit(1)
}
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const products = [
  {
    name: 'Nursing Fundamentals Prospectus',
    description: 'Complete guide covering basic nursing principles, patient care fundamentals, and essential clinical skills for first-year students.',
    price: 45,
    image: '/images/nursa1.png',
    category: 'Prospectus',
    level: 'Year 1',
    inStock: true,
    stock: 50
  },
  {
    name: 'Clinical Procedures Manual',
    description: 'Step-by-step illustrated guide for common clinical procedures including vital signs, medication administration, and wound care.',
    price: 55,
    image: '/images/nursa2.png',
    category: 'Manual',
    level: 'Year 1-2',
    inStock: true,
    stock: 40
  },
  {
    name: 'Pharmacology Study Guide',
    description: 'Comprehensive pharmacology reference covering drug classifications, dosage calculations, and nursing implications.',
    price: 60,
    image: '/images/nursa3.png',
    category: 'Study Guide',
    level: 'Year 2',
    inStock: true,
    stock: 35
  },
  {
    name: 'Midwifery Essentials Prospectus',
    description: 'Specialized guide for midwifery students covering prenatal care, labor management, and postpartum nursing.',
    price: 50,
    image: '/images/nursa4.png',
    category: 'Prospectus',
    level: 'Year 2-3',
    inStock: true,
    stock: 30
  },
  {
    name: 'Medical-Surgical Nursing Guide',
    description: 'Advanced study material covering care of patients with medical and surgical conditions across various body systems.',
    price: 65,
    image: '/images/dinner.png',
    category: 'Study Guide',
    level: 'Year 3',
    inStock: true,
    stock: 25
  },
  {
    name: 'NURSA Scrubs (Top & Bottom)',
    description: 'Official NURSA branded scrubs in green. Comfortable, durable, and professional for clinical rotations.',
    price: 80,
    image: '/images/nursabg.png',
    category: 'Merchandise',
    level: 'All Years',
    inStock: true,
    stock: 100
  },
  {
    name: 'Anatomy & Physiology Atlas',
    description: 'Detailed anatomical illustrations and physiological explanations essential for understanding human body systems.',
    price: 70,
    image: '/images/nursa1.png',
    category: 'Study Guide',
    level: 'Year 1',
    inStock: false,
    stock: 0
  },
  {
    name: 'NURSA Lab Coat',
    description: 'Professional white lab coat with NURSA embroidery. Required for laboratory sessions and clinical visits.',
    price: 45,
    image: '/images/nursa2.png',
    category: 'Merchandise',
    level: 'All Years',
    inStock: true,
    stock: 60
  }
]

const events = [
  {
    title: 'Annual NURSA Dinner & Awards Night',
    description: 'Join us for an elegant evening celebrating academic excellence and outstanding contributions to the nursing community. Dress code: Formal attire.',
    image: '/images/dinner.png',
    date: new Date('2026-03-15'),
    time: '6:00 PM - 10:00 PM',
    location: 'Valley View University Auditorium'
  },
  {
    title: 'Health Outreach Program',
    description: 'A community health screening and education event where nursing students provide free health services to local communities including blood pressure checks, health education, and basic consultations.',
    image: '/images/nursa2.png',
    date: new Date('2026-04-08'),
    time: '8:00 AM - 4:00 PM',
    location: 'Oyibi Community Center'
  },
  {
    title: 'Freshers Orientation Week',
    description: 'Welcome new nursing students with campus tours, mentorship pairing, and introduction to NURSA activities and resources. Meet your seniors and make lifelong connections.',
    image: '/images/nursa1.png',
    date: new Date('2026-05-20'),
    time: '9:00 AM - 3:00 PM',
    location: 'School of Nursing Building'
  },
  {
    title: 'Clinical Skills Workshop',
    description: 'Hands-on workshop focusing on essential clinical skills including IV insertion, wound care, and patient assessment techniques guided by experienced practitioners.',
    image: '/images/nursa3.png',
    date: new Date('2026-06-05'),
    time: '10:00 AM - 2:00 PM',
    location: 'Nursing Skills Lab'
  },
  {
    title: 'Mental Health Awareness Seminar',
    description: 'An important seminar addressing mental health challenges among healthcare students and professionals. Learn coping strategies and available support resources.',
    image: '/images/nursa4.png',
    date: new Date('2026-06-18'),
    time: '2:00 PM - 5:00 PM',
    location: 'Main Campus Lecture Hall B'
  },
  {
    title: 'NURSA Sports Gala',
    description: 'Annual inter-class sports competition featuring football, volleyball, athletics, and more. Come support your class and enjoy a day of fun and fitness.',
    image: '/images/nursabg.png',
    date: new Date('2026-07-10'),
    time: '7:00 AM - 6:00 PM',
    location: 'University Sports Complex'
  }
]

const galleryImages = [
  { url: '/images/nursa1.png', title: 'NURSA Students in Action', category: 'Campus Life' },
  { url: '/images/nursa2.png', title: 'Clinical Training Session', category: 'Academics' },
  { url: '/images/nursa3.png', title: 'Student Group Photo', category: 'Campus Life' },
  { url: '/images/nursa4.png', title: 'Nursing Skills Practice', category: 'Academics' },
  { url: '/images/dinner.png', title: 'Annual Dinner & Awards', category: 'Events' },
  { url: '/images/presido.png', title: 'NURSA President', category: 'Leadership' },
  { url: '/images/nursabg.png', title: 'Campus Grounds', category: 'Campus Life' },
  { url: '/images/nursalogo.jpg', title: 'NURSA Official Logo', category: 'Branding' }
]

const newsArticles = [
  { title: 'NURSA President Meets with University Administration', content: 'In a historic meeting, NURSA leadership discussed improved facilities and resources for nursing students with the university administration. Key topics included simulation lab upgrades, clinical placement opportunities, and student welfare initiatives.', excerpt: 'In a historic meeting, NURSA leadership discussed improved facilities and resources for nursing students with the university administration.', category: 'Announcement', published: true },
  { title: 'Nursing Students Excel in National Examinations', content: 'Valley View University nursing students achieved a 95% pass rate in the recent national licensing examinations, the highest in the institution\'s history. Congratulations to all graduates!', excerpt: 'Valley View University nursing students achieved a 95% pass rate in the recent national licensing examinations, the highest in the institution\'s history.', category: 'Achievement', published: true },
  { title: 'New Simulation Lab Equipment Arrives', content: 'State-of-the-art simulation mannequins and medical equipment have been installed in the nursing skills laboratory for enhanced practical training. Students can now practice complex scenarios in a realistic environment.', excerpt: 'State-of-the-art simulation mannequins and medical equipment have been installed in the nursing skills laboratory for enhanced practical training.', category: 'News', published: true },
  { title: 'NURSA Partners with Ghana Health Service', content: 'A new memorandum of understanding has been signed to provide more internship opportunities for nursing students across various health facilities. This partnership will expand practical training options for our students.', excerpt: 'A new memorandum of understanding has been signed to provide more internship opportunities for nursing students across various health facilities.', category: 'Partnership', published: true },
  { title: 'Call for Volunteers: Community Health Campaign', content: 'NURSA is seeking volunteers for an upcoming community health campaign in underserved areas. Sign up to make a difference in people\'s lives. Contact the NURSA office for more information.', excerpt: 'NURSA is seeking volunteers for an upcoming community health campaign in underserved areas. Sign up to make a difference in people\'s lives.', category: 'Volunteer', published: true }
]

async function main() {
  let seeded = false

  const productCount = await prisma.product.count()
  if (productCount === 0) {
    for (const p of products) {
      await prisma.product.create({ data: p })
      console.log(`Created product: ${p.name}`)
    }
    seeded = true
  } else {
    console.log('Products already exist, skipping.')
  }

  const eventCount = await prisma.event.count()
  if (eventCount === 0) {
    for (const e of events) {
      await prisma.event.create({ data: e })
      console.log(`Created event: ${e.title}`)
    }
    seeded = true
  } else {
    console.log('Events already exist, skipping.')
  }

  const galleryCount = await prisma.galleryImage.count()
  if (galleryCount === 0) {
    for (const img of galleryImages) {
      await prisma.galleryImage.create({ data: img })
      console.log(`Created gallery image: ${img.title}`)
    }
  } else {
    console.log('Gallery images already exist, skipping.')
  }

  const newsCount = await prisma.newsArticle.count()
  if (newsCount === 0) {
    for (const a of newsArticles) {
      await prisma.newsArticle.create({ data: a })
      console.log(`Created news article: ${a.title}`)
    }
  } else {
    console.log('News articles already exist, skipping.')
  }

  console.log('Seed completed.')
  await pool.end()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
