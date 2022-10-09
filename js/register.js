const formData = document.querySelector("#form");
let users = [];
let findUser = false;

if (localStorage.getItem("users")) {
	users = JSON.parse(localStorage.getItem("users"));
}

if (localStorage.getItem("user")) {
	window.location.replace("index.html");
}

const onSubmit = (e) => {
	e.preventDefault();
	const data = {
		username: e.target.username.value.trim(),
		email: e.target.email.value.trim(),
		password: e.target.password.value,
	};

	if (users.length > 0) {
		users.map((user) => {
			if (data.username === user.username.trim()) {
				findUser = true;
			}
		});
	}

	if (!findUser) {
		users.push(data);
		localStorage.setItem("users", JSON.stringify(users));
		window.location.replace("login.html");
	} else {
		alert("Your User Name Is exceed");
	}

	findUser = false;
};

formData.addEventListener("submit", onSubmit);
