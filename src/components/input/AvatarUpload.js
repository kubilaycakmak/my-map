import { render } from '@testing-library/react';
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import styles from './avatarupload.module.scss'

function AvatarUpload(props) {

  const [file, setFile] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    var data = {};
    setFile(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })))

    acceptedFiles.map(file => {
      data = file;
    })

    console.log(data);
    // dataFromFileDrop(data);
    
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({accept: {'image/*': []}, onDrop})
  let width = window.innerWidth;

  return (
    <div className={styles.fileupload} {...getRootProps()}>
      <input className={styles.avatarContext} />
      {
        
        isDragActive ?
          <p>{width < 768 ? "" : "Click and upload."}</p> :
          <p>{width < 768 ? "Drop or Select" : "" }</p>
      }
      {
        file[0] ? 
        <aside>
            <img className={styles.coverImagePreview} src={file[0].preview ? file[0].preview : props.avatar}/>
        </aside>  
        : props.avatar != "" ? 
        <aside className={styles.anotherAvatar}>
            <img className={styles.coverImagePreview} src={props.avatar}/>
            <p>Click and Upload</p>
        </aside>  
        :
        ""
      }
      
      
    </div>
  )
}

export default AvatarUpload