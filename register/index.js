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
const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const database = firebase.database()

function register() {
    input_namadepan = document.querySelector("#namadepan")
    input_namabelakang = document.querySelector("#namabelakang")
    input_email = document.querySelector("#email")
    input_password = document.querySelector("#password")
    input_password2 = document.querySelector("#password2")
    alert_error = document.querySelector("#alert")

    nama_depan = document.getElementById('namadepan').value
    nama_belakang = document.getElementById('namabelakang').value
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    password2 = document.getElementById('password2').value

    if (nama_depan == 0){
        input_namadepan.classList.add('is-invalid')
        alert_error.classList.add('alert')
        alert_error.classList.add('alert-danger')
        alert_error.innerHTML = 'Nama depan tidak boleh kosong'
        return
    }
    else{
        input_namadepan.classList.remove('is-invalid')
        alert_error.classList.remove('alert')
        alert_error.classList.remove('alert-danger')
        alert_error.innerHTML = ''
    }

    expression = /^[^@]+@\w+(\.\w+)+\w$/

    if(email == 0){
        input_email.classList.add('is-invalid')
        alert_error.classList.add('alert')
        alert_error.classList.add('alert-danger')
        alert_error.innerHTML = 'Email tidak boleh kosong'
        return
    }
    else if(expression.test(email) == false){
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

    if(password == 0){
        input_password.classList.add('is-invalid')
        alert_error.classList.add('alert')
        alert_error.classList.add('alert-danger')
        alert_error.innerHTML = 'Password tidak boleh kosong'
        return
    }
    else if (password.length < 6){
        input_password.classList.add('is-invalid')
        alert_error.classList.add('alert')
        alert_error.classList.add('alert-danger')
        alert_error.innerHTML = 'Password minimal terdiri dari 6 karakter'
        return
    }
    else{
        input_namadepan.classList.remove('is-invalid')
        alert_error.classList.remove('alert')
        alert_error.classList.remove('alert-danger')
        alert_error.innerHTML = ''
    }

    if(password != password2){
        input_password.classList.add('is-invalid')
        input_password2.classList.add('is-invalid')
        alert_error.classList.add('alert')
        alert_error.classList.add('alert-danger')
        alert_error.innerHTML = 'Konfirmasi Password salah'
        return
    }
    else{
        input_password.classList.remove('is-invalid')
        input_password2.classList.remove('is-invalid')
        alert_error.classList.remove('alert')
        alert_error.classList.remove('alert-danger')
        alert_error.innerHTML = ''
    }

    auth.createUserWithEmailAndPassword(email, password)
    .then(function(){

        var user = auth.currentUser

        // Add this user to Firebase Database
        var database_ref = firebase.database().ref('User')

        // Create user data
        var user_data = {
            Email : email,
            "Nama Depan" : nama_depan,
            "Nama Belakang" : nama_belakang,
            "Hak Akses" : "User"
        }

        database_ref.child(user.uid).set(user_data)
        .then(function(){
            sessionStorage.setItem('user_uid', user.uid);
            window.location = '../dashboard'
        })

    })
    .catch(function(error){
        var error_code = error.code
        var error_message = error.message

        if(error_code == "auth/email-already-in-use"){
            input_email.classList.add('is-invalid')
            alert_error.classList.add('alert')
            alert_error.classList.add('alert-danger')
            alert_error.innerHTML = 'Email anda telah terdaftar'
        }
        else{
            input_email.classList.add('is-invalid')
            alert_error.classList.add('alert')
            alert_error.classList.add('alert-danger')
            alert_error.innerHTML = error_message
        }
    })
}