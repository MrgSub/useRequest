import {useRequest} from "../../index.ts";
import Axios from 'axios'

const testRequest = () => Axios.post('https://lorem-json.com/api/json', {
    isTest: true
})

function App() {
  const {testRequestRequest, testRequestLoading, testRequestError} = useRequest(testRequest, 'testRequest')

  return (
    <>
      <h1>@ajxb/useRequest Playground</h1>
      <div className="card">
        <button disabled={testRequestLoading} onClick={testRequestRequest}>
          Trigger Request
        </button>
          <p>{testRequestError ? JSON.stringify(testRequestError) : ''}</p>
      </div>
    </>
  )
}

export default App
