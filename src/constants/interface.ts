import { Moment } from 'moment';
import { goalType } from './enum';

export interface Checklist {
  id: string;
  label: string;
  isChecked: boolean;
}

export interface NewGoalForm {
  title: string;
  description: string | undefined;
  period: Moment[] | undefined;
  type: goalType | undefined;
  checklist: Checklist[];
  amount?: number | undefined;
}

export interface Goal {
  title: string;
  type?: goalType;
  description?: string;
  startDate?: string;
  endDate?: string;
  amount?: number;
  checklist?: Checklist[];
}

export interface GoalResponse {
  goalId: string;
  userId: string;
  createdAt: number;
  content: Goal;
  attachment?: string;
}
