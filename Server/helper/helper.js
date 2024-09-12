////////////////////////////////////////////////////
//GENERATE RANDOM DEFAULT AVATAR
const defaultAvatar = () => {
  let number = Math.trunc(Math.random() * 5) + 1;
  const public_id = `Default Avatars/avatar${number}`;
  const secure_url = `https://res.cloudinary.com/dtlj4q6a4/image/upload/v1724499151/Default%20Avatars/avatar${number}.png`;
  return { public_id, secure_url };
};

///////////////////////////////////////////////
//FORMART DURATION
function formatDuration(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return `${hrs.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

////////////////////////////////////////////
//GENERATE OPT * FORGOT PASSWORD
const generatedOTP = () => {};

export { defaultAvatar, generatedOTP, formatDuration };
