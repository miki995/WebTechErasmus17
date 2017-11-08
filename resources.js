$(document).ready(function () {

    // var but = document.querySelector("[name='Retrieve']");
    //setInterval(function () {but.click();},6000);

    $('#retrieve-resources').click(function () {
        var displayResources = $('#display-resources');

        displayResources.text('Loading data from JSON source...');

        $.ajax({
            dataType: "JSON", // umjesto type ti treba dataType jer to on trazi, ne metod slanja zahtjeva na server odnosno citanje
            url: "assets/resources.json", // onaj assets sto sam naveo u app.js
            success: function (result) {
                console.log(result);
                var output = "<div style=\"overflow-x:auto;\"><table><thead><tr><th>Name</th><th>Email</th><th>URL</th></thead><tbody>";
                for (var i in result) {
                    output += "<tr><td>" + result[i].name + "</td><td>" + result[i].email + "</td><td>" + result[i].url + "</td></tr>";
                }
                output += "</tbody></table></div>";

                displayResources.html(output);
                $("table").addClass("table");
            }
        });


    });


    $('#append-resources').click(function () {


        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var url = document.getElementById("url").value;

        var formData = {'name': name, 'email': email, "url": url};
        formData['test'] = 'test';
        $.ajax({
            url: "resources.json",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: formData
        });
    });
});
