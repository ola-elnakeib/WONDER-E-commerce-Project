let form = document.getElementById("loginForm");
let username = document.getElementById("username");
let password = document.getElementById("password");
let rmbMe = document.getElementById("rmbMe");
let loginBtn = document.getElementById("loginBtn");

form.addEventListener("submit", handleFormSubmission);

function handleFormSubmission(event) {
    event.preventDefault();

    if (validateInputs()) {
        getAndAuthenticateUser();
    }
}

function validateInputs() {
    let isValid = true;

    if (!usernameExist(username)) {
        isValid = false;
    }

    if (!passwordExist(password)) {
        isValid = false;
    }

    return isValid;
}

function getAndAuthenticateUser() {
    let XHR = new XMLHttpRequest();
    XHR.open("GET", "../db.json", true);

    XHR.onreadystatechange = function () {
        if (XHR.readyState === 4 && XHR.status === 200) {
            const responseData = JSON.parse(XHR.responseText);
            const users = responseData.users;

            let foundUser = false;

            users.forEach(user => {
                if (user.username === username.value && user.password === password.value) {

                    foundUser = true;

                    if (user.role === "admin") {
                        if (rmbMe.checked) {
                            setLocalStorage();
                            swal({
                                icon: 'success',
                                title: 'Success!',
                                text: 'Your data has been saved successfully!',
                            }).then(() => {
                                redirectUser(user.role);
                            });
                        } else {
                            redirectUser(user.role);
                        }

                    } else if (user.role === "customer") {
                        if (rmbMe.checked) {
                            setLocalStorage();
                            swal({
                                icon: 'success',
                                title: 'Success!',
                                text: 'Your data has been saved successfully!',
                            }).then(() => {
                                redirectUser(user.role);
                            });
                        } else {
                            redirectUser(user.role);
                        }
                    }
                }
            });

            if (!foundUser) {
                swal({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Username or password is not correct!',
                });

                setErr(username, "Please check your username again");
                setErr(password, "Please check your password again");
            }
        }
    };

    XHR.send();
}




function setLocalStorage() {
        localStorage.setItem("userName", username.value);
        localStorage.setItem("userPassword", password.value);
}


function redirectUser(userRole) {
    if (userRole === "admin") {
        window.open("/HTML/dashboard.html", "_self");
    } else if (userRole === "customer") {
        window.open("/HTML/home.html", "_self");
    }
};




function usernameExist(username) {
    if (!username.value) {
        setErr(username, "Username is required");
        return false;
    } else {
        setSuccess(username);
        return true;
    }
}




function passwordExist(password) {
    if (!password.value) {
        setErr(password, "Password is required");
        return false;

    } else {
        setSuccess(password);
        return true;
    }
}




function setErr(input, msg) {
    let inputContainer = input.parentElement;
    let errDisplay = inputContainer.querySelector(".error");
    errDisplay.innerHTML = msg;
    inputContainer.classList.add("error");
    inputContainer.classList.remove("success");
}




function setSuccess(input) {
    let inputContainer = input.parentElement;
    let errDisplay = inputContainer.querySelector(".error");
    errDisplay.innerHTML = "";
    inputContainer.classList.add("success");
    inputContainer.classList.remove("error");
}

