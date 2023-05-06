import React from 'react'
import { BodyWidget } from './components/BodyWidget';
import { useAppSelector } from 'redux/store/hooks'
import { useAppDispatch } from 'redux/store/hooks'
import Application from './Application';

// TODO: Replace with webpack proxy (problems getting this to work)
const API_ENDPOINT = "http://127.0.0.1:5000/api"

function NodeManager() {
  // Link to singleton instance
  const app = Application.Instance;
  const engine = app.engine;

  // POST request handler
  const query = useAppSelector(state => state.builder.query);
  const [responseData, setResponseData] = React.useState(null);
  async function postRequest() {
    const postRequestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json;charset=UTF-8'},
      body: JSON.stringify(query)
    };
    console.info("Sending query: ", query)
    fetch(API_ENDPOINT + '/post', postRequestOptions)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw response
      })
      .then(data => {
        setResponseData(data);
        console.info("Got response: ", data);
      })
      .catch(error => {
        console.error("Error during query: ", error);
      })
  }
  function processResponse(content: JSON) {
    console.log("Process response: ", content)
    switch (content['query']) {
      case 'builder/compile-to-json': {
        // Download returned content as file
        const filename = 'workflow.zip'
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' +
          encodeURIComponent(content['body']));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        break;
      }
      default:
        console.error("Error interpreting server response (query: ",
                      content['query'], ")");
    }
  }

  // Received query request (POST to backend server)...
  React.useEffect(() => {
    if (JSON.stringify(query) !== JSON.stringify({}))
      postRequest()
  }, [query]);
  // ...POST request returned data successfully
  React.useEffect(() => {
    if (responseData !== null)
      processResponse(responseData);
  }, [responseData]);
  
  return (
    <BodyWidget engine={engine}/>
  )
}

export default NodeManager
