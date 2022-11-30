import React, { useState, useEffect } from "react";

const UserContext = React.createContext();

function UserProvider ({ children}) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('/authorized_user')
        .then((res) => {
          if (res.ok) {
            res.json().then((user) => {
              setUser(user);
            });
          } else {
            res.json().then( (json) => {
              if (json.errors !== undefined) {
                alert(json.errors);
              }
            });
          }
        })
      },[]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }