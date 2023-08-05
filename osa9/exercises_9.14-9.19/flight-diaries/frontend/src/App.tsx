import { useEffect, useState } from "react";
import axios from 'axios';

interface DiaryEntry {
  id: number,
  date: string,
  weather: string,
  visibility: string
}

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const entryToAdd = {
      id: entries.length + 1,
      date,
      weather,
      visibility,
      comment
    };
    axios.post<DiaryEntry>('http://localhost:3001/api/diaries', entryToAdd)
      .then(res => setEntries(entries.concat(res.data)))
      .catch(err => {
        if (axios.isAxiosError(err)) {
          if(err.response) {
            setError(err.response.data);
          }
        }
        setTimeout(() => {
          setError('');
        }, 5000);
      });
    setComment('');
  };

  useEffect(() => {
    axios.get<DiaryEntry[]>('http://localhost:3001/api/diaries').then(res => {
      setEntries(res.data);
    });
  }, []);

  return (
    <div>
      <form onSubmit={entryCreation}>
        <h3>Add new entry</h3>
        <h5 style={{color: 'red'}}>{error}</h5>
        <div>
          date
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </div>
        <div>
          <div>
          visibility
            <input type="radio" value="great" id="great" name="visibility"
              onChange={(event) => setVisibility(event.target.value)} />
            <label htmlFor="great">Great</label>

            <input type="radio" value="good" id="good" name="visibility" 
              onChange={(event) => setVisibility(event.target.value)} />
            <label htmlFor="good">Good</label>

            <input type="radio" value="ok" id="ok" name="visibility" 
              onChange={(event) => setVisibility(event.target.value)} />
            <label htmlFor="ok">Ok</label>

            <input type="radio" value="poor" id="poor" name="visibility"
              onChange={(event) => setVisibility(event.target.value)} />
            <label htmlFor="poor">Poor</label>
          </div>
        </div>
        <div>
          <div>
            weather
            <input type="radio" value="sunny" id="sunny" name="weather" 
              onChange={(event) => setWeather(event.target.value)} />
            <label htmlFor="sunny">Sunny</label>

            <input type="radio" value="rainy" id="rainy" name="weather"
              onChange={(event) => setWeather(event.target.value)} />
            <label htmlFor="rainy">Rainy</label>

            <input type="radio" value="cloudy" id="cloudy" name="weather"
              onChange={(event) => setWeather(event.target.value)} />
            <label htmlFor="cloudy">Cloudy</label>

            <input type="radio" value="stormy" id="stormy" name="weather"
              onChange={(event) => setWeather(event.target.value)} />
            <label htmlFor="stormy">Stormy</label>

            <input type="radio" value="windy" id="windy" name="weather" 
              onChange={(event) => setWeather(event.target.value)} />
            <label htmlFor="">Windy</label>
          </div>
        </div>
        <div>
          comment
          <input value={comment} onChange={(event) => setComment(event.target.value)} />
        </div>
        <button type='submit'>add</button>
      </form>
      <h3>Diary entries</h3>
      {entries.map(entry => 
        <div key={entry.id}>
          <h4>{entry.date}</h4> 
          <p>
            visibility: {entry.visibility}
            <br></br>
            weather: {entry.weather}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
