import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPoint, setPoint } from '../actions/point';

function Test() {

  const dispatch = new useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { point: currentPoints } = useSelector((state) => state.point);
  const handleAdd = () => {
    dispatch(setPoint("test1", "11", "22", "testuser"));
    // dispatch(getPoint());
  }

  const handleReset = () => {
    // dispatch(resetPoint());
  }

  return (
    <div className='test'>
        <p>{currentUser ? currentUser.username : "non-login"}</p>
        <button onClick={handleAdd}>add new location</button>
        <button onClick={handleReset}>reset</button>
        <div>
            <ul>
              {currentPoints ? (currentPoints.map(point => (<li key={point._id}> {point.title}</li>))) : ""}
            </ul>
        </div>
    </div>
  )
}

export default Test