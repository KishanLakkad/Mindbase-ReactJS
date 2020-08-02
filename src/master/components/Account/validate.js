function validate(values) {
    const { department, email, phone, password } = values;
    const errors = { department: '', email: '', phone: '', password: '' };
    if (!department) {
        errors.department = 'Please Enter Department Name';
    }

    if (!email) {
        errors.email = 'Please Enter Valid Email or User Name';
    }

    if (!phone) {
        errors.phone = 'Please Enter Contact Number';
    }

    if (!password) {
        errors.password = 'PLease Enter Password';
    } else {
        if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
    }

    return errors;
}

export default validate;
