var userArray = [];
var baseurl = "http://18.236.230.225/posts"

function cleanAll(name, point, absent) {
                var data = {};
                data["name"] = name;
                data["point"] = point;
                data["absent"] = absent;
                console.log(data)
                $.ajax({
                        url: baseurl + '/' + name,
                        type: 'PATCH',
                        contentType: 'application/json',
                        data: JSON.stringify(data),
            processData: false,
            dataType: 'json',
                        success: function(result) { },
                        error: function(error) { console.log(error)}
                                });
};

function updateAbsent(absent) {
        if (absent == "clear") {
        userArray.forEach(function (item) {
                    cleanAll(item, "0", "no")
        });
      } else {
        cleanAll(absent, "*", "yes")
            };
 };

function scanTable() {
        $.ajax({
          url: baseurl,
          type: "GET",
          success: function(result) {
        console.log(result);
        for (var obj of result) {
            userArray.push(obj.name)
            console.log(obj.name)
            var usernames_string = '<button onclick="window.location.href=\'scrum/' +  obj.name + '\'"; class="button1 buttonred">' + obj.name + '</button>'
            console.log(usernames_string)
            var absent_string = '<button onclick="updateAbsent(\'' + obj.name + '\')"; class="button1 buttonblue">' + obj.name + '</button>'
            document.getElementById("usernames").innerHTML += usernames_string
            document.getElementById("usernames_absent").innerHTML +=  absent_string
            };
        },
          error: function(error) { console.log(error)}
                });
};

// START OF SHUFFLE FUNCTION

function shuffle() {
  document.getElementById("random").innerHTML = ""
//  document.getElementById("random").style.display = "block";
  var randomArr = ["Ankur", "Jesse", "Swati", "Omar", "Bai", "Anil", "Brandon", "Devon", "Kris", "Eric", "Jeremy", "Ben"]
  var currentIndex = randomArr.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = randomArr[currentIndex];
    randomArr[currentIndex] = randomArr[randomIndex];
    randomArr[randomIndex] = temporaryValue;
                }
  for (i = 0; i < randomArr.length; i++) {
        var random_string = '<button class="button1 buttonblack">' + randomArr[i] + '</button>'
        document.getElementById("random").innerHTML += random_string
                                };
        };
// END OF SHUFFLE FUNCTION

// START OF ELEMENT FUNCTION
function showelement() {
    document.getElementById("element").innerHTML = ""
    var elementArr = ["Palladium", "Silver", "Cadmium", "Indium", "Tin", "Antimony", "Tellurium", "Iodine", "Xenon", "Cesium", "Barium", "Lanthanum", "Cerium", "Praseodymium", "Neodymium", "Promethium", "Samarium", "Europium", "Gadolinium", "Terbium", "Dysprosium", "Holmium", "Erbium", "Thulium", "Ytterbium", "Lutetium", "Hafnium", "Tantalum", "Tungsten", "Rhenium", "Osmium", "Iridium", "Platinum", "Gold", "Mercury", "Thallium", "Lead", "Bismuth", "Polonium", "Astatine", "Radon", "Francium", "Radium", "Actinium", "Thorium", "Protactinium", "Uranium", "Neptunium", "Plutonium", "Americium", "Curium", "Berkelium", "Californium", "Einsteinium", "Fermium", "Mendelevium", "Nobelium", "Lawrencium", "Rutherfordium", "Dubnium", "Seaborgium", "Bohrium", "Hassium", "Meitnerium", "Darmstadtium", "Roentgenium", "Ununbium", "Ununtrium", "Ununquadium", "Ununpentium", "Ununhexium", "Ununseptium", "Ununoctium"];
    for (i = 0; i < elementArr.length; i++) {
        var element_string = '<button class="button1 buttonblack">' + elementArr[i] + '</button>'
        document.getElementById("element").innerHTML += element_string
                                };
        };
// END OF ELEMENT FUNCTION