module.exports = (client) => {
  console.log("Tao đã sẵn sàng, bá dô đây mà nút");
  client.user.setPresence({
    activities: [{ name: "Bot Tính nuôi" }],
    status: "online",
  });
};
