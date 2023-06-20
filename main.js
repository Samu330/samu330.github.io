function getAllRequest()
{
  axios.get('http://localhost:8080/item')
    .then(function (response) {
    console.log(response);
    })
    .catch(function (error) {
    console.log(error);
    })
    .then(function () {
    });
}

function getFilteredRequest()
{
  axios.get('https://api.simsimi.vn/v1/simtalk', {
    params: {
      text: 'Hola',
      lc: 'es',
      key: ''

    }
    })
    .then(function (response) {
    console.log(response);
    })
    .catch(function (error) {
    console.log(error);
    })
    .then(function () {
    });
}

function getByIdRequest()
{
  id = 10;
  axios.get('http://localhost:8080/item/' + id)
    .then(function (response) {
    console.log(response);
    })
    .catch(function (error) {
    console.log(error);
    })
    .then(function () {
    });
}

function postRequest()
{
  axios.post('https://api.simsimi.vn/v1/simtalk', {
    text: 'Hola',
    lc: 'es',
    key: ''

    })
    .then(function (response) {
    window.alert(response);
    })
    .catch(function (error) {
    window.alert(error);
    })
    .then(function () {
    });
}

function putRequest()
{
  id = 10;
  axios.put('http://localhost:8080/item/' + id, {
    data: 'NewItem'
    })
    .then(function (response) {
    console.log(response);
    })
    .catch(function (error) {
    console.log(error);
    })
    .then(function () {
    });
}

function patchRequest()
{
  id = 10;
  axios.patch('http://localhost:8080/item/' + id, {
    data: 'NewItem'
    })
    .then(function (response) {
    console.log(response);
    })
    .catch(function (error) {
    console.log(error);
    })
    .then(function () {
    });
}

function deleteRequest()
{
  id = 10;
  axios.delete('http://localhost:8080/item/' + id)
    .then(function (response) {
    console.log(response);
    })
    .catch(function (error) {
    console.log(error);
    })
    .then(function () {
    });
}
