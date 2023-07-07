import React, { useState } from "react";
import Dropzone from "react-dropzone";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Button } from "react-bootstrap";
import "./FileUploader.css";

function FileUploader({ files, setFiles, multiple, existingFiles }) {
  const [displayedFiles, setDisplayedFiles] = useState(files || []);

  const onDrop = (acceptedFiles) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    };
    fileReader.readAsArrayBuffer(acceptedFiles[0]);
  };

  const removeFile = (fileIndex) => {
    const newFiles = [...displayedFiles];
    newFiles.splice(fileIndex, 1);
    setDisplayedFiles(newFiles);
    setFiles(newFiles);
  };

  const isImage = (file) => {
    return file?.type?.startsWith("image/");
  };

  return (
    <Dropzone onDrop={onDrop} multiple={multiple}>
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {displayedFiles?.length > 0 || existingFiles?.length > 0 ? (
            <div className="file__uploader__files__grid">
              {existingFiles?.map((file, index) => (
                <div key={file} className="file__uploader__files">
                  {isImage(file) ? (
                    <img src={file} alt={file} />
                  ) : (
                    <iframe
                      src={file}
                      title={file}
                      width="100%"
                      height="500px"
                    />
                  )}
                </div>
              ))}
              {displayedFiles?.map((file, index) => (
                <div key={file.name || file} className="file__uploader__files">
                  {isImage(file) ? (
                    <>
                      <img src={URL?.createObjectURL(file)} alt={file.name} />
                      <Button
                        variant="transparent"
                        className="p-0"
                        onClick={() => removeFile(index)}
                      >
                        <HighlightOffIcon color="red" size={30} />
                      </Button>
                    </>
                  ) : (
                    <>
                      {/* <iframe
                        src={URL?.createObjectURL(file)}
                        title={file.name}
                        width="100%"
                        height="500px"
                      /> */}
                      <Button
                        variant="transparent"
                        className="p-0"
                        onClick={() => removeFile(index)}
                      >
                        <HighlightOffIcon color="red" size={30} />
                      </Button>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="file__uploader">
              <p className="text-center">
                {isImage ? "Upload Image" : "Upload Document"}
              </p>
            </div>
          )}
        </div>
      )}
    </Dropzone>
  );
}

export default FileUploader;
