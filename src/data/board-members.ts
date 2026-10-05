import type { BoardYear } from "@/types";

// Names and positions confirmed against teamsammard.com/about (live
// production site, cross-referenced 2026-09). The live page hides 5 more
// years behind a "Select Mission Year" dropdown (2022-2023 back to
// 2017-2018) — missed in the first crawl pass, added on a 2026-09 re-check.
// Photos are not scraped/copied (real people's photos) — placeholder image
// used until real ones are supplied, see ASSETS_NEEDED.md. LinkedIn URLs not
// published on the source site, left unset rather than guessed.
//
// `department` is filled where a member's own position names or clearly
// implies one of the team's 5 real divisions (Mechanical, Propulsion,
// Electrical, CS, Management — confirmed by the team via Udbhava's PTR, see
// departments.ts) — e.g. "Avionics Lead" -> Electrical, "CS Senior" -> CS.
// Team-wide leadership/competition-lead titles that aren't tied to one
// division (Captain, Vice Captain, Head of Operations, SA Cup/CanSat/IREC
// Lead) stay "TBD" rather than guessing a split.
export const boardYears: BoardYear[] = [
  {
    year: "2024–2025",
    members: [
      { id: "board-2425-1", name: "Prithvi Raj Singh", position: "Captain", department: "TBD", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-2425-2", name: "Jermy K. Varkey", position: "Head of Operations", department: "Management", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-2425-3", name: "Ansu Banerjee", position: "IREC Lead", department: "TBD", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-2425-4", name: "Joanna Suzan Biju", position: "CanSat Lead", department: "TBD", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-2425-5", name: "Syed Zeeshan Ahmed", position: "CS Senior", department: "CS", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-2425-6", name: "Gunjan Siddharth", position: "CS Senior", department: "CS", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-2425-7", name: "Rahul Laxman", position: "CS Senior", department: "CS", photo: "/assets/about/board-placeholder.jpg" },
    ],
  },
  {
    year: "2023–2024",
    members: [
      { id: "board-2324-1", name: "Paavan Kalyani", position: "Captain", department: "TBD", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-2324-2", name: "Shivam Dey", position: "Head of Operations", department: "Management", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-2324-3", name: "Mihika Pant", position: "SA Cup Lead", department: "TBD", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-2324-4", name: "Aditya Patel", position: "CanSat Lead", department: "TBD", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-2324-5", name: "Shyam Lalakiya", position: "Mechanical Senior", department: "Mechanical", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-2324-6", name: "Syed Sami Ahmed", position: "CS Senior", department: "CS", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-2324-7", name: "Krishnendu Roy", position: "CS Senior", department: "CS", photo: "/assets/about/board-placeholder.jpg" },
    ],
  },
  {
    year: "2022–2023",
    members: [
      { id: "board-2223-1", name: "Jatin Dhall", position: "Captain", department: "TBD", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-2223-2", name: "Dhananjay K Prasad", position: "Vice Captain", department: "TBD", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-2223-3", name: "Supreet Kaur Thind", position: "SA Cup Lead", department: "TBD", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-2223-4", name: "Vishwajeet Menon", position: "CanSat Lead", department: "TBD", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-2223-5", name: "Nandini Mehrotra", position: "Avionics Management", department: "Electrical", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-2223-6", name: "Manju Ranganath", position: "Avionics Sr.", department: "Electrical", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-2223-7", name: "Aniruddh Pandey", position: "Avionics Sr.", department: "Electrical", photo: "/assets/about/board-placeholder.jpg" },
    ],
  },
  {
    year: "2021–2022",
    members: [
      { id: "board-2122-1", name: "Radha Debal Goswami", position: "Captain", department: "TBD", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-2122-2", name: "Sankalp Dua", position: "Vice Captain", department: "TBD", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-2122-3", name: "Eshan Sabhapandit", position: "CanSat Lead & Avionics Lead", department: "Electrical", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-2122-4", name: "Harsh Desai", position: "Mech Lead", department: "Mechanical", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-2122-5", name: "Debdoot Ghosh", position: "Mechanical", department: "Mechanical", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-2122-6", name: "KSV Pradyumna", position: "Avionics", department: "Electrical", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-2122-7", name: "Yashvi Gaglani", position: "Management", department: "Management", photo: "/assets/about/board-placeholder.jpg" },
    ],
  },
  {
    year: "2019–2021",
    members: [
      { id: "board-1921-1", name: "Deerajkumar Parthipan", position: "Captain & Structures Lead", department: "Mechanical", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-1921-2", name: "Pranshu Aggarwal", position: "Vice Captain & Management", department: "Management", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-1921-3", name: "Srinija Ramichetty", position: "Avionics Lead & CS Lead", department: "Electrical & CS", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-1921-4", name: "Lakshman Vijay", position: "Propulsion Lead", department: "Propulsion", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-1921-5", name: "Mohan Raj", position: "Mechanical", department: "Mechanical", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-1921-6", name: "Soham Korgaonkar", position: "Avionics", department: "Electrical", photo: "/assets/about/board-placeholder.jpg" },
    ],
  },
  {
    year: "2018–2019",
    members: [
      { id: "board-1819-1", name: "Bharadwaj Tallapragada", position: "Captain & Mech Lead", department: "Mechanical", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-1819-2", name: "Godwyn James William", position: "Vice Captain & CS Lead", department: "CS", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-1819-3", name: "Adarsh Venkatachalam", position: "Avionics Lead", department: "Electrical", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-1819-4", name: "Karthik Srinivas", position: "Management Lead", department: "Management", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-1819-5", name: "Deepshikha Kumari", position: "Avionics", department: "Electrical", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-1819-6", name: "Ashwin Soorya Prakash", position: "Avionics", department: "Electrical", photo: "/assets/about/board-placeholder.jpg" },
    ],
  },
  {
    year: "2017–2018",
    members: [
      { id: "board-1718-1", name: "Shashwat Rajput", position: "Captain", department: "TBD", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-1718-2", name: "Shashank Amin", position: "Vice Captain & Mech Lead", department: "Mechanical", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-1718-3", name: "Karishnu Poddar", position: "CS Lead", department: "CS", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-1718-4", name: "Rajarshi Bhattacharyya", position: "Avionics Lead", department: "Electrical", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-1718-5", name: "KSP Anirudh", position: "Mechanical", department: "Mechanical", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-1718-6", name: "Arunava Basu", position: "Avionics", department: "Electrical", photo: "/assets/about/board-placeholder.jpg" },
      { id: "board-1718-7", name: "Preet Derasari", position: "Avionics", department: "Electrical", photo: "/assets/about/board-placeholder.jpg" },
    ],
  },
];
