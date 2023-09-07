var btn_login = document.getElementById("button-login");
var toggle_iconlock = document.getElementById("lock");
var toggle_pass = document.getElementById("pass");

const warning = document.getElementById("warning");
warning.style.display = "none";

// login
btn_login.onclick = function(){
    var inputName = document.getElementById("name").value;
    var inputPass = document.getElementById("pass").value;
    
    if ((inputName === "Aespa" && inputPass === "12345678") || (inputName === "26lpc122002" && inputPass === "loqcunn7479")) {
        window.location.href = "todo.html";
    }else{
        warning.style.display = "flex";
        setTimeout(function() {
            warning.style.display = "none";
        }, 3000);
    }
}

// Toggle password
toggle_iconlock.onclick = function(){
    if (toggle_iconlock.innerHTML === "lock_outline") {
        toggle_iconlock.innerHTML = "lock_open";
        toggle_pass.type = "text";
    } else {
        toggle_iconlock.innerHTML = "lock_outline";
        toggle_pass.type = "password";
    }
}
