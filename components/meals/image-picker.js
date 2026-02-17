"use client";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const imageInput = useRef();

  function handlePickClick() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    const pickedFile = event.target.files[0];

    if (!pickedFile) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = function () {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(pickedFile);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && <Image src={pickedImage} alt="Picked Image" fill />}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          name={name}
          required
          accept="image/png, image/jpeg"
          ref={imageInput}
          onChange={handleImageChange}
        />
        <button
          type="button"
          onClick={handlePickClick}
          className={classes.button}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
