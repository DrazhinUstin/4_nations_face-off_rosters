export enum PlayerType {
  Forward = 'Forward',
  Defensemen = 'Defensemen',
  Goalie = 'Goalie',
}

interface PlayerBase {
  type: PlayerType;
  number: number;
  name: string;
  birthdate: number;
}

interface Forward extends PlayerBase {
  type: PlayerType.Forward;
  position: 'R' | 'L' | 'C';
  games_played: number;
  goals: number;
  assists: number;
  points: number;
}

interface Defensemen extends PlayerBase {
  type: PlayerType.Defensemen;
  games_played: number;
  goals: number;
  assists: number;
  points: number;
}

interface Goalie extends PlayerBase {
  type: PlayerType.Goalie;
  games_played: number;
  wins: number;
  losses: number;
  overtime_losses: number;
  save_percentage: number;
  goals_against_average: number;
}

export type Player = Forward | Defensemen | Goalie;

export type Abbreviations = Record<keyof Forward, string> &
  Record<keyof Defensemen, string> &
  Record<keyof Goalie, string>;
