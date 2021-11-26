export default function translationError(err, errorMessage) {
  err == 'Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).' ? errorMessage = 'Данного пользователя не существует, зарегестрируйтесь!' : ''
  err == 'Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).' ? errorMessage = 'Неверный пароль!' : ''
  err == 'Firebase: The email address is badly formatted. (auth/invalid-email).' ? errorMessage = 'Неверный формат электронной почты!' : ''
  err == 'Firebase: The email address is already in use by another account. (auth/email-already-in-use).' ? errorMessage = 'Адрес электронной почты уже используется, придумайте новый!' : ''
  
  return errorMessage
}