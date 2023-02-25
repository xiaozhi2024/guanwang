(async function () {
  //验证是否有登录，如果没有登录，跳转到登录页面，如果有登陆，获得用户信息
  const resp = await API.profile();
  const user = resp.data; //获得登录后用户的个人信息
  //   console.log(resp, user);
  if (!user) {
    alert("亲，您的账号未登录或登录已过期");
    location.href = "./login.html";
    return;
  }

  //下面的代码一定时登录状态

  //设置用户信息
  const nickname = $("#nickname");
  const loginId = $("#loginId");
  nickname.innerText = user.nickname;
  loginId.innerText = user.loginId;
  //退出登录
  const close = $(".close");
  close.onclick = function () {
    API.loginOut();
    location.href = "./login.html";
  };

  //创建聊天内容
  /**
content: "你好"
createdAt: 1652534540482
from: "xiaozhi"
to: null
 */

  function addChat(chatinof) {
    const div = $$$("div");
    div.classList.add("chat-item");
    if (chatinof.from) {
      div.classList.add("me");
    }

    const img = $$$("img");
    img.className = "chat-avatar";
    img.src = chatinof.from ? "./asset/avatar.png" : "./asset/robot-avatar.jpg";

    const content = $$$("div");
    content.className = "chat-content";
    content.innerText = chatinof.content;

    const data = $$$("div");
    data.className = "chat-date";
    data.innerText = formatData(chatinof.createdAt);

    //把创建好的元素添加到指定的位置；
    div.appendChild(img);
    div.appendChild(content);
    div.appendChild(data);

    const container = $(".chat-container");
    container.appendChild(div);
  }

  function formatData(time) {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  //让聊天记录的滚动条滚到最后
  function scrollBottom() {
    const container = $(".chat-container");
    const height = container.scrollHeight;
    container.scrollTop = height;
    // console.log(height)
  }

  // 发送聊天信息
  async function sendChat() {
    const txt = $("#txtMsg");//获取dom元素
    const content = txt.value.trim();
    if (!content) {
      return;
    }
    //用户发送消息
    addChat({
      from: user.loginId,
      to: null,
      createdAt: Date.now(),
      content,
    });
    txt.value = "";
    scrollBottom();
    const res =await API.sendChat(content);//发送聊天消息
    console.log(res);
    //机器人回复的消息
    addChat({
      from: null,
      to: user.loginId,
      ...res.data,
    });
    scrollBottom();
    // console.log(res);
  }

//发送消息事件
const msgContainer = $('.msg-container');
msgContainer.onsubmit = function(e) {
    e.preventDefault();
    sendChat();
}

})();