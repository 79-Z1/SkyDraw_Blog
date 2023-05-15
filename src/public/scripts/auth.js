const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

//------------------------------ ASYNC FUNCTIONS ------------------------------// 

let username = $('#login-name');
let password = $('#login-pass');
let loginBtn = document.getElementById('login-btn');

if (loginBtn) {
	loginBtn.addEventListener("click", async (e) => {
		e.preventDefault();

		const { metadata, message, statusCode } = await login();
		const { id, username, email } = metadata;
		if (statusCode === 200 && message === "Login successful") {
			instance.setCookie('userId', id);
			window.location.replace("/");
		} else 
			if(message === "User does not exist") {
			alert('Sai username');
		} else alert('Sai password');
	})
}

async function login() {
	const payload = {
		username: username.val(),
		password: password.val()
	}
	return (await instance.post('/v1/api/blog/login', payload)).data
}