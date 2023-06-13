// *********************************************************************************
// Default operations when the page is loaded
// *********************************************************************************

const formDeleteAccount = $("#form-delete-account");
$(document).ready(() => {
  // Starting inputs validation with jquery
  const formName = $("#form-name");
  const formPhone = $("#form-phone");
  const formEmail = $("#form-email");
  const formPassword = $("#form-password");
  const formAddress = $("#form-address"); 
  validateForm(formName);
  validateForm(formPhone);
  validateForm(formEmail);
  validateForm(formPassword);
  validateForm(formAddress); 
  validateForm(formDeleteAccount); 
  formName.submit(submitButton => submitButton.preventDefault());
  formPhone.submit(submitButton => submitButton.preventDefault());
  formEmail.submit(submitButton => submitButton.preventDefault());
  formPassword.submit(submitButton => submitButton.preventDefault());
  formAddress.submit(submitButton => submitButton.preventDefault());
  formDeleteAccount.submit(submitButton => submitButton.preventDefault());

  // Getting user from local storage
  let user = localStorage.getItem("users-logged-in");

  if (user != null) {
    user = JSON.parse(user);

    // Showing user data into the inputs
    $('#input-name').val(user.name);
    $('#input-email').val(user.email);
    $('#input-phone').val(user.phone);
    $('#input-address').val(user.address); // Mostrar dirección en el input correspondiente

    if (user.privilege === "admin")
      $("#subtitle").text("Administrador");
    else
      $("#subtitle").text("Cliente");
  } else {
    sessionStorage.setItem("not-account", "¡Necesitas Iniciar Sesión para Acceder a tu Perfil!");
    window.location.href = '../../index.html';
  }
});


// *********************************************************************************
// Pencil icon, save icon and inputs validation
// *********************************************************************************

const editInput = inputId => {
  inputState(inputId, true);

  const iconButton = $(`#edit-${inputId}`);
  iconButton.prop("onclick", null).off("click");
  iconButton.on("click", () => {
    if($(`#form-${inputId}`).valid()) {
      inputState(inputId, false);
      iconButton.off("click");
      iconButton.on("click", () => editInput(inputId));
    }
  });
};

const inputState = (id, state) => {
  const input = $(`#input-${id}`);
  const icon = $(`#edit-${id}`).children();
  const form = $(`#form-${id}`);
  const inputContainer = $(`#input-${id}-container`);

  if(state) {
    form.validate().settings.ignore = ":hidden";
    input.removeClass("form-view");
    input.addClass("form-control");
    input.prop('readonly', false);
    icon.removeClass("bi-pencil-square");
    icon.addClass("bi-check-circle");
    inputContainer.removeClass("input-container");
  } else {
    form.validate().settings.ignore = "*";
    input.addClass("form-view");
    input.removeClass("form-control");
    input.prop('readonly', true);
    icon.addClass("bi-pencil-square");
    icon.removeClass("bi-check-circle");
    inputContainer.addClass("input-container");
    form.find('input').each((key, input) => resetInput(input));
    updateLocalStorage(id, input);
  }
};

const resetInput = input => {
  $(input).removeData("previousValue");
  $(input).removeAttr("aria-invalid");
  $(input).removeClass("valid");
  $(input).removeClass("invalid");
  $(input).removeClass("input-icon-valid");
  $(input).removeClass("input-icon-invalid");
  $(`#${input.id}-error`).remove();
};

const updateLocalStorage = (id, input) => {
  const user = JSON.parse(localStorage.getItem("users-logged-in"));
  user[id] = input.val();
  localStorage.setItem("users-logged-in", JSON.stringify(user));

  // Llamar a la función updateUserData con los datos actualizados
  updateUserData(user);
};

const updateUserData = (userData) => {
  const url = "https://petzonalize.up.railway.app/users";
  const requestData = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };

  fetch(url, requestData)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al realizar la solicitud");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Datos actualizados:", data);
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
      console.log("JSON almacenado localmente:", userData);
    });
};

// *********************************************************************************
// Delete account and cancel deletion functions 
// *********************************************************************************

const deleteAccount = () => {
  $("#delete-buttons").removeClass("d-none");
  $("#buttons").addClass("d-none");
};

// Muestra el formulario cuando se da click al botón de eliminar cuenta
function showDeleteForm() {
  let deleteContainer = document.getElementById('delete-user-container');
  deleteContainer.style.visibility = 'visible';
  $("footer").find("a").each((key, element) => $(element).addClass("invisible"));
}

// Cancela y oculta el formulario cuando se da click al botón de cancelar eliminación
function cancelDeleteAccount() {
  let deleteContainer = document.getElementById('delete-user-container');
  deleteContainer.style.visibility = 'hidden';
  $("footer").find("a").each((key, element) => $(element).removeClass("invisible"));
}

//Cerrar sesión y redirigir hacia el index
function closeSession() {
  // Borrar el valor del 'users-logged-in' del localStorage
  localStorage.removeItem('users-logged-in');
  
  // Redirigir hacia el index
  window.location.href = '../../index.html'; 
}

formDeleteAccount.submit(submitButton => {
  submitButton.preventDefault();

  if(formDeleteAccount.valid()) {
    const url = "https://petzonalize.up.railway.app/users";
    const requestData = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: $('#input-email').val(),
        password: $("#input-password-delete").val()
      }),
    };

    fetch(url, requestData)
      .then((response) => {
        if (!response.ok)
          throw new Error("Error al realizar la solicitud");
    
        return response.json();
      })
      .then((data) => {
        console.log("Usuario eliminado:", data);
        localStorage.removeItem('users-logged-in');
        window.location.href = '../../index.html';
      })
      .catch((error) => {
        console.error(error);
        cancelDeleteAccount();
        resetInput($("#input-password-delete"));

        const alertElement = $("#alert");
        alertElement.removeClass("text-success");
        alertElement.addClass("alert-danger");
        alertElement.addClass("text-danger");
        alertElement.text("¡Contraseña incorrecta!");
        alertElement.slideDown(250);
        setTimeout(() => alertElement.slideUp(250, () => $(this).remove()), 5000);
      });
  }
});