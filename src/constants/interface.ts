import { Moment } from 'moment';
import { goalType } from './enum';

export interface NewGoalForm {
  title: string;
  description: string | undefined;
  period: Moment[] | undefined;
  type: goalType | undefined;
  amount?: number | undefined;
  checklist?: string[] | undefined;
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
