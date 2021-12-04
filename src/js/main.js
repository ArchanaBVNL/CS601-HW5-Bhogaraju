/**
 * On click event listener for button 'get information'
 */
document.getElementById('fetchButton').addEventListener('click', function () {
  getDegreeInfo('/src/js/data.json')
})

/**
 * method to fetch information from given url of JSON file
 * resolve the promise
 * If the response status is 200 then process the data
 * else if status is 404, display invalid url error
 * else for all other errors throw exception
 */
async function getDegreeInfo(url) {
  let responseClone
  document.getElementById('error').classList.remove('showError')
  await fetch(url)
    .then((response) => {
      responseClone = response
      if (response.status == 200) {
        return response.json()
      } else {
        if (response.status == 404) {
          throw new Error('Invalid url: Cannot fetch Degree Information!')
        } else {
          throw new Error('An exception occurred while trying to fetch Degree Information!')
        }
      }
    })
    .then((data) => {
      // call displayData method to display Degree records on index.html
      displayData(JSON.parse(JSON.stringify(data)))
    })
    .catch((error) => {
      document.getElementById('error').classList.add('showError')
      // if the status is 200 and yet cause error then it implies the JSON file is empty
      if (responseClone.status == 200) {
        document.getElementById('error').innerHTML = 'No Degree Records Found!'
      } else {
        document.getElementById('error').innerHTML = error.message
      }
    })
}

/**
 * method to create and display degree records using DOM
 */
const displayData = (degreeData) => {
  let table_output = ''
  // loop on my_college_degrees array
  for (let i = 0; i < degreeData.my_college_degrees.length; i++) {
    // construct a table row
    let table_row = '<tr>'
    table_row += `<td>${degreeData.my_college_degrees[i].degree.school}</td>`;
    table_row += `<td>${degreeData.my_college_degrees[i].degree.major}</td>`;
    table_row += `<td>${degreeData.my_college_degrees[i].degree.type}</td>`;
    table_row += `<td>${degreeData.my_college_degrees[i].degree.year}</td>`;
    table_row += '</tr>'
    table_output += table_row
  }

  // add to index.html using DOM
  document.getElementById('table-body').innerHTML = table_output
}
