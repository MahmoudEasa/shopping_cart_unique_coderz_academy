const formData = document.querySelector("#form");
let users = JSON.parse(localStorage.getItem("users")) || [];
let findUser = JSON.parse(localStorage.getItem("user")) || "";

if (findUser) {
	window.location.replace("index.html");
}

const onSubmit = (e) => {
	e.preventDefault();
	const data = {
		username: e.target.username.value.trim(),
		password: e.target.password.value,
	};

	if (users.length > 0) {
		users.map((user) => {
			if (
				data.username === user.username.trim() &&
				data.password === user.password
			) {
				findUser = user;
			}
		});
	}

	if (findUser) {
		localStorage.setItem("user", JSON.stringify(findUser));
		window.location.replace("index.html");
	} else {
		alert("Something Is Wrong");
	}
};

formData.addEventListener("submit", onSubmit);
