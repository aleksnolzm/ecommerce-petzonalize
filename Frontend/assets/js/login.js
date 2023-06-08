const signUpForm = $("#sing-up-form");
const loginForm = $("#login-form");
const recoverForm = $("#recover-form");

const buttonToSignUp = document.getElementById("view-sign-up");
const buttonToLogin = document.getElementById("view-login");
const toRecoverPassword = document.getElementById("view-recover-section");
const buttonBackToLogin = document.getElementById("view-login-2"); //This button is in recover container

const loginContainer = document.getElementById("login-container");
const signupContainer = document.getElementById("signup-container");
const recoverContainer = document.getElementById("recover-container");

const alertElement = $("#alert");

//-------------- Cambio de Vista -------------------
buttonToSignUp.addEventListener('click', ()=>{
    loginContainer.classList.add("d-none");
    signupContainer.classList.remove("d-none");
    recoverContainer.classList.add("d-none");
    clearInputs();
});

buttonToLogin.addEventListener('click', ()=>{
    loginContainer.classList.remove("d-none");
    signupContainer.classList.add("d-none");
    recoverContainer.classList.add("d-none");
    clearInputs();
});

toRecoverPassword.addEventListener('click', ()=>{
    loginContainer.classList.add("d-none");
    signupContainer.classList.add("d-none");
    recoverContainer.classList.remove("d-none");
    clearInputs();
});

buttonBackToLogin.addEventListener('click', ()=>{
    loginContainer.classList.remove("d-none");
    signupContainer.classList.add("d-none");
    recoverContainer.classList.add("d-none");
    clearInputs();
});


// *********************************************************************************
// Show in console SIRIA
// *********************************************************************************

fetch('https://petzonalize.up.railway.app/users')
  .then(response => response.json())
  .then(users => {
    console.log(users);
  })
  .catch(error => {
    console.error('Error:', error);
  });


// ORIGINAL

 $(document).ready(() => {
    // Forms validation
    validateForm(signUpForm);
    validateForm(loginForm);
    validateForm(recoverForm);
    
    // Verifying if user exists
    let user = localStorage.getItem("users-logged-in");
    if(user != null)
    window.location.href = 'profile.html';
});

// *********************************************************************************
// Verify if user exists with Backend (NOT STILL APPLIED)
// *********************************************************************************

/* $(document).ready(() => {
    // Forms validation
    validateForm(signUpForm);
    validateForm(loginForm);
    validateForm(recoverForm);

    // Verifying if user exists
    if (user != null) {
        // Make an HTTP request to retrieve the user data
        fetch("https://petzonalize.up.railway.app/users")
            .then(response => response.json())
            .then(users => {
                // Check if the user exists in the response data
                if (users.includes(user)) {
                    // User exists, redirect to profile.html
                    window.location.href = 'profile.html';
                } else {
                    // User does not exist, handle the case accordingly
                    console.log('User does not exist');
                }
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error('Error:', error);
            });
    }
}); */


//--------- Limpiar campos --------------
const clearInputs = () => {
    signUpForm.find('input').each((key, input) => resetInput(input));
    recoverForm.find('input').each((key, input) => resetInput(input));
    loginForm.find('input').each((key, input) => resetInput(input));
};

const resetInput = input => {
    $(input).val("");
    $(input).removeData("previousValue");
    $(input).removeAttr("aria-invalid");
    $(input).removeClass("valid");
    $(input).removeClass("invalid");
    $(input).removeClass("input-icon-valid");
    $(input).removeClass("input-icon-invalid");
    $(`#${input.id}-error`).remove();
};

// ----- Escucha cuando el usuario se registre ------
signUpForm.submit(submitButton => {
    submitButton.preventDefault();

    if(signUpForm.valid())
        creatingUserAccount();
});

// ----- Escucha cuando el usuario recupera contraseña ------
recoverForm.submit(submitButton => {
    submitButton.preventDefault();

    const email = $("#recover-email-login").val().trim()

    if(recoverForm.valid()) {
        fetch("https://petzonalize.up.railway.app/users/" + email)
            .then(response => {
                if(response.ok){
                alertElement.text("Se ha enviado la contraseña a tu correo");
                alertElement.slideDown(250);
                setTimeout(() => alertElement.slideUp(250, () => $(this).remove()), 5000);

                alertElement.addClass("alert-success");
                alertElement.addClass("text-success");
                alertElement.removeClass("alert-danger");
                alertElement.removeClass("text-danger");
            } else {
                console.error("Not user registered");
            }}
    )} 
});

// ------ Escucha cuando el usuario inicie sesion -----
loginForm.submit(submitButton => {
    submitButton.preventDefault();

    const email = $("#input-email-login").val().trim();
    const password = $("#input-password-login").val().trim();

    const user = {
        email: $("#input-email-login").val().trim(),
        password: $("#input-password-login").val().trim()
    }
    console.log(user);

    if(loginForm.valid())
        fetch("https://petzonalize.up.railway.app/users/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
            .then(usersResponse =>{
                if( usersResponse.ok) {
                console.log("Hola mundo");
                console.log(usersResponse);
                


                    /* const userObtained = getUserFromDataBase(email, password, usersResponse);
                    window.location.href = 'profile.html';
                    console.log("Sesion iniciada"); */
                }
                else {
                    alertElement.text("Correo o contraseña incorrectos");
                    alertElement.slideDown(250);
                    setTimeout(() => alertElement.slideUp(250, () => $(this).remove()), 5000);

                    alertElement.removeClass("alert-success");
                    alertElement.removeClass("text-success");
                    alertElement.addClass("alert-danger");
                    alertElement.addClass("text-danger");
                }
            })
});

//----------- Obtener Usuario -----------
/* const getUserFromDataBase = (email, password, usersDatabase) =>{
    let userFound = {};

    if(usersDatabase)
        usersDatabase.users.some( registeredUser => {
            const isUser = registeredUser.email == email && registeredUser.password === password;
            userFound = registeredUser;
            return isUser;
        });

    return userFound;
} */

//-----------Comprobar Contraseña -----------
/* const checkLoginUser = (email, password, usersDatabase) =>{
    if(usersDatabase)
        return usersDatabase.users.some( registeredUser => registeredUser.email == email && registeredUser.password === password );
    else
        return false;
} */

const creatingUserAccount = () => {
    const name = document.getElementById("input-name-register").value;
    const email = document.getElementById("input-email-register").value;
    const phone = document.getElementById("input-phone-register").value;
    const password = document.getElementById("input-signup-password").value;
}

    const user = {
        "name": name,
        "email": email,
        "phone": phone,
        "password": password,
        "privileges": "client" 
};

// *********************************************************************************
// Make a POST request to create the user account
// *********************************************************************************

    fetch("https://petzonalize.up.railway.app/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if (response.ok) {
            localStorage.setItem("users-logged-in", JSON.stringify(user));
            window.location.href = 'profile.html';
            console.log("Cuenta creada");
        } else {
            console.error("Failed to create account. Status: " + response.status);
        }
    })
    .catch(error => {
        console.error("Not user registered:", error);

    });
