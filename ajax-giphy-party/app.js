console.log("Let's get this party started!");
// Part 1: Building the Form
//////////////////////////////////////////////////////////

async function getGiphyUrl(searchTerm) {
    try {
        const res = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`);
        console.log(res);
        for (let i=0; i<res.data.data.length; i++) {
            const giphyUrl = res.data.data[i].images.original.url;
            appendGiphy(giphyUrl);
        }
    } catch(e) {
        alert('Cannot find any. Try another term!');
        console.log(e);
    }
}

// Part 2: Appending GIFs
/////////////////////////////////////////////////////////////

async function appendGiphy(giphyID) {
    imagesHTML += `<img src='${giphyID}' width='300px'>`;
    $("#giphy-party").html(imagesHTML);
}

// Part 3: Removing GIFs
//////////////////////////////////////////////////////////////


function deleteImages() {
    $('img').remove();
    imagesHTML = '';
    $("#giphy-party").html(imagesHTML);
}

let imagesHTML = '';
const input = $('#search-input');

$('#search-form').on('submit', function(e){
    e.preventDefault();
    console.log("input:", input.val());
    getGiphyUrl(input.val());
    input.value ='';
})

$('#delete-all-btn').on("click", deleteImages);