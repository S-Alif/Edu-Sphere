import { useState } from 'react';
import avatar from '../assets/imgs/avatar-1577909_640.png'

const useHandleImage = (callback, maxSizeKB, errorCallback) => {
  const [preview, setPreview] = useState(avatar);

  const handleImage = (e) => {
    if (!e.target.files[0]) return;
    let uploadedFile = e.target.files[0];

    if ((uploadedFile.size / 1024) > maxSizeKB) {
      errorCallback("Image is larger than " + (maxSizeKB / 1000) + "MB");
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreview(fileReader.result);
      callback(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
  };

  return { handleImage, preview };
};

export default useHandleImage;
