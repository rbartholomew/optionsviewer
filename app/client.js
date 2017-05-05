

async function getFiles() {

    let res = await fetch(`api/files`, {
        accept: 'application/json'
    });

    res = checkStatus(res);
    return parseJSON(res);
}

async function getFile(name) {

    let res = await fetch(`api/file/${name}`, {
        accept: 'application/json'
    });

    res = checkStatus(res);
    let dataFrame = await parseJSON(res);

    return { headers: dataFrame.columns, data: dataFrame.data };
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

async function parseJSON(response) {
  return await response.json();
}

const Client = { getFiles, getFile };
export default Client;