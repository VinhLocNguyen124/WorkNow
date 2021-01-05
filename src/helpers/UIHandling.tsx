const returnSnapPoints = (height: number, lastpoint: number) => {
    return [height, height - 10, height - 20, height - 30, height - 40, height - 50, lastpoint]
}

export { returnSnapPoints }