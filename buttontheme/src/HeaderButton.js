import React from 'react';
import { useContext, useState } from 'react';
import ThemeContext from './ThemeContext';

function HeaderButton() {
  const theme = useContext(ThemeContext);
  const [isClicked, setIsClicked] = useState(false);

  const setClick = () => {
    if (!isClicked) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  }
  
  if(!isClicked) {
    return (
      <div>
        <button onClick={() => {setClick()}} style={theme.blue}>Press me</button>
      </div>
    );
  }
  else {
    return (
      <div>
        <button onClick={() => {setClick()}} style={theme.black}>Press me</button>
      </div>
    );
  }
  
}

export default HeaderButton;

//style={theme.blue}
