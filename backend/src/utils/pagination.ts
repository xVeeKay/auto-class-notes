export const getPagination=(page=1,limit=10)=>{
    const skip=(page-1)*10
    return {
        skip,
        limit
    }
}