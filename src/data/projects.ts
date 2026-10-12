import type { IconName } from './session2Types';

/**
 * The ten semester projects ("Fix a Broken Interface").
 * Each project is a deliberately bad interface (src/components/projects/) that teams improve a little
 * more after every session. Text here is shown to students: keep it plain and free of hints about the
 * planted problems.
 */
export type Lens = 'look' | 'remember' | 'point' | 'understand';

/** One annotated problem of the class example (project 11): where it is on the 1280 x 800 interface, and the audit in plain words. */
export interface Finding {
  lens: Lens;
  /** rectangle in the interface's own 1280 x 800 coordinates */
  rect: { x: number; y: number; w: number; h: number };
  saw: string;
  why: string;
  fix: string;
}

export interface Project {
  id: number;
  title: string;
  domain: string;
  icon: IconName;
  /** one short line for the cards */
  cardLine: string;
  user: string;
  situation: string;
  /** the single task students must try on the interface */
  task: string;
  stake: string;
  /** false = reachable by link and slides only (the lecturer's class example), not shown in the gallery */
  listed?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Farm Irrigation Controller',
    domain: 'Agriculture',
    icon: 'sprout',
    cardLine: 'Start watering a field from a tablet in bright sun.',
    user: 'Karim, a farm technician',
    situation:
      'Karim works outdoors in strong sunlight, often wearing gloves. He controls the water for twelve field zones from a tablet.',
    task: 'Start irrigation for Field B (tomatoes) for 25 minutes and make sure it is running.',
    stake: 'Too little water ruins the crop. Too much wastes water and money.',
  },
  {
    id: 2,
    title: 'Soil Sensor Dashboard',
    domain: 'Agriculture',
    icon: 'chart',
    cardLine: 'Decide if a field needs water today.',
    user: 'Salma, an agronomist',
    situation:
      'Every morning Salma reads the sensor values of many fields to decide where to irrigate.',
    task: 'Decide whether Field C needs watering today, and find its soil-moisture trend for the last 3 days.',
    stake: 'A wrong decision wastes water or dries out the crop.',
  },
  {
    id: 3,
    title: 'Clinic Appointment Booking',
    domain: 'Healthcare',
    icon: 'heart',
    cardLine: 'Book a doctor’s appointment on a website.',
    user: 'Amina, 55, who uses the internet only now and then',
    situation: 'Amina wants to book a check-up for herself on her clinic’s website.',
    task: 'Book a general check-up with Dr. Alami next Tuesday morning and confirm the booking.',
    stake: 'When booking fails, patients skip care or arrive without a slot.',
  },
  {
    id: 4,
    title: 'Hospital Check-in Kiosk',
    domain: 'Healthcare',
    icon: 'pointer',
    cardLine: 'Check in at a touchscreen in a busy hall.',
    user: 'A patient in a crowded waiting hall',
    situation: 'The patient is stressed and in a hurry. A queue is forming behind them.',
    task: 'Check in for the 10:30 appointment with insurance number 0472 1983 5521 and get the queue ticket.',
    stake: 'Queues and stress grow when check-in goes wrong.',
  },
  {
    id: 5,
    title: 'Health Insurance Claims Portal',
    domain: 'Public services',
    icon: 'landmark',
    cardLine: 'Claim back money for a pharmacy bill.',
    user: 'Youssef, an employee',
    situation: 'Youssef paid a pharmacy bill and wants the insurance to reimburse him.',
    task: 'Submit a reimbursement claim for a pharmacy invoice of 312 MAD, then find out its current status.',
    stake: 'People give up and lose money they are owed.',
  },
  {
    id: 6,
    title: 'Train Ticket Booking',
    domain: 'Public services',
    icon: 'route',
    cardLine: 'Buy a train ticket for tomorrow morning.',
    user: 'Sara, a student',
    situation: 'Sara travels home tomorrow and wants a seat on a morning train.',
    task: 'Buy one 2nd-class ticket from Casablanca to Marrakech for tomorrow, leaving around 09:00.',
    stake: 'A failed booking means a missed trip.',
  },
  {
    id: 7,
    title: 'Build Pipeline Dashboard',
    domain: 'Developer tools',
    icon: 'code',
    cardLine: 'Find out why a software build failed.',
    user: 'Omar, a developer who is on call',
    situation: 'A release build has just failed and the team is waiting.',
    task: 'Find why the latest release build failed and re-run only the failed test job.',
    stake: 'A slow fix delays the whole team’s release.',
  },
  {
    id: 8,
    title: 'Server Alert Console',
    domain: 'Developer tools',
    icon: 'server',
    cardLine: 'Pick the most urgent alert out of forty.',
    user: 'Lina, an engineer on call at 3 a.m.',
    situation: 'Dozens of alerts have arrived. Lina is tired and must act fast.',
    task: 'Find the most urgent alert, acknowledge it, and assign it to the database team.',
    stake: 'A missed alert can take a service down.',
  },
  {
    id: 9,
    title: 'Smart Home Energy Panel',
    domain: 'Home and energy',
    icon: 'gauge',
    cardLine: 'Heat a room without wasting energy.',
    user: 'Hassan, who lives with his family',
    situation: 'It is a cold winter day. Hassan uses the wall panel to control the heating.',
    task: 'Make the living room warm by 7 pm while using as little energy as possible.',
    stake: 'Confusing controls waste energy and money.',
  },
  {
    id: 10,
    title: 'Mobile Money Transfer App',
    domain: 'Finance',
    icon: 'hand',
    cardLine: 'Send money to a friend from a phone.',
    user: 'Ahmed, a daily phone user',
    situation: 'Ahmed owes a friend money and wants to pay from his wallet app.',
    task: 'Send 450 MAD to Sara Benali and check the fee before confirming.',
    stake: 'Hidden fees and mistakes cost real money.',
  },
  {
    id: 11,
    title: 'Study Room Booking',
    domain: 'Class example',
    icon: 'book',
    cardLine: 'Reserve a study room in the campus library.',
    user: 'Imane, a university student',
    situation: 'Imane has a group project and needs a quiet room in the library for tomorrow afternoon.',
    task: 'Book a study room for 4 people tomorrow from 14:00 to 16:00.',
    stake: 'A confusing booking sends students to a room that is not theirs.',
    listed: false,
  },
];
