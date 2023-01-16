export default function isSuperAdmin(level) {
    if(level === null) return  false
    return Number(level) === 0 ? true : false
}