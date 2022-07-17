import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import styles from './fileupload.module.scss'
function FileUplod({ dataFromFileDrop }) {

  const [file, setFile] = useState([]);

  const onDrop = useCallback(acceptedFiles => {

    setFile(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })))
    acceptedFiles.map(file => {
      dataFromFileDrop(file.preview)
    })
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({accept: {'image/*': []}, onDrop})
  // const files = acceptedFiles.map(file => <li key={file.path}>{file.path}</li>);


  return (
    <div className={styles.fileupload} {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
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