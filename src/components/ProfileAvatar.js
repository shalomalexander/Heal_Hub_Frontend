import React, { useState } from "react";
import Avatar from 'react-avatar-edit'
import male from "../assets/Images/profile.png";
import "../css/style.css";

const ProfileAvatar = () => {

  const [preview, setPreview] = useState(null)
  // const [src, setSrc] = useState(null)
  const [postview, setPostview] = useState(male)
  const [showAvatar, setShowAvatar] = useState(false)

  const onCrop = (preview) => {
    setPreview(preview)
  }
  const onClose = () => {
    setPreview(null)
  }

  return (
    <div className="profile-pic-container">
     
      {showAvatar ? (
        <div className="modal-profile-upload">
          <Avatar
            width={300}
            height={200}
            onCrop={onCrop}
            onClose={onClose}
            closeIconColor = "black"
            shadingColor="white"    
            // src={src}
          />
          <button className="btn btn-sm btn-primary" onClick={() => { setPostview(preview); setShowAvatar(false); }}>OK</button>

        </div>
      ) : (<></>)}
  
      <div className="profile-postview">
        <img className="postview" src={postview} alt="postview" />
      </div>
      <hr/>
      <button className="btn btn-primary" onClick={() => { setShowAvatar(true) }}>Upload Photo</button>
    </div>
  );
}

export default ProfileAvatar;
