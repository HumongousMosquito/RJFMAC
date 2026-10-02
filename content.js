// ============================================================
//  SITE CONTENT — this is the only file you need to edit
//  to post announcements and problems of the week.
// ============================================================

// Links to your Google Forms (replace the placeholders).
const LINKS = {
  register: "https://docs.google.com/forms/d/e/1FAIpQLScGvhIdJi5wGMFA3qYJ3WE8YM7huUvXdA7_QAH3Zi3JN8eq7A/viewform?usp=publish-editor",
  teamRegister: "https://docs.google.com/forms/d/e/1FAIpQLScnrR8ppYfNPwCto6GltPII2i-OYr0QnX0yeTzErpc8DSrUmg/viewform?usp=publish-editor",
  questions: "https://docs.google.com/forms/d/e/1FAIpQLScP7NgkBks3Ikd2BKnX7Qh5RyTbJp0xSIvTDBeszqC4CMKfdQ/viewform?usp=publish-editor",
  potw: "https://docs.google.com/forms/d/e/1FAIpQLSfs1ZaUMuGo-EyVrKc5S9HbFCemyPPJ2QY6ygAbnfuRQE1bFQ/viewform?usp=publish-editor",
};

// ------------------------------------------------------------
//  ANNOUNCEMENTS — shown newest first automatically (sorted by date).
//  Copy a block { ... }, paste it at the top, and change the text.
// ------------------------------------------------------------
const ANNOUNCEMENTS = [
  {
    date: "2026-09-30",
    title: "Welcome to the competition!",
    body: "Registration is now open. Head to the Register tab to sign up with your school email.",
  },
  {
    date: "2026-09-30",
    title: "Problems of the week are live!",
    body: "A few problems are posted. Give them a try!",
  },
];

// ------------------------------------------------------------
//  PROBLEMS OF THE WEEK
//
//  To add a new problem: copy one block { ... }, paste it at the
//  top of the list, and change the fields.
//
//  Math: write LaTeX between $...$ (inline) or $$...$$ (display).
//  Keep the String.raw`...` wrapper around the statement so
//  backslashes like \frac and \sqrt work without extra escaping.
//
//  weekOf: the first day of that problem's week (YYYY-MM-DD).
// ------------------------------------------------------------
const PROBLEMS = [
  {
    week: 1,
    title: "I Promise There's a Fast Way to Do This",
    weekOf: "2026-09-21",
    statement: String.raw`How many odd numbers are there less than $100$, the sum of whose digits is also odd?`,
    points:5
  },{
    week: 1,
    title: "Sums of Digits Are Bad",
    weekOf: "2026-09-21",
    statement: String.raw`What is the smallest odd positive integer greater than $10$ which is divisible by the sum of its digits?`,
    points:8
  },{
    week: 2,
    title: "Big Number Divisibility",
    weekOf: "2026-09-28",
    statement: String.raw`Find the smallest positive integer $n$ for which $52n-1$ is a multiple of $101$.`,
    points:7
  }
];

// ------------------------------------------------------------
//  RESOURCES — links to help people get better.
//  Shown in the order listed here. Copy a block { ... } to add one.
//  "description" is optional.
// ------------------------------------------------------------
const RESOURCES = [
  {
    title: "SM3 2025",
    link: "https://www.stanfordmathtournament.org/past-tests/SM3/2025",
    description: "Another contest with good practice problems.",
  },
  {
    title: "BmMT",
    link: "https://berkeley.mt/archives/",
    description: "Another contest, this one with harder problems. Make sure to look at BmMT, not BMT.",
  },
  {
    title: "Our Combo Handout",
    link: "https://drive.google.com/file/d/16A64abqfHuLzMp583DPbhcIo7MzouaW_/view?usp=drive_link",
    description: "This may be difficult, so try at your own risk. However, it covers some useful techniques for counting.",
  },
  {
    title: "Using Remainders in NT",
    link: "https://drive.google.com/file/d/1Yvd0rJO7XgD3KXDC5gIJgT7VTkPuGY3v/view?usp=drive_link",
    description: "A six-line intro to a technique to better handle remainders. This may help with a week 2 PoTW :).",
  }
];

// ------------------------------------------------------------
//  RULES — shown as a numbered list, in this order.
//  These are starting suggestions; edit, add, or delete freely.
//  Each rule goes in quotes and ends with a comma.
// ------------------------------------------------------------
const RULES = [
  "The competition is open to all registered students. Register using your school email. you can form team with up to 5 students.",
  "Each contestant must register, and a captain must register each team. Solo competitors must do both forms.",
  "A new Problem of the Week is posted each week. Every answer is a positive integer. PLEASE REGISTER before submitting problems.",
  "Submissions never close, so you can solve past problems at any time.",
  "Each correct answer earns the points shown on that problem, and problems for the current week are worth double. If two people collaborated on a problem, both can submit. Total team scores appear on the Leaderboard.",
  "Collaboration is allowed and encouraged on problems of the week.",
  "Questions? Use the Questions tab and we'll reply to your school email. Check the FAQ first, though.",
  "Please, please, PLEASE DON'T SPAM and KEEP USERNAMES SCHOOL-APPROPRIATE. Please.",
];

// ------------------------------------------------------------
//  FAQ — frequently asked questions, shown in this order.
//  Each entry has a question "q" and an answer "a".
//  These are starting suggestions; edit, add, or delete freely.
// ------------------------------------------------------------
const FAQ = [
  {
    q: "What is a \"good score\" on this competition?",
    a: "This competition is difficult. This isn't like school where this is a graded test. Actually, scoring 3 out of 10 on the individual round would be considered really good.",
  },
  {
    q: "When is the main competition?",
    a: "The competition is on the week of December 7 on Monday, Tuesday, and Thursday after school at 3 PM for one hour each day in the Y wing. Depending on how many people can make it, we may add a second slot.",
  },
  {
    q: "What if I can't make the competition?",
    a: "We are having an online version of this contest too, where you can do all the problems when you have time. Of course, you will have to coordinate the timings with your team.",
  },
  {
    q: "What is the competition format?",
    a: "We have two individual rounds focusing on two subjects not usually taught in school. They will feel like stepping out of your comfort zone. These have 10 questions for 50 minutes. Then, we have a 13-question 45-minute team round. Finally, we have a 60-minute puzzle round where your whole team will work to solve tough puzzles together.",
  },
  {
    q: "Who can participate?",
    a: "Any student at our school. Sign up on the Register tab using your school email.",
  },
  {
    q: "How big are teams?",
    a: "Teams of one to five are accepted.",
  },
  {
    q: "How do you calculate scores?",
    a: "Scores will be calculated as the average of the individual scores (out of 10) plus your team round score (out of 13) plus your puzzle round score times a multiplier (out of 12) for a total of 35 points.",
  },
  {
    q: "Will you release a leaderboard for the competition?",
    a: "No, we will not release a leaderboard. However, the top few non-mathcounts teams will be recognized.",
  },
  {
    q: "Do I have to solve every Problem of the Week?",
    a: "No. Problems of the Week are optional practice. Try problems if you want to.",
  },
  {
    q: "Can I submit an answer to an old problem?",
    a: "Yes. Submissions never close, so you can solve past problems at any time.",
  },
  {
    q: "What kind of answers are there?",
    a: "Every answer is a positive integer (1, 2, 3, ...).",
  },
  {
    q: "Can I work with friends?",
    a: "Yes, collaboration is allowed and encouraged on Problems of the Week. On the actual contest, however, you cannot communicate with others during the individual round and you can only communicate with your team in other rounds.",
  },
  {
    q: "How does the potw leaderboard work?",
    a: "Each correct answer earns the points shown on that problem, and problems from the current week are worth double. The scores on the leaderboard are the sum of the scores of the people in the team. On the leaderboard, teams appear by name and id. The leaderboard is updated regularly, so your score may not appear right away.",
  },
  {
    q: "Is this website vibecoded?",
    a: "Yes, this website is vibecoded. We prioritize the actual contest over the website.",
  }
];
