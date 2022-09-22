
export const checkBiteValid = (size: number, byte = "Byte", multiNum = 1) => {
    const unit = ["Byte", "KB", "MB", "GB", "TB"].indexOf(byte);
    const maxSize = Math.pow(1024, unit) * multiNum;

    return !unit || maxSize < size;
}