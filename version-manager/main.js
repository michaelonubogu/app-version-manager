const versionKey = 'YourAppName.currentVersion';
const configPath = 'version-manager/config.json'; // root category is 'index.html' destination
const xmlhttp = new XMLHttpRequest();

xmlhttp.open('GET', configPath, false);
xmlhttp.send(null);

if(xmlhttp.status == 200) {
    console.log(xmlhttp);
    const config = JSON.parse(xmlhttp.responseText);
    const currentVer = JSON.parse(localStorage.getItem(versionKey));
    if (currentVer != config.version) {
        localStorage.clear();
        sessionStorage.clear();
        clearCookies();
        localStorage.setItem(versionKey, JSON.stringify(config.version));
        location.reload(true);
    } else {
        console.info('You have an actual build:', currentVer);
    }
} else {
    console.error('Details: Can\'t read application cache configuration. Reason: file is not found.');
}

function clearCookies() {
    var cookies = document.cookie.split(";");
    for(var i=0; i < cookies.length; i++) {
        var equals = cookies[i].indexOf("=");
        var name = equals > -1 ? cookies[i].substr(0, equals) : cookies[i];
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}