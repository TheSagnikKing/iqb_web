import React, { useRef, useState } from 'react'
import "./Advertisement.css"
import { DeleteIcon, EditIcon, FaFileIcon, Uploadicon } from '../../icons'

const Advertisement = () => {

  const adverdata = [
    {
      _id: 1,
    },
    {
      _id: 1,
    },
    {
      _id: 1,
    },
    {
      _id: 1,
    },
    {
      _id: 1,
    },
    {
      _id: 1,
    },
    {
      _id: 1,
    },
    {
      _id: 1,
    },
    {
      _id: 1,
    },
    {
      _id: 1,
    },
    {
      _id: 1,
    },
    {
      _id: 1,
    },
    {
      _id: 1,
    },
    {
      _id: 1,
    },
    {
      _id: 1,
    },
    {
      _id: 1,
    },
    {
      _id: 1,
    },
    {
      _id: 1,
    }
  ]


  const advImagefileInputRef = useRef(null);

  const handleAdvImageButtonClick = () => {
    advImagefileInputRef.current.click();
  };

  const [uploadAdvImages, setUploadAdvImages] = useState([])

  const handleAdvImageFileInputChange = async (e) => {
    const uploadedFiles = e.target.files;

    const allowedTypes = ["image/jpeg", "image/webp", "image/png"];

    const files = Array.from(uploadedFiles).map((file) => {
      if (!allowedTypes.includes(file.type)) {
        alert("Please upload only valid image files (JPEG, WebP, PNG).");
        return null;
      }

      return file
    });

    setUploadAdvImages(files)
  };

  console.log(uploadAdvImages)

  return (
    <div className='advertisement_wrapper'>
      <div>
        <p>Advertisements</p>
        <div>
          <div>
            <button
              onClick={() => handleAdvImageButtonClick()}
            >
              <div><FaFileIcon /></div>
              <p>Choose Files</p>

              <input
                type="file"
                ref={advImagefileInputRef}
                style={{ display: 'none' }}
                multiple
                onChange={handleAdvImageFileInputChange}
              />
            </button>
            <p>{uploadAdvImages?.length} Files</p>
          </div>
          <button>
            <div><Uploadicon /></div>
            <p>Upload</p>
          </button>
        </div>

      </div>
      <div className='advertisement_content'>
        {
          adverdata.map((ad, index) => (
            <div className='advertisement_cards' key={index}>
              <div><img src="https://pbs.twimg.com/media/FHsyI-TUUAELpAm?format=jpg&name=4096x4096" alt="" /></div>
              <div>
                <button>
                  <div><EditIcon /></div>
                  <p>Edit</p>
                </button>

                <button>
                  <div><DeleteIcon /></div>
                  <p>Delete</p>
                </button>
              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Advertisement
