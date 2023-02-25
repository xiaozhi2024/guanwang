// 安装一个插件，可以很清楚的看到http的状态:  rest client

var API = (function () {
  const BASE_URL = "https://study.duyiedu.com";
  const TOKEN_KEY = "token";

  //封装get方法：
  /**
   * @param {*} path 网络路径地址
   */
  function get(path) {
    const headers = {};
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path, { headers });
  }

  //封装post方法：
  /**
   * @param {*} path 网络路径地址
   * @param {*} bodyObj 表示一组对象，用于登录获取信息
   */
  function post(path, bodyObj) {
    const headers = {
      "Content-Type": "application/json",
    };
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path, {
      headers,
      method: "POST",
      body: JSON.stringify(bodyObj),
    });
  }

  //注册账号
  /**
   * @param {*} loginIdof 引入一个对象的参数
   */
  async function reg(loginInfo) {
    const resp = await post("/api/user/reg", loginInfo);
    return await resp.json();
  }

  //登录账号
  /**
   * @param {*} loginInfo 传一个对象账号和密码
   */
  async function login(loginInfo) {
    const resp = await post("/api/user/login", loginInfo);

    // const resp = await fetch(BASE_URL+"/api/user/login",{
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body:JSON.stringify(loginInfo),
    // });

    const result = await resp.json();
    if (result.code === 0) {
      const token = resp.headers.get("authorization");
      localStorage.setItem(TOKEN_KEY, token);
    }
    return result;
  }
  // login({loginId:'xiao',loginPwd:'123123'}).then(h=>console.log(h));

  // 验证账号
  /**
   * @param {*} loginId 传入的账号
   */
  async function exists(loginId) {
    const resp = await get("/api/user/exists?loginId=" + loginId);
    return await resp.json();
  }

  //当前登录的用户信息
  async function profile() {
    const resp = await get("/api/user/profile");
    return await resp.json();
  }

  //发送聊天消息
  async function sendChat(content) {
    const resp = await post("/api/chat", { content });
    return await resp.json();
  }
  // sendChat('你几岁了').then(h=>console.log(h));

  //获取聊天记录
  async function getHistory() {
    const resp = await get("/api/chat/history");
    return await resp.json();
  }
  // API.getHistory().then(h=>console.log(h));

  function loginOut() {
    localStorage.removeItem(TOKEN_KEY);
  }

  return {
    reg,
    login,
    exists,
    profile,
    sendChat,
    getHistory,
    loginOut,
  };
})();