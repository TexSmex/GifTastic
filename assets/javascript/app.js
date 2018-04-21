$(document).ready(function () {

    //Our Topics Array !
    var Topics = ["Simpsons", "Aladdin", "Popeye spinach", "Pokemon", "Superman", "Batman", "Joker", "daffy duck", "bugs bunny"];
    //Defining some other variables used in the code below...
    var oldTopicArray = [];
    var oldTopicArray2 = [];
    var Space = $("<br>");
    var limit = 10;
    var y = 0;
    var Topic;
    var FavBtn;
    var favStill = [];
    var favAnim = [];
    var favTitle = [];
    var favRate = [];



    function displayTopicInfo() {


        y += 1;

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + Topic + "&api_key=v59a1VCxrYYKFYECQTiipfMaVuAsO53R&limit=" + limit;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {


            var results = response.data;

            // Looping through each result item
            for (var i = 0; i < results.length; i++) {
                console.log('index: ', i)

                // Creating and storing a div tag
                var DivMobile = $("<div>").addClass("float-left col-xl-3 col-lg-3 col-sm-6 col-xs-12 clearfix");
                var TopicDiv = $("<div>").addClass("card mt-2");
                Space = $("<br>");
                // Creating a paragraph tag with the result item's downlowad,title,rating and the Fav button.
                var a = $('<a href="' + results[i].images.fixed_height.url + '" download="' + results[i].title + '">Download</a>').addClass("btn btn-info");
                var p1 = $("<h5>").addClass("card-title font-weight-bold").text(results[i].title);
                var p2 = $("<p>").addClass("card-text").text("Rating: " + results[i].rating);
                FavBtn = $("<button>").addClass("btn btn-danger fav").text("favorite").attr('data-still', results[i].images.fixed_height_still.url).attr("data-animate", results[i].images.fixed_height.url);
                FavBtn.attr("rating", results[i].rating).attr('title', results[i].title)
                var Info = $("<div>").addClass("card-body").append(p1, p2, a, Space, FavBtn);

                // Creating and storing an image tag
                var TopicImage = $("<img>").addClass("card-img-top gif");

                // Setting the src attribute of the image to a property pulled off the result item 
                TopicImage.attr("src", results[i].images.fixed_height_still.url).attr("data-state", "still").attr("data-animate", results[i].images.fixed_height.url);
                TopicImage.attr("data-still", results[i].images.fixed_height_still.url);

                // Appending the paragraph and image tag to the TopicDiv
                TopicDiv.append(TopicImage, Info);
                DivMobile.append(TopicDiv);

                // Prependng the DivMobile (Responsive) to the HTML page in the "#gifs-appear-here" div
                $("#gifs-appear-here").prepend(DivMobile);
            }

        });

    }

    function AddGif() {

        Topic = $(this).attr("data-name");
        console.log(Topic);
        oldTopicArray2.push(Topic);

        if (oldTopicArray.indexOf(Topic) === -1) {


            oldTopicArray.push(Topic);
            $("#gifs-appear-here").empty()
            limit = 10;
            displayTopicInfo();



        }

        else if (oldTopicArray2[y] !== oldTopicArray2[y - 1]) {


            $("#gifs-appear-here").empty()
            limit = 10;
            displayTopicInfo();

        }

        else if (oldTopicArray2[y] === oldTopicArray2[y - 1]) {


            $("#gifs-appear-here").empty()
            limit += 10;
            displayTopicInfo();


        }

    }

    function renderButtons() {

        // Deleting the other Topic prior to adding new Topics
        $("#buttons-view").empty();

        // Looping through the array of topics
        for (var i = 0; i < Topics.length; i++) {

            // Then dynamicaly generating buttons for each topic in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var btn = $("<button>");
            // Adding a class of Topic-btn to our button
            btn.addClass("Topic-btn btn btn-warning m-1");
            // Adding a data-attribute
            btn.attr("data-name", Topics[i]);
            // Providing the initial button text
            btn.text(Topics[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(btn);
        }
    }

    function favoritGif() {

        still = $(this).attr("data-still");
        animate = $(this).attr("data-animate");
        title = $(this).attr("title");
        rate = $(this).attr("rating");
        favStill.push(still);
        favAnim.push(animate);
        favTitle.push(title);
        favRate.push(rate);

        //Clearing the existant before appending other favorite gifs
        $("#Favorite-gifs-appear-here").empty()

        //looping for all our favorite array in favStill
        for (var i = 0; i < favStill.length; i++) {


            // Creating and storing a div tag
            var DivMobile = $("<div>").addClass("float-left col-xl-3 col-lg-3 col-sm-6 col-xs-12 clearfix");
            var TopicDiv = $("<div>").addClass("card mt-2");

            // Creating a paragraph tag with the result item's rating and title
            var p1 = $("<h5>").addClass("card-title font-weight-bold").text(favTitle[i]);
            var p2 = $("<p>").addClass("card-text").text("Rating: " + favRate[i]);

            var Info = $("<div>").addClass("card-body").append(p1, p2);

            // Creating and storing an image tag
            var TopicImage = $("<img>").addClass("card-img-top gif");

            // Setting the src attribute of the image to a property pulled off the result item 
            TopicImage.attr("src", favStill[i]).attr("data-state", "still").attr("data-animate", favAnim[i]);
            TopicImage.attr("data-still", favStill[i]);

            // Appending the paragraph and image tag to the TopicDiv
            TopicDiv.append(TopicImage, Info);
            DivMobile.append(TopicDiv);


            // Prependng the DivMobile (Responsive) to the HTML page in the "#Favorite-gifs-appear-here" div
            $("#Favorite-gifs-appear-here").append(DivMobile);



        }
    }

    $("#add-a-Topic").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var newTopic = $("#Topic-input").val().trim();

        // Adding movie from the textbox to our array
        Topics.push(newTopic);

        // Calling renderButtons which handles the processing of our Topic array
        renderButtons();
    });

    // Adding a click event listener to all elements with a class of "Topic-btn,gif and fav"
    $(document).on("click", ".Topic-btn", AddGif);
    $(document).on("click", ".gif", Animate);
    $(document).on("click", ".fav", favoritGif);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();

    function Animate() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

});
