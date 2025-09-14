"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  HelpCircle,
  Filter,
  Clock,
  Users,
  MoreHorizontal,
  FileText,
  Mail,
  MessageSquare,
  Bookmark,
  Edit,
  Download,
  X,
  Send,
  Edit3,
  Tag,
  Upload,
  Sparkles,
  Monitor,
  Save,
  Plus,
  Trash2,
  User,
  Calendar,
  LogOut,
  CalendarDays,
} from "lucide-react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/sidebar"
import Link from "next/link"
import { supabase, UserProfile } from "@/lib/supabase"

const callsData = [
  {
    id: "call_sally",
    title: "Sally Sales call",
    company: "Acme Solutions",
    date: "27/08/2025",
    duration: "45min",
    attendees: 3,
    actions: {
      notes: true,
      email: true,
      transcript: true,
      report: true,
      minutes: false,
      presentation: true,
    },
    postCallCompletion: 95,
    tasksCompleted: 4,
    totalTasks: 5,
    pendingTasks: 1,
    aiSummary:
      "Comprehensive meeting copilot evaluation session with Acme Solutions. Discussed real-time transcription, mid-call assistance, security protocols, and CRM integration capabilities.",
    owner: "Sally",
    ownerAvatar: "/professional-woman.png",
    labels: [
      { text: "Acme Solutions", color: "green" },
      { text: "High Priority", color: "red" },
      { text: "Demo", color: "blue" },
    ],
    documents: [
      { name: "Meeting_Copilot_Demo.pdf", type: "document", size: "1.8 MB", uploadedAt: "2025-08-27" },
      { name: "Security_Compliance.pdf", type: "document", size: "892 KB", uploadedAt: "2025-08-27" },
    ],
  },
  {
    id: "call_001",
    title: "AI-WOP Demo — Dell Ops",
    company: "Dell",
    date: "26/08/2025",
    duration: "45min",
    attendees: 2,
    actions: {
      notes: true,
      email: true,
      transcript: true,
      report: false,
      minutes: false,
      presentation: true,
    },
    postCallCompletion: 85,
    tasksCompleted: 3,
    totalTasks: 5,
    pendingTasks: 2,
    aiSummary:
      "Successful demo of AI-WOP platform to Dell operations team. Key discussion points included latency benchmarks,...",
    owner: "Akshith",
    ownerAvatar: "/placeholder-user.jpg",
    labels: [
      { text: "Dell", color: "blue" },
      { text: "Technical", color: "purple" },
    ],
    documents: [
      { name: "Dell_Proposal.pdf", type: "document", size: "2.3 MB", uploadedAt: "2025-08-25" },
      { name: "Follow_up_email.eml", type: "email", size: "45 KB", uploadedAt: "2025-08-25" },
    ],
  },
  {
    id: "call_002",
    title: "Security Review Meeting",
    company: "Kyndryl",
    date: "24/08/2025",
    duration: "60min",
    attendees: 2,
    actions: {
      notes: false,
      email: true,
      transcript: true,
      report: true,
      minutes: false,
      presentation: false,
    },
    postCallCompletion: 60,
    tasksCompleted: 1,
    totalTasks: 3,
    pendingTasks: 2,
    aiSummary:
      "Comprehensive security assessment conducted with Kyndryl team. Discussed data encryption, access controls, and...",
    owner: "Maria",
    ownerAvatar: "/placeholder-user.jpg",
    labels: [
      { text: "Kyndryl", color: "green" },
      { text: "Security", color: "red" },
      { text: "Compliance", color: "orange" },
      { text: "Review", color: "gray" },
    ],
    documents: [],
  },
  {
    id: "call_003",
    title: "Pilot Readout Session",
    company: "Acme Robotics",
    date: "23/08/2025",
    duration: "90min",
    attendees: 3,
    actions: {
      notes: true,
      email: true,
      transcript: true,
      report: true,
      minutes: true,
      presentation: true,
    },
    postCallCompletion: 100,
    tasksCompleted: 4,
    totalTasks: 4,
    pendingTasks: 0,
    aiSummary: "Excellent pilot results presentation to Acme Robotics leadership. Demonstrated 40% efficiency...",
    owner: "David",
    ownerAvatar: "/placeholder-user.jpg",
    labels: [
      { text: "Acme Robotics", color: "purple" },
      { text: "Pilot", color: "green" },
      { text: "Success", color: "blue" },
    ],
    documents: [{ name: "Pilot_Results.pptx", type: "document", size: "5.7 MB", uploadedAt: "2025-08-23" }],
  },
  {
    id: "call_004",
    title: "Technical Deep Dive",
    company: "Globex Corp",
    date: "22/08/2025",
    duration: "75min",
    attendees: 2,
    actions: {
      notes: false,
      email: true,
      transcript: true,
      report: false,
      minutes: false,
      presentation: false,
    },
    postCallCompletion: 40,
    tasksCompleted: 2,
    totalTasks: 5,
    pendingTasks: 3,
    aiSummary: "In-depth technical discussion covering architecture, scalability, and integration requirements...",
    owner: "Sarah",
    ownerAvatar: "/placeholder-user.jpg",
    labels: [
      { text: "Globex Corp", color: "gray" },
      { text: "Technical", color: "purple" },
      { text: "Architecture", color: "blue" },
      { text: "Integration", color: "orange" },
      { text: "Planning", color: "green" },
    ],
    documents: [],
  },
  {
    id: "call_005",
    title: "Quarterly Business Review",
    company: "Dell",
    date: "21/08/2025",
    duration: "120min",
    attendees: 3,
    actions: {
      notes: true,
      email: true,
      transcript: true,
      report: true,
      minutes: false,
      presentation: true,
    },
    postCallCompletion: 90,
    tasksCompleted: 8,
    totalTasks: 9,
    pendingTasks: 1,
    aiSummary:
      "Comprehensive quarterly review covering performance metrics, strategic initiatives, and future roadmap...",
    owner: "Michael",
    ownerAvatar: "/placeholder-user.jpg",
    labels: [
      { text: "Dell", color: "blue" },
      { text: "Quarterly Review", color: "green" },
      { text: "Business", color: "purple" },
    ],
    documents: [
      { name: "Q3_Report.pdf", type: "document", size: "3.1 MB", uploadedAt: "2025-08-21" },
      { name: "Meeting_Agenda.docx", type: "document", size: "156 KB", uploadedAt: "2025-08-21" },
    ],
  },
  {
    id: "call_006",
    title: "Discovery Call — Manufacturing",
    company: "Acme Robotics",
    date: "20/08/2025",
    duration: "45min",
    attendees: 2,
    actions: {
      notes: false,
      email: true,
      transcript: true,
      report: false,
      minutes: true,
      presentation: false,
    },
    postCallCompletion: 75,
    tasksCompleted: 3,
    totalTasks: 4,
    pendingTasks: 1,
    aiSummary: "Initial discovery session focused on manufacturing processes and automation opportunities...",
    owner: "Lisa",
    ownerAvatar: "/placeholder-user.jpg",
    labels: [
      { text: "Acme Robotics", color: "purple" },
      { text: "Discovery", color: "blue" },
      { text: "Manufacturing", color: "gray" },
    ],
    documents: [],
  },
]

const discoNotes = {
  call_sally: {
    discovered: [
      "Sally provides real-time transcription with speaker labeling and action item tracking",
      "Integration available with Teams, Zoom, and Google Meet platforms",
      "Mid-call assistance provides contextual answers and case studies",
      "CRM integration with private workspace provisioning",
      "Configurable data retention and residency settings",
    ],
    issues: [
      "Current process requires switching between multiple tabs during calls",
      "Reps struggle to find relevant case studies and proof points mid-call",
      "Manual action item capture is unreliable",
      "Need for real-time objection handling support",
      "Security and compliance concerns around data handling",
    ],
    solutions: [
      "Implement Sally as silent attendee or native sidebar integration",
      "Deploy central library with customizable talk tracks per segment/region",
      "Use language cues to automatically capture action items with owners and due dates",
      "Provide three-bullet answers with suggested follow-up questions",
      "Configure hybrid edge plus cloud architecture for optimal latency",
    ],
    concerns: [
      "Data security and potential use for model training",
      "Integration complexity with existing CRM systems",
      "User adoption and training requirements",
      "Potential latency issues with hybrid cloud setup",
      "Compliance with data residency requirements",
    ],
    opportunities: [
      "20% improvement in sales cycle time with better mid-call support",
      "Enhanced customer experience through faster, more accurate responses",
      "Improved action item follow-through and accountability",
      "Scalable solution across multiple regions and segments",
      "Competitive advantage through AI-powered sales assistance",
    ],
    additionalNotes: "",
  },
}

const mockTranscript = {
  call_sally: {
    title: "Sally Sales call",
    date: "Aug 27, 2025",
    entries: [
      {
        timestamp: "00:00",
        speaker: "Person 1",
        text: "Thanks for joining—um, we're evaluating meeting copilots. We want faster answers mid-call and, ah, fewer tabs.",
        uncertainWords: [],
      },
      {
        timestamp: "00:08",
        speaker: "Person 3",
        text: "Perfect—uh, I'll walk you through how Sally sits in your calls, feeds quick answers, and handles the follow-ups.",
        uncertainWords: [],
      },
      {
        timestamp: "00:17",
        speaker: "Person 2",
        text: "And we'll need to understand security and integrations, you know?",
        uncertainWords: [],
      },
      {
        timestamp: "00:23",
        speaker: "Person 3",
        text: "Absolutely—let's dive in.",
        uncertainWords: [],
      },
      {
        timestamp: "00:33",
        speaker: "Person 1",
        text: "So, um, is it listening already?",
        uncertainWords: [],
      },
      {
        timestamp: "00:41",
        speaker: "Person 3",
        text: "Yep—real-time transcription with speakers labeled and actions tied to owners.",
        uncertainWords: [],
      },
      {
        timestamp: "00:49",
        speaker: "Person 2",
        text: "Where does the transcript live after the call?",
        uncertainWords: [],
      },
      {
        timestamp: "00:58",
        speaker: "Person 3",
        text: "In your CRM and a private workspace we provision—retention and data residency are configurable.",
        uncertainWords: [],
      },
      {
        timestamp: "01:12",
        speaker: "Person 1",
        text: 'Mid-call, reps ask, ah, "What case study should I cite?" How does this help?',
        uncertainWords: [],
      },
      {
        timestamp: "01:22",
        speaker: "Person 3",
        text: 'Example: "What proof point for a 20% psycho-time improvement in electronics?"',
        uncertainWords: ["psycho-time"],
      },
      {
        timestamp: "01:34",
        speaker: "Person 1",
        text: "Nice—short and ready.",
        uncertainWords: [],
      },
      {
        timestamp: "01:46",
        speaker: "Person 2",
        text: "Integrations—Teams, Zoom, Google Meet?",
        uncertainWords: [],
      },
      {
        timestamp: "01:57",
        speaker: "Person 3",
        text: "All three—join as a silent attendee or via a native sidebar.",
        uncertainWords: [],
      },
      {
        timestamp: "02:10",
        speaker: "Person 1",
        text: "We also need talk tracks for objections, uh, in the moment.",
        uncertainWords: [],
      },
      {
        timestamp: "02:22",
        speaker: "Person 3",
        text: 'Prompt example: "What\'s your latency if we do hybrid edge plus cloud?"—we return a concise three-bullet answer and a suggested follow-up question.',
        uncertainWords: [],
      },
      {
        timestamp: "02:35",
        speaker: "Person 2",
        text: "Can we edit those tracks?",
        uncertainWords: [],
      },
      {
        timestamp: "02:49",
        speaker: "Person 3",
        text: "Yep—central library with versions per segment or region.",
        uncertainWords: [],
      },
      {
        timestamp: "03:03",
        speaker: "Person 1",
        text: "How do action items get captured, ah, reliably?",
        uncertainWords: [],
      },
      {
        timestamp: "03:18",
        speaker: "Person 3",
        text: 'From language cues—phrases like "we\'ll send" or dates trigger tasks with owners and due dates.',
        uncertainWords: [],
      },
      {
        timestamp: "03:33",
        speaker: "Person 2",
        text: "Security—where does our data go? Is it used for model training?",
        uncertainWords: [],
      },
      {
        timestamp: "03:45",
        speaker: "Person 3",
        text: "Your choice of SaaS or private VPC. No customer data is used to train foundation models. PII redaction is on by default, plus SSL/SAML, SCIM, audit logs, and role-based redaction.",
        uncertainWords: ["SSL/SAML"],
      },
      {
        timestamp: "03:58",
        speaker: "Person 2",
        text: "And deletion policies?",
        uncertainWords: [],
      },
      {
        timestamp: "04:12",
        speaker: "Person 3",
        text: "Granular—per call, per user, or org-wide; there's also a purge API.",
        uncertainWords: [],
      },
      {
        timestamp: "04:26",
        speaker: "Person 1",
        text: "CRM sync tends to get messy. What do you write back?",
        uncertainWords: [],
      },
      {
        timestamp: "04:40",
        speaker: "Person 3",
        text: "Contacts, meeting summary, medic fields, next steps, and opportunity updates—with a preview first.",
        uncertainWords: ["medic"],
      },
      {
        timestamp: "04:55",
        speaker: "Person 2",
        text: "Can we map to custom fields?",
        uncertainWords: [],
      },
      {
        timestamp: "05:10",
        speaker: "Person 3",
        text: "Yes—there's a field mapper and a dry-run mode before auto-sync.",
        uncertainWords: [],
      },
      {
        timestamp: "05:24",
        speaker: "Person 1",
        text: "Post-call deliverables—what do we get, um, right after?",
        uncertainWords: [],
      },
      {
        timestamp: "05:38",
        speaker: "Person 3",
        text: "A recap email, a short six-slide deck outline, tasks for your project tool, and a QA scorecard.",
        uncertainWords: [],
      },
      {
        timestamp: "05:53",
        speaker: "Person 2",
        text: "How do you search our knowledge base?",
        uncertainWords: [],
      },
      {
        timestamp: "06:08",
        speaker: "Person 3",
        text: "Connectors for Google Drive, Confluence, Notion, SharePoint, and Zendesk—indexed with permissions intact.",
        uncertainWords: [],
      },
      {
        timestamp: "06:22",
        speaker: "Person 2",
        text: "Can we block certain folders?",
        uncertainWords: [],
      },
      {
        timestamp: "06:36",
        speaker: "Person 3",
        text: "Yes—allow/deny lists at the collection level.",
        uncertainWords: [],
      },
      {
        timestamp: "06:51",
        speaker: "Person 1",
        text: "Pricing?",
        uncertainWords: [],
      },
      {
        timestamp: "07:05",
        speaker: "Person 3",
        text: "Simple per-seat with a pilot bundle—most teams start with 25 seats for 60 days; includes implementation and success reviews. Final price depends on integrations and QA depth.",
        uncertainWords: [],
      },
      {
        timestamp: "07:19",
        speaker: "Person 1",
        text: "Fair.",
        uncertainWords: [],
      },
      {
        timestamp: "07:34",
        speaker: "Person 2",
        text: "Can it suggest next-best actions during the call?",
        uncertainWords: [],
      },
      {
        timestamp: "07:49",
        speaker: "Person 3",
        text: "Yes—contextual quick actions like drafting an ROI calc, inserting a case study, booking a kickoff, or creating a ticket.",
        uncertainWords: [],
      },
      {
        timestamp: "08:03",
        speaker: "Person 1",
        text: "Uh—Tuesday 3pm works for kickoff.",
        uncertainWords: [],
      },
      {
        timestamp: "08:18",
        speaker: "Person 3",
        text: "Great—consider it scheduled with an agenda.",
        uncertainWords: [],
      },
      {
        timestamp: "08:32",
        speaker: "Person 1",
        text: 'Objection: "Competitors claim similar copilots." What would a rep see?',
        uncertainWords: [],
      },
      {
        timestamp: "08:47",
        speaker: "Person 3",
        text: "A concise competitive one-pager with three differentiators and neutral trade-offs.",
        uncertainWords: [],
      },
      {
        timestamp: "09:00",
        speaker: "Person 2",
        text: "Edge cases—poor network, multiple accents?",
        uncertainWords: [],
      },
      {
        timestamp: "09:14",
        speaker: "Person 3",
        text: "Offline capture with later upload; ASR handles accents well, and you can add a glossary for product names.",
        uncertainWords: [],
      },
      {
        timestamp: "09:28",
        speaker: "Person 2",
        text: "Can legal review templates?",
        uncertainWords: [],
      },
      {
        timestamp: "09:40",
        speaker: "Person 3",
        text: "Yes—there's an approval workflow per template.",
        uncertainWords: [],
      },
    ],
  },
  call_001: {
    title: "AI-WOP Demo — Dell Ops",
    date: "Aug 25, 2025",
    entries: [
      {
        timestamp: "00:02:15",
        speaker: "Akshith",
        text: "Thanks for joining today's demo, Mei. I'm excited to show you our AI-WOP solution and how it can help Dell optimize your operations.",
        uncertainWords: [],
      },
      {
        timestamp: "00:02:45",
        speaker: "Mei Qi",
        text: "Great! We're particularly interested in the latency improvements and how this integrates with our existing infrastructure.",
        uncertainWords: ["latency", "infrastructure"],
      },
      {
        timestamp: "00:03:20",
        speaker: "Akshith",
        text: "Absolutely. Let me start by showing you our benchmarking results. We've seen up to 40% reduction in processing time for similar enterprise deployments.",
        uncertainWords: ["benchmarking"],
      },
      {
        timestamp: "00:04:10",
        speaker: "Mei Qi",
        text: "That's impressive. What about compliance requirements? We have strict security protocols that need to be maintained.",
        uncertainWords: ["compliance"],
      },
      {
        timestamp: "00:04:45",
        speaker: "Akshith",
        text: "Security is paramount in our design. We're SOC 2 compliant and can provide detailed documentation on our zero-downtime integration approach.",
        uncertainWords: [],
      },
    ],
  },
}

const mockChatMessages = [
  {
    id: 1,
    type: "user",
    message: "How does Sally integrate with our existing CRM system?",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    type: "ai",
    message:
      "Based on the transcript, Sally integrates directly with your CRM and provisions a private workspace. The transcript and data residency are configurable, and Person 3 mentioned that retention settings can be customized to meet your compliance requirements.",
    timestamp: "10:30 AM",
  },
]

export default function Dashboard() {
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== "undefined") {
      const authed = localStorage.getItem("sally_auth") === "true"
      if (!authed) {
        router.replace("/login")
      }
    }
  }, [router])
  const [isFullCalendarView, setIsFullCalendarView] = useState(false)
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    type: "meeting",
    description: "",
  })
  const [isUserSettingsOpen, setIsUserSettingsOpen] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [selectedEmailAction, setSelectedEmailAction] = useState<string | null>(null)
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([])
  const [emailSubject, setEmailSubject] = useState<string>("")
  const [emailBody, setEmailBody] = useState<string>("")
  const [toInput, setToInput] = useState("")

  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isOutlookConnected, setIsOutlookConnected] = useState(false)
  const [isGoogleConnected, setIsGoogleConnected] = useState(true) // Mock: Google is connected
  const [mockCalendarEvents, setMockCalendarEvents] = useState([
    {
      id: 1,
      title: "Team Standup",
      time: "9:00 AM",
      date: "Today",
      type: "meeting",
      source: "google",
    },
    {
      id: 2,
      title: "Client Demo - Acme Corp",
      time: "2:00 PM",
      date: "Today",
      type: "demo",
      source: "google",
    },
    {
      id: 3,
      title: "Sales Review Meeting",
      time: "10:00 AM",
      date: "Tomorrow",
      type: "meeting",
      source: "google",
    },
    {
      id: 4,
      title: "Product Planning Session",
      time: "3:30 PM",
      date: "Tomorrow",
      type: "planning",
      source: "google",
    },
  ])

  const handleConnectOutlook = () => {
    setIsOutlookConnected(true)
    alert("Outlook calendar connected successfully!")
  }

  const handleConnectGoogle = () => {
    setIsGoogleConnected(true)
    alert("Google calendar connected successfully!")
  }

  const fetchUserProfile = async () => {
    setIsLoadingProfile(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        const { data: profile, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('uid', user.id)
          .single()

        if (error) {
          console.error('Error fetching user profile:', error)
          // Fallback to localStorage data
          const fullName = localStorage.getItem('sally_fullname') || 'User'
          const email = localStorage.getItem('sally_email') || 'user@example.com'
          setUserProfile({
            id: user.id,
            username: user.user_metadata?.username || 'user',
            fullName: fullName,
            dateJoined: user.created_at,
            email: email,
            organisation: user.user_metadata?.organisation || '',
            uid: user.id,
            purpose: user.user_metadata?.purpose || '',
            outlookConnected: false,
            gmailConnected: false,
            callsTaken: 0
          })
        } else {
          setUserProfile(profile)
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    } finally {
      setIsLoadingProfile(false)
    }
  }

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      const event = {
        id: Date.now().toString(),
        title: newEvent.title,
        date: newEvent.date,
        time: newEvent.time,
        type: newEvent.type,
        source: "manual",
        description: newEvent.description,
      }
      setMockCalendarEvents([...mockCalendarEvents, event])
      setNewEvent({ title: "", date: "", time: "", type: "meeting", description: "" })
      setIsAddEventOpen(false)
    }
  }

  const generateCalendarGrid = () => {
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Email drafts based on post-call actions
  const emailDrafts = {
    "Send zero-downtime integration playbook": {
      subject: "Zero-Downtime Integration Playbook - Sally Meeting Copilot",
      body: `Hi team,

Following our discussion about Sally's meeting copilot capabilities, I'm sharing our zero-downtime integration playbook as requested.

This playbook covers:
• Step-by-step integration process
• Security protocols and compliance requirements
• CRM integration best practices
• Data residency configuration options

The playbook ensures seamless deployment without disrupting your existing workflows.

Best regards,`,
    },
    "Send recent case-study summary to Dell team": {
      subject: "Sally Meeting Copilot - Recent Case Study Summary",
      body: `Dear Dell team,

Thank you for your interest in Sally's meeting copilot solution. As discussed, here's a summary of our recent case studies relevant to your use case.

Key highlights:
• 40% improvement in meeting efficiency
• Real-time transcription accuracy of 95%+
• Seamless CRM integration with major platforms
• Enterprise-grade security and compliance

The attached case studies demonstrate similar implementations in enterprise environments.

Looking forward to our next steps.

Best regards,`,
    },
    "Email KPI baseline template used in previous pilots": {
      subject: "KPI Baseline Template - Sally Meeting Copilot Implementation",
      body: `Hi there,

As requested during our meeting, I'm sharing the KPI baseline template we use for Sally meeting copilot implementations.

This template includes:
• Meeting efficiency metrics
• Transcription accuracy benchmarks
• User adoption tracking
• ROI calculation framework

This will help you establish baseline measurements before implementation and track improvements post-deployment.

Best regards,`,
    },
    "Email six-week Gantt chart": {
      subject: "Sally Implementation Timeline - 6-Week Gantt Chart",
      body: `Hello,

Please find attached the six-week implementation Gantt chart for Sally meeting copilot as discussed in our meeting.

Timeline overview:
• Week 1-2: Initial setup and security configuration
• Week 3-4: CRM integration and testing
• Week 5: User training and pilot rollout
• Week 6: Full deployment and optimization

This timeline ensures a smooth rollout with minimal disruption to your current operations.

Best regards,`,
    },
    "Send latency benchmarks": {
      subject: "Sally Meeting Copilot - Latency Performance Benchmarks",
      body: `Hi team,

Following our discussion about performance requirements, here are the latency benchmarks for Sally's meeting copilot.

Performance metrics:
• Real-time transcription: <200ms latency
• AI response generation: <500ms average
• CRM data sync: <1 second
• Cross-platform compatibility: 99.9% uptime

These benchmarks demonstrate Sally's ability to provide real-time assistance without impacting meeting flow.

Best regards,`,
    },
    "Send compliance letters": {
      subject: "Sally Meeting Copilot - Compliance Documentation",
      body: `Dear compliance team,

As requested, please find attached our comprehensive compliance documentation for Sally meeting copilot.

Included documentation:
• SOC 2 Type II certification
• GDPR compliance statement
• Data residency options
• Security audit reports

All documentation demonstrates our commitment to enterprise-grade security and regulatory compliance.

Best regards,`,
    },
  }

  // Suggested recipients based on call context
  const suggestedRecipients = [
    { name: "IT Security Team", email: "security@acmesolutions.com", role: "Security Review" },
    { name: "CRM Administrator", email: "crm-admin@acmesolutions.com", role: "Integration" },
    { name: "Project Manager", email: "pm@acmesolutions.com", role: "Implementation" },
    { name: "Compliance Officer", email: "compliance@acmesolutions.com", role: "Regulatory" },
    { name: "Executive Sponsor", email: "exec@acmesolutions.com", role: "Decision Making" },
  ]

  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false)
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isRelabelOpen, setIsRelabelOpen] = useState(false)
  const [speakerNames, setSpeakerNames] = useState<{ [key: string]: string }>({
    "Person 1": "Person 1",
    "Person 2": "Person 2",
    "Person 3": "Person 3",
  })
  const [tempSpeakerNames, setTempSpeakerNames] = useState<{ [key: string]: string }>({})
  const [chatMessages, setChatMessages] = useState(mockChatMessages)
  const [chatInput, setChatInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCreateCallOpen, setIsCreateCallOpen] = useState(false)
  const [upcomingCalls, setUpcomingCalls] = useState<any[]>([])
  const [newCall, setNewCall] = useState({
    title: "",
    company: "",
    date: "",
    time: "",
    attendees: "",
    description: "",
  })
  const [isRenameOpen, setIsRenameOpen] = useState(false)
  const [isLabelOpen, setIsLabelOpen] = useState(false)
  const [isCallDetailsOpen, setIsCallDetailsOpen] = useState(false)
  const [selectedCallForDetails, setSelectedCallForDetails] = useState<any>(null)
  const [selectedCallForEdit, setSelectedCallForEdit] = useState<string | null>(null)
  const [renameTitle, setRenameTitle] = useState("")
  const [labelText, setLabelText] = useState("")
  const [labelColor, setLabelColor] = useState("blue")
  const [calls, setCalls] = useState(callsData)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false)
  const [editedTranscript, setEditedTranscript] = useState<{ [key: string]: string }>({})

  const [isNotesOpen, setIsNotesOpen] = useState(false)
  const [selectedCallForNotes, setSelectedCallForNotes] = useState(null)
  const [editableNotes, setEditableNotes] = useState(null)
  const [isEditingNotes, setIsEditingNotes] = useState(false)
  const [expandedLabels, setExpandedLabels] = useState<{ [key: string]: boolean }>({})

  const [isReportOpen, setIsReportOpen] = useState(false)
  const [selectedCallForReport, setSelectedCallForReport] = useState<any>(null)
  const [reportContent, setReportContent] = useState({
    title: "",
    executiveSummary: "",
    keyTopics: [] as string[],
    outcomes: [] as string[],
    nextSteps: [] as string[],
    risks: [] as string[],
    opportunities: [] as string[],
  })
  const [isEditingReport, setIsEditingReport] = useState(false)

  const uniqueCompanyLabels = Array.from(
    new Set(calls.flatMap((call) => call.labels?.map((label) => label.text) || [])),
  ).map((labelText) => {
    const call = calls.find((c) => c.labels?.some((label) => label.text === labelText))
    const label = call?.labels?.find((l) => l.text === labelText)
    return {
      text: labelText,
      color: label?.color || "gray",
    }
  })

  const filteredCalls =
    selectedFilters.length === 0
      ? calls
      : calls.filter((call) => call.labels && call.labels.some((label) => selectedFilters.includes(label.text)))

  const toggleFilter = (labelText: string) => {
    setSelectedFilters((prev) =>
      prev.includes(labelText) ? prev.filter((f) => f !== labelText) : [...prev, labelText],
    )
  }

  const clearAllFilters = () => {
    setSelectedFilters([])
  }

  const [aiGenerationModal, setAiGenerationModal] = useState<{
    isOpen: boolean
    action: string
    type: "email" | "report"
    content: string
  }>({
    isOpen: false,
    action: "",
    type: "email",
    content: "",
  })

  const labelColors = [
    { name: "Blue", value: "blue", bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
    { name: "Green", value: "green", bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
    { name: "Red", value: "red", bg: "bg-red-100", text: "text-red-800", border: "border-red-200" },
    { name: "Orange", value: "orange", bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-200" },
    { name: "Purple", value: "purple", bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-200" },
    { name: "Gray", value: "gray", bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200" },
  ]

  const handleViewTranscript = (callId: string) => {
    setSelectedCallId(callId)
    setIsTranscriptOpen(true)
  }

  const handleSendMessage = () => {
    if (!chatInput.trim() || isLoading) return

    const newMessage = {
      id: chatMessages.length + 1,
      type: "user" as const,
      message: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setChatMessages([...chatMessages, newMessage])
    const userInput = chatInput.toLowerCase()
    setChatInput("")
    setIsLoading(true)

    // Check for specific hardcoded responses
    let aiResponse = ""

    if (userInput.includes("5 point summary") || userInput.includes("summary of this meeting")) {
      aiResponse =
        "Here's a 5-point summary of the meeting:\n\n• Evaluated Sally meeting copilots for faster answers and fewer tabs during calls\n• Discussed real-time transcription with speaker labeling and action tracking\n• Reviewed security integrations including SSL/SAML authentication protocols\n• Explored CRM integration with configurable data residency and retention settings\n• Demonstrated Sally's ability to handle follow-ups and provide private workspace provisioning"
    } else if (userInput.includes("follow up actions") || userInput.includes("follow-up actions")) {
      aiResponse =
        "Based on the meeting, the follow-up actions include:\n\n• Send integration documentation and security protocols\n• Provide CRM setup guide and configuration options\n• Share pricing information for enterprise features\n• Schedule technical deep-dive session with your IT team\n• Send trial access credentials for Sally platform\n\nThese have already been added to your quick actions."
    } else {
      aiResponse =
        "I'm analyzing the transcript to answer your question. This is a demo response showing how the AI would process your query about the call content."
    }

    // Show loading for 4 seconds, then display response
    setTimeout(() => {
      const aiMessage = {
        id: chatMessages.length + 2,
        type: "ai" as const,
        message: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setChatMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 4000)
  }

  const handleCreateCall = () => {
    if (!newCall.title || !newCall.company || !newCall.date || !newCall.time) {
      alert("Please fill in all required fields")
      return
    }

    const call = {
      id: `upcoming_${Date.now()}`,
      title: newCall.title,
      company: newCall.company,
      date: newCall.date,
      time: newCall.time,
      attendees: newCall.attendees
        .split(",")
        .map((a) => a.trim())
        .filter((a) => a),
      description: newCall.description,
      documents: uploadedFiles.map((file) => ({
        name: file.name,
        type: file.type.includes("pdf") || file.type.includes("document") ? "document" : "email",
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        uploadedAt: new Date().toISOString().split("T")[0],
      })),
      isUpcoming: true,
    }

    setUpcomingCalls([...upcomingCalls, call])
    setNewCall({ title: "", company: "", date: "", time: "", attendees: "", description: "" })
    setUploadedFiles([])
    setIsCreateCallOpen(false)
  }

  const handleJoinCall = (call: any) => {
    alert(`Opening Sally's call screen for: ${call.title}`)
  }

  const handleRenameCall = (callId: string) => {
    const call = calls.find((c) => c.id === callId)
    if (call) {
      setSelectedCallForEdit(callId)
      setRenameTitle(call.title)
      setIsRenameOpen(true)
    }
  }

  const handleAddLabel = (callId: string) => {
    setSelectedCallForEdit(callId)
    setLabelText("")
    setLabelColor("blue")
    setIsLabelOpen(true)
  }

  const handleSaveRename = () => {
    if (!renameTitle.trim() || !selectedCallForEdit) return

    setCalls((prevCalls) =>
      prevCalls.map((call) => (call.id === selectedCallForEdit ? { ...call, title: renameTitle.trim() } : call)),
    )
    setIsRenameOpen(false)
    setSelectedCallForEdit(null)
    setRenameTitle("")
  }

  const handleSaveLabel = () => {
    if (!labelText.trim() || !selectedCallForEdit) return

    setCalls((prevCalls) =>
      prevCalls.map((call) => {
        if (call.id === selectedCallForEdit) {
          const existingLabels = call.labels || []
          const newLabel = { text: labelText.trim(), color: labelColor }
          // Check if label already exists
          const labelExists = existingLabels.some((label) => label.text === newLabel.text)
          if (!labelExists) {
            return { ...call, labels: [...existingLabels, newLabel] }
          }
        }
        return call
      }),
    )
    setIsLabelOpen(false)
    setSelectedCallForEdit(null)
    setLabelText("")
    setLabelColor("blue")
  }

  const handleRemoveLabel = (callId: string, labelToRemove: string) => {
    setCalls((prevCalls) =>
      prevCalls.map((call) => {
        if (call.id === callId) {
          return {
            ...call,
            labels: call.labels?.filter((label) => label.text !== labelToRemove) || [],
          }
        }
        return call
      }),
    )
  }

  const toggleExpandedLabels = (callId: string) => {
    setExpandedLabels((prev) => ({
      ...prev,
      [callId]: !prev[callId],
    }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])
  }

  const handleViewDocument = (document: any) => {
    alert(`Opening document: ${document.name} (${document.size})`)
  }

  const getLabelStyles = (color: string) => {
    const colorConfig = labelColors.find((c) => c.value === color)
    return colorConfig || labelColors[0]
  }

  const generateReportContent = (call: any) => {
    if (call.id === "call_sally") {
      return {
        title: `Meeting Report: ${call.title}`,
        executiveSummary:
          "Comprehensive evaluation session for Sally meeting copilot solution with Acme Solutions. The meeting covered real-time transcription capabilities, mid-call assistance features, security protocols, CRM integration, and pricing structure. Strong interest shown in implementation with pilot program discussion.",
        keyTopics: [
          "Real-time transcription and speaker identification",
          "Mid-call assistance and quick answer retrieval",
          "Security protocols and data residency options",
          "CRM integration and field mapping capabilities",
          "Knowledge base connectors and search functionality",
          "Post-call deliverables and automation",
          "Pricing structure and pilot program options",
        ],
        outcomes: [
          "Confirmed technical feasibility for hybrid edge-cloud deployment",
          "Established security requirements meet compliance standards",
          "Validated CRM integration capabilities with custom field mapping",
          "Agreed on pilot program with 25 seats for 60 days",
          "Scheduled kickoff meeting for Tuesday 3pm",
        ],
        nextSteps: [
          "Prepare pilot implementation plan",
          "Set up security review with IT team",
          "Configure CRM integration mapping",
          "Schedule kickoff meeting for Tuesday 3pm",
          "Provide competitive differentiation materials",
        ],
        risks: [
          "Network connectivity issues may affect real-time performance",
          "Multiple accents could impact transcription accuracy",
          "Custom field mapping complexity may delay implementation",
          "Legal review of templates may extend timeline",
        ],
        opportunities: [
          "Potential for organization-wide rollout after successful pilot",
          "Integration with existing project management tools",
          "Enhanced sales team productivity through automated follow-ups",
          "Improved customer experience through faster response times",
        ],
      }
    }
    return {
      title: `Meeting Report: ${call.title}`,
      executiveSummary: "Meeting summary and key discussion points.",
      keyTopics: ["Topic 1", "Topic 2", "Topic 3"],
      outcomes: ["Outcome 1", "Outcome 2"],
      nextSteps: ["Next step 1", "Next step 2"],
      risks: ["Risk 1", "Risk 2"],
      opportunities: ["Opportunity 1", "Opportunity 2"],
    }
  }

  const handleReportClick = (call: any) => {
    setSelectedCallForReport(call)
    const content = generateReportContent(call)
    setReportContent(content)
    setIsReportOpen(true)
    setIsEditingReport(false)
  }

  const handleSaveReport = () => {
    setIsEditingReport(false)
    // Here you would typically save to a backend
    console.log("Report saved:", reportContent)
  }

  const currentTranscript = selectedCallId ? mockTranscript[selectedCallId as keyof typeof mockTranscript] : null

  const getUniqueCompanies = () => {
    const companies = calls.map((call) => call.company)
    return [...new Set(companies)].sort()
  }

  const handleCallCardClick = (call: any) => {
    setSelectedCallForDetails(call)
    setIsCallDetailsOpen(true)
  }

  const handleRelabelSpeakers = () => {
    setTempSpeakerNames({ ...speakerNames })
    setIsRelabelOpen(true)
  }

  const handleSaveSpeakerNames = () => {
    setSpeakerNames({ ...tempSpeakerNames })
    setIsRelabelOpen(false)
  }

  const handleAIGeneration = (actionText: string) => {
    // Determine if it's an email or report based on action text
    const isEmail = actionText.toLowerCase().includes("email") || actionText.toLowerCase().includes("send")
    const type = isEmail ? "email" : "report"

    // Generate mock content based on action
    let content = ""
    if (actionText.includes("zero-downtime integration playbook")) {
      content = isEmail
        ? `Subject: Zero-Downtime Integration Playbook for Dell Operations\n\nDear Dell Team,\n\nFollowing our successful AI-WOP demo, I'm pleased to share our comprehensive zero-downtime integration playbook. This document outlines our proven methodology for seamless system integration without service interruption.\n\nKey highlights:\n• Step-by-step integration process\n• Risk mitigation strategies\n• Rollback procedures\n• Performance monitoring guidelines\n\nPlease review and let me know if you have any questions.\n\nBest regards,\nAkshith`
        : "Zero-Downtime Integration Playbook - A comprehensive guide covering integration strategies, risk assessment, and implementation procedures for enterprise systems."
    } else if (actionText.includes("case-study summary")) {
      content = isEmail
        ? `Subject: Recent Case Study Summary - AI-WOP Implementation Success\n\nDear Dell Team,\n\nI wanted to share a recent case study that demonstrates the effectiveness of our AI-WOP platform in similar enterprise environments.\n\nCase Study Highlights:\n• 40% reduction in processing time\n• 99.9% uptime maintained during integration\n• ROI achieved within 6 months\n• Seamless integration with existing infrastructure\n\nThis case study closely mirrors your current requirements and showcases the potential impact for Dell operations.\n\nLet's schedule a follow-up to discuss implementation details.\n\nBest regards,\nAkshith`
        : "Case Study Summary Report - Detailed analysis of recent AI-WOP implementation showing 40% efficiency gains and successful enterprise integration."
    } else if (actionText.includes("KPI baseline template")) {
      content = isEmail
        ? `Subject: KPI Baseline Template from Previous Pilot Programs\n\nDear Dell Team,\n\nAs discussed in our demo, I'm sharing the KPI baseline template we've successfully used in previous pilot implementations.\n\nThis template includes:\n• Performance metrics framework\n• Baseline measurement criteria\n• Success indicators\n• Monitoring dashboards\n• Reporting schedules\n\nThis template has been refined through multiple enterprise deployments and will help establish clear success metrics for your AI-WOP implementation.\n\nPlease review and let me know if you'd like to customize any metrics for Dell's specific requirements.\n\nBest regards,\nAkshith`
        : "KPI Baseline Template - Comprehensive metrics framework used in previous pilot programs with performance indicators and measurement criteria."
    } else if (actionText.includes("Gantt chart")) {
      content = isEmail
        ? `Subject: Six-Week Implementation Gantt Chart for AI-WOP Deployment\n\nDear Dell Team,\n\nPlease find attached the detailed six-week Gantt chart for your AI-WOP implementation project.\n\nProject Timeline Overview:\n• Week 1-2: Infrastructure assessment and preparation\ project.\n\nProject Timeline Overview:\n• Week 1-2: Infrastructure assessment and preparation
• Week 3-4: System integration and configuration
• Week 5: Testing and validation
• Week 6: Go-live and monitoring\n\nEach phase includes specific deliverables, dependencies, and milestone checkpoints. The timeline accounts for Dell's operational requirements and minimizes business disruption.\n\nLet's schedule a project kickoff meeting to review the timeline in detail.\n\nBest regards,\nAkshith`
        : "Six-Week Implementation Gantt Chart - Detailed project timeline with phases, milestones, and deliverables for AI-WOP deployment."
    } else if (actionText.includes("latency benchmarks")) {
      content = isEmail
        ? `Subject: Latency Benchmark Results - AI-WOP Performance Data\n\nDear Dell Team,\n\nAs requested during our demo, here are the comprehensive latency benchmark results from our AI-WOP platform testing.\n\nBenchmark Results:\n• Average response time: 45ms\n• 95th percentile: 120ms\n• 99th percentile: 200ms\n• Peak throughput: 10,000 requests/second\n• Zero timeout errors under normal load\n\nThese benchmarks were conducted under enterprise-grade conditions similar to Dell's operational environment. The results demonstrate our platform's ability to meet your strict performance requirements.\n\nI'm happy to discuss these results and answer any technical questions.\n\nBest regards,\nAkshith`
        : "Latency Benchmark Report - Comprehensive performance testing results showing response times, throughput metrics, and system reliability data."
    } else if (actionText.includes("compliance letters")) {
      content = isEmail
        ? `Subject: Compliance Documentation for AI-WOP Implementation\n\nDear Dell Team,\n\nFollowing our discussion about compliance requirements, I'm providing the necessary compliance documentation for AI-WOP implementation.\n\nCompliance Coverage:\n• SOC 2 Type II certification\n• GDPR compliance documentation\n• ISO 27001 security standards\n• Industry-specific regulatory requirements\n• Data privacy and protection protocols\n\nAll documentation has been reviewed by our legal and compliance teams to ensure full adherence to Dell's security and regulatory standards.\n\nPlease review and let me know if additional compliance documentation is required.\n\nBest regards,\nAkshith`
        : "Compliance Documentation Package - Complete regulatory compliance materials including certifications, security standards, and privacy protocols."
    }

    setAiGenerationModal({
      isOpen: true,
      action: actionText,
      type,
      content,
    })
  }

  const handleDownload = () => {
    const blob = new Blob([aiGenerationModal.content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${aiGenerationModal.action.replace(/[^a-zA-Z0-9]/g, "_")}.${aiGenerationModal.type === "email" ? "eml" : "txt"}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleSendEmail = (callId?: string) => {
    if (callId) {
      setIsEmailModalOpen(true)
    } else {
      // Existing AI generation email send
      alert("Email sent successfully!")
      setAiGenerationModal({ isOpen: false, action: "", type: "email", content: "" })
    }
  }

  const handleEmailActionClick = (action: string) => {
    setSelectedEmailAction(action)
    const template = emailDrafts[action as keyof typeof emailDrafts]
    if (template) {
      setEmailSubject(template.subject)
      setEmailBody(template.body)
    }
  }

  const handleSendDraftEmail = () => {
    const toList = selectedRecipients.length ? selectedRecipients : ["recipient@example.com"]
    console.log("Sending email", { to: toList, subject: emailSubject, body: emailBody })
    alert("Email sent successfully!")
    setSelectedEmailAction(null)
    setSelectedRecipients([])
    setEmailSubject("")
    setEmailBody("")
    setToInput("")
    setIsEmailModalOpen(false)
  }

  const handleTranscriptDownload = () => {
    // Create a simple HTML structure for Word document
    const htmlContent = `
      <html>
        <head>
          <meta charset="utf-8">
          <title>Call Transcript</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 30px; }
            .title { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .subtitle { font-size: 16px; color: #666; margin-bottom: 20px; }
            .participants { margin-bottom: 30px; }
            .participants h3 { font-size: 18px; margin-bottom: 10px; }
            .separator { border-top: 2px solid #333; margin: 30px 0; }
            .transcript-entry { margin-bottom: 20px; }
            .timestamp { font-weight: bold; color: #666; }
            .speaker { font-weight: bold; margin: 10px 0 5px 0; }
            .content { margin-left: 20px; }
            .uncertain { background-color: #fff3cd; padding: 2px 4px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">${currentTranscript?.title || "Call Transcript"}</div>
            <div class="subtitle">${currentTranscript?.date || ""}</div>
          </div>
          
          <div class="participants">
            <h3>Participants:</h3>
            <p>
              ${Object.entries(speakerNames)
                .map(([key, name]) => `${key}: ${name}`)
                .join("<br>")}
            </p>
          </div>
          
          <div class="separator"></div>
          
          <div class="transcript">
            ${
              currentTranscript?.entries
                .map(
                  (entry) => `
              <div class="transcript-entry">
                <div class="timestamp">${entry.timestamp}</div>
                <div class="speaker">${speakerNames[entry.speaker] || entry.speaker}</div>
                <div class="content">${entry.content.replace(/\*(.*?)\*/g, '<span class="uncertain">$1</span>')}</div>
              </div>
            `,
                )
                .join("") || ""
            }
          </div>
        </body>
      </html>
    `

    // Create blob and download as Word document
    const blob = new Blob([htmlContent], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${currentTranscript?.title?.replace(/[^a-zA-Z0-9]/g, "_") || "transcript"}.doc`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleSaveTranscript = () => {
    // Update the transcript entries with edited content
    if (selectedCallId && mockTranscript[selectedCallId]) {
      const updatedEntries = mockTranscript[selectedCallId].entries.map((entry, index) => {
        const editKey = `${selectedCallId}-${index}`
        return editedTranscript[editKey] ? { ...entry, text: editedTranscript[editKey] } : entry
      })
      mockTranscript[selectedCallId] = { ...mockTranscript[selectedCallId], entries: updatedEntries }
    }
    setEditedTranscript({})
    setIsEditing(false)
  }

  const handleTranscriptChange = (callId: string, entryIndex: number, newText: string) => {
    const editKey = `${callId}-${entryIndex}`
    setEditedTranscript((prev) => ({ ...prev, [editKey]: newText }))
  }

  const handleNotesClick = (call) => {
    setSelectedCallForNotes(call)
    setEditableNotes(
      discoNotes[call.id] || {
        discovered: [],
        issues: [],
        solutions: [],
        concerns: [],
        opportunities: [],
        additionalNotes: "",
      },
    )
    setIsNotesOpen(true)
    setIsEditingNotes(false)
  }

  const handleSaveNotes = () => {
    // In a real app, this would save to a database
    discoNotes[selectedCallForNotes.id] = { ...editableNotes }
    setIsEditingNotes(false)
    alert("Notes saved successfully!")
  }

  const handleAddBulletPoint = (section) => {
    setEditableNotes((prev) => ({
      ...prev,
      [section]: [...prev[section], ""],
    }))
  }

  const handleUpdateBulletPoint = (section, index, value) => {
    setEditableNotes((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) => (i === index ? value : item)),
    }))
  }

  const handleRemoveBulletPoint = (section, index) => {
    setEditableNotes((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }))
  }

  return (
    <Sidebar>
      <div className="min-h-screen bg-white">
      {/* Header - Keep existing search functionality */}
      <header className="sticky top-0 z-50 border-b border-border/20 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-700 font-bold text-sm">S</span>
                </div>
                <h1 className="text-xl font-semibold">Sally</h1>
              </div>
              <nav className="text-sm text-muted-foreground flex items-center gap-4">
                <Link href="/dashboard" className="hover:text-foreground transition-colors">
                  Dashboard
                </Link>
                <Link href="/calls" className="hover:text-foreground transition-colors">
                  Calls
                </Link>
                <Link href="/files" className="hover:text-foreground transition-colors">
                  Files
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search calls, accounts, contacts..." className="pl-10 w-80 glass-card" />
              </div>
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  className="glass-card bg-transparent"
                  onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {selectedFilters.length > 0 && (
                    <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {selectedFilters.length}
                    </Badge>
                  )}
                </Button>

                {isFilterDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-medium text-gray-900">Filter by Company</h3>
                      {selectedFilters.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearAllFilters}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Clear All
                        </Button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {uniqueCompanyLabels.map((label) => (
                        <Button
                          key={label.text}
                          variant={selectedFilters.includes(label.text) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleFilter(label.text)}
                          className={`
                            ${
                              selectedFilters.includes(label.text)
                                ? `${getLabelStyles(label.color).bg} ${getLabelStyles(label.color).text} border-transparent`
                                : `border-gray-200 text-gray-700 hover:${getLabelStyles(label.color).bg} hover:${getLabelStyles(label.color).text}`
                            }
                          `}
                        >
                          {label.text}
                          {selectedFilters.includes(label.text) && <X className="h-3 w-3 ml-1" />}
                        </Button>
                      ))}
                    </div>
                    {selectedFilters.length > 0 && (
                      <p className="text-sm text-gray-600 mt-2">
                        Showing {filteredCalls.length} of {calls.length} calls
                      </p>
                    )}
                  </div>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                className="glass-card bg-transparent"
                onClick={() => setIsCalendarOpen(true)}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Calendar
              </Button>

              <Button variant="ghost" size="sm">
                <HelpCircle className="h-4 w-4" />
              </Button>
              <Avatar className="h-8 w-8 cursor-pointer" onClick={() => {
                setIsUserSettingsOpen(true)
                fetchUserProfile()
              }}>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>
                  {userProfile?.fullName 
                    ? userProfile.fullName.split(' ').map(n => n[0]).join('').toUpperCase()
                    : localStorage.getItem('sally_fullname')?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'
                  }
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {upcomingCalls.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Upcoming Calls</h2>
                <p className="text-gray-600 mt-1">Your scheduled calls</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {upcomingCalls.map((call) => (
                <Card
                  key={call.id}
                  className="glass-card hover:shadow-lg transition-shadow border border-blue-200 bg-blue-50"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{call.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{call.company}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span>{call.date}</span>
                          <span>{call.time}</span>
                        </div>
                        {call.attendees.length > 0 && (
                          <p className="text-xs text-gray-500 mb-3">Attendees: {call.attendees.join(", ")}</p>
                        )}
                        {call.description && <p className="text-sm text-gray-600 mb-3">{call.description}</p>}
                      </div>
                    </div>
                    <Button
                      onClick={() => handleJoinCall(call)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Join Call
                    </Button>
                    <Button
                      onClick={() => {
                        const input = document.createElement("input")
                        input.type = "file"
                        input.multiple = true
                        input.accept = ".pdf,.doc,.docx,.ppt,.pptx,.eml,.msg,.txt"
                        input.onchange = (e) => {
                          const files = (e.target as HTMLInputElement).files
                          if (files) {
                            // Handle file upload logic here
                          }
                        }
                        input.click()
                      }}
                      variant="outline"
                      className="w-full mt-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Documents
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Recent Calls</h2>
              <p className="text-gray-600 mt-1">Your latest sales calls and their completion status</p>
            </div>
            <Button onClick={() => setIsCreateCallOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
              Create Call
            </Button>
          </div>
        </div>

        {/* Calls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCalls.map((call) => (
            <Card
              key={call.id}
              className="glass-card hover:shadow-lg transition-shadow border border-gray-200 cursor-pointer"
              onClick={() => handleCallCardClick(call)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-900 mb-2">{call.title}</CardTitle>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                      <span className="font-medium">{call.company}</span>
                      <span>•</span>
                      <span>{call.date}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{call.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{call.attendees} attendees</span>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Open Transcript</DropdownMenuItem>
                      <DropdownMenuItem>Send Follow-up</DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRenameCall(call.id)
                        }}
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        Rename Call
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAddLabel(call.id)
                        }}
                      >
                        <Tag className="h-4 w-4 mr-2" />
                        Add Label
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {/* Update Send Email button in call cards to open email modal */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 text-xs h-8 bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSendEmail(call.id)
                    }}
                  >
                    <Mail className="h-3 w-3" />
                    <span className="truncate">Send Email</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 text-xs h-8 bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleNotesClick(call)
                    }}
                  >
                    <FileText className="h-3 w-3" />
                    <span className="truncate">{call.actions.notes ? "View Notes" : "Create Notes"}</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 text-xs h-8 bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleViewTranscript(call.id)
                    }}
                  >
                    <MessageSquare className="h-3 w-3" />
                    <span className="truncate">View Transcript</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 text-xs h-8 bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleReportClick(call)
                    }}
                  >
                    <Bookmark className="h-3 w-3" />
                    <span className="truncate">{call.actions.report ? "View Report" : "Create Report"}</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 text-xs h-8 bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
                    onClick={(e) => {
                      e.stopPropagation()
                      const action = call.actions.presentation ? "View Presentation" : "Create Presentation"
                      if (call.actions.presentation) {
                        alert(`Opening presentation for ${call.title}`)
                      } else {
                        alert(`Creating presentation for ${call.title}`)
                      }
                    }}
                  >
                    <Monitor className="h-3 w-3" />
                    <span className="truncate">
                      {call.actions.presentation ? "View Presentation" : "Create Presentation"}
                    </span>
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Post-Call Completion */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">Post-Call Completion</span>
                    <span className="text-sm font-semibold text-gray-900">{call.postCallCompletion}%</span>
                  </div>
                  <Progress value={call.postCallCompletion} className="h-2 mb-2" />
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>
                      {call.tasksCompleted}/{call.totalTasks} tasks completed
                    </span>
                    <span>{call.pendingTasks} pending</span>
                  </div>
                </div>

                {/* AI Summary */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">AI Summary</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{call.aiSummary}</p>
                </div>

                {/* Documents */}
                {call.documents && call.documents.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Documents ({call.documents.length})</span>
                    </div>
                    <div className="space-y-1">
                      {call.documents.slice(0, 2).map((doc, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleViewDocument(doc)
                          }}
                          className="flex items-center justify-between w-full p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded border text-left transition-colors"
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <FileText className="h-3 w-3 text-gray-400 flex-shrink-0" />
                            <span className="truncate text-gray-700">{doc.name}</span>
                          </div>
                          <span className="text-gray-500 ml-2 flex-shrink-0">{doc.size}</span>
                        </button>
                      ))}
                      {call.documents.length > 2 && (
                        <div className="text-xs text-gray-500 pl-5">+{call.documents.length - 2} more documents</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Owner and Labels */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-700 font-bold text-xs">{call.owner.charAt(0)}</span>
                    </div>
                    <span className="text-sm text-gray-600">Owner: {call.owner}</span>
                  </div>

                  {call.labels && call.labels.length > 0 && (
                    <div className="flex items-center gap-1 flex-wrap">
                      {call.labels.slice(0, expandedLabels[call.id] ? call.labels.length : 3).map((label, index) => (
                        <div key={index} className="group relative">
                          <div
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getLabelStyles(label.color).bg} ${getLabelStyles(label.color).text} ${getLabelStyles(label.color).border}`}
                          >
                            {label.text}
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleRemoveLabel(call.id, label.text)
                              }}
                              className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                      {call.labels.length > 3 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleExpandedLabels(call.id)
                          }}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {expandedLabels[call.id] ? "Show less" : `+${call.labels.length - 3} more`}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Create Call Modal */}
      {isCreateCallOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsCreateCallOpen(false)} />

          <div className="relative bg-white rounded-lg shadow-2xl w-[500px] max-w-[90vw]">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Create New Call</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsCreateCallOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Call Title *</label>
                <Input
                  value={newCall.title}
                  onChange={(e) => setNewCall({ ...newCall, title: e.target.value })}
                  placeholder="Enter call title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
                <Input
                  value={newCall.company}
                  onChange={(e) => setNewCall({ ...newCall, company: e.target.value })}
                  placeholder="Enter company name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <Input
                    type="date"
                    value={newCall.date}
                    onChange={(e) => setNewCall({ ...newCall, date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                  <Input
                    type="time"
                    value={newCall.time}
                    onChange={(e) => setNewCall({ ...newCall, time: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Attendees</label>
                <Input
                  value={newCall.attendees}
                  onChange={(e) => setNewCall({ ...newCall, attendees: e.target.value })}
                  placeholder="Enter attendee emails (comma separated)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <Textarea
                  value={newCall.description}
                  onChange={(e) => setNewCall({ ...newCall, description: e.target.value })}
                  placeholder="Enter call description or agenda"
                  rows={3}
                />
              </div>

              {/* File Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Documents & Emails</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.eml,.msg,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center justify-center text-center"
                  >
                    <FileText className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Click to upload documents and emails</span>
                    <span className="text-xs text-gray-500 mt-1">PDF, DOC, PPT, EML files supported</span>
                  </label>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{file.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setUploadedFiles((prev) => prev.filter((_, i) => i !== index))}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <Button variant="outline" onClick={() => setIsCreateCallOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCall}>Create Call</Button>
            </div>
          </div>
        </div>
      )}

      {/* Rename Call Modal */}
      {isRenameOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsRenameOpen(false)} />

          <div className="relative bg-white rounded-lg shadow-2xl w-[400px] max-w-[90vw]">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Rename Call</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsRenameOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Call Title</label>
              <Input
                value={renameTitle}
                onChange={(e) => setRenameTitle(e.target.value)}
                placeholder="Enter new call title"
                onKeyPress={(e) => e.key === "Enter" && handleSaveRename()}
              />
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <Button variant="outline" onClick={() => setIsRenameOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveRename} disabled={!renameTitle.trim()}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Label Modal */}
      {isLabelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsLabelOpen(false)} />

          <div className="relative bg-white rounded-lg shadow-2xl w-[450px] max-w-[90vw]">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Add Company Label</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsLabelOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Company</label>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {getUniqueCompanies().map((company) => (
                    <button
                      key={company}
                      onClick={() => setLabelText(company)}
                      className={`p-2 text-sm rounded-lg border-2 transition-all text-left ${
                        labelText === company
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      {company}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500">Or enter a custom label below</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Label Name</label>
                <Input
                  value={labelText}
                  onChange={(e) => setLabelText(e.target.value)}
                  placeholder="Enter label name (e.g., High Priority, Technical, Demo)"
                  onKeyPress={(e) => e.key === "Enter" && handleSaveLabel()}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Label Color</label>
                <div className="grid grid-cols-3 gap-2">
                  {labelColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setLabelColor(color.value)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        labelColor === color.value
                          ? `${color.border} ring-2 ring-offset-2 ring-${color.value}-500`
                          : "border-gray-200 hover:border-gray-300"
                      } ${color.bg}`}
                    >
                      <div className={`text-xs font-medium ${color.text}`}>{color.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {labelText && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                  <div
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getLabelStyles(labelColor).bg} ${getLabelStyles(labelColor).text} ${getLabelStyles(labelColor).border}`}
                  >
                    {labelText}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <Button variant="outline" onClick={() => setIsLabelOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveLabel} disabled={!labelText.trim()}>
                Add Label
              </Button>
            </div>
          </div>
        </div>
      )}

      {isTranscriptOpen && currentTranscript && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Blurred Background Overlay */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsTranscriptOpen(false)} />

          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-2xl w-[90vw] h-[85vh] max-w-7xl flex overflow-hidden">
            {/* Main Transcript Area */}
            <div className="flex-1 flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Call Transcript</h2>
                  <p className="text-sm text-gray-600">
                    {currentTranscript.title} • {currentTranscript.date}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={isEditing ? handleSaveTranscript : () => setIsEditing(true)}
                    className="flex items-center gap-2"
                  >
                    {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                    {isEditing ? "Save" : "Edit"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRelabelSpeakers}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <Users className="h-4 w-4" />
                    Relabel
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setIsTranscriptOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Transcript Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {currentTranscript.entries.map((entry, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="text-sm text-gray-500 font-mono w-20 flex-shrink-0">{entry.timestamp}</div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 mb-1">
                          {speakerNames[entry.speaker] || entry.speaker}
                        </div>
                        {isEditing ? (
                          <Textarea
                            defaultValue={entry.text}
                            className="min-h-[60px] text-sm"
                            onChange={(e) => handleTranscriptChange(selectedCallId!, index, e.target.value)}
                          />
                        ) : (
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {entry.text.split(" ").map((word, wordIndex) => {
                              const cleanWord = word.replace(/[.,!?]/g, "")
                              const isUncertain = entry.uncertainWords.includes(cleanWord.toLowerCase())
                              return (
                                <span key={wordIndex} className={isUncertain ? "bg-yellow-200 px-1 rounded" : ""}>
                                  {word}{" "}
                                </span>
                              )
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar - Chat */}
            <div className="w-80 border-l border-gray-200 flex flex-col bg-gray-50">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-white">
                <h3 className="font-semibold text-gray-900">Query Transcript</h3>
                <p className="text-sm text-gray-600">Ask questions about the transcript</p>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-lg p-3 ${
                        message.type === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-white border border-gray-200 text-gray-900"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.message}</p>
                      <p className={`text-xs mt-1 ${message.type === "user" ? "text-blue-100" : "text-gray-500"}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 text-gray-900 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500">Analyzing transcript...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about the transcript..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button size="sm" onClick={handleSendMessage} disabled={!chatInput.trim() || isLoading}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isRelabelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsRelabelOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-2xl w-96 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Relabel Speakers</h3>
              <Button variant="ghost" size="sm" onClick={() => setIsRelabelOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {Object.keys(speakerNames).map((originalName) => (
                <div key={originalName} className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{originalName}</label>
                  <Input
                    value={tempSpeakerNames[originalName] || speakerNames[originalName]}
                    onChange={(e) =>
                      setTempSpeakerNames((prev) => ({
                        ...prev,
                        [originalName]: e.target.value,
                      }))
                    }
                    placeholder="Enter speaker name"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setIsRelabelOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveSpeakerNames}>Save Changes</Button>
            </div>
          </div>
        </div>
      )}

      {isCallDetailsOpen && selectedCallForDetails && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{selectedCallForDetails.title}</h2>
                <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                  <span className="font-medium">{selectedCallForDetails.company}</span>
                  <span>•</span>
                  <span>{selectedCallForDetails.date}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsCallDetailsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* Call Info */}
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{selectedCallForDetails.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{selectedCallForDetails.attendees} attendees</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {/* Update Send Email button in call details modal */}
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 justify-start bg-transparent"
                    onClick={() => handleSendEmail(selectedCallForDetails.id)}
                  >
                    <Mail className="h-4 w-4" />
                    Send Email
                  </Button>

                  <Button
                    variant="outline"
                    className="flex items-center gap-2 justify-start bg-transparent"
                    onClick={() => {
                      handleNotesClick(selectedCallForDetails)
                    }}
                  >
                    <FileText className="h-4 w-4" />
                    {selectedCallForDetails.actions.notes ? "View Notes" : "Create Notes"}
                  </Button>

                  <Button
                    variant="outline"
                    className="flex items-center gap-2 justify-start bg-transparent"
                    onClick={() => {
                      setIsCallDetailsOpen(false)
                      handleViewTranscript(selectedCallForDetails.id)
                    }}
                  >
                    <MessageSquare className="h-4 w-4" />
                    View Transcript
                  </Button>

                  <Button
                    variant="outline"
                    className="flex items-center gap-2 justify-start bg-transparent"
                    onClick={() => {
                      handleReportClick(selectedCallForDetails)
                    }}
                  >
                    <Bookmark className="h-4 w-4" />
                    {selectedCallForDetails.actions.report ? "View Report" : "Create Report"}
                  </Button>
                </div>
              </div>

              {/* Follow-up Actions */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Follow-up Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      id="action-1"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="action-1" className="text-sm text-gray-700 flex-1">
                      Send zero-downtime integration playbook
                    </label>
                    <button
                      onClick={() => handleAIGeneration("Send zero-downtime integration playbook")}
                      className="p-1.5 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors"
                      title="Generate with AI"
                    >
                      <Sparkles className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      id="action-2"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="action-2" className="text-sm text-gray-700 flex-1">
                      Send recent case-study summary to Dell team
                    </label>
                    <button
                      onClick={() => handleAIGeneration("Send recent case-study summary to Dell team")}
                      className="p-1.5 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors"
                      title="Generate with AI"
                    >
                      <Sparkles className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      id="action-3"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="action-3" className="text-sm text-gray-700 flex-1">
                      Email KPI baseline template used in previous pilots
                    </label>
                    <button
                      onClick={() => handleAIGeneration("Email KPI baseline template used in previous pilots")}
                      className="p-1.5 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors"
                      title="Generate with AI"
                    >
                      <Sparkles className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      id="action-4"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="action-4" className="text-sm text-gray-700 flex-1">
                      Email six-week Gantt chart
                    </label>
                    <button
                      onClick={() => handleAIGeneration("Email six-week Gantt chart")}
                      className="p-1.5 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors"
                      title="Generate with AI"
                    >
                      <Sparkles className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      id="action-5"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="action-5" className="text-sm text-gray-700 flex-1">
                      Send latency benchmarks
                    </label>
                    <button
                      onClick={() => handleAIGeneration("Send latency benchmarks")}
                      className="p-1.5 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors"
                      title="Generate with AI"
                    >
                      <Sparkles className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      id="action-6"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="action-6" className="text-sm text-gray-700 flex-1">
                      Send compliance letters
                    </label>
                    <button
                      onClick={() => handleAIGeneration("Send compliance letters")}
                      className="p-1.5 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors"
                      title="Generate with AI"
                    >
                      <Sparkles className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Post-Call Completion */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Post-Call Completion</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-900">Progress</span>
                    <span className="text-lg font-semibold text-gray-900">
                      {selectedCallForDetails.postCallCompletion}%
                    </span>
                  </div>
                  <Progress value={selectedCallForDetails.postCallCompletion} className="h-3 mb-3" />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>
                      {selectedCallForDetails.tasksCompleted}/{selectedCallForDetails.totalTasks} tasks completed
                    </span>
                    <span>{selectedCallForDetails.pendingTasks} pending</span>
                  </div>
                </div>
              </div>

              {/* AI Summary */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <h3 className="text-lg font-medium text-gray-900">AI Summary</h3>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed">{selectedCallForDetails.aiSummary}</p>
                </div>
              </div>

              {/* Documents */}
              {selectedCallForDetails.documents && selectedCallForDetails.documents.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900">
                      Documents ({selectedCallForDetails.documents.length})
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {selectedCallForDetails.documents.map((doc: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => handleViewDocument(doc)}
                        className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border text-left transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <FileText className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{doc.name}</span>
                        </div>
                        <span className="text-gray-500 ml-3 flex-shrink-0">{doc.size}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Owner */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Call Owner</h3>
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedCallForDetails.ownerAvatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {selectedCallForDetails.owner
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-gray-900">{selectedCallForDetails.owner}</div>
                      <div className="text-sm text-gray-600">Call Owner</div>
                    </div>
                  </div>
                  {selectedCallForDetails.label && (
                    <Badge
                      variant="secondary"
                      className={`${
                        selectedCallForDetails.label.color === "blue"
                          ? "bg-blue-100 text-blue-800"
                          : selectedCallForDetails.label.color === "green"
                            ? "bg-green-100 text-green-800"
                            : selectedCallForDetails.label.color === "purple"
                              ? "bg-purple-100 text-purple-800"
                              : selectedCallForDetails.label.color === "orange"
                                ? "bg-orange-100 text-orange-800"
                                : selectedCallForDetails.label.color === "red"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {selectedCallForDetails.label.text}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {aiGenerationModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">AI Generated Content</h2>
                <p className="text-sm text-gray-600 mt-1">{aiGenerationModal.action}</p>
              </div>
              <button
                onClick={() => setAiGenerationModal({ isOpen: false, action: "", type: "email", content: "" })}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Generated {aiGenerationModal.type === "email" ? "Email" : "Report"}
                  </span>
                </div>
                <textarea
                  value={aiGenerationModal.content}
                  onChange={(e) => setAiGenerationModal((prev) => ({ ...prev, content: e.target.value }))}
                  className="w-full h-96 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Generated content will appear here..."
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-6 border-t bg-gray-50">
              <div className="text-sm text-gray-600">
                You can edit the content above before {aiGenerationModal.type === "email" ? "sending" : "downloading"}
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setAiGenerationModal({ isOpen: false, action: "", type: "email", content: "" })}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                {aiGenerationModal.type === "email" ? (
                  <button
                    onClick={handleSendEmail}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Send Email</span>
                  </button>
                ) : (
                  <button
                    onClick={handleDownload}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {isNotesOpen && selectedCallForNotes && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">DISCO Analysis Notes</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedCallForNotes.title} • {selectedCallForNotes.date}
                </p>
              </div>
              <button onClick={() => setIsNotesOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto">
              {/* Edit/Save Button */}
              <div className="flex justify-end mb-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (isEditingNotes) {
                      handleSaveNotes()
                    } else {
                      setIsEditingNotes(true)
                    }
                  }}
                >
                  {isEditingNotes ? "Save Notes" : "Edit Notes"}
                </Button>
              </div>

              {/* DISCOVERED Section */}
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Discovered</h3>
                <ul>
                  {editableNotes?.discovered?.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 mb-1">
                      {isEditingNotes ? (
                        <>
                          <div className="mt-1">•</div>
                          <Input
                            type="text"
                            value={item}
                            onChange={(e) => handleUpdateBulletPoint("discovered", index, e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveBulletPoint("discovered", index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <div>•</div>
                          <div>{item}</div>
                        </>
                      )}
                    </li>
                  ))}
                  {isEditingNotes && (
                    <Button variant="ghost" onClick={() => handleAddBulletPoint("discovered")}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Point
                    </Button>
                  )}
                </ul>
              </div>

              {/* ISSUES Section */}
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Issues</h3>
                <ul>
                  {editableNotes?.issues?.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 mb-1">
                      {isEditingNotes ? (
                        <>
                          <div className="mt-1">•</div>
                          <Input
                            type="text"
                            value={item}
                            onChange={(e) => handleUpdateBulletPoint("issues", index, e.target.value)}
                            className="flex-1"
                          />
                          <Button variant="ghost" size="sm" onClick={() => handleRemoveBulletPoint("issues", index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <div>•</div>
                          <div>{item}</div>
                        </>
                      )}
                    </li>
                  ))}
                  {isEditingNotes && (
                    <Button variant="ghost" onClick={() => handleAddBulletPoint("issues")}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Point
                    </Button>
                  )}
                </ul>
              </div>

              {/* SOLUTIONS Section */}
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Solutions</h3>
                <ul>
                  {editableNotes?.solutions?.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 mb-1">
                      {isEditingNotes ? (
                        <>
                          <div className="mt-1">•</div>
                          <Input
                            type="text"
                            value={item}
                            onChange={(e) => handleUpdateBulletPoint("solutions", index, e.target.value)}
                            className="flex-1"
                          />
                          <Button variant="ghost" size="sm" onClick={() => handleRemoveBulletPoint("solutions", index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <div>•</div>
                          <div>{item}</div>
                        </>
                      )}
                    </li>
                  ))}
                  {isEditingNotes && (
                    <Button variant="ghost" onClick={() => handleAddBulletPoint("solutions")}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Point
                    </Button>
                  )}
                </ul>
              </div>

              {/* CONCERNS Section */}
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Concerns</h3>
                <ul>
                  {editableNotes?.concerns?.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 mb-1">
                      {isEditingNotes ? (
                        <>
                          <div className="mt-1">•</div>
                          <Input
                            type="text"
                            value={item}
                            onChange={(e) => handleUpdateBulletPoint("concerns", index, e.target.value)}
                            className="flex-1"
                          />
                          <Button variant="ghost" size="sm" onClick={() => handleRemoveBulletPoint("concerns", index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <div>•</div>
                          <div>{item}</div>
                        </>
                      )}
                    </li>
                  ))}
                  {isEditingNotes && (
                    <Button variant="ghost" onClick={() => handleAddBulletPoint("concerns")}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Point
                    </Button>
                  )}
                </ul>
              </div>

              {/* OPPORTUNITIES Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Opportunities</h3>
                <ul>
                  {editableNotes?.opportunities?.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 mb-1">
                      {isEditingNotes ? (
                        <>
                          <div className="mt-1">•</div>
                          <Input
                            type="text"
                            value={item}
                            onChange={(e) => handleUpdateBulletPoint("opportunities", index, e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveBulletPoint("opportunities", index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <div>•</div>
                          <div>{item}</div>
                        </>
                      )}
                    </li>
                  ))}
                  {isEditingNotes && (
                    <Button variant="ghost" onClick={() => handleAddBulletPoint("opportunities")}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Point
                    </Button>
                  )}
                </ul>
              </div>

              {/* Additional Notes Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Additional Notes</h3>
                {isEditingNotes ? (
                  <Textarea
                    value={editableNotes?.additionalNotes || ""}
                    onChange={(e) => setEditableNotes((prev) => ({ ...prev, additionalNotes: e.target.value }))}
                    placeholder="Enter additional notes"
                    className="w-full"
                  />
                ) : (
                  <p>{editableNotes?.additionalNotes}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {isReportOpen && selectedCallForReport && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Call Report</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedCallForReport.title} • {selectedCallForReport.date}
                </p>
              </div>
              <button onClick={() => setIsReportOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto">
              {/* Edit/Save Button */}
              <div className="flex justify-end mb-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (isEditingReport) {
                      handleSaveReport()
                    } else {
                      setIsEditingReport(true)
                    }
                  }}
                >
                  {isEditingReport ? "Save Report" : "Edit Report"}
                </Button>
              </div>

              {/* Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                {isEditingReport ? (
                  <Input
                    type="text"
                    value={reportContent.title}
                    onChange={(e) => setReportContent({ ...reportContent, title: e.target.value })}
                  />
                ) : (
                  <p>{reportContent.title}</p>
                )}
              </div>

              {/* Executive Summary */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Executive Summary</label>
                {isEditingReport ? (
                  <Textarea
                    value={reportContent.executiveSummary}
                    onChange={(e) => setReportContent({ ...reportContent, executiveSummary: e.target.value })}
                    rows={4}
                    className="w-full"
                  />
                ) : (
                  <p>{reportContent.executiveSummary}</p>
                )}
              </div>

              {/* Key Topics */}
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Key Topics</h3>
                <ul>
                  {reportContent.keyTopics.map((topic, index) => (
                    <li key={index} className="flex items-start gap-2 mb-1">
                      {isEditingReport ? (
                        <>
                          <div className="mt-1">•</div>
                          <Input
                            type="text"
                            value={topic}
                            onChange={(e) => {
                              const newKeyTopics = [...reportContent.keyTopics]
                              newKeyTopics[index] = e.target.value
                              setReportContent({ ...reportContent, keyTopics: newKeyTopics })
                            }}
                            className="flex-1"
                          />
                        </>
                      ) : (
                        <>
                          <div>•</div>
                          <div>{topic}</div>
                        </>
                      )}
                    </li>
                  ))}
                  {isEditingReport && (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setReportContent({
                          ...reportContent,
                          keyTopics: [...reportContent.keyTopics, ""],
                        })
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Topic
                    </Button>
                  )}
                </ul>
              </div>

              {/* Outcomes */}
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Outcomes</h3>
                <ul>
                  {reportContent.outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-2 mb-1">
                      {isEditingReport ? (
                        <>
                          <div className="mt-1">•</div>
                          <Input
                            type="text"
                            value={outcome}
                            onChange={(e) => {
                              const newOutcomes = [...reportContent.outcomes]
                              newOutcomes[index] = e.target.value
                              setReportContent({ ...reportContent, outcomes: newOutcomes })
                            }}
                            className="flex-1"
                          />
                        </>
                      ) : (
                        <>
                          <div>•</div>
                          <div>{outcome}</div>
                        </>
                      )}
                    </li>
                  ))}
                  {isEditingReport && (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setReportContent({
                          ...reportContent,
                          outcomes: [...reportContent.outcomes, ""],
                        })
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Outcome
                    </Button>
                  )}
                </ul>
              </div>

              {/* Next Steps */}
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Next Steps</h3>
                <ul>
                  {reportContent.nextSteps.map((nextStep, index) => (
                    <li key={index} className="flex items-start gap-2 mb-1">
                      {isEditingReport ? (
                        <>
                          <div className="mt-1">•</div>
                          <Input
                            type="text"
                            value={nextStep}
                            onChange={(e) => {
                              const newNextSteps = [...reportContent.nextSteps]
                              newNextSteps[index] = e.target.value
                              setReportContent({ ...reportContent, nextSteps: newNextSteps })
                            }}
                            className="flex-1"
                          />
                        </>
                      ) : (
                        <>
                          <div>•</div>
                          <div>{nextStep}</div>
                        </>
                      )}
                    </li>
                  ))}
                  {isEditingReport && (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setReportContent({
                          ...reportContent,
                          nextSteps: [...reportContent.nextSteps, ""],
                        })
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Next Step
                    </Button>
                  )}
                </ul>
              </div>

              {/* Risks */}
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Risks</h3>
                <ul>
                  {reportContent.risks.map((risk, index) => (
                    <li key={index} className="flex items-start gap-2 mb-1">
                      {isEditingReport ? (
                        <>
                          <div className="mt-1">•</div>
                          <Input
                            type="text"
                            value={risk}
                            onChange={(e) => {
                              const newRisks = [...reportContent.risks]
                              newRisks[index] = e.target.value
                              setReportContent({ ...reportContent, risks: newRisks })
                            }}
                            className="flex-1"
                          />
                        </>
                      ) : (
                        <>
                          <div>•</div>
                          <div>{risk}</div>
                        </>
                      )}
                    </li>
                  ))}
                  {isEditingReport && (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setReportContent({
                          ...reportContent,
                          risks: [...reportContent.risks, ""],
                        })
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Risk
                    </Button>
                  )}
                </ul>
              </div>

              {/* Opportunities */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Opportunities</h3>
                <ul>
                  {reportContent.opportunities.map((opportunity, index) => (
                    <li key={index} className="flex items-start gap-2 mb-1">
                      {isEditingReport ? (
                        <>
                          <div className="mt-1">•</div>
                          <Input
                            type="text"
                            value={opportunity}
                            onChange={(e) => {
                              const newOpportunities = [...reportContent.opportunities]
                              newOpportunities[index] = e.target.value
                              setReportContent({ ...reportContent, opportunities: newOpportunities })
                            }}
                            className="flex-1"
                          />
                        </>
                      ) : (
                        <>
                          <div>•</div>
                          <div>{opportunity}</div>
                        </>
                      )}
                    </li>
                  ))}
                  {isEditingReport && (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setReportContent({
                          ...reportContent,
                          opportunities: [...reportContent.opportunities, ""],
                        })
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Opportunity
                    </Button>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {isEmailModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Send Follow-up Email</h2>
              <button onClick={() => setIsEmailModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh]">
                {/* Left: actions and recipients with own scroll */}
                <div className="space-y-6 overflow-y-auto pr-1">
              {/* Suggested Actions */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Suggested Actions</h3>
                <div className="space-y-2">
                  {Object.keys(emailDrafts).map((action) => (
                    <button
                      key={action}
                      onClick={() => handleEmailActionClick(action)}
                      className={`w-full p-3 text-left rounded-lg border transition-colors ${
                        selectedEmailAction === action
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>

              {/* Suggested Recipients */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Suggested Recipients</h3>
                <div className="space-y-2">
                  {suggestedRecipients.map((recipient) => (
                    <div key={recipient.email} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{recipient.name}</div>
                        <div className="text-sm text-gray-600">{recipient.email}</div>
                      </div>
                      <div className="text-sm text-gray-500">{recipient.role}</div>
                    </div>
                  ))}
                    </div>
                </div>
              </div>

                {/* Right: preview pane (editable with recipients) */}
                <div className="overflow-y-auto pl-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Email Preview</h3>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 min-h-[300px] space-y-3">
                    {!selectedEmailAction && (
                      <div className="text-sm text-gray-500">Select a suggested action to start composing.</div>
                    )}
                    {/* To (recipients) */}
                    <div>
                      <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">To</div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {selectedRecipients.map((email) => (
                          <span key={email} className="inline-flex items-center gap-1 text-sm bg-white border border-gray-200 rounded px-2 py-1">
                            {email}
                            <button
                              onClick={() => setSelectedRecipients(selectedRecipients.filter((e) => e !== email))}
                              className="text-gray-400 hover:text-gray-600"
                              aria-label={`Remove ${email}`}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                        <Input
                          value={toInput}
                          onChange={(e) => setToInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ',') {
                              e.preventDefault()
                              const val = toInput.trim().replace(/,$/, '')
                              if (val && /.+@.+\..+/.test(val)) {
                                if (!selectedRecipients.includes(val)) {
                                  setSelectedRecipients([...selectedRecipients, val])
                                }
                                setToInput("")
                              }
                            }
                          }}
                          placeholder="Type email and press Enter"
                          className="w-auto min-w-[220px] bg-white"
                        />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button type="button" variant="outline" size="sm">Add from suggestions</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="max-h-64 overflow-auto">
                            {suggestedRecipients.map((r) => (
                              <DropdownMenuItem
                                key={r.email}
                                onClick={() => {
                                  if (!selectedRecipients.includes(r.email)) {
                                    setSelectedRecipients([...selectedRecipients, r.email])
                                  }
                                }}
                              >
                                <div className="flex flex-col">
                                  <span className="text-sm text-gray-900">{r.name}</span>
                                  <span className="text-xs text-gray-600">{r.email}</span>
                                </div>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">Subject</div>
                      <Input value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} placeholder="Subject" />
                    </div>

                    {/* Body */}
                    <div>
                      <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">Body</div>
                      <Textarea value={emailBody} onChange={(e) => setEmailBody(e.target.value)} rows={12} className="bg-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <Button variant="outline" onClick={() => setIsEmailModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendDraftEmail} disabled={!selectedEmailAction}>
                Send Email
              </Button>
            </div>
          </div>
        </div>
      )}

      {isCalendarOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className={`bg-white rounded-xl shadow-2xl ${isFullCalendarView ? "w-full max-w-7xl max-h-[95vh]" : "w-full max-w-4xl max-h-[90vh]"} overflow-hidden`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {isFullCalendarView ? "Full Calendar View" : "Calendar"}
                </h2>
                <p className="text-gray-600 mt-1">Your synced calendar events</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsAddEventOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsCalendarOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Connection Status */}
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${isGoogleConnected ? "bg-green-500" : "bg-gray-300"}`}></div>
                    <span className="text-sm font-medium">Google Calendar</span>
                    {!isGoogleConnected && (
                      <Button size="sm" variant="outline" onClick={handleConnectGoogle}>
                        Connect
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${isOutlookConnected ? "bg-green-500" : "bg-gray-300"}`}
                    ></div>
                    <span className="text-sm font-medium">Outlook Calendar</span>
                    {!isOutlookConnected && (
                      <Button size="sm" variant="outline" onClick={handleConnectOutlook}>
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
                <Button
                  variant={isFullCalendarView ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsFullCalendarView(!isFullCalendarView)}
                >
                  <CalendarDays className="h-4 w-4 mr-2" />
                  {isFullCalendarView ? "List View" : "Full Calendar"}
                </Button>
              </div>
            </div>

            {/* Calendar Content */}
            <div
              className={`p-6 ${isFullCalendarView ? "max-h-[calc(95vh-200px)]" : "max-h-[calc(90vh-200px)]"} overflow-y-auto`}
            >
              {isFullCalendarView ? (
                /* Added full calendar grid view */
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {monthNames[new Date().getMonth()]} {new Date().getFullYear()}
                    </h3>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {dayNames.map((day) => (
                      <div key={day} className="p-3 text-center font-medium text-gray-600 bg-gray-50 rounded">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {generateCalendarGrid().map((day, index) => (
                      <div key={index} className="min-h-[120px] p-2 border border-gray-200 rounded hover:bg-gray-50">
                        {day && (
                          <>
                            <div className="font-medium text-gray-900 mb-2">{day}</div>
                            <div className="space-y-1">
                              {mockCalendarEvents
                                .filter((event) => {
                                  const eventDate = new Date()
                                  if (event.date === "Today") return eventDate.getDate() === day
                                  if (event.date === "Tomorrow") return eventDate.getDate() + 1 === day
                                  return false
                                })
                                .map((event) => (
                                  <div
                                    key={event.id}
                                    className="text-xs p-1 bg-blue-100 text-blue-800 rounded truncate"
                                  >
                                    {event.time} - {event.title}
                                  </div>
                                ))}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Existing list view */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Today's Events */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Today</h3>
                    <div className="space-y-3">
                      {mockCalendarEvents
                        .filter((event) => event.date === "Today")
                        .map((event) => (
                          <div key={event.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium text-gray-900">{event.title}</h4>
                                <p className="text-sm text-gray-600">{event.time}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {event.type}
                                </Badge>
                                <div
                                  className={`w-2 h-2 rounded-full ${event.source === "google" ? "bg-blue-500" : event.source === "outlook" ? "bg-orange-500" : "bg-green-500"}`}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Tomorrow's Events */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Tomorrow</h3>
                    <div className="space-y-3">
                      {mockCalendarEvents
                        .filter((event) => event.date === "Tomorrow")
                        .map((event) => (
                          <div key={event.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium text-gray-900">{event.title}</h4>
                                <p className="text-sm text-gray-600">{event.time}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {event.type}
                                </Badge>
                                <div
                                  className={`w-2 h-2 rounded-full ${event.source === "google" ? "bg-blue-500" : event.source === "outlook" ? "bg-orange-500" : "bg-green-500"}`}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Calendar Integration Info */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Calendar Integration</h4>
                <p className="text-sm text-blue-700">
                  Connect your Outlook and Google calendars to see all your events in one place. Events are
                  automatically synced and updated in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {isAddEventOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Add New Event</h3>
              <Button variant="ghost" size="sm" onClick={() => setIsAddEventOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter event title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="meeting">Meeting</option>
                  <option value="call">Call</option>
                  <option value="appointment">Appointment</option>
                  <option value="reminder">Reminder</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Add event description"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEvent}>Add Event</Button>
            </div>
          </div>
        </div>
      )}

      {isUserSettingsOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">User Settings</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsUserSettingsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="overflow-y-auto max-h-[calc(95vh-180px)]">
              <div className="p-6 space-y-6">
                {/* User Profile Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
                  </h3>
                  {isLoadingProfile ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="text-sm text-gray-500">Loading profile...</div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <Input 
                          defaultValue={userProfile?.fullName || ''} 
                          className="w-full" 
                          readOnly 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <Input 
                          defaultValue={userProfile?.username || ''} 
                          className="w-full" 
                          readOnly 
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <Input 
                          defaultValue={userProfile?.email || ''} 
                          className="w-full" 
                          readOnly 
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Organisation</label>
                        <Input 
                          defaultValue={userProfile?.organisation || ''} 
                          className="w-full" 
                          readOnly 
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
                        <Input 
                          defaultValue={userProfile?.purpose || ''} 
                          className="w-full" 
                          readOnly 
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date Joined</label>
                        <Input 
                          defaultValue={userProfile?.dateJoined ? new Date(userProfile.dateJoined).toLocaleDateString() : ''} 
                          className="w-full" 
                          readOnly 
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Email Templates Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Email Templates
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Follow-up Email Template</span>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Meeting Summary Template</span>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Proposal Email Template</span>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Calendar Integrations Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Calendar Integrations
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                          <Mail className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <span className="text-sm font-medium">Outlook Calendar</span>
                          <p className="text-xs text-gray-600">Sync meetings and events</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Active
                        </Badge>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                          <Calendar className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <span className="text-sm font-medium">Google Calendar</span>
                          <p className="text-xs text-gray-600">Sync meetings and events</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-gray-600">
                          Inactive
                        </Badge>
                        <Button variant="outline" size="sm">
                          Connect
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Report Templates Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Report Templates
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Weekly Call Summary</span>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Monthly Performance Report</span>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Client Meeting Report</span>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Notes Templates Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Notes Templates
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">DISCO Analysis Template</span>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Meeting Notes Template</span>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium">Action Items Template</span>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with Logout */}
            <div className="border-t border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <Button variant="outline" onClick={() => setIsUserSettingsOpen(false)}>
                  Cancel
                </Button>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                    onClick={() => {
                      try {
                        if (typeof window !== "undefined") {
                          localStorage.removeItem("sally_auth")
                        }
                      } catch {}
                      setIsUserSettingsOpen(false)
                      router.replace("/login")
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                  <Button>Save Changes</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </Sidebar>
  )
}
