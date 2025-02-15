import { useState } from 'react';
import { abbreviations, rostersData } from '../lib/data';
import { type Abbreviations, type Player, PlayerType } from '../lib/definitions';
import { cn, sortObjects } from '../lib/utils';

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
            className={cn(
              'cursor-pointer',
              team === selectedTeam && 'cursor-default text-blue-500'
            )}
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
  const [sort, setSort] = useState<{ prop: string; order: 'asc' | 'desc' } | null>(null);

  const headers = Object.keys(players[0]).map((key) => [
    abbreviations[key as keyof Abbreviations],
    key,
  ]);

  const sortedPlayers = sort
    ? sortObjects(players, sort.prop as keyof (typeof players)[0], sort.order)
    : players;

  return (
    <div className="space-y-2">
      <h4 className="text-center font-bold">{title}</h4>
      <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
        <thead>
          <tr>
            {headers.map(([abbr, name]) => (
              <th
                key={name}
                className={cn(
                  'cursor-pointer border border-gray-300 p-2 font-medium select-none',
                  name === sort?.prop && 'bg-blue-100'
                )}
                title={name.split('_').join(' ')}
                onClick={() =>
                  setSort(
                    !sort || sort.prop !== name
                      ? { prop: name, order: 'desc' }
                      : sort.order === 'desc'
                        ? { prop: name, order: 'asc' }
                        : null
                  )
                }
              >
                <span className="relative">
                  {abbr}
                  {sort?.prop === name && (
                    <span className="absolute">
                      {sort.order === 'desc' ? <>&#11206;</> : <>&#11205;</>}
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedPlayers.map((player, i) => (
            <tr key={i}>
              {Object.entries(player).map(([key, val], i) => (
                <td
                  key={i}
                  className={cn(
                    'border border-gray-300 p-2 text-center',
                    key === sort?.prop && 'bg-blue-50'
                  )}
                >
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
