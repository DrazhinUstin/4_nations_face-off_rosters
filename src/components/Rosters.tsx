import { useState } from 'react';
import { abbreviations, rostersData } from '../lib/data';
import { type Abbreviations, type Player, PlayerType } from '../lib/definitions';

export default function Rosters() {
  const teams = Object.keys(rostersData);
  const [selectedTeam, setSelectedTeam] = useState<string>(teams[0]);
  const players = rostersData[selectedTeam];
  return (
    <div className="space-y-2">
      <div className="flex justify-center gap-2">
        {teams.map((team) => (
          <button
            key={team}
            onClick={() => setSelectedTeam(team)}
            className={`cursor-pointer ${team === selectedTeam ? 'text-blue-500' : ''}`}
          >
            {team}
          </button>
        ))}
      </div>
      {Object.values(PlayerType).map((type) => (
        <PlayersTable
          key={type}
          title={type + 's'}
          players={players
            .filter((player) => player.type === type)
            .map(({ type, ...rest }) => ({ ...rest }))}
        />
      ))}
    </div>
  );
}

function PlayersTable({ title, players }: { title: string; players: Omit<Player, 'type'>[] }) {
  const headers = Object.keys(players[0]).map((key) => [
    abbreviations[key as keyof Abbreviations],
    key.split('_').join(' '),
  ]);
  return (
    <div className="space-y-2">
      <h4 className="text-center font-bold">{title}</h4>
      <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
        <thead>
          <tr>
            {headers.map(([abbr, name]) => (
              <th key={abbr} className="border border-gray-300 p-2 font-medium" title={name}>
                {abbr}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {players.map((player, i) => (
            <tr key={i}>
              {Object.entries(player).map(([key, val], i) => (
                <td key={i} className="border border-gray-300 p-2 text-center">
                  {key === 'birthdate' ? new Date(val).toLocaleDateString() : val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
