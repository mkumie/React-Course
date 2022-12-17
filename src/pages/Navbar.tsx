import React from "react";
import {Link} from 'react-router-dom'
import { auth } from "../config/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from "firebase/auth";

const Navbar = () => {

  const [user] = useAuthState(auth)

  const signUserOut =async () => {
    await signOut(auth)
  }

  return (
    <div>
        <Link to='/'>Home</Link>
        {!user ? <Link to='/login'>Login</Link> :
        <Link to='/createpost'>Create Post</Link>}

        <div>
          {user && (
            <>
              <p>{user?.displayName}</p>
              <img src={user?.photoURL || ''} alt={user?.displayName || ''} height='100' width='100' />
              <button onClick={signUserOut}>Log Out</button>
            </>
          )}
        </div>
    </div>
  )
};

export default Navbar;
