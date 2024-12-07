export type CyclePhase = 'menstrual' | 'follicular' | 'ovulation' | 'luteal';
export type PeriodInputType = 'start' | 'end';

export interface User {
  id: string;
  name: string;
  cycleLength: number;
  periodLength: number;
  lastPeriodStart: Date;
  periodInputType: PeriodInputType;
}

export interface CalendarDay {
  date: Date;
  phase: CyclePhase;
  isOvulationDay: boolean;
}

export interface Nutrient {
  name: string;
  foods: string[];
  effect: string;
}

export interface CycleInfo {
  phase: CyclePhase;
  mood: string[];
  nutrients: Nutrient[];
  partnerAdvice: string;
  dateRecommendations: {
    foodTypes: string[];
    restaurants: string[];
    activities: string[];
  };
  fertilityInfo: {
    probability: string;
    description: string;
  };
}