import { paintings } from '../constansts/vangogh';

export const randomCoverImage = () => {
    return paintings[Math.floor(Math.random() * paintings.length)];
}

