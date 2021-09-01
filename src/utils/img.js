/**
 * 获取国家的图片
 * @param {string} countryId 国家id
 * @returns 返回的是promise 注意await
 */
export const getCityImgById = async (countryId) => {
    return (await import(`../assets/img/city/${countryId.toLowerCase()}.png`)).default
    // const path = `/src/assets/img/city/${countryId.toLowerCase()}.png`;
    // const modules = import.meta.globEager("/src/assets/img/city/*.png");
    // return modules[path].default;
}