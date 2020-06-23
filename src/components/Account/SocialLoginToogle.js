import React from 'react'

const SocialLoginToggle = ({ onlyOneLeft, isEnabled, signInMethod, onLink, onUnlink}) => {
  return isEnabled ? (
            <button
              type="button"
              onClick={() => onUnlink(signInMethod.id)}
              disabled={onlyOneLeft}
            >
              Deactivate {signInMethod.id}
            </button>
          ) : (
            <button type="button" onClick={() => onLink(signInMethod.provider)}>
              Link {signInMethod.id}
            </button>
          );
}


export default SocialLoginToggle;