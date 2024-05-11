/**
 * @description: 打开用户信息聊天
 * @param {String} num 工号
 */
export async function openSession (num) {
  try {
    const res = await window.ksui.http('iaa.user.getOpenId', 10184, { employeeNumberList: [num] })
    window.ks.callFunc({
      method: 'openSession',
      params: { sessionId: res[num] }
    })
  } catch (err) {
    console.log(`🚀 ~ openSession ~ err:`, err)
  }
}

/**
 * @description: 打开用户详情页面
 * @param {String} num 工号
 */
export async function openProfile (num) {
  try {
    const res = await window.ksui.http('iaa.user.getOpenId', 10184, { employeeNumberList: [num] })
    window.ks.callFunc({
      method: 'openProfile',
      params: { userId: res[num] }
    })
  } catch (err) {
    console.log(`🚀 ~ openProfile ~ err:`, err)
  }
}
