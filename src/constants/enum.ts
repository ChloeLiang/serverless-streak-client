export enum AWS {
  API_NAME = 'goals',
}

export enum goalType {
  NUMBER = 1,
  CHECKLIST = 2,
}

export enum goalCategory {
  UPCOMING = 'Upcoming',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}

export enum color {
  SUCCESS = '#87d068',
  WARNING = '#ffcc00',
  ERROR = '#f50',
  DONE = '#6ec7fa',
  UPCOMING = '#c1c4c0',
}

export enum inputLength {
  title = 150,
  description = 1000,
  checklistItem = 30000,
  username = 345,
  password = 128,
  confirmationCode = 6,
}
