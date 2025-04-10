import React, { useState } from 'react';
import { Button } from './button';

const CatButton = () => {
  const [showCat, setShowCat] = useState(false);

  const handleClick = () => {
    setShowCat(true);
  };

  return (
    <div>
      <Button className="ml-3 bg-lighterBackground" type="button" onClick={handleClick}>
        Cat button!!!
      </Button>
      {showCat && (
        <img 
          src="https://images.steamusercontent.com/ugc/49083254539432242/E206E7054544B8251ACDE81FA38E31DDE5DE0D3C/" 
          alt="Cute cat" 
          className="mt-4 test"
        />
      )}
    </div>
  );
};

export default CatButton;
