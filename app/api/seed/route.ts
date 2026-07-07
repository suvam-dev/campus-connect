import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import Notice from "@/models/Notice";

const MOCK_EVENTS = [
  {
    title: "Guest Lecture by Dr. Sarah Chen",
    venue: "Auditorium",
    date: "2026-07-08",
    time: "4:00 PM",
    category: "Academic",
    tags: ["Robotics", "AI", "Healthcare"],
    description: "An insightful lecture on the future of AI and robotics in modern healthcare.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2940&auto=format&fit=crop"
  },
  {
    title: "AI in Sustainable Engineering",
    venue: "Tech Lab 4",
    date: "2026-07-10",
    time: "10:00 AM",
    category: "Technical",
    tags: ["Sustainability", "AI", "Workshop"],
    description: "Exploring sustainable practices through the lens of artificial intelligence.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2944&auto=format&fit=crop"
  },
  {
    title: "Spring Fest Prelims",
    venue: "Open Air Theatre",
    date: "2026-07-11",
    time: "6:00 PM",
    category: "Cultural",
    tags: ["Festival", "Music", "Dance"],
    description: "The preliminary rounds for the annual cultural extravaganza.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2874&auto=format&fit=crop"
  },
  {
    title: "Inter-Hall Sports Meet",
    venue: "Jnan Ghosh Stadium",
    date: "2026-07-15",
    time: "5:00 PM",
    category: "Sports",
    tags: ["Athletics", "Competition"],
    description: "Annual athletics competition between the halls of residence.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2940&auto=format&fit=crop"
  }
];

const MOCK_NOTICES = [
  {
    title: "Mid-Semester Exams Schedule Released",
    category: "Academic",
    date: "2026-07-07",
    description: "The schedule for the upcoming mid-semester examinations has been published on the ERP.",
    source: "Academic Section",
    isUnread: true,
    tags: ["Exams", "Important"],
    iconType: "BookOpen"
  },
  {
    title: "Hostel Allocation for Incoming Freshers",
    category: "Admin",
    date: "2026-07-06",
    description: "First-year students are requested to check the HMC portal for their respective hostel allocations.",
    source: "Hall Management Centre",
    isUnread: false,
    tags: ["Hostel", "Freshers"],
    iconType: "Home"
  },
  {
    title: "Library Timings Extended for Finals",
    category: "Campus",
    date: "2026-07-05",
    description: "The Central Library will remain open 24x7 starting next week until the end of the examinations.",
    source: "Central Library",
    isUnread: false,
    tags: ["Library", "Exams"],
    iconType: "Library"
  },
  {
    title: "Inter-IIT Sports Camp Selection",
    category: "Sports",
    date: "2026-07-04",
    description: "Trials for the upcoming Inter-IIT sports meet will be held at Jnan Ghosh Stadium this weekend.",
    source: "TSG",
    isUnread: false,
    tags: ["Inter-IIT", "Selection"],
    iconType: "Trophy"
  }
];

export async function GET() {
  try {
    await connectDB();

    // Clear existing data
    await Event.deleteMany({});
    await Notice.deleteMany({});

    // Seed new data
    const events = await Event.insertMany(MOCK_EVENTS);
    const notices = await Notice.insertMany(MOCK_NOTICES);

    return NextResponse.json(
      { 
        message: "Database seeded successfully!", 
        data: {
          eventsCount: events.length,
          noticesCount: notices.length
        } 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Seeding error:", error);
    return NextResponse.json(
      { error: "Failed to seed database", details: error.message },
      { status: 500 }
    );
  }
}
