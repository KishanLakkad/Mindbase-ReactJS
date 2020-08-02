function validate(values) {
    const { email, password } = values;
    const errors = { email: '', password: '' };
    if (!email) {
        errors.email = 'Please Enter Valid Email or User Name';
    }
    if (!password) {
        errors.password = 'PLease Enter Password';
    }
    return errors;
}

export default validate;
