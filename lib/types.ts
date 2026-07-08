// ─── Serialized types used across server → client boundaries ───

/** Serialized event returned by service layer and API routes */
export interface SerializedEvent {
  id: string;
  title: string;
  venue: string;
  date: string;
  time: string;
  category: string;
  image?: string;
  description?: string;
  tags: string[];
  status?: string;
  capacity?: number;
  registrationDeadline?: string;
}

/** Serialized notice returned by service layer and API routes */
export interface SerializedNotice {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  source?: string;
  iconType?: string;
  isUnread: boolean;
  tags: string[];
}

/** Authenticated user returned by getCurrentUser() */
export interface AuthUser {
  id: string;
  email: string | undefined;
  name: string;
  image: string | undefined;
  dbUser: DbUser;
}

/** Lean MongoDB user document */
export interface DbUser {
  _id: string;
  clerkId?: string;
  name?: string;
  email: string;
  phone?: string;
  rollNumber?: string;
  hall?: string | null;
  department?: string;
  year?: string;
  profileImage?: string;
  gender?: string | null;
  collegeEmail?: string | null;
  profileCompleted: boolean;
  role: 'student' | 'society_admin' | 'super_admin';
  societies?: string[];
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/** Registration status for an event */
export interface RegistrationResult {
  success: boolean;
  error?: string;
  registrationId?: string;
}

/** User's registered event */
export interface RegisteredEvent {
  id: string;
  title: string;
  venue: string;
  date: string;
  time: string;
  image?: string;
  description?: string;
  status: string;
  registeredAt: string;
}
