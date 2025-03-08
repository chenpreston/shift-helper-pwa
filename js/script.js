console.log("script.js 加载中...");

let shiftOptionsGroups = {};
let shiftDetailsDictionary = {};

async function loadCSV(url) {
  try {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    const text = await response.text();
    const result = Papa.parse(text, { header: true, skipEmptyLines: true });
    return result.data;
  } catch (error) {
    console.error(`Error loading CSV from ${url}:`, error);
    return [];
  }
}

function parseOptionsCSV(data) {
  const groups = {};
  if (!data.length) return groups;

  const headers = Object.keys(data[0]);
  headers.forEach((header) => {
    const [depot, dayType, schoolHoliday] =
      header
        .match(
          /(greerton|papamoa|maleme|standby)(Weekday|Weekend)SchoolHoliday(True|False)/i
        )
        ?.slice(1) || [];
    if (!depot) return;

    const depotKey =
      schoolHoliday === "True" ? `${depot}-schoolHoliday` : depot;
    if (!groups[depotKey]) {
      groups[depotKey] = { weekday: [], weekend: [] };
    }
    const dayKey = dayType.toLowerCase();
    data.forEach((row) => {
      if (row[header] && !groups[depotKey][dayKey].includes(row[header])) {
        groups[depotKey][dayKey].push(row[header]);
      }
    });
  });
  return groups;
}

function parseShiftsCSV(data) {
  const dictionary = {
    "": {
      signOn1: "none",
      signOff1: "none",
      signOn2: "none",
      signOff2: "none",
      mealLocation: "无",
      mealStart: "none",
      mealFinish: "none",
      mealDuration: "无",
    },
    OFF: {
      signOn1: "none",
      signOff1: "none",
      signOn2: "none",
      signOff2: "none",
      mealLocation: "无",
      mealStart: "none",
      mealFinish: "none",
      mealDuration: "无",
    },
  };
  data.forEach((row) => {
    dictionary[row.shift] = {
      signOn1: row.signOn1 || "none",
      signOff1: row.signOff1 || "none",
      signOn2: row.signOn2 || "none",
      signOff2: row.signOff2 || "none",
      mealLocation: row.mealLocation || "none",
      mealStart: row.mealStart || "none",
      mealFinish: row.mealFinish || "none",
      mealDuration: row.mealDuration || "none",
    };
  });
  return dictionary;
}

async function initData() {
  const optionsData = await loadCSV("./data/options.csv");
  const shiftsData = await loadCSV("./data/shifts.csv");
  shiftOptionsGroups = parseOptionsCSV(optionsData);
  shiftDetailsDictionary = parseShiftsCSV(shiftsData);
  console.log("Loaded shiftOptionsGroups:", shiftOptionsGroups);
  console.log("Loaded shiftDetailsDictionary:", shiftDetailsDictionary);
}

initData().catch((error) => console.error("Initialization failed:", error));

const appVersion = "v0.5.5"; //app版本
const shiftDetailsVersion = "28.01.2025"

document.addEventListener("DOMContentLoaded", function () {
  // 当 HTML 文档完全加载完成后执行的代码
  console.log("DOMContentLoaded 事件触发，DOM 已加载完成");

  document.querySelector("#depot-prompt").innerHTML += `<p>app version: ${appVersion}</p>`; // 在About页面显示版本号
document.querySelector("#depot-prompt").innerHTML += `<p>shift details database version: ${shiftDetailsVersion}</p>`; // 在About页面显示版本号


  // 获取 DOM 元素 (getElementById)
  const schoolHolidaySwitch = document.getElementById("school-holiday-switch"); // school holiday开关
  const greertonDepotButton = document.getElementById("greerton-depot"); // Greerton DEPOT 按钮
  const papamoaDepotButton = document.getElementById("papamoa-depot"); // Papamoa DEPOT 按钮
  const malemeDepotButton = document.getElementById("maleme-depot"); // Maleme DEPOT 按钮
  const standbyDepotButton = document.getElementById("standby-depot"); // Standby DEPOT 按钮
  const backToDepotFromForm= document.getElementById("back-to-depot-selection-from-form"); // 从表单页面返回按钮
  const backToDepotSelectionButton = document.getElementById("back-to-depot-selection"); // "返回" 按钮
  const depotSelectionUI = document.getElementById("depot-selection-ui"); // DEPOT 选择界面容器
  const weekDateSelector = document.getElementById("week-date-selector"); // 日期选择器 section 元素
  const weekStartDateInput = document.getElementById("week-start-date"); // 日期 input 元素
  const scheduleWeekView = document.getElementById("schedule-week-view"); // 日期列表视图 section 元素
  const backToDateSelectorButton = document.getElementById("back-to-date-selector-button"); // "返回" 按钮 (日期列表视图 页面)
  const addToCalendarButton = document.getElementById("add-to-calendar-button"); // "添加到日历" 按钮
  const aboutSection = document.getElementById("about-section"); //About 区域
  const aboutButton = document.getElementById("about-button"); // About 按钮
  const backToDepotFromAboutButton = document.getElementById("back-to-depot-from-about"); // 从 About 页面的返回按钮
  const contactButton = document.getElementById("contact-button"); // 联系我们按钮
  const contactSection = document.getElementById("contact-section"); // 联系我们区域
  
  // 联系我们按钮
  contactButton.addEventListener("click", () => {
    console.log("Contact button clicked");
    depotSelectionUI.style.display = "none";
    aboutSection.style.display = "none";
    weekDateSelector.style.display = "none";
    scheduleWeekView.style.display = "none";
    contactSection.style.display = "block";
  }
  );

  // 返回 DEPOT 选择（从 联系我们）
  backToDepotFromForm.addEventListener("click", () => {
    console.log("Back from Contact clicked");
    depotSelectionUI.style.display = "block";
    aboutSection.style.display = "none";
    weekDateSelector.style.display = "none";
    scheduleWeekView.style.display = "none";
    contactSection.style.display = "none";
  });
  
  
  // About 按钮
  aboutButton.addEventListener("click", () => {
    console.log("About button clicked");
    depotSelectionUI.style.display = "none";
    aboutSection.style.display = "block";
    weekDateSelector.style.display = "none";
    scheduleWeekView.style.display = "none";
  });

  // 返回 DEPOT 选择（从 About）
  backToDepotFromAboutButton.addEventListener("click", () => {
    console.log("Back from About clicked");
    depotSelectionUI.style.display = "block";
    aboutSection.style.display = "none";
    weekDateSelector.style.display = "none";
    scheduleWeekView.style.display = "none";
  });

  // 学校假期开关交互
  schoolHolidaySwitch.addEventListener("change", function (event) {
    isSchoolHolidayEnabled = event.target.checked; //  更新 School Holiday 开关状态变量
    const isSchoolHoliday = event.target.checked; // 获取开关状态 (true=选中, false=未选中)
    console.log("School Holiday Switch 状态改变:", isSchoolHoliday);

    if (scheduleWeekView.style.display === "block") {
      // 当 School Holiday 开关状态改变时， 重新填充日期列表视图的下拉菜单选项**
      //  如果日期列表视图当前是显示的
      updateShiftOptionsInTableView(); //  调用函数重新更新下拉菜单选项 (函数定义见下方)
    }
  });

  //  3.  存储当前 DEPOT 选择 和 School Holiday 开关状态
  let currentDepot = null; //  存储当前选择的 DEPOT (例如 "depot1", "depot2", "depot3"， 默认为 null)
  let isSchoolHolidayEnabled = false; //  存储 School Holiday 开关状态 (true=开启, false=关闭， 默认为 false)

  // 3. DEPOT 按钮点击事件 - 添加点击事件监听器 (显示日期选择器，隐藏DEPOT选择界面)
  greertonDepotButton.addEventListener("click", function () {
    console.log("Greerton DEPOT 按钮被点击了");
    currentDepot = "greerton"; // **更新当前 DEPOT 选择为 "depot1" (或者你定义的键名)**
    //  后续完善：  记录选择的 DEPOT (例如 Greerton)

    depotSelectionUI.style.display = "none"; // 隐藏 DEPOT 选择 UI 容器
    weekDateSelector.style.display = "block"; // 显示日期选择器 section
    scheduleWeekView.style.display = "none"; // **新增: 确保日期列表视图 初始状态是隐藏的**
  });

  papamoaDepotButton.addEventListener("click", function () {
    console.log("Papamoa DEPOT 按钮被点击了");
    currentDepot = "papamoa"; // **更新当前 DEPOT 选择为 "depot2" (或者你定义的键名)**
    //  后续完善：  记录选择的 DEPOT (例如 Papamoa)

    depotSelectionUI.style.display = "none"; // 隐藏 DEPOT 选择 UI 容器
    weekDateSelector.style.display = "block"; // 显示日期选择器 section
    scheduleWeekView.style.display = "none"; // **新增: 确保日期列表视图 初始状态是隐藏的**
  });

  malemeDepotButton.addEventListener("click", function () {
    console.log("Maleme DEPOT 按钮被点击了");
    currentDepot = "maleme"; // **更新当前 DEPOT 选择为 "depot3" (或者你定义的键名)**
    //  后续完善：  记录选择的 DEPOT (例如 Maleme)

    depotSelectionUI.style.display = "none"; // 隐藏 DEPOT 选择 UI 容器
    weekDateSelector.style.display = "block"; // 显示日期选择器 section
    scheduleWeekView.style.display = "none"; // **新增: 确保日期列表视图 初始状态是隐藏的**
  });

  standbyDepotButton.addEventListener("click", function () {
    console.log("Standby DEPOT 按钮被点击了");
    currentDepot = "standby"; // **更新当前 DEPOT 选择为 "depot4" (或者你定义的键名)**
    //  后续完善：  记录选择的 DEPOT (例如 Standby)

    depotSelectionUI.style.display = "none"; // 隐藏 DEPOT 选择 UI 容器
    weekDateSelector.style.display = "block"; // 显示日期选择器 section
    scheduleWeekView.style.display = "none"; // **新增: 确保日期列表视图 初始状态是隐藏的**
  });

  // 4.  "返回" 按钮点击事件 - 添加点击事件监听器 (显示DEPOT选择界面，隐藏日期选择器和日期列表视图)
  backToDepotSelectionButton.addEventListener("click", function () {
    console.log("返回 按钮被点击了");

    depotSelectionUI.style.display = "block"; // 显示 DEPOT 选择 UI 容器
    weekDateSelector.style.display = "none"; // 隐藏日期选择器 section
    scheduleWeekView.style.display = "none"; // **新增: 隐藏日期列表视图 section**
  });

  // 5.  日期选择器  日期选择完成事件 -  监听  weekStartDateInput 的 'change' 事件
  weekStartDateInput.addEventListener("change", function (event) {
    const selectedDate = event.target.value; // 获取用户选择的日期值 (YYYY-MM-DD 格式字符串)
    console.log("用户在日期选择器中选择了日期:", selectedDate);

    // **新增:  日期选择完成后，隐藏日期选择器，显示日期列表视图**
    weekDateSelector.style.display = "none"; // 隐藏日期选择器 section
    scheduleWeekView.style.display = "block"; // 显示日期列表视图 section

    // **新增:  动态填充日期列表视图表格的 "日期" 列**
    const startDate = new Date(selectedDate); // 将YYYY-MM-DD 字符串转换为 Date 对象
    const dayOfWeek = startDate.getDay(); // 获取选择日期是星期几 (0-周日, 6-周六)
    const sundayDate = new Date(startDate); // 创建一个新的 Date 对象，避免修改原日期
    sundayDate.setDate(startDate.getDate() - dayOfWeek); // 将日期设置为这周的周日

    const dateCells = scheduleWeekView.querySelectorAll(
      "tbody tr td:nth-child(2)"
    ); // 获取表格中 "日期" 列的所有 <td> 单元格 (注意: 第2列是日期列)

    for (let i = 0; i < dateCells.length; i++) {
      // 循环遍历 7 个日期单元格 (周日到周六)
      const currentDate = new Date(sundayDate); // 创建一个新的 Date 对象，避免修改周日日期
      currentDate.setDate(sundayDate.getDate() + i); //  在周日的基础上，依次增加 i 天，得到周一，周二...周六的日期

      const formattedDate =
        String(currentDate.getDate()).padStart(2, "0") +
        "/" +
        String(currentDate.getMonth() + 1).padStart(2, "0"); // 格式化日期为 DD/MM 形式 (例如 01/01)

      dateCells[i].textContent = formattedDate; // 将格式化后的日期字符串填充到对应的 <td> 单元格中
    }

    // **新增:  动态填充日期列表视图表格的 "Shift" 列下拉菜单选项**
    updateShiftOptionsInTableView(); //  调用函数更新下拉菜单选项 (函数定义见下方)

    //  后续完善：  根据选择的日期，加载或生成排班数据，并更新日期列表视图
  });

  // 6.  "返回" 按钮点击事件 - 添加点击事件监听器 (显示日期选择器，隐藏日期列表视图) -  日期列表视图 页面 "返回" 按钮
  backToDateSelectorButton.addEventListener("click", function () {
    // **新增:  日期列表视图 页面 "返回" 按钮  点击事件监听器**
    console.log("返回 按钮 (日期列表视图 页面) 被点击了");

    weekDateSelector.style.display = "block"; // 显示日期选择器 section
    scheduleWeekView.style.display = "none"; // 隐藏日期列表视图 section
  });

  // **8.  新增函数:  动态更新日期列表视图表格的 "Shift" 列下拉菜单选项 -  函数定义**
  function updateShiftOptionsInTableView() {
    console.log("updateShiftOptionsInTableView() 函数被调用");

    // 动态计算 currentOptionsGroupKey
    const currentOptionsGroupKey = isSchoolHolidayEnabled ? `${currentDepot}-schoolHoliday` : currentDepot;
    console.log("shiftOptionsGroups:", shiftOptionsGroups);
    console.log("currentDepot:", currentDepot);
    console.log("isSchoolHolidayEnabled:", isSchoolHolidayEnabled);
    console.log("currentOptionsGroupKey:", currentOptionsGroupKey);

    // 检查数据是否有效
    if (!currentDepot) {
      console.error("currentDepot 未定义");
      return;
    }
    if (!shiftOptionsGroups[currentOptionsGroupKey]) {
      console.error(`shiftOptionsGroups 中不存在 ${currentOptionsGroupKey}`);
      return;
    }

    const shiftSelectors = scheduleWeekView.querySelectorAll("tbody tr td select.shift-selector");
    const weekdayHolidaySwitches = scheduleWeekView.querySelectorAll('.weekday-holiday-switch input[type="checkbox"]');

    weekdayHolidaySwitches.forEach((holidaySwitch) => {
      holidaySwitch.addEventListener("change", function () {
        console.log("工作日公共假日开关状态改变，立即更新表格备选项");
        updateShiftOptionsInTableView();
      });
    });

    shiftSelectors.forEach((selectElement, index) => {
      const dayIndex = index;
      let dayOfWeek = dayIndex === 0 || dayIndex === 6 ? "weekend" : "weekday";

      if (dayOfWeek === "weekday" && dayIndex >= 1 && dayIndex <= 5) {
        const currentWeekdayHolidaySwitch = weekdayHolidaySwitches[dayIndex - 1];
        if (currentWeekdayHolidaySwitch && currentWeekdayHolidaySwitch.checked) {
          dayOfWeek = "weekend";
        }
      }

      console.log(`处理星期${["日", "一", "二", "三", "四", "五", "六"][dayIndex]} (dayOfWeek: ${dayOfWeek})`);

      const optionsGroup = shiftOptionsGroups[currentOptionsGroupKey][dayOfWeek];
      if (!optionsGroup) {
        console.error(`在 ${currentOptionsGroupKey} 中未找到 ${dayOfWeek}`);
        return;
      }

      while (selectElement.options.length > 1) {
        selectElement.remove(1);
      }

      optionsGroup.forEach((optionText) => {
        const optionElement = document.createElement("option");
        optionElement.value = optionText;
        optionElement.textContent = optionText;
        selectElement.appendChild(optionElement);
      });
    });
  } //  updateShiftOptionsInTableView() 函数定义 结束

  // 9.  "添加到日历" 按钮点击事件 - 添加点击事件监听器 (生成日历事件)
  addToCalendarButton.addEventListener("click", async function () {
    console.log("“添加到日历” 按钮被点击了");

    // Ensure data is loaded
    await initData();

    const scheduleTableBody = scheduleWeekView.querySelector("tbody");
    if (!scheduleTableBody) {
      console.error("找不到排班表格的 <tbody> 元素！");
      return;
    }

    const scheduleRows = scheduleTableBody.querySelectorAll("tr");
    if (!scheduleRows.length) {
      console.warn("排班表格 <tbody> 中没有找到任何数据行 (<tr>)！");
      return;
    }

    const shiftEvents = [];
    scheduleRows.forEach((row) => {
      const dateCell = row.querySelectorAll("td")[0];
      console.log("dateCell:", dateCell);
      const shiftCell = row.querySelectorAll("td")[1];
      console.log("shiftCell:", shiftCell);
      if (!dateCell || !shiftCell) return;

      const dateText = dateCell.textContent.trim();
      console.log("dateText:", dateText);
      const shiftSelector = shiftCell.querySelector("select.shift-selector");
      if (!shiftSelector) return;

      const selectedShiftValue = shiftSelector.value;
      if (selectedShiftValue) {
        shiftEvents.push({ date: dateText, shiftCode: selectedShiftValue });
      }
    });

    let icsContent = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//SHIFT Helper//EN\r\nCALSCALE:GREGORIAN\r\nMETHOD:PUBLISH\r\n";

    shiftEvents.forEach((event) => {
      const { shiftCode, date } = event;
      console.log("处理 shiftCode:", shiftCode, "dateText:", date);
      console.log(`Processing shiftCode: ${shiftCode}, dateText: ${date}`);
      const shiftDetails = shiftDetailsDictionary[shiftCode];
      if (!shiftDetails || shiftCode === "OFF" || shiftCode === "") return;

      const { signOn1, signOff1, signOn2, signOff2, mealLocation, mealStart, mealFinish, mealDuration } = shiftDetails;

      if (signOn2 === "none" && mealLocation !== "none") {
        // Case 1: signOn2 is "none" and mealLocation is not "none"
        icsContent += generateEvent(`${shiftCode} part 1`, date, signOn1, mealStart);
        icsContent += generateEvent(`Meal at ${mealLocation} ${mealDuration}`, date, mealStart, mealFinish);
        icsContent += generateEvent(`${shiftCode} part 2`, date, mealFinish, signOff1);
      } else if (signOn2 !== "none" && signOff2 !== "none") {
        // Case 2: signOn2 and signOff2 are not "none"
        icsContent += generateEvent(`${shiftCode} AM`, date, signOn1, signOff1);
        const gapDuration = calculateGap(signOff1, signOn2);
        icsContent += generateEvent(`GAP ${gapDuration}`, date, signOff1, signOn2);
        icsContent += generateEvent(`${shiftCode} PM`, date, signOn2, signOff2);
      } else if (signOn2 === "none" && mealLocation === "none") {
        // Case 3: signOn2 is "none" and mealLocation is "none"
        icsContent += generateEvent(shiftCode, date, signOn1, signOff1);
      }
    });

    icsContent += "END:VCALENDAR\r\n";
    console.log("Generated .ics content:\n", icsContent);

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const downloadUrl = URL.createObjectURL(blob);
    const downloadLink = document.getElementById("hiddenDownloadLink");
    downloadLink.href = downloadUrl;
    downloadLink.click();
    URL.revokeObjectURL(downloadUrl);
    console.log("已触发 .ics 文件下载");
  });

  function generateEvent(summary, dateText, startTime, endTime) {
    if (startTime === "none" || endTime === "none") return "";
    const startDateTime = createUTCDateFromDateTextAndTime(dateText, startTime);
    const endDateTime = createUTCDateFromDateTextAndTime(dateText, endTime);
    if (!startDateTime || !endDateTime) return "";

    const uid = generateUuid();
    const dtstamp = formatDateTimeToUTCString(new Date());
    const dtstart = formatDateTimeToUTCString(startDateTime);
    const dtend = formatDateTimeToUTCString(endDateTime);

    return `BEGIN:VEVENT\r\nUID:${uid}\r\nDTSTAMP:${dtstamp}\r\nDTSTART:${dtstart}\r\nDTEND:${dtend}\r\nSUMMARY:${summary}\r\nEND:VEVENT\r\n`;
  }

  function calculateGap(endTime, startTime) {
    const [endHour, endMinute] = endTime.split(":").map(Number);
    const [startHour, startMinute] = startTime.split(":").map(Number);
    let minutes = (startHour * 60 + startMinute) - (endHour * 60 + endMinute);
    if (minutes < 0) minutes += 24 * 60; // Handle overnight gaps
    const hours = Math.floor(minutes / 60);
    minutes %= 60;
    return `${hours} hr ${minutes} min`;
  }

}); //  DOMContentLoaded 事件监听器 结束



// 注册 Service Worker
if ("serviceWorker" in navigator) {
  console.log("script.js: Registering Service Worker");
  navigator.serviceWorker
    .register("./service-worker.js")
    .then((registration) => {
      console.log("script.js: Service Worker registered:", registration);

      // 检查是否有等待中的新 Service Worker
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        newWorker.addEventListener("statechange", () => {
          if (
            newWorker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            // 新 Service Worker 已安装，且当前有控制器（旧 Service Worker）
            console.log("New Service Worker is waiting to activate");
            // 提示用户刷新或自动激活
            if (confirm("A new version is available. Refresh to update?")) {
              newWorker.postMessage({ action: "skipWaiting" });
            }
          }
        });
      });
    })
    .catch((err) =>
      console.error("script.js: Service Worker registration failed:", err)
    );

  // 监听控制器变化，刷新页面以使用新缓存
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    console.log("Controller changed, reloading to use new Service Worker");
    window.location.reload();
  });
}

// 接收 Service Worker 的消息
navigator.serviceWorker.addEventListener("message", (event) => {
  if (event.data && event.data.action === "skipWaiting") {
    console.log("Skipping waiting via message");
  }
});
