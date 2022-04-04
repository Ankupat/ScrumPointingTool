var finalVotedDict = {};
var userArray = []
var baseurl = "http://18.236.230.225/posts"

scanTable();
// START OF QUERY PARAM SEARCH

var urlName = window.location.href.split('/').pop().toLowerCase();
if (urlName === "viewer") {
    document.getElementById("content").style.display = "none";
} else if (urlName != "viewer") {
    document.getElementById("clearResult").style.display = "none";

};

sName = urlName[0].toUpperCase() + urlName.slice(1);
console.log(sName)
userspecific()
document.getElementById("userHeader").innerHTML = sName

// END OF QUERY PARAM SEARCH
// START OF POINT CALC FUNCTION
function calc() {
    var textType = Node.textContent ? 'textContent' : 'innerText',
        num1 = parseFloat(document.getElementById('num1').value) || 0,
        num2 = parseFloat(document.getElementById('num2').value) || 0,
        num3 = parseFloat(document.getElementById('num3').value) || 0
        result = document.getElementById('result');

        var total_eng_points = num1 * 20;
        var total_eng_vacation_points = num2 * 2;
        var total_public_holiday_points = num3 * (num1 * 2);
        var total_rag_points_lost = 15; // Valve RAG is fixed at 25 points (40 - 15)

        console.log(total_eng_points, total_eng_vacation_points, total_public_holiday_points, total_rag_points_lost);
        result[textType] = total_eng_points - total_eng_vacation_points - total_public_holiday_points - total_rag_points_lost;
    }
// END OF POINT CALC FUNCTION


function userspecific() {
    if (document.contains(document.getElementById("content"))) {
            document.getElementById("content").innerHTML = "";
        }
        const div = document.createElement('div');
    div.className = 'row';
    div.innerHTML = `
            <button class="buttonround" onclick="voteWrite('1')">1</button>
                <button class="buttonround" onclick="voteWrite('2')">2</button>
                <button class="buttonround" onclick="voteWrite('3')">3</button>
                <button class="buttonround" onclick="voteWrite('5')">5</button>
                <button class="buttonround" onclick="voteWrite('8')">8</button>
                <button class="buttonround" onclick="voteWrite('13')">13</button>
                <button class="buttonround" onclick="voteWrite('20')">20</button>
                <button class="buttonround" onclick="voteWrite('40')">40</button>
                <button class="buttonround" onclick="voteWrite('60')">60</button>
                <button class="buttonround" onclick="voteWrite('80')">80</button>
                <button class="buttonround" onclick="voteWrite('?')">?</button>
        `;

    document.getElementById('content').appendChild(div);
    }

function voteWrite(point) {
    goGreen(sName);
    document.getElementById("userPoint").innerText=point;
    writeTable(sName, point, "no")
        };

function updateGui(result) {
    for (var obj of result) {
        if (obj.absent == "yes"  || obj.point !== "0") {
            goGreen(obj.name);
        } else if (obj.absent == "no" && obj.point == "0") {
                        goRed(obj.name);
                    document.getElementById(obj.name + "-status").textContent="";
                };
    };
        checkAllStatus(result);
};



// START - Scan the table for username updates
function scanTable() {
        $.ajax({
          url: baseurl,
          type: "GET",
          success: function(result) {
                for (var obj of result) { userArray.push(obj.name) };
                    },
          error: function(error) { console.log(error)}
                });
};
// END - Scan the table for username updates

// START - Read the table for updates
function readTable() {
        $.ajax({
          url: baseurl,
          type: "GET",
          success: function(result) {
                console.log(result);
        updateGui(result)
                        },
          error: function(error) { console.log(error)}
                });
};
// END - Read the table for updates

// START - Clean everything
function clearVotes() {
    userArray.forEach(function (item) {
        $.ajax({
                url: baseurl + "/" + item,
                type: "GET",
                success: function(result) { if (result.absent === "no") { writeTable(item, "0", "no") }; },
                error: function(error) { console.log(error) }
                    });
        goRed(item);
    });
};
// END - Clean everything

// START - This function will update the databse entry
function writeTable(name, point, absent) {
                var data = {};
                data["name"] = name;
                data["point"] = point;
                data["absent"] = absent;
                console.log(data);
                $.ajax({
                        url: baseurl + '/' + name,
                        type: 'PATCH',
                        contentType: 'application/json',
                        data: JSON.stringify(data),
                        processData: false,
                        dataType: 'json',
                        success: function(result) { },
                        error: function(error) { console.log(error) }
                      });
};
// END - This function will update the databse entry

function goGreen(user) {
    document.getElementById(user + "-status").classList.remove('buttonred');
        document.getElementById(user + "-status").classList.add('buttongreen');
};

function goRed(user) {
        document.getElementById(user + "-status").classList.remove('buttongreen');
        document.getElementById(user + "-status").classList.add('buttonred');
};

function checkAllStatus(result) {
    var checkFlag = [];
    userArray.forEach(function (item) {
            const uelement = item + "-status";
            const element = document.querySelector("#" + uelement);
            if (element.classList.contains("buttongreen")) {
                checkFlag.push(1);
              } else {
                checkFlag.push(0);
            };
        });
    if (!checkFlag.includes(0)) {
        userArray.forEach(function (item) { goGreen(item); });
        for (var obj of result) { 
            console.log("##", result)
            console.log(obj.name, obj.point);
//          $("#" + obj.name + "-status").text(obj.point).button("refresh"); 
            document.getElementById(obj.name + "-status").textContent=obj.point;
                };

    };
};

window.setInterval(function(){
    readTable();
}, 500);