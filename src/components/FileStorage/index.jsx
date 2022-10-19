import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from '../../services/firebase';
import { v4 } from "uuid";
import './styles.css';

function FileStorage({ roomid }) {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  
  const imagesListRef = ref(storage, `${roomid}/`);
  const uploadFile = () => {
    if (imageUpload == null) return;
    //TODO: Fix ref to save images to each roomID, currently line 21 does not work as intended and is saving all images to the undefined bucket
    const imageRef = ref(storage, `${roomid}/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);

      });
    }); 
  }; 

  useEffect(() => {
    //TODO: Fix this useEffect to only list images in a certain bucket instead of listAll (Is there a hook for this?)
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);
 
  return (
    <div className="App">
      <label for="fileName">File name </label>
        <input
        type="text"
        id="fileName"
        /> <br/><br/>
      <input
        type="file"
        id="fileName"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}> Upload File</button><br/>
      {imageUrls.map((url) => {
        
        return <p align="left"><img src={url} width="100" height = "50" /> 
          <a href={url}>{url}</a>
        </p>
        
        })}
      
  
     
    </div>
  );
}

export { FileStorage };
