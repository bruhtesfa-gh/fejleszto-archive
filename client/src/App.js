import React from 'react';
import { useSelector } from 'react-redux';
import Home from './components/home/home';
import ErrorMessage from './components/messages/error';
import SuccessMessage from './components/messages/success';
import InfoMessage from './components/messages/info';
function App() {
  const errormessage = useSelector(state => state.message.error.isvisible);
  const successmessage = useSelector(state => state.message.success.isvisible);
  const infomessage = useSelector(state => state.message.info.isvisible);
  return (
    <React.Fragment>
      <div className='messagebord px-3'>
        {errormessage && <ErrorMessage />}
        {successmessage && <SuccessMessage />}
        {infomessage && <InfoMessage />}
      </div>
      <Home />
    </React.Fragment>
  );
}

export default App;