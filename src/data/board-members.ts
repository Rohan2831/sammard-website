import type { BoardYear } from "@/types";

// 2026–2027 (the current board) is from the team directly (2026-10).
// Every earlier board year, member, position and headshot is from the team's previous
// website's source (Team_Sammard-_2025_2026_Website, components/about.tsx),
// imported 2026-10 — it lists more members per year than the live site's
// rendered page did. Latest year first. Photos are looked up by name at build
// time — `public/assets/about/board/<name>.jpg` (see that folder's
// images.txt) — with a placeholder for anyone without one.
//
// `department` is set only where the position names a domain (brochure names:
// Mechanical, Electronics, Computer Science, Propulsion, Management — e.g.
// "Avionics Lead" -> Electronics, "Creative Lead" -> Management). Team-wide
// roles (Captain, Head of Operations, competition and R&D leads) have none.
export const boardYears: BoardYear[] = [
  {
    year: "2026–2027",
    // Hidden until the photos arrive (per the team) — the site shows 2024–2025
    // as the current board meanwhile. Photo slots, in public/assets/about/board/:
    // gahan-shekhar, aditi-bhore, aalap-panda, swaraj-sharma, yug-solanki,
    // vedanjali-gautam, hansika-naresh, prateek-sreenath, adit-goyal,
    // advay-kulkarni (.jpg/.png/.webp). Delete `hidden: true` to publish.
    hidden: true,
    members: [
      { id: "board-2627-1", name: "Gahan Shekhar", position: "Captain" },
      { id: "board-2627-2", name: "Aditi Bhore", position: "Team Manager & CanSat Lead" },
      { id: "board-2627-3", name: "Aalap Panda", position: "Operations Lead" },
      { id: "board-2627-4", name: "Swaraj Sharma", position: "Mechanical Lead", department: "Mechanical" },
      { id: "board-2627-5", name: "Yug Solanki", position: "Propulsion Lead", department: "Propulsion" },
      { id: "board-2627-6", name: "Vedanjali Gautam", position: "Electronics Lead", department: "Electronics" },
      { id: "board-2627-7", name: "Hansika Naresh", position: "Design & Management Lead", department: "Management" },
      { id: "board-2627-8", name: "Prateek Sreenath", position: "Computer Science Lead", department: "Computer Science" },
      { id: "board-2627-9", name: "Adit Goyal", position: "Payload Lead" },
      { id: "board-2627-10", name: "Advay Kulkarni", position: "IREC Lead" },
    ],
  },
  {
    year: "2024–2025",
    members: [
      { id: "board-2425-1", name: "Prithvi Raj Singh", position: "Captain" },
      { id: "board-2425-2", name: "Jermy K. Varkey", position: "Head of Operations" },
      { id: "board-2425-3", name: "Ansu Banerjee", position: "IREC Lead" },
      { id: "board-2425-4", name: "Joanna Suzan Biju", position: "CanSat Lead" },
      { id: "board-2425-5", name: "Vishvak Narayanan", position: "Mechanical Lead", department: "Mechanical" },
      { id: "board-2425-6", name: "Shyam Rajendran", position: "Electronics Lead", department: "Electronics" },
      { id: "board-2425-7", name: "Aryan Bhirud", position: "CS Lead", department: "Computer Science" },
      { id: "board-2425-8", name: "Anshu Kumar", position: "Management Lead", department: "Management" },
      { id: "board-2425-9", name: "Kapileshwar Shrikanth", position: "R&D Lead" },
      { id: "board-2425-10", name: "Chanakya Acharya", position: "Mechanical Senior", department: "Mechanical" },
      { id: "board-2425-11", name: "Sunsitha Varshini P", position: "Electronics Senior", department: "Electronics" },
      { id: "board-2425-12", name: "Mukul Sharma", position: "Electronics Senior", department: "Electronics" },
      { id: "board-2425-13", name: "Ranjith", position: "Electronics Senior", department: "Electronics" },
      { id: "board-2425-14", name: "Robin Phillip", position: "Electronics Senior", department: "Electronics" },
      { id: "board-2425-15", name: "Khyati Kejriwal", position: "Electronics Senior", department: "Electronics" },
      { id: "board-2425-16", name: "B Keertana", position: "CS Senior", department: "Computer Science" },
      { id: "board-2425-17", name: "Syed Zeeshan Ahmed", position: "CS Senior", department: "Computer Science" },
      { id: "board-2425-18", name: "Gunjan Siddharth", position: "CS Senior", department: "Computer Science" },
      { id: "board-2425-19", name: "Rahul Laxman", position: "CS Senior", department: "Computer Science" },
    ],
  },
  {
    year: "2023–2024",
    members: [
      { id: "board-2324-1", name: "Paavan Kalyani", position: "Captain" },
      { id: "board-2324-2", name: "Shivam Dey", position: "Head of Operations" },
      { id: "board-2324-3", name: "Mihika Pant", position: "SA Cup Lead" },
      { id: "board-2324-4", name: "Aditya Patel", position: "CanSat Lead" },
      { id: "board-2324-5", name: "Aniket Nath", position: "Mechanical Lead", department: "Mechanical" },
      { id: "board-2324-6", name: "Krishna Ghatol", position: "Electronics Lead", department: "Electronics" },
      { id: "board-2324-7", name: "Khyati Sinha", position: "CS Lead", department: "Computer Science" },
      { id: "board-2324-8", name: "Ammay Bathla", position: "Creative Lead", department: "Management" },
      { id: "board-2324-9", name: "Anushka", position: "Mechanical R&D Lead", department: "Mechanical" },
      { id: "board-2324-10", name: "Soumitra Mahashabde", position: "Electronics R&D Lead", department: "Electronics" },
      { id: "board-2324-11", name: "Shyam Lalakiya", position: "Mechanical Senior", department: "Mechanical" },
      { id: "board-2324-12", name: "Syed Sami Ahmed", position: "CS Senior", department: "Computer Science" },
      { id: "board-2324-13", name: "Krishnendu Roy", position: "CS Senior", department: "Computer Science" },
    ],
  },
  {
    year: "2022–2023",
    members: [
      { id: "board-2223-1", name: "Jatin Dhall", position: "Captain" },
      { id: "board-2223-2", name: "Dhananjay K Prasad", position: "Vice Captain" },
      { id: "board-2223-3", name: "Supreet Kaur Thind", position: "SA Cup Lead" },
      { id: "board-2223-4", name: "Vishwajeet Menon", position: "CanSat Lead" },
      { id: "board-2223-5", name: "Digvijay Bhamare", position: "Mech Lead", department: "Mechanical" },
      { id: "board-2223-6", name: "Chandrashish Kukrety", position: "Avionics Lead", department: "Electronics" },
      { id: "board-2223-7", name: "Abhirami Anilkumar", position: "Management Lead", department: "Management" },
      { id: "board-2223-8", name: "Farhan Hatim", position: "R&D Lead" },
      { id: "board-2223-9", name: "Anubhav Mitra", position: "Mechanical Senior", department: "Mechanical" },
      { id: "board-2223-10", name: "Devatha Kinit Sai", position: "Mechanical Senior", department: "Mechanical" },
      { id: "board-2223-11", name: "Shreyas GT", position: "Avionics Senior", department: "Electronics" },
      { id: "board-2223-12", name: "Nandini Mehrotra", position: "Avionics Management", department: "Electronics" },
      { id: "board-2223-13", name: "Manju Ranganath", position: "Avionics Senior", department: "Electronics" },
      { id: "board-2223-14", name: "Aniruddh Pandey", position: "Avionics Senior", department: "Electronics" },
    ],
  },
  {
    year: "2021–2022",
    members: [
      { id: "board-2122-1", name: "Radha Debal Goswami", position: "Captain" },
      { id: "board-2122-2", name: "Sankalp Dua", position: "Vice Captain" },
      { id: "board-2122-3", name: "Eshan Sabhapandit", position: "CanSat Lead & Avionics Lead", department: "Electronics" },
      { id: "board-2122-4", name: "Harsh Desai", position: "Mech Lead", department: "Mechanical" },
      { id: "board-2122-5", name: "Prarthana Prabhakaran", position: "Management Lead", department: "Management" },
      { id: "board-2122-6", name: "Chiran Binnu Cherian", position: "Mechanical", department: "Mechanical" },
      { id: "board-2122-7", name: "Debdoot Ghosh", position: "Mechanical", department: "Mechanical" },
      { id: "board-2122-8", name: "KSV Pradyumna", position: "Avionics", department: "Electronics" },
      { id: "board-2122-9", name: "Yashvi Gaglani", position: "Management", department: "Management" },
    ],
  },
  {
    year: "2019–2021",
    members: [
      { id: "board-1921-1", name: "Deerajkumar Parthipan", position: "Captain & Structures Lead", department: "Mechanical" },
      { id: "board-1921-2", name: "Pranshu Aggarwal", position: "Vice Captain & Management", department: "Management" },
      { id: "board-1921-3", name: "Srinija Ramichetty", position: "Avionics Lead & CS Lead", department: "Electronics & Computer Science" },
      { id: "board-1921-4", name: "Lakshman Vijay", position: "Propulsion Lead", department: "Propulsion" },
      { id: "board-1921-5", name: "Mohan Raj", position: "Mechanical", department: "Mechanical" },
      { id: "board-1921-6", name: "Soham Korgaonkar", position: "Avionics", department: "Electronics" },
    ],
  },
  {
    year: "2018–2019",
    members: [
      { id: "board-1819-1", name: "Bharadwaj Tallapragada", position: "Captain & Mech Lead", department: "Mechanical" },
      { id: "board-1819-2", name: "Godwyn James William", position: "Vice Captain & CS Lead", department: "Computer Science" },
      { id: "board-1819-3", name: "Adarsh Venkatachalam", position: "Avionics Lead", department: "Electronics" },
      { id: "board-1819-4", name: "Karthik Srinivas", position: "Management Lead", department: "Management" },
      { id: "board-1819-5", name: "Deepshikha Kumari", position: "Avionics", department: "Electronics" },
      { id: "board-1819-6", name: "Ashwin Soorya Prakash", position: "Avionics", department: "Electronics" },
    ],
  },
  {
    year: "2017–2018",
    members: [
      { id: "board-1718-1", name: "Shashwat Rajput", position: "Captain" },
      { id: "board-1718-2", name: "Shashank Amin", position: "Vice Captain & Mech Lead", department: "Mechanical" },
      { id: "board-1718-3", name: "Karishnu Poddar", position: "CS Lead", department: "Computer Science" },
      { id: "board-1718-4", name: "Rajarshi Bhattacharyya", position: "Avionics Lead", department: "Electronics" },
      { id: "board-1718-5", name: "Baishayan Gupta", position: "Management Lead", department: "Management" },
      { id: "board-1718-6", name: "Kartik Vijayakumar", position: "Mechanical", department: "Mechanical" },
      { id: "board-1718-7", name: "KSP Anirudh", position: "Mechanical", department: "Mechanical" },
      { id: "board-1718-8", name: "Arunava Basu", position: "Avionics", department: "Electronics" },
      { id: "board-1718-9", name: "Preet Derasari", position: "Avionics", department: "Electronics" },
    ],
  },
];
