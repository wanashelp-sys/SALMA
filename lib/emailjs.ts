import emailjs from '@emailjs/browser'

const SERVICE_ID = 'service_tv0lnvr'
const TEACHER_TEMPLATE_ID = 'template_3doz3mf'
const STUDENT_TEMPLATE_ID = 'template_jmr3xcd'
const PUBLIC_KEY = '84xd6IihCfLS1SIPD'

// Initialize EmailJS (client-side only)
if (typeof window !== 'undefined') {
  emailjs.init(PUBLIC_KEY)
}

export async function sendTeacherWelcomeEmail({
  teacher_name,
  teacher_email,
  teacher_code,
  login_url
}: {
  teacher_name: string
  teacher_email: string
  teacher_code: string
  login_url: string
}) {
  try {
    await emailjs.send(SERVICE_ID, TEACHER_TEMPLATE_ID, {
      teacher_name,
      teacher_email,
      teacher_code,
      login_url
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to send teacher email:', error)
    return { success: false, error }
  }
}

export async function sendStudentWelcomeEmail({
  student_name,
  student_email,
  teacher_name,
  teacher_code,
  login_url
}: {
  student_name: string
  student_email: string
  teacher_name: string
  teacher_code: string
  login_url: string
}) {
  try {
    await emailjs.send(SERVICE_ID, STUDENT_TEMPLATE_ID, {
      student_name,
      student_email,
      teacher_name,
      teacher_code,
      login_url
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to send student email:', error)
    return { success: false, error }
  }
}
