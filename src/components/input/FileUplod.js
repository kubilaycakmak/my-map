import { render } from '@testing-library/react';
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import styles from './fileupload.module.scss'

function FileUplod({ dataFromFileDrop }) {

  const [file, setFile] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    var data = {};
    setFile(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })))

    acceptedFiles.map(file => {
      data = file;
    })
    dataFromFileDrop(data);
    // getBase64(data);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({accept: {'image/*': []}, onDrop})
  let width = window.innerWidth;
  // const files = acceptedFiles.map(file => <li key={file.path}>{file.path}</li>);

  // const getBase64 = (file) => {
  //   var reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = function () {
  //     dataFromFileDrop(reader.result);
  //   };

  //   reader.onerror = function (error) {
  //     console.log('Error: ', error);
  //   };
  // }

  return (
    <div className={styles.fileupload} {...getRootProps()}>
      <input {...getInputProps()} />
      {
        
        isDragActive ?
          <p>{width < 768 ? "" : "Drop the files here ..."}</p> :
          <p>{width < 768 ? "Drop or Select" : "Drag 'n' drop some files here, or click to select files"}</p>
      }
      {
        file[0] ? 
        <aside>
          <img className={styles.coverImagePreview} src={file[0].preview}/>
        </aside>  
        :
        ""
      }
      
      
    </div>
  )
}

export default FileUplod