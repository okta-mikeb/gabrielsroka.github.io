/* 
set apikey in the bookmarklet VVVVVV
javascript:(function(){window.apikey="";var script=document.body.appendChild(document.createElement("script"));
script.src="https://gabrielsroka.github.io/repl.js";script.onload=function(){document.body.removeChild(this);};})();
*/

function o(path, method, body) {
    _ = __ = "Loading ...";
    var request = new XMLHttpRequest();
    request.open(method ? method : "GET", "/api/v1" + path);
    request.setRequestHeader("Authorization", "SSWS " + (window.apikey ? apikey : apikey = prompt("Enter API key")));
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Accept", "application/json");
    request.onload = function () {
        if (request.responseText) {
            _ = JSON.parse(request.responseText);
            if (_.length == 1) _ = _[0];
            __ = JSON.stringify(_, null, 2);
        } else {
            _ = __ = "";
        }
    };
    request.send(body ? JSON.stringify(body) : null);
}
function u(path, method, body) {
    o("/users/" + (path ? path : ""), method, body);
}
function g(path, method, body) {
    o("/groups/" + (path ? path : ""), method, body);
}
function each() {
    var mx = [];
    var vs = []
    for (var a in arguments) {
        mx.push(arguments[a].length);
    }
    var r = [];
    for (var i in _) {
        vs = [];
        for (a in arguments) {
            var ps = arguments[a].split(".");
            var o = _[i];
            for (var p in ps) {
                o = o[ps[p]];
            }
            if (o.length > mx[a]) mx[a] = o.length;
            vs.push(o);
        }
        r.push(vs);
    }
    var s = "\n";
    for (a in arguments) {
        s += arguments[a] + " ".repeat(mx[a] + 2 - arguments[a].length);
    }
    s += "\n";
    for (i in r) {
        for (a in arguments) {
            s += r[i][a] + " ".repeat(mx[a] + 2 - r[i][a].length);
        }
        s += "\n";
   }
   return s;
}

/*
// get all users
u()
_.length
each("profile.email","profile.firstName", "profile.lastName", "profile.login")

// get me
u("me")
me=_
__

// get group
g("?q=powershell")
group=_

// add user to group
g(group.id + "/users/" + me.id, "PUT")

// create user
u("", "POST", {profile: {login: "a@a.com", email: "a@a.com", firstName: "first", lastName: "a100"}})
*/
