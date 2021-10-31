export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/;
  if (!email) {
    return 'E-mail polje ne može biti prazno.';
  }
  if (!re.test(email)) {
    return 'Potrebna je validna E-mail adresa.';
  }
  return '';
}
