import { useState } from 'react';
import { abbreviations, rostersData } from '../lib/data';
import { type Abbreviations, type Player, PlayerType } from '../lib/definitions';
import { cn, formatDate, sortObjects } from '../lib/utils';

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
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-t border-b border-gray-300">
              {headers.map(([abbr, name], i) => (
                <th
                  key={name}
                  className={cn(
                    'min-w-14 cursor-pointer p-2 font-medium select-none',
                    i < 2 && 'sticky left-0 z-10 bg-white',
                    i === 1 && 'left-14',
                    name === sort?.prop && 'bg-blue-200'
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
            {sortedPlayers.map((player, index) => (
              <tr key={index} className={cn('bg-white', index % 2 !== 0 && 'bg-gray-200')}>
                {Object.entries(player).map(([key, val], i) => (
                  <td
                    key={i}
                    className={cn(
                      'min-w-14 p-2 text-center whitespace-nowrap',
                      i < 2 && 'sticky left-0 bg-inherit',
                      i === 1 && 'left-14',
                      key === sort?.prop && (index % 2 !== 0 ? 'bg-blue-200' : 'bg-blue-100')
                    )}
                  >
                    {key === 'birthdate' ? formatDate(val) : val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
