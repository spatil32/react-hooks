import React from 'react';

const AuthContext = React.createContext({ status: false, loginStatus: () => {} });

export default AuthContext;
