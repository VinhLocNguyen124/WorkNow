import { Dimens } from '../constansts/dimension';

type Edge = 'h' | 'w';

export const FitImageDimension = (originWidth: number, originHeight: number, type: Edge) => {
    const rate: number = originHeight / originWidth;
    if (type === 'w') {
        return (Dimens.widthScreen - 40);
    } else {
        return (Dimens.widthScreen - 40) * rate;
    }

}