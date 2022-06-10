export const formatTime = (duration: number) => {
  // hours, mins and seconds
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;

  // output like "1:01" or "4:03:59" or "123:03:59"
  let formattedStr = "";

  if (hrs > 0) {
    formattedStr += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  formattedStr += "" + mins + ":" + (secs < 10 ? "0" : "");
  formattedStr += "" + secs;
  return [formattedStr, [hrs, mins, secs]];
};

export const formatDate = (givenDate: Date, dateNow = new Date()) => {
  const dateOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  } as const;

  let timeDiff = dateNow.getTime() - givenDate.getTime();
  let timeStr = "";

  const daysDiff = timeDiff / (1000 * 3600 * 24);

  // calculates hours, mins, seconds difference from now
  if (Math.floor(daysDiff) === 0) {
    timeDiff /= 1000;
    const timeArr = formatTime(timeDiff)[1];
    if (timeArr[0]) {
      timeStr = `${
        timeArr[0] > 1 ? `${timeArr[0]} hours` : `${timeArr[0]} hour`
      }  ago`;
    } else if (timeArr[1]) {
      timeStr = `${
        timeArr[1] > 1 ? `${timeArr[1]} minutes` : `${timeArr[1]} minute`
      }  ago`;
    } else {
      timeStr = `${
        timeArr[2] > 1 ? `${timeArr[2]} seconds` : `${timeArr[2]} second`
      }  ago`;
    }
  }

  // returns time diff if its less than a day, days difference if its less than a month
  // else the date formatted
  return timeStr.length
    ? timeStr
    : daysDiff < 30
    ? `${
        Math.floor(daysDiff) > 1
          ? `${Math.floor(daysDiff)} days`
          : `${Math.floor(daysDiff)} day`
      } ago`
    : givenDate.toLocaleDateString("en-GB", dateOptions);
};
