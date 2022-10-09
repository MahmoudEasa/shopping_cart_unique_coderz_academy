const navUl = document.querySelector(".nav-ul");
let user;

if (localStorage.getItem("user")) {
	user = JSON.parse(localStorage.getItem("user"));
	navUl.innerHTML = `
    <li>${user.username}</li>
    <li class="sign-out">Sign Out</li>
    `;
} else {
	window.location.replace("login.html");
}

const signOut = document.querySelector(".sign-out");
signOut.addEventListener("click", () => {
	if (localStorage.getItem("user")) {
		localStorage.removeItem("user");
		window.location.replace("login.html");
	}
});
