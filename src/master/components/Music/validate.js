function validate(values) {
    const { voiceType, title, duration, image, mp3 } = values;
    const errors = { voiceType: '', title: '', duration: '', image: '', mp3: '' };
    if (!voiceType) {
        errors.voiceType = 'Please Select Voice Type';
    }

    if (!title) {
        errors.title = 'Please Enter Title';
    }

    if (!duration) {
        errors.duration = 'Please Enter Duration';
    }

    if (!image) {
        errors.image = 'Please Upload Image';
    }

    if (!mp3) {
        errors.mp3 = 'Please Upload Music';
    }

    return errors;
}

export default validate;
