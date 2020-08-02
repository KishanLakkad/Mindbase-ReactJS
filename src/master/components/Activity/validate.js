function validate(values) {
    const { shortTitle, title, description, image } = values;
    const errors = { shortTitle: '', title: '', description: '', image: '' };
    if (!shortTitle) {
        errors.shortTitle = 'Please Enter Short Title';
    }

    if (!title) {
        errors.title = 'Please Enter Title';
    }

    if (!description) {
        errors.description = 'Please Enter Description';
    }

    if (!image) {
        errors.image = 'Please Upload Image';
    }
    return errors;
}

export default validate;
