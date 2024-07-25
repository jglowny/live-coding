/* eslint-disable eqeqeq */
import { useState, useEffect } from 'react';
import './App.scss';

type People = {
  name: string;
  height: number;
  skin_color: string;
  onClick: () => void;
}

function App() {

  const [ data, setData] = useState<People[]>([])
  const [selectedItem, setSelectedItem] = useState(null)

  const handleClick = (item:any) => {
    console.log(item);
    if(item !== selectedItem){
      setSelectedItem(item)
    }
    else{
      setSelectedItem(null)
    }
    }

  useEffect(() => {
    fetch("https://swapi.dev/api/people/")
    .then((response => {
      if(response.ok){
        return response.json();
      }
      throw new Error("invalid response");
    }))
    .then((data) => setData(data.results));
  },[])

  return (
    <div className='container'>
        <table>
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Skin_color</th>
            <th>Details</th>
          </tr>
          {data.map((item, index) => (
            <tr key={index}>
              <td >
                <span 
                 style={{ color: index === selectedItem  ? 'red' : 'black' }}
                 onClick={() => handleClick(index)}
          >{item.name}</span>
              </td>
              <td>
                {item.height}
              </td>
              <td>
                {item.skin_color}
              </td>
              <td></td>
              </tr>
            ))}
            
        </table>
    </div>
  );
}

export default App;
