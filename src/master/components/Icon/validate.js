function validate(values) {
    const { name, color, type, image } = values;
    const errors = { name: '', color: '', type: '', image: '' };
    if (!name) {
        errors.name = 'Please Enter Name';
    }

    if (!color) {
        errors.color = 'Please Enter Color';
    }

    if (!type) {
        errors.type = 'Please Select Icon Type';
    }

    if (!image) {
        errors.image = 'Please Upload Image';
    }
    return errors;
}

export default validate;