import './App.css';
import { useSelector, useDispatch, connect } from 'react-redux'
import { fetchData, incrementId, decrementId, customId, clearData } from './features/dataSlice'
import { useEffect } from 'react'

//map state values to React props
const mapStateToProps = (state) => ({
  objectId: state.data.objectId
})


function App(props) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data)

  //trigger API call on render
  useEffect(() => {
    dispatch(fetchData())
  }, [props.objectId, dispatch])

  const renderImg = () => {
    if(data.apiData) {
      return <img style={{'width': '100vw'}} src={data.apiData.primaryImage} alt={data.apiData.title} />
    } else {
      return <p>image here</p>
    }
  }
  
  return (
    <div className="App">
      <div>
        <button onClick={() => dispatch(fetchData())}>THUNK!!!</button>
        <button onClick={() => dispatch(incrementId())}>Next</button>
        <button onClick={() => dispatch(decrementId())}>Back</button>
        <button onClick={() => dispatch(clearData())}>Clear</button>
        </div>
          <input value={ data.objectId } onChange={(e) => {
            dispatch(inputId(Number(e.target.value)))
          }} />
        <div>
        {data.objectId}
        {renderImg()}
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(App);
