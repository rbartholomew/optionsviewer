

async function getOptionsChain(symbol) {

    let res = await fetch(`api/optionschain/${symbol}`, {
        accept: 'application/json'
    });

    res = checkStatus(res);
    return parseJSON(res);
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

const Client = { getOptionsChain };
export default Client;