import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const today = new Date().toISOString().slice(0, 10)
  const [dataIds, setDataIds] = useState([])
  const [itemPictures, setItemPictures] = useState({})
  const [dependancy, setDependancy] = useState(false)

 useEffect(() => {
    console.log('useEffect runs: ' + today)
    axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects?metadataDate=${today}`)
      .then(res => {
        setDataIds(res.data.objectIDs)
        console.log(`dataIds: ${dataIds}`);
      })
      .catch(err => console.error('dataIds error ' + err));
      // setDependancy(true)
  }, [])

  const randomItemGenerator = count => {
    const shuffledArray = dataIds.sort(() => Math.random());
    console.log(shuffledArray)
    return dataIds.slice(0, count);
  }

   useEffect(() => {
    if(!dependancy) return;
    console.log('useEffect runs with random generator')
    setItemPictures(randomItemGenerator(3))
    console.log(`itemPictures: ${itemPictures}`)
    axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${itemPictures[0]}`)
    .then(res => {
      console.log(res)
    })
    .catch(err => console.error('pictures errors ' + err))
    setDependancy(false);
  }, [dependancy])


  return (
    <div>
     <h1>The Metropolitan Museum of Art</h1>
     <ul>
          {dataIds.map(item => (
            <li key={item}>
              {item}
            </li>
          ))}
        </ul>
     {/* initial api call to get array of items available as of today's date
     then pull three random items from array and display on screen with primary image artist name, object name, and URL to original */}
    </div>
  );
}

export default App;