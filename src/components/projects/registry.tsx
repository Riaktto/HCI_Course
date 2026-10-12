import React from 'react';
import { Project01Irrigation } from './Project01Irrigation';
import { Project02Sensors } from './Project02Sensors';
import { Project03Clinic } from './Project03Clinic';
import { Project04Kiosk } from './Project04Kiosk';
import { Project05Reimbursement } from './Project05Reimbursement';
import { Project06Train } from './Project06Train';
import { Project07Pipeline } from './Project07Pipeline';
import { Project08Alerts } from './Project08Alerts';
import { Project09Thermostat } from './Project09Thermostat';
import { Project10MoneyTransfer } from './Project10MoneyTransfer';
import { Project11Library } from './Project11Library';

/** The ten deliberately bad interfaces, keyed by project id (see src/data/projects.ts). Each is designed at 1280 x 800 px. */
export const PROJECT_COMPONENTS: Record<number, React.ComponentType> = {
  1: Project01Irrigation,
  2: Project02Sensors,
  3: Project03Clinic,
  4: Project04Kiosk,
  5: Project05Reimbursement,
  6: Project06Train,
  7: Project07Pipeline,
  8: Project08Alerts,
  9: Project09Thermostat,
  10: Project10MoneyTransfer,
  11: Project11Library,
};
