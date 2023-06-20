function postRequest()
{
async function simsimiTalk(query) {
  const url = 'https://api.simsimi.vn/v1/simtalk';
  const params = new URLSearchParams({
    text: query,
    lc: 'es',
    key: ''
  });

  try {
    const response = await axios.post(url, params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    return response.data;
  } catch (error) {
    window.alert(error);
    return null;
  }
}

const query = 'hola como estas';
simsimiTalk(query)
  .then(response => {
    window.alert(response);
  })
  .catch(error => {
    window.alert(error);
  });

}
