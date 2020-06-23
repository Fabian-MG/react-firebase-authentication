import React, { useState, useEffect} from 'react'

import DefaultLoginToggle from './DefaultLoginToggle'
import SocialLoginToggle from './SocialLoginToogle'
import { withFirebase } from '../Firebase';


const SIGN_IN_METHODS = [
  {
    id: "password",
    provider: null,
  },
  {
    id: "google.com",
    provider: "googleProvider",
  },
  {
    id: "facebook.com",
    provider: "facebookProvider",
  },
  {
    id: "twitter.com",
    provider: "twitterProvider",
  },
];

const LoginManagementBase = ({ authUser, firebase }) => {
    const initialState = {
      activeSignInMethods: [],
      error: null,
    };
    const [signInMethods, setSignInMethods] = useState(initialState);
    const { activeSignInMethods, error } = signInMethods;
  
    useEffect(() => {
      fetchSignInMethods();
    }, [firebase]);
  
    const fetchSignInMethods = () => {
      firebase.auth
        .fetchSignInMethodsForEmail(authUser.email)
        .then((activeSignInMethods) =>
          setSignInMethods({ activeSignInMethods, error: null })
        )
        .catch((err) => setSignInMethods({ ...signInMethods, error: err }));
    };
  
    const handleSocialLoginLink = (provider) => {
      firebase.auth.currentUser
        .linkWithPopup(firebase[provider])
        .then(fetchSignInMethods)
        .catch((error) => setSignInMethods({ ...signInMethods, error }));
    };
  
    const handleUnlink = (providerId) => {
      firebase.auth.currentUser
        .unlink(providerId)
        .then(fetchSignInMethods)
        .catch((error) => setSignInMethods({ ...signInMethods, error }));
    };
  
    const handleDefaultLoginLink = (password) => {
      const credential = firebase.emailAuthProvider.credential(
        authUser.email,
        password,
        );
        firebase.auth.currentUser
        .linkAndRetrieveDataWithCredential(credential)
        .then(fetchSignInMethods)
        .catch(error => setSignInMethods({...activeSignInMethods, error }));
    };
  
    return (
      <div>
        Sign In Methods:
        <ul>
          {SIGN_IN_METHODS.map((signInMethod) => {
            const onlyOneLeft = activeSignInMethods.length === 1;
            const isEnabled = activeSignInMethods.includes(signInMethod.id);
  
            return (
              <li key={signInMethod.id}>
                {signInMethod.id === "password" ? (
                  <DefaultLoginToggle
                    onlyOneLeft={onlyOneLeft}
                    isEnabled={isEnabled}
                    signInMethod={signInMethod}
                    onLink={handleDefaultLoginLink}
                    onUnlink={handleUnlink}
                  />
                ) : (
                  <SocialLoginToggle
                    onlyOneLeft={onlyOneLeft}
                    isEnabled={isEnabled}
                    signInMethod={signInMethod}
                    onLink={handleSocialLoginLink}
                    onUnlink={handleUnlink}
                  />
                )}
              </li>
            );
          })}
        </ul>
        {error && error.message}
      </div>
    );
  };

  
export default withFirebase(LoginManagementBase)