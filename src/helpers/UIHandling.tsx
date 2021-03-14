const returnSnapPoints = (height: number, lastpoint: number) => {
    return [height, height - 10, height - 20, height - 30, height - 40, height - 50, lastpoint]
}

const returnAvatarUser = (url: string) => {
    if (url) {
        return url;
    } else {
        return 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-26.jpg';
    }
}

export { returnSnapPoints, returnAvatarUser }