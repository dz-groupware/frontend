import { createAsyncThunk } from '@reduxjs/toolkit';
import { getGnbListOfAuthWithAllApi } from '../api/authgroup';
import { imageUpload } from '../api/employeemgmt';
import { employeeActions } from './Slice';

export const uploadMiddleware = store => next => async action => {
// console.log("너 왜 안와",action.type)

if (action.type === 'UPLOAD_TO_S3') {
    
      const { file, pageId } = action.payload;
      // console.log("file이 뭐니",file);
      try {
          const uploadedUrl = await imageUpload(file,pageId);
      // console.log("uploadUrl이 뭐냐",uploadedUrl);

          return uploadedUrl;
      } catch (error) {
          console.error("Error uploading to S3:", error);
      }
  }
  return next(action);
};
