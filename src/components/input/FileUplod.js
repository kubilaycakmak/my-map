import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import styles from './fileupload.module.scss'
function FileUplod({ dataFromFileDrop }) {
  const onDrop = useCallback(acceptedFiles => {
    dataFromFileDrop(acceptedFiles)
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className={styles.fileupload} {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default FileUplod