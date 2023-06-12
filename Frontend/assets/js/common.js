// Jquery to load navbar and footer
$(document).ready(function(){
    $.get("/assets/html/navbar.html", data => {
        $("nav").replaceWith(data);

        // Updating shopping cart counter
        const shoppingCart = localStorage.getItem("shopping-cart");
        if(shoppingCart !== null) {
            const products = JSON.parse(shoppingCart);
            const shoppingCartCounter = $("#shopping-cart-counter");
            shoppingCartCounter.text(products[0].total);
            shoppingCartCounter.removeClass("d-none");
        }

        const lightBlueColor = $(":root").css("--light-blue");
        const blueColor = $(":root").css("--blue");
        const lightPurpleColor = $(":root").css("--light-purple");
        const purpleColor = $(":root").css("--purple");
        const beigeColor = $(":root").css("--beige");
        const brownColor = $(":root").css("--brown");
        const lightGrayColor = $(":root").css("--light-gray");
        const grayColor = $(":root").css("--gray");
        const darkGrayColor = $(":root").css("--dark-gray");
        let darkMode = true;

        $("#dark-mode").click(() => {
            $(":root").css("--blue", darkMode ? lightBlueColor : blueColor);
            $(":root").css("--purple", darkMode ? lightPurpleColor : purpleColor);

            $(":root").css("--light-blue", darkMode ? blueColor : lightBlueColor);
            $(":root").css("--light-purple", darkMode ? purpleColor : lightPurpleColor);

            $(":root").css("--beige", darkMode ? brownColor : beigeColor);
            $(":root").css("--brown", darkMode ? beigeColor : brownColor);

            $(":root").css("--white", darkMode ? "black" : "white");
            $(":root").css("--black", darkMode ? "white" : "black");
            
            $(":root").css("--gray", darkMode ? lightGrayColor : grayColor);
            $(":root").css("--light-gray", darkMode ? grayColor : lightGrayColor);
            $(":root").css("--dark-gray", darkMode ? grayColor : darkGrayColor);
            
            darkMode = !darkMode;

            $("img").each((key, element) => {
                if($(element).attr("src").includes("Logo.png") ||
                    $(element).attr("src").includes("Logo Dark.png")) {
                    if(darkMode)
                        $(element).attr("src", "/assets/img/Logo.png");
                    else 
                        $(element).attr("src", "/assets/img/Logo Dark.png");
                }
            });
        });
    });
    
    $.get("/assets/html/footer.html", data => $("footer").replaceWith(data));
});

const validateForm = form => {
    return $(form).validate({
        rules: {
            name: {
                minlength: 3,
                required: true
            },
            address: {
                minlength: 6,
                required: true
            },
            email: {
                minlength: 5,
                required: true,
                email: true
            },
            phone: {
                minlength: 10,
                maxlength: 10,
                required: true
            },
            password: {
                minlength: 8,
                required: true
            },
            confirmPassword: {
                minlength: 8,
                required: true,
                equalTo: "#confirmPassword"
            }, 
            number: {
                minlength: 1,
                required: true
            },
            subject: {
                minlength: 5,
                required: true
            },
            message: {
                minlength: 5,
                required: true
            },
            description: {
                minlength: 5,
                required: true
            }
        },
        messages : {
            name: {
                required: "Debes ingresar tu nombre",
                minlength: "Tu nombre debe tener al menos 3 letras"
            },
            address: {
                required: "Debes ingresar una dirección",
                minlength: "Tu dirección debe tener Calle, N°Casa, Colonia y Codigo Postal"
            },
            email: {
                required: "Debes ingresar tu correo",
                minlength: "Tu correo debe tener al menos 5 letras",
                email: "El correo debe tener el formato correo@empresa.dominio"
            },
            phone: {
                required: "Debes ingresar tu número telefónico",
                minlength: "Tu número debe tener 10 digitos",
                maxlength: "Tu número no puede tener más de 10 digitos"
            },
            password: {
                required: "Debes ingresar tu contraseña",
                minlength: "Tu contraseña debe tener al menos 8 caracteres"
            },
            confirmPassword: {
                required: "Debes confirmar tu contraseña",
                minlength: "Tu contraseña debe tener al menos 8 caracteres",
                equalTo: "Las contraseñas no coinciden"
            },
            number: {
                required: "Debes ingresar la cantidad deseada",
                minlength: "El valor debe ser al menos 1"
            },
            subject: {
                required: "Debes ingresar el asunto del correo",
                minlength: "El asunto debe tener al menos 5 caracteres"
            },
            message: {
                required: "Debes ingresar el mensaje del correo",
                minlength: "El mensaje debe tener al menos 5 caracteres"
            },
            description: {
                required: "Debes ingresar la descripcion del producto",
                minlength: "La descripción debe tener al menos 5 caracteres"
            }
        },
        errorClass: "valid is-valid valid-feedback",
        validClass: "invalid is-invalid invalid-feedback",
        highlight: element => {
            $(element).addClass("invalid").removeClass("valid");
            $(element.form).find(`label[id=${element.id}-error]`).addClass("valid-feedback");
            $(element).removeClass('input-icon-valid').addClass('input-icon-invalid'); 
        },
        unhighlight: element => {
            $(element).removeClass("invalid").addClass("valid");
            $(element.form).find(`label[id=${element.id}-error]`).addClass("valid-feedback");
            $(element).removeClass('input-icon-invalid').addClass('input-icon-valid'); 
        }
    });    
};