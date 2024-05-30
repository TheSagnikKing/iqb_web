// import React, { useCallback, useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { Uploadicon } from '../../icons';

// const Advertisement = () => {
//   const [files, setFiles] = useState([]);

//   const onDrop = useCallback((acceptedFiles) => {
//     setFiles(acceptedFiles.map(file => file.name));
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   return (
//     <div className='advertisement_wrapper'>
//       <div className='advertisement_content_wrapper'>
//         <p>Advertisement</p>
//         <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
//           <input {...getInputProps()} />
//           <div>
//             <div><Uploadicon /></div>
//             <div>
//               {files?.length > 0 ? <p>Files selected:</p> : <p>Drag and Drop or <span>Choose file</span> here</p>}
//               {files?.length > 0 && (
//                 <div className='file-list'>
//                   {files.slice(0, 3).map((file, index) => (
//                     <p key={index} className='file-name'>{file}</p>
//                   ))}
//                   {files?.length > 3 && (
//                     <p className='file-name'>...and {files?.length - 3} more</p>
//                   )}
//                 </div>
//               )}
//               {files?.length > 0 && <p className='file-count'>Total files: {files?.length}</p>}
//             </div>
//           </div>
//         </div>
//         <div>
//           <button>Upload</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Advertisement;

import React from 'react'

const Advertisement = () => {
  return (
    <div>Advertisement</div>
  )
}

export default Advertisement
