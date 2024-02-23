import { useState } from 'react';
import style from './styles/main.module.scss';

interface ImageType {
  uri: string;
  nowLoading: boolean;
}

function App() {
  const [image, setImage] = useState<ImageType>({
    uri: "",
    nowLoading: true,
  });
  const handleClick = () => {
    setImage({...image, nowLoading: false})
    fetch("https://nekobot.xyz/api/image?type=neko")
      .then((res: Response) => {
        res.json().then((data) => {
          setImage({nowLoading: true, uri: data.message})
        })
      })
  }

  return (
    <div className={style.root}>
      <div>
        <h1 className={style.title}>Nekobot imaging</h1>
        <div className={style.outsideButton}>
          <button className={style.button} onClick={handleClick}>Click</button>
        </div>
        {image.nowLoading ? <img src={image.uri} className={style.img} /> : <p>Now loading</p>}
      </div>
    </div>
  )
}

export default App
