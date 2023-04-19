export async function getUserIp_Id() {
  //   const userInfo = structMe.unmarshal(localStorage.getItem(LS_USER_KEY));
  //   const userId = {}?.data?.user?.userId;
  const res = await fetch('https://api.ipify.org?format=json')
    .then((response) => response.json()) // 将响应转为 JSON 格式
    .then((data) => {
      // 在这里对返回数据进行二次处理
      return data;
    })
    .catch((error) => console.error(error));
  // 将响应转为 JSON 格式
  return {
    // userId,
    userIp: res?.ip,
  };
}
