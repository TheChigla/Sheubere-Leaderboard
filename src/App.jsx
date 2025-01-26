import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/load_users')
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => b.score - a.score);
        setPlayers(sortedData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <main className='leaderboard'>
      <div className='leaderboard__icons'>
        <div className='leaderboard__icon' id='icon-1'>
          <img src='src/assets/enemy2.gif' alt='Enemy 1' />
        </div>
        <div className='leaderboard__icon' id='icon-2'>
          <img src='src/assets/enemy1.gif' alt='Enemy 2' />
        </div>
      </div>
      <div className='leaderboard__table'>
        <div className='leaderboard__table---wrapper'>
          <div className='leaderboard__table---title'>Game Leaderboard</div>
          <div
            style={{
              overflowY: 'scroll',
              height: '600px',
              overflowY: 'auto',
            }}
          >
            <table className='leaderboard__table---table'>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Player</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => {
                  let medalIcon = null;

                  // Assign medals for top 3 players
                  if (index === 0) {
                    medalIcon = (
                      <img src='src/assets/Medals.svg' alt='Gold Medal' />
                    );
                  } else if (index === 1) {
                    medalIcon = (
                      <img src='src/assets/Silver.svg' alt='Silver Medal' />
                    );
                  } else if (index === 2) {
                    medalIcon = (
                      <img src='src/assets/Bronze.svg' alt='Bronze Medal' />
                    );
                  }

                  return (
                    <tr key={index}>
                      {/* center this td */}
                      <td>{medalIcon || index + 1}</td>
                      <td>{player.name}</td>
                      <td>{player.score}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
