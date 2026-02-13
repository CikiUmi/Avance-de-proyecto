function isUserLogin() {
  const token = localStorage.getItem("token");
  return !!token;
}
