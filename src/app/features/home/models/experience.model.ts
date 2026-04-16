export type ExperienceKind = 'professional' | 'personal' | 'education';

export interface ExperienceItem {
  period: string;
  title: string;
  type: string;
  kind: ExperienceKind;
  description: string;
}
