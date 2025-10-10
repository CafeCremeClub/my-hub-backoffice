export interface Profile {
  id: string;
  email: string;
  phone: string;
  firstname: string;
  lastname: string;
  country: string;
  city: string;
  profession: string;
  tjm: string;
  expertise: string;
  industry: string[];
  desiredJobs: string[];
  cv: string;
  linkedIn: string;
  whatsApp: string;
  bio: string | null;
  skills: string[] | null;
}
