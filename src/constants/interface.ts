import { Moment } from 'moment';
import { goalType } from './enum';

export interface NewGoalForm {
  title: string;
  description?: string;
  period?: Moment[];
  type?: goalType;
  amount?: number;
  checklist?: string[];
}

export interface Goal {
  title: string;
  type?: goalType;
  description?: string;
  startDate?: string;
  endDate?: string;
  amount?: number;
  checklist?: string[];
}
