let form = document.getElementById('regForm');
let username = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');
let phoneNum = document.getElementById('phoneNum');


form.addEventListener("submit", async (event) => {
    event.preventDefault();
    validateInputs();
    if (isFormValid()) {
        try {
            // debugger
            const response = await fetch("http://localhost:3000/users?email=" + email.value);
            const data = await response.json();

            if (data.length === 0) {
                let myNewObj = {
                    id: "",
                    "username": username.value,
                    "email": email.value,
                    "password": password.value,
                    "phoneNum": phoneNum.value,
                    "role": "customer",
                    "flag": 0
                };

                await sendMail();
                postData(myNewObj);
                window.open("/HTML/login.html","_self")

            } else {
                // event.preventDefault();
                // alert("Email address already exists!");
                swal({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Email address already exists!',
                });

                setErr(email,"Change email address");
            }
        } catch (error) {
            console.error('Fetch error:', error);
            // Handle fetch error if needed
        }
    }
});

function sendMail() {
    return emailjs.send("service_uffqahe", "template_r5q6i2e", {
        username: username.value,
        email: email.value,
        //  from : email.value,
    });
}


function postData(myNewObj) {
    fetch("http://localhost:3000/users", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(myNewObj)
    });
}




// function to validate form
function isFormValid() {
    let inputContainers = form.querySelectorAll('.inputContainer');
    let result = true;
    inputContainers.forEach((element) => {
        if (element.classList.contains('error')) {
            result = false;
        }
    });

    return result;
};




// function to validate all inputs 
function validateInputs() {
    let usernameValue = username.value.trim();
    let emailValue = email.value.trim();
    let passwordValue = password.value.trim();
    let phoneNumValue = phoneNum.value.trim();

    if (usernameValue === "") {
        setErr(username, "Username is required");
    } else if (!isUsernameValid(usernameValue)) {
        setErr(username, "Please enter a valid username, username must be at least 3 characters, can't begin or end with . or _ or white space and can't contain __ or .. or _. or ._ inside");
    } else {
        setSuccess(username);
    }

    if (emailValue === "") {
        setErr(email, "Email address is required");
    } else if (!isEmailValid(emailValue)) {
        setErr(email, "Please enter a valid email format ex:example@example.example")
    } else {
        setSuccess(email);
    }

    if (passwordValue === "") {
        setErr(password, "Password is required");
    } else if (!isPasswordValid(passwordValue)) {
        setErr(password, "Please enter a valid password, password must be at least eight characters, contains at least: one uppercase letter, one lowercase letter, one number and a special character");
    } else {
        setSuccess(password);
    }

    if (phoneNumValue === "") {
        setErr(phoneNum, "Phone number is required");
    } else if (!isPhoneNumValid(phoneNumValue)) {
        setErr(phoneNum, "Please enter a valid phone number format");
    } else {
        setSuccess(phoneNum);
    }
};




// function to set error msg 
function setErr(input, msg) {
    let inputContainer = input.parentElement;
    let errDisplay = inputContainer.querySelector('.error');
    errDisplay.innerHTML = msg;
    inputContainer.classList.add('error');
    inputContainer.classList.remove('success');
}




// function to clear error msg 
function setSuccess(input) {
    let inputContainer = input.parentElement;
    let errDisplay = inputContainer.querySelector('.error');
    errDisplay.innerHTML = "";
    inputContainer.classList.add('success');
    inputContainer.classList.remove('error');
}




// function to validate username 
function isUsernameValid(username) {
    // username is 3-20 characters long
    // no __ or _. or ._ or .. inside
    // no _ or . or white space at the beginning or at the end
    let rejex = /^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    return rejex.test(String(username));
};




// function to validate email 
function isEmailValid(email) {
    let rejex = /^([a-zA-Z0-9_\-?\.?]){3,20}@([a-zA-Z]){3,10}\.([a-zA-Z]){2,5}$/;
    return rejex.test(String(email).toLowerCase());
};




// function to validate password 
function isPasswordValid(password) {
    // Minimum eight characters, 
    // at least one uppercase letter, 
    // one lowercase letter, 
    // one number 
    // and one special character
    let rejex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._])[A-Za-z\d@$!%*?&._]{8,}$/;
    return rejex.test(password);
};




// function to validate phone num 
function isPhoneNumValid(phoneNum) {
    let rejex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    return rejex.test(Number(phoneNum));
};


