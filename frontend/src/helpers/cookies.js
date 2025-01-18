// cookieHelper.js

// Hàm tạo cookie
function setCookie(name, value, days = 7, path = "/") {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=${path}`;
}

// Hàm lấy giá trị của cookie
function getCookie(name) {
  const cookieArr = document.cookie.split("; ");
  for (let i = 0; i < cookieArr.length; i++) {
    const [cookieName, cookieValue] = cookieArr[i].split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null; // Không tìm thấy cookie
}

// Hàm xóa cookie
function deleteCookie(name, path = "/") {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`;
}

export { setCookie, getCookie, deleteCookie };
