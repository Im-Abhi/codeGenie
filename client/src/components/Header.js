import React from 'react';

import { Button } from '@chakra-ui/react';

const Header = () => (
  <div>
    <div className="container">
      <h2>React App - Online Code Editor</h2>
      <Button color="blue" href="/">
        Home
      </Button>
      <Button color="blue" href="/editor">
        Code Editor
      </Button>
    </div>
    <hr />
  </div>
);

export default Header;
