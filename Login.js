function validateForm() {
    var user = document.getElementById("username");
    var pass = document.getElementById("password");
    var uflag = 0, pflag = 0;
        
    if(user.value != "admin" || user.value == ""){
        user.style.backgroundColor = "#f44336";
    } else {
        user.style.backgroundColor = "#4CAF50";
        uflag = 1;
    }
    if(pass.value != "p@ssword" || password.value == "") {
        pass.style.backgroundColor = "#f44336";
    } else {
        pass.style.backgroundColor = "#4CAF50";
        pflag = 1;
    }

    if(uflag == 1 && pflag == 1){
        document.location.replace("Home.html");
    }
}