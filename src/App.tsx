import { useState } from "react";
import style from "./styles/main.module.scss";
import { useForm } from "react-hook-form";

interface ImageType {
  uri: string;
  nowLoading: boolean;
}

enum InputImageType {
  Neko = "neko",
}

interface Inputs {
  imageType: InputImageType;
}

const ENDPOINT = "https://nekobot.xyz/api/image";

function App() {
  const [image, setImage] = useState<ImageType>({
    uri: "",
    nowLoading: true,
  });
  const { register, handleSubmit } = useForm<Inputs>();
  /*
  const handleClick = () => {
    setImage({...image, nowLoading: false})
    fetch("https://nekobot.xyz/api/image?type=neko")
      .then((res: Response) => {
        res.json().then((data) => {
          setImage({nowLoading: true, uri: data.message})
        })
      })
  }
  */

  const onSubmit = (inputs: Inputs) => {
    setImage({ ...image, nowLoading: false });
    fetch(`${ENDPOINT}?type=${inputs.imageType}`)
      .then((res) => res.json())
      .then((data) => {
        setImage({ nowLoading: true, uri: data.message });
      });
  };

  return (
    <div className={style.root}>
      <div>
        <h1 className={style.title}>Nekobot imaging</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={style.outsideButton}>
          <select {...register("imageType")}>
            {Object.entries(InputImageType).map(([key, value], index) => (
              <option value={value} key={index}>
                {key}
              </option>
            ))}
          </select>
          <button className={style.button}>Show me</button>
        </form>
        {image.nowLoading ? (
          <img src={image.uri} className={style.img} />
        ) : (
          <p>Now loading</p>
        )}
      </div>
    </div>
  );
}

export default App;
