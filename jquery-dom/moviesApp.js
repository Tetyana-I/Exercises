// Build an application that uses jQuery to do the following:

// Contains a form with two inputs for a title and rating along with a button to submit the form.
// When the form is submitted, capture the values for each of the inputs and append them to the DOM along with a button to remove each title and rating from the DOM.
// When the button to remove is clicked, remove each title and rating from the DOM.

let movieId = 0; //movies counter
const moviesList = [];
$('th').css({
    'text-align': 'center',
    width: "300px",
    "background-color": "lightgrey",
    border: "2px solid grey"
            });


function createMovieTableRowHTML(inputData) {
    return `
      <tr>
        <td>${inputData.title}</td>
        <td>${inputData.rating}</td>
        <td>
          <button class = "deleteBtn" id = ${inputData.movieId}>Delete</button>
        </td>
      <tr>
    `;
  }
  
  $('form').on('submit', function(e){
    e.preventDefault();
    const title = $("#title").val();
    const rating = $("#rate").val();
    const movie = {title, rating, movieId}; 
    movieId++;
    //add to Movie list
    moviesList.push(movie);
    //add to Movie Table HTML
    movieHTML = createMovieTableRowHTML(movie);
    $('tbody').append(movieHTML);
    $("form").trigger("reset");
    $('td').css('text-align', 'center');
  }) 

  $("tbody").on("click", function(evt) {
    const idToDelete = evt.target.getAttribute('id');
    moviesList.splice(idToDelete,1); //delete from Movie list
    $(evt.target).parent().parent().remove(); }); // delete from Movie Table HTML


    
 
  

