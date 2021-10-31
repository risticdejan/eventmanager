export function passwordValidator(password) {
  if (!password) {
    return 'Lozinka polje ne može biti prazno.';
  }
  return '';
}
