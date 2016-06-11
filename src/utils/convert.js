export function object2string(obj) {
    if (typeof obj !== 'object') {
        return ''
    }
    const keys = Object.keys(obj)
    return keys.length > 0 ?
        Object.keys(obj).reduce((previousValue, currentValue, index) => {
            return index === 0 ?
                `${currentValue}=${obj[currentValue]}` :
                `${previousValue}&${currentValue}=${obj[currentValue]}`
        }, '') : ''
}