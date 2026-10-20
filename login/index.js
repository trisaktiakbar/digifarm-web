// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCgfuXQnnOE53pMU6dgMWQLmpwWiczcDRg",
    authDomain: "digifarm-c4420.firebaseapp.com",
    databaseURL: "https://digifarm-c4420-default-rtdb.firebaseio.com",
    projectId: "digifarm-c4420",
    storageBucket: "digifarm-c4420.appspot.com",
    messagingSenderId: "404613354366",
    appId: "1:404613354366:web:b0cf2723df898d22efd92f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const database = firebase.database()

function login() {
    input_email = document.querySelector("#email")
    input_password = document.querySelector("#password")
    alert_error = document.querySelector("#alert")

    email = document.getElementById('email').value
    password = document.getElementById('password').value

    expression = /^[^@]+@\w+(\.\w+)+\w$/

    if(email == 0 || expression.test(email) == false){
        input_email.classList.add('is-invalid')
        alert_error.classList.add('alert')
        alert_error.classList.add('alert-danger')
        alert_error.innerHTML = 'Email tidak valid'
        return
    }
    else{
        input_email.classList.remove('is-invalid')
        alert_error.classList.remove('alert')
        alert_error.classList.remove('alert-danger')
        alert_error.innerHTML = ''
    }

    if(password == 0 || password.length < 6){
        input_password.classList.add('is-invalid')
        alert_error.classList.add('alert')
        alert_error.classList.add('alert-danger')
        alert_error.innerHTML = 'Password tidak valid'
        return
    }

    else{
        input_password.classList.remove('is-invalid')
        alert_error.classList.remove('alert')
        alert_error.classList.remove('alert-danger')
        alert_error.innerHTML = ''
    }

    auth.signInWithEmailAndPassword(email, password)
    .then(function(){

        var user = auth.currentUser

        window.location = "../dashboard"

        sessionStorage.setItem('user_uid', user.uid);

    })
    .catch(function(error){
        var error_code = error.code
        var error_message = error.message

        if(error_code == "auth/user-not-found"){
            alert_error.classList.add('alert')
            alert_error.classList.add('alert-danger')
            alert_error.innerHTML = "Email anda tidak terdaftar di sistem"
        }
        else if(error_code == "auth/wrong-password"){
            alert_error.classList.add('alert')
            alert_error.classList.add('alert-danger')
            alert_error.innerHTML = "Password yang anda masukkan tidak valid"
        }
        else if(error_code == "auth/network-request-failed"){
            alert_error.classList.add('alert')
            alert_error.classList.add('alert-danger')
            alert_error.innerHTML = "Gagal login. Periksa kembali jaringan anda"
        }
        else{
            alert_error.classList.add('alert')
            alert_error.classList.add('alert-danger')
            alert_error.innerHTML = error_message
        }
    })
}