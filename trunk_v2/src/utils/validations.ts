export function required(values:any, errors: object, fieldName: string) {
  if (!values[fieldName]) {
    return { ...errors, [fieldName]:'Chyba - povinný prvek' };
  }
  return errors;
} 

export function min(values:any, errors: object, fieldName: string, min: number) {
  if (values[fieldName] && values[fieldName].length < min) {
    return { ...errors, [fieldName]:`Chyba - vyžadováno minimálně ${min} znaků` };
  }
  return errors;
}

export function emailShape(values:any, errors: object, fieldName: string) {
  const emailRegExp = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
  const email = values[fieldName];
  const validEmail = emailRegExp.test(email);
  if (!validEmail) {
      return { ...errors, [fieldName]:`Chyba - špatný formát emailu` };
  }
  return errors;
}