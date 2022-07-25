import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Cute() {
    const [meowImage, setMeowImage] = useState('');
    const getMeow  = async () => {
        const response = await axios.get('https://aws.random.cat/meow');
        console.log(response.data.file);
        setMeowImage(response.data.file);
    }

    useEffect(() => {
        getMeow();
    }, [])
    
  return (

    <div className="w-full p-6 m-4 bg-white rounded shadow-sm lg:w-3/4 lg:max-w-lg">
      <div className="flex justify-between mb-3 items-center">
        <h1>귀여움 충전</h1>
      </div>
      <div>
            <img className="rounded" src={meowImage} alt="고양이"/>
        </div>
    </div>
  )
}

export default Cute