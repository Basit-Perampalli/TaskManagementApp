
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const getnewtoken = async(refresh)=>{
        try {
            const response = await fetch("http://localhost:8000/auth/refreshtoken/", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({refresh}),
            });
            console.log(response);
            
            if (!response.ok) {
              const errorData = await response.json();
              console.log('Invalid Token', errorData);
              return;
            }
        
            const received_data = await response.json();
            return received_data.access;
          } catch (error) {
            console.error('Error during registration:', error);
          }
    }

    return (
        <AuthContext.Provider value={{ getnewtoken }}>
            {children}
        </AuthContext.Provider>
    );
};
