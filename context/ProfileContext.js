import React, { createContext, useState } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [userName, setUserName] = useState('Marília');
  const [profileImage, setProfileImage] = useState('https://i.ibb.co/MBz6r7g/442392309-7607973555917445-6465489229848910965-n-1.jpg');

  const updateUserName = (name) => {
    setUserName(name);
  };

  const updateProfileImage = (imageUri) => {
    setProfileImage(imageUri);
  };

  return (
    <ProfileContext.Provider value={{ userName, profileImage, updateUserName, updateProfileImage }}>
      {children}
    </ProfileContext.Provider>
  );
};
